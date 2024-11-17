// deno-lint-ignore-file no-explicit-any
import { verify } from "djwt";
import { crypto } from "@std/crypto";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function verifyJwt(token: string): Promise<{ userId: number }> {
  try {
    const payload = await verify(token, key);
    return payload as { userId: number };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
