// deno-lint-ignore-file no-explicit-any
import { verify } from "djwt";
import { ENCRYPYTION_KEY } from "../../config/JWTKey.ts";

export async function verifyJwt(token: string): Promise<{ userId: number }> {
  try {
    const payload = await verify(token, ENCRYPYTION_KEY);
    return payload as { userId: number };
  } catch (error: any) {
    throw new Error(error.message);
  }
}
