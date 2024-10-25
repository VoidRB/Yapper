// deno-lint-ignore-file no-explicit-any
import { Application, Context, Router } from '@oak/oak';
import ChatServer from './ChatServer.ts';

const app = new Application();
const port: any = Deno.env.get('PORT');
const router = new Router();
const server = new ChatServer();

router.get('/start_web_socket', (ctx: Context) => server.handleConnection(ctx));
router.get('/', (ctx: Context) => {
  ctx.response.body = { test: 'test' };
});

app.use(router.routes(), router.allowedMethods());
app.use(async (context) => {
  await context.send({ root: Deno.cwd(), index: 'Public/Index.html' });
});

console.log(`Server running on ${port}`);
await app.listen({ port });
