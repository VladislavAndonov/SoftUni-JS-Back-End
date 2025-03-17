import { Router } from "express";
import authService from "../services/authService.js";
import { AUTH_COOKIE_NAME } from "../constants.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const authController = Router();

authController.get("/register", (req, res) => {
    res.render("auth/register", { title: "Register Page" });
});

authController.post("/register", async (req, res) => {
    //Get input data
    const { email, username, password, rePassword } = req.body;

    try {
        const token = await authService.register(username, email, password, rePassword);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        res.redirect("/");
    } catch (err) {
        //TODO: Display error
        const error = getErrorMessage(err);

        res.render("auth/register", {
            title: "Register Page",
            username,
            email,
            error
        });
    }
});

authController.get("/login", (req, res) => {
    res.render("auth/login", { title: "Login Page" });
});

authController.post("/login", async (req, res) => {
    //Get input data
    const { email, password } = req.body;

    //Use auth service to login
    try {
        const token = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });
        // Rdirect to home on success
        res.redirect("/");
    } catch (err) {
        //TODO: Display error
        const error = getErrorMessage(err);
        
        res.render("auth/login", { title: "Login Page", email, error });
    }
});

authController.get("/logout", (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);

    res.redirect("/");
})

export default authController;
