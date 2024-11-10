import Router, { Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
	res.send({ Message: "Welcome Home" });
});

export default router;
