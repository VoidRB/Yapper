import type { Request, Response, NextFunction } from "express"
import { verifyJwt } from "../handlers/sessions.ts";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.get('Authorization')?.split(' ')[1];
	if (!token) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	const payload = await verifyJwt(token);
	req.user = payload;
	next();
}
