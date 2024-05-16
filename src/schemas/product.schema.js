import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
        required: true,
    },
	password: {
		type: String,
		required: true,
	},
    condition: {
        type: String,
        required: true,
		default: "FOR_SALE",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
	updateAt: {
		type: Date,
		default: Date.now,
	}
});

export default mongoose.model("Product", productSchema);
