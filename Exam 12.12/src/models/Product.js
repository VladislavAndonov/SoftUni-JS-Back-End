import { Schema, model } from "mongoose";


const productSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    skin: {
        type: String,
        required: [true, "Skin is required!"],
    },
    description: {
        type: String,
        required: [true, "Description is required!"],
    },
    ingredients: {
        type: String,
        required: [true, "Ingredients are required!"],
    },

    ingredients: {
        type: Array,
        required: [true, "Ingredients are required!"],
        validate: {
            validator: function (value) {
                return Array.isArray(value) && value.length > 0;
            },
            message: "Ingredients must be entered in the format: {ingredient 1}, { ingredient 2}, {ingredient 3}"
        },
    },
    benefits: {
        type: String,
        required: [true, "Benefits are required!"],
    },
    price: {
        type: Number,
        required: [true, "Price is required!"],
    },
    image: {
        type: String,
        required: [true, "Image URL is required!"],
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    recommendList: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
});

const Product = model("Product", productSchema);

export default Product