import Router, { Request, Response } from "express";

const router = Router();

router.get("/open", (_req: Request, _res: Response) => {
  //upgrade the request and pass the session and open websocket
  WebSocket.OPEN;
});

router.get("/close", (_req: Request, _res: Response) => {
  //close the WS Connection and clear the session
});

export default router;
