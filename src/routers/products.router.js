import express from "express";
import Product from "../schemas/product.schema.js";

const router = express.Router();

/* 상품 등록 API */
router.post("/products", async (req, res, next) => {
	try {
		// 상품 정보 파싱하기
		const { name, description, manager, password } = req.body;

		// DB에 저장하기
		const product = new Product({
			name,
			description,
			manager,
			password
		});
		await product.save();

		// 완료 메시지 반환하기
		return res.status(201).json({
			"status": 201,
			"message": "상품 생성에 성공했습니다.",
			"data": product
		});
	} catch (error) {
		next(error);
	}


});

/* 상품 목록 조회 API */
router.get("/products", async (req, res, next) => {

	try {
		// DB에서 조회하기(생성일시 기준 내림차순 정렬)
		const products = await Product.find().sort('-createdAt').exec();

		// 완료 메시지 반환하기
		return res.status(201).json({
			"status": 201,
			"message": "상품 목록 조회에 성공했습니다.",
			"data": products
		})
	} catch (error) {
		next(error);
	}

});

/* 상품 상세 조회 API */
router.get("/products/:id", async (req, res) => {
	try {
		// 상품 ID 파싱하기
		const { id } = req.params;

		// DB에서 조회하기
		const products = await Product.findById(id).select('name description manager status createdAt updateAt').exec();

		// 에러처리
		if (!products) {
			return res.status(404).json({
				"stauts": 404,
				message: "상품이 존재하지않습니다."
			});
		}
		// 완료 메시지 반환하기
		return res.status(200).json({
			"status": 200,
			"message": "상품 상세 조회에 성공했습니다.",
			"data": products
		});

	} catch (error) {
		next(error);
	}
})

/* 상품 수정 API */
router.patch('/products/:id', async (req, res) => {
	try {
		// 상품 ID 파싱하기
		const { id } = req.params;

		// 상품 수정 정보 파싱하기
		const { name, description, manager, status, password } = req.body;

		// DB에서 조회하기(패스워드 포함)
		const products = await Product.findById(id).exec();

		if (!products) {
			return res.status(404).json({
				"stauts": 404,
				message: "상품이 존재하지않습니다."
			});
		}

		// 비밀번호 일치 여부 확인
		if (products.password !== password) {
			return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' })
		} else {
			if (name !== null) products.name = name;
			if (description !== null) products.description = description;
			if (manager !== null) products.manager = manager;
			if (status !== null) products.status = status;
		}
		// DB에 갱신하기
		await products.save();

		// 완료 메시지 반환하기
		return res.status(200).json({ products });

	} catch (error) {
		next(error);
	}

})

/* 상품 삭제 API */
router.delete("/products/:id", async (req, res) => {
	try {
		// 상품 ID 반환하기
		const { id, } = req.params;

		// 패스워드 파싱하기
		const { password } = req.body;

		// DB에서 조회하기(패스워드 포함)
		const products = await Product.findById(id).exec();
		const productId = await Product.findById(id).select('id').exec();

		// 에러처리
		if (!products) {
			return res.status(404).json({
				"stauts": 404,
				message: "상품이 존재하지않습니다."
			});
		}

		// 비밀번호 일치 여부 확인
		if (products.password !== password) {
			return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
		}
		// DB에서 삭제하기
		await Product.deleteOne({ _id: id }).exec();

		// 완료 메시지 반환하기
		return res.status(200).json({
			"status": 200,
			"message": "상품 삭제에 성공했습니다.",
			"data": productId,
		})

	} catch (error) {
		next(error);
	}

})

export default router;
