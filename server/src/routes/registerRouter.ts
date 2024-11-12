import Router, { Request, Response } from "express";
import { registerUser } from "../handlers/users.ts";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await registerUser(req, res);
});

export default router;
