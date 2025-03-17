import Product from "../models/Product.js";

const productService = {
    getAll() {
        return Product.find();
    },
    getOne(productId) {
        return Product.findById(productId);
    },
    create(productData, ownerId) {
        return Product.create({ ...productData, owner: ownerId });
    },
    async recommend(productId, userId) {
        return Product.updateOne(
            { _id: productId },
            { $push: { recommendList: userId } },
            (err) => {
                if (err) {
                    throw new Error(err);
                }
                return Product.findById(productId)
                    .populate("recommendList")
                    .exec((err, product) => {
                        if (err) {
                            throw new Error(err);
                        }
                        return product;
                    });
            }
        );
    },
    remove(productId) {
        return Product.findByIdAndDelete(productId);
    },
    update(productId, productData) {
        return Product.findByIdAndUpdate(productId, productData, { runValidators: true });
    }
};

export default productService;
