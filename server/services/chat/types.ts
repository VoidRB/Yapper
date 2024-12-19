export type DisconnectReason =
  | "transport close"
  | "transport error"
  | "ping timeout"
  | "parse error"
  | "protocol error"
  | "server shutting down"
  | "forced close"
  | "client namespace disconnect"
  | "transport unknown"
  | "server namespace disconnect";
