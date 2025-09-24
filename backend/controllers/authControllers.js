import dotenv from 'dotenv'
import User from "../models/user.js"
import jwt from 'jsonwebtoken'
import { redis } from '../lib/redis.js'

dotenv.config()

const generateTokens = (userId) => {
	const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
		expiresIn: "15m",
	})

	const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
		expiresIn: "7d",
	})

	return {
		accessToken,
		refreshToken
	}
}

const setCookies = (res, accessToken, refreshToken) => {
	res.cookie("accessToken", accessToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 15 * 60 * 1000, // 15 minutes
	});

	res.cookie("refreshToken", refreshToken, {
		httpOnly: true, // prevent XSS attacks, cross site scripting attack
		secure: process.env.NODE_ENV === "production",
		sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
		maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
	});
}


const storeRefreshToken = async (userId, refreshToken) => {
	await redis.set(`refresh_token:${userId}`, refreshToken, {
		ex: 7 * 24 * 60 * 60,
	}) // valid for 7 days
}

export const signup = async (req, res) => {
	const { email, password, name } = req.body;
    
	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const user = await User.create({ name, email, password });

		// authenticate
		const { accessToken, refreshToken } = generateTokens(user._id);
		// console.log('token generated successfully')
		await storeRefreshToken(user._id, refreshToken);
		// console.log('refresh token stored successfully')

		setCookies(res, accessToken, refreshToken);
		// console.log('cookies set successfully')

		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			role: user.role,
		});
	} catch (error) {
		console.log("Error in signup controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (user && (await user.comparePassword(password))) {
			const { accessToken, refreshToken } = generateTokens(user._id);
			await storeRefreshToken(user._id, refreshToken);
			setCookies(res, accessToken, refreshToken);

			res.json({
				_id: user._id,
				name: user.name,
				email: user.email,
				role: user.role,
			});
		} else {
			res.status(400).json({ message: "Invalid email or password" });
		}
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken;
		if (refreshToken) {
			const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
			await redis.del(`refresh_token:${decoded.userId}`);
		}

		res.clearCookie("accessToken");
		res.clearCookie("refreshToken");
		res.json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ message: "Server error", error: error.message });
	}
};


export const refreshToken = async (req, res) => {
	try {
		const refreshToken = req.cookies.refreshToken

		if(!refreshToken) {
			res.status(401).json({ 
				message: 'No refresh token provided'
			})
		}

		const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
		const storedToken = redis.get(`refresh_token:${decoded.userId}`)

		if(decoded !== storedToken) {
			res.status(401).json({
				message: "Invalid refresh token"
			})
		}

		res.cookie("accessToken", accessToken, {
			httpOnly: true,
			sameSite: "strict",
			secure: process.env.NODE_ENV === 'production',
			maxAge: 15 * 60 * 1000,
		})

		res.json({
			message: 'Token refreshed successfully'
		})
	} catch (error) {
		console.log("Error in refresh token controller: " + error)
		res.status(500).json({
			message: "Server error",
			error: error.message
		})
	}
}


export const getProfile = async (req, res) => {
	try {
		res.json(req.user)
	} catch (error) {
		res.status(500).json({
			message: "Server error",
			error: error.message
		})
	}
}