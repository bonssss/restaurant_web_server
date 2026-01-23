import Fastify from 'fastify';

const app = Fastify();

const port = 3000;

app.get('/', async (request, reply) => {
  return ("Hello, Fastify!");
});

app.get("/menu", async (request, reply) => { 1
  return "TODO: Menu Page";
});

app.get("/hours", async (request, reply) => { 2
  return "TODO: Hours Page";
});

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } 
    console.log(`Server is running at ${address}`);
});