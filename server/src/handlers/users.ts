// deno-lint-ignore-file no-explicit-any
import { UserService } from "../../services/user/service.ts";
import { SessionService } from "../../services/session/service.ts";
import * as bcrypt from "bcrypt";
import { create, getNumericDate } from "djwt";
import { Request, Response } from "express";
import { ENCRYPYTION_KEY } from "../../config/JWTKey.ts";

const userService = new UserService();
const sessionService = new SessionService();

export async function registerUser(
  req: Request,
  res: Response,
): Promise<Response> {
  try {
    const { email, password } = await req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userExists = userService.getUserByEmail({ email: email });

    if (userExists) {
      return res.status(400).json({ error: "A user with this email exists" });
    }

    const user = userService.createUser({
      email,
      hashedPassword,
    });
    const token = await create(
      { alg: "HS512", typ: "JWT" },
      { userId: user.id, exp: getNumericDate(60 * 30) },
      ENCRYPYTION_KEY,
    );
    // TODO: session must be securely stored (client) and properly expired
    sessionService.createUserSession({
      ip: req.header("x-forwarded-for") || "unknown",
      userAgent: req.header("user-agent") || "unknown",
      token,
      userId: user.id,
    });

    return res.status(201).json({ success: true, message: "User created" });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
}

export async function loginUser(
  req: Request,
  res: Response,
): Promise<Response> {
  const { email, password } = await req.body;

  try {
    const user = userService.getUserByEmail({ email: email });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!passwordMatch) {
      throw new Error("Invalid credentials");
    }
    const token = await create(
      { alg: "HS512", typ: "JWT" },
      { userId: user.id },
      ENCRYPYTION_KEY,
    );

    sessionService.createUserSession({
      ip: req.header("x-forwarded-for") || "unknown",
      userAgent: req.header("user-agent") || "unknown",
      token,
      userId: user.id,
    });

    return res.status(200).json({ success: true, message: "User logged in", token });
  } catch (error: any) {
    return res.status(401).json({ error: error.message });
  }
}

export function getUsers(_req: Request, res: Response): Promise<Response> {
  const users = userService.getAllUsers();
  return res.status(200).json({ users });
}
