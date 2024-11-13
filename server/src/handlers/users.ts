// deno-lint-ignore-file no-explicit-any
import { UserService } from "../../services/user/service.ts";
import { SessionService } from "../../services/session/service.ts";
import * as bcrypt from "bcrypt";
import { create, getNumericDate } from "djwt";
import { crypto } from "@std/crypto";
import { Request, Response } from "express";

const userService = new UserService();
const sessionService = new SessionService();

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function registerUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { email, password } = await req.query;
  const saltRounds = 10;
  const hashed_password = await bcrypt.hash(password, saltRounds);

  try {
    const user = await userService.createUser({
      email,
      hashed_password,
    });
    if (!user) throw new Error("User not found");
    const token = await create(
      { alg: "HS512", typ: "JWT" },
      { userId: user[0].id, exp: getNumericDate(60 * 30) },
      key,
    );
    // TODO: session must be securely stored (client) and properly expired
    await sessionService.createUserSession({
      ip: req.header("x-forwarded-for") || "unknown",
      userAgent: req.header("user-agent") || "unknown",
      token,
      userId: user[0].id,
    });

    return res
      .status(201)
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ user, token }));
  } catch (error: any) {
    return res
      .status(400)
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ error: error.message }));
  }
}

export async function loginUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { email, password } = await req.query;

  try {
    const user = await userService.getUserByEmail({ email: email });
    const passwordMatch = await bcrypt.compare(
      password,
      user[0].hashed_password,
    );
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = await create(
      { alg: "HS512", typ: "JWT" },
      { userId: user[0].id },
      key,
    );

    await sessionService.createUserSession({
      ip: req.header("x-forwarded-for") || "unknown",
      userAgent: req.header("user-agent") || "unknown",
      token,
      userId: user[0].id,
    });

    return res
      .status(200)
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ user, token }));
  } catch (error: any) {
    return res
      .status(401)
      .set("Content-Type", "application/json")
      .send(JSON.stringify({ error: error.message }));
  }
}

export async function getUsers(
  _req: Request,
  res: Response,
): Promise<Response> {
  const users = await userService.getAllUsers();
  return res
    .status(200)
    .set("Content-Type", "application/json")
    .send(JSON.stringify({ users }));
}
