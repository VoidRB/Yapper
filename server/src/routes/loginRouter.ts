import Router, { Request, Response } from "express";
import { getUsers, loginUser } from "../handlers/users.ts";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  await loginUser(req, res);
});

router.post("/all", async (req: Request, res: Response) => {
  await getUsers(req, res);
});

export default router;
