import { model, Schema } from "mongoose";
import bcrypt from "bcrypt"

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"],
    },
    email: {
        type: String,
        required: [true, "Email is required!"],
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
    },
});

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, SALT_WORK_FACTOR);

    this.password = hash;
});

const User = model("User", userSchema);

export default User