import Router, { Request, Response } from "express";
import { getAllMessages } from "../handlers/messages.ts";

const router = Router();

router.get("/open", (_req: Request, _res: Response) => {});

router.post("/close", (_req: Request, _res: Response) => {});

router.get("/messages/all", async (req: Request, res: Response) => {
  await getAllMessages(req, res);
});

export default router;
