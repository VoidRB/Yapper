// deno-lint-ignore-file no-explicit-any
import { verify } from "djwt";
import { ENCRYPTION_KEY } from "../../config/ENCRYPTION_KEY.ts";

export async function verifyJwt(token: string): Promise<{ userId: number }> {
  try {
    const payload = await verify(token, ENCRYPTION_KEY);
    return payload as { userId: number };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
