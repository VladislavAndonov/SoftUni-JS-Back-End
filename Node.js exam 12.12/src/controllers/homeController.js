import { Router } from "express";
import productService from "../services/productService.js";

const homeController = Router();

homeController.get("/", async (req, res) => {
    const products = await productService.getAll().lean();

    res.render("home", { title: "Home Page", products });
});

// homeController.get('/authorized', (req, res) => {
//     res.send(req.user);
// })

export default homeController;
