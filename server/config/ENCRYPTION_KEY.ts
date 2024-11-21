import { crypto } from "@std/crypto";

export const ENCRYPTION_KEY = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["verify", "sign"],
);
