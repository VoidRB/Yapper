// deno-lint-ignore-file no-explicit-any
import { UserService } from "../../services/user/service.ts";
import { SessionService } from "../../services/session/service.ts";
import * as bcrypt from "bcrypt";
import { create, getNumericDate } from "djwt";
import { ENCRYPTION_KEY } from "../../config/ENCRYPTION_KEY.ts";
import { Context, Response } from "@oak/oak";

const userService = new UserService();
const sessionService = new SessionService();

export async function registerUser(ctx: Context): Promise<Response> {
  try {
    const { username, password } = await ctx.request.body.json();
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const userExists = userService.getUserByUsername({ username: username });
    if (!userExists) {
      const user = userService.createUser({
        username,
        hashedPassword,
      });

      const payload = { userId: user.id, username: user.username };
      const token = await create(
        { alg: "HS512", typ: "JWT" },
        { payload, exp: getNumericDate(60 * 30) },
        ENCRYPTION_KEY,
      );
      // TODO: session must be securely stored (client) and properly expired
      sessionService.createUserSession({
        ip: ctx.request.headers.get("x-forwarded-for") || "unknown",
        userAgent: ctx.request.headers.get("user-agent") || "unknown",
        token,
        userId: user.id,
      });
      ctx.response.body = {
        success: true,
        message: "User created",
        token,
      };

      ctx.response.status = 201;
      return ctx.response;
    }

    ctx.response.status = 400;
    ctx.response.body = { error: "A user with this username exists" };
    return ctx.response;
  } catch (error: any) {
    ctx.response.body = { error: error.message };
    ctx.response.status = 400;
    return ctx.response;
  }
}

export async function loginUser(ctx: Context): Promise<Response> {
  const { username, password } = await ctx.request.body.json();
  try {
    const user = userService.getUserByUsername({ username: username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.hashedPassword);
      if (!passwordMatch) {
        throw new Error("Invalid credentials");
      }
      const payload = { userId: user.id, username: user.username };
      const token = await create(
        { alg: "HS512", typ: "JWT" },
        { payload, exp: getNumericDate(60 * 30) },
        ENCRYPTION_KEY,
      );

      sessionService.removeSession({ userId: user.id });

      sessionService.createUserSession({
        ip: ctx.request.headers.get("x-forwarded-for") || "unknown",
        userAgent: ctx.request.headers.get("user-agent") || "unknown",
        token,
        userId: user.id,
      });

      ctx.response.status = 200;
      ctx.response.body = {
        success: true,
        message: "User logged in",
        token,
      };
      return ctx.response;
    }

    ctx.response.status = 400;
    ctx.response.body = { success: false, message: "User doesn't exist" };
    return ctx.response;
  } catch (error: any) {
    ctx.response.status = 401;
    ctx.response.body = { error: error.message };
    return ctx.response;
  }
}

export function getUsers(ctx: Context): Response {
  const users = userService.getAllUsers();
  ctx.response.status = 200;
  ctx.response.body = { users };
  return ctx.response;
}

export async function logoutUser(ctx: Context) {
  const { userId } = await ctx.request.body.json();
  try {
    const user = userService.getUserById({ id: userId });
    const sessionExists = sessionService.getSingleSession({
      userId: user.id,
    });
    if (sessionExists) {
      sessionService.removeSession({ userId: user.id });

      ctx.response.status = 200;
      ctx.response.body = { success: true, message: "Session Terminated" };
      return ctx.response;
    }
    ctx.response.status = 400;
    ctx.response.body = {
      success: false,
      message: "Session Couldn't be Terminated",
    };
    return ctx.response;
  } catch (error: any) {
    ctx.response.status = 401;
    ctx.response.body = { error: error.message };
    return ctx.response;
  }
}
