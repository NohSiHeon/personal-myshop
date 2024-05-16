import express from "express";
import Product from "../schemas/product.schema.js";

const router = express.Router();

/* 상품 등록 API */
router.post("/product", async (req, res) => {
    const { name, description, manager, password } = req.body;
	
	

    const createdProduct = await Product.create({
        name,
        description,
        manager,
		password,

    });

	const product = new Product({ createdProduct });
	product.save();

    return res.status(201).json({ product });
});

/* 상품 목록 조회 API */
router.get("/product", async (req, res) => {
	const products = await Product.find().sort('-createdAt').exec();

    return res.status(200).json({products})
});

/* 상품 상세 조회 API */
/* 상품 수정 API */
/* 상품 삭제 API */

export default router;
