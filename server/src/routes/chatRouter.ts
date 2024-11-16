import Router, { Request, Response } from "express";
import { getAllMessages } from "../handlers/messages.ts";

const router = Router();

router.get("/open", (_req: Request, _res: Response) => {
  //upgrade the request and pass the session and open websocket
});

router.get("/close", (_req: Request, _res: Response) => {
  //close the WS Connection and clear the session
});

router.get("/messages/all", async (req: Request, res: Response) => {
  await getAllMessages(req, res);
});

export default router;
