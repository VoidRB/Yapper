// deno-lint-ignore-file no-explicit-any
import { WebSocketServer } from 'ws';

const port = Deno.env.get('PORT');

const server = new WebSocketServer({ port: port });

const texts: Array<string> = [];

server.on('connection', (server: any) => {
  console.log(`Running on ${port}`);
  server.on('message', (data: any) => {
    console.log(`Received : ${data}`);
    texts.push(data);
    server.send(data.toString());
  });
});

server.on('close', () => {
  console.log(`Closed Server`);
});
