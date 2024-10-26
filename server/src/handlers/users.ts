import { UserService } from "../../services/user.ts";
import { SessionService } from "../../services/session.ts";
import * as bcrypt from "bcrypt";
import { create } from "https://deno.land/x/djwt/mod.ts";
import { crypto } from "@std/crypto";

const userService = new UserService();
const sessionService = new SessionService();

const key = await crypto.subtle.generateKey(
	{ name: "HMAC", hash: "SHA-512" },
	true,
	["sign", "verify"],
);

export async function registerUser(req: Request): Promise<Response> {
	const { email, password } = await req.json();
	const passwordHash = await bcrypt.hash(password);

	try {
		const user = await userService.createUser({ email, passwordHash });
		const token = await create({ alg: "HS512", typ: "JWT" }, { userId: user.id }, key);
		const session = await sessionService.createSession({
			ip: req.headers.get("x-forwarded-for") || "unknown",
			userAgent: req.headers.get("user-agent") || "unknown",
			token,
			userId: user.id,
		});

		return new Response(JSON.stringify({ user, token }), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 400,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function loginUser(req: Request): Promise<Response> {
	const { email, password } = await req.json();

	try {
		const user = await userService.getUserByEmail(email);
		const passwordMatch = await bcrypt.compare(password, user.passwordHash);

		if (!passwordMatch) {
			throw new Error("Invalid credentials");
		}

		const token = await create({ alg: "HS512", typ: "JWT" }, { userId: user.id }, key);
		await sessionService.createSession({
			ip: req.headers.get("x-forwarded-for") || "unknown",
			userAgent: req.headers.get("user-agent") || "unknown",
			token,
			userId: user.id,
		});

		return new Response(JSON.stringify({ user, token }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}
}

