import jwt from "../lib/jwt.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const authService = {
    async register(name, email, password, rePassword) {
        const user = await User.findOne({ $or: [{ name }, { email }] });

        if (user) {
            throw new Error("User already exists!");
        }

        if (password !== rePassword) {
            throw new Error("Passwords don't match!");
        }

        const newUser = await User.create({ name, email, password });
        
        return this.generateToken(newUser)
    },
    async login(email, password) {
        // Get user from DB
        const user = await User.findOne({ email });
        // Check if user exists
        if (!user) {
            throw new Error("Invalid user or password!");
        }
        // Check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error("Invalid user or password!");
        }

        return this.generateToken(user);
    },

    // Generate JWT
    async generateToken(user) {
        const payload = {
            _id: user._id,
            email: user.email,
            name: user.name,
        };

        const headers = { expiresIn: "2h" };
        const token = await jwt.sign(payload, process.env.JWT_SECRET, headers);

        return token;
    },
};

export default authService;
