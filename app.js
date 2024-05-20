import express from "express";
import connect from "./src/schemas/index.js";
import ProductRouter from "./src/routers/products.router.js";
import { errorHandler } from "./src/middlwares/error-handler.middlware.js";

const app = express();
const PORT = 3000;

// index.js
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();

app.get("/", (req, res) => {
	return res.json({ mssage: 'Hello World!!' });
});


app.use('/', [router, ProductRouter]);

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
	console.log(PORT, "포트로 서버가 열렸어요!");
});
