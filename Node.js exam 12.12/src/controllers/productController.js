import { Router } from "express";
import productService from "../services/productService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const productController = Router();

productController.get("/catalog", async (req, res) => {
    const products = await productService.getAll().lean();
    res.render("product/catalog", { title: "Products Page", products });
});

productController.get("/create", (req, res) => {
    res.render("product/create", { title: "Create Product Page" });
});

productController.post("/create", async (req, res) => {
    const productData = req.body;

    const ownerId = req.user?._id;

    try {
        if (productData.ingredients) {
            productData.ingredients = productData.ingredients
                .split(",")
                .map((ingredient) => ingredient.trim());
        }

        await productService.create(productData, ownerId);
        res.redirect("/product/catalog");
    } catch (err) {
        const error = getErrorMessage(err);

        if (productData.ingredients) {
            productData.ingredients = productData.ingredients.join(", ");
        }

        res.render("product/create", {
            title: "Create Product Page",
            error,
            product: productData,
        });
    }
});

productController.get("/:productId/details", async (req, res) => {
    const product = await productService.getOne(req.params.productId).lean();

    const isOwner = product.owner.toString() === req.user?._id.toString();
    const isRecommended =
        req.user &&
        Array.isArray(product.recommendList) &&
        product.recommendList
            .map((id) => id.toString())
            .includes(req.user._id.toString());

    const recommendCount = Array.isArray(product.recommendList)
        ? product.recommendList.length
        : 0;

    res.render("product/details", {
        title: "Product Details Page",
        product,
        isOwner,
        isRecommended,
        recommendCount,
    });
});

productController.get("/:productId/delete", async (req, res) => {
    const productId = req.params.productId;

    try {
        await productService.remove(productId);

        res.redirect("/product/catalog");
    } catch (err) {
        const error = getErrorMessage(err);
        res.render("product/details", { title: "Product Details Page", error });
    }
});

productController.get("/:productId/edit", async (req, res) => {
    const productId = req.params.productId;
    const product = await productService.getOne(productId).lean();

    res.render("product/edit", { title: "Edit Product Page", product });
});


productController.post("/:productId/edit", async (req, res) => {
    const productId = req.params.productId;
    const product = req.body;

    try {
        await productService.update(productId, product);

        res.redirect(`/product/${productId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);

        res.render("product/edit", {
            title: "Edit Product Page",
            error,
            product,
        });
    }
});

productController.get("/:productId/recommend", async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user._id;

    try {
        await productService.recommend(productId, userId);
        res.redirect(`/product/${productId}/details`);
    } catch (err) {
        const error = getErrorMessage(err);
        res.render("product/details", { title: "Product Details Page", error });
    }
});

export default productController;
