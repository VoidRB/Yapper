// deno-lint-ignore-file no-explicit-any
import { WebSocketServer } from 'ws';

const port = Deno.env.get('PORT');

const server = new WebSocketServer({ port: port });

server.on('open', (server: any) => {
  console.log(`Running on ${port}`);
  server.on('message', (data: any) => {
    server.send(data);
  });
});

server.on('connection', (server: any) => {
  console.log(`User Connected to the server`);
});

server.on('close', () => {
  console.log(`Closed Server`);
});
