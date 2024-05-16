import express from "express";
import Product from "../schemas/product.schema.js";

const router = express.Router();

/* 상품 등록 API */
router.post("/products", async (req, res) => {
	const { name, description, manager, password } = req.body;

	const product = new Product({
		name,
		description,
		manager,
		password
	});
	await product.save();


	return res.status(201).json({
		"status": 201,
		"message": "상품 생성에 성공했습니다.",
		"data": product
	});
});

/* 상품 목록 조회 API */
router.get("/products", async (req, res) => {
	const products = await Product.find().sort('-createdAt').exec();

	return res.status(201).json({
		"status": 201,
		"message": "상품 생성에 성공했습니다.",
		"data": products
	})
});

/* 상품 상세 조회 API */
router.get("/products/:id", async (req, res) => {
	const { id } = req.params;
	const products = await Product.findById(id).select('name description manager status createdAt updateAt').exec();

	return res.status(200).json({
		"status": 200,
		"message": "상품 상세 조회에 성공했습니다.",
		"data": products
	})
})
/* 상품 수정 API */

/* 상품 삭제 API */
router.delete("/products/:id", async (req, res) => {
	const { id } = req.params;
	const products = await Product.deleteOne({ _id: id }).exec();


	return res.status(200).json({
		"status": 200,
		"message": "상품 삭제에 성공했습니다.",
		"data": products
	})
})

export default router;
