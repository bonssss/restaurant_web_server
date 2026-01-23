import Fastify from 'fastify';
import hoursdata from './data/hoursdata.js';
import menudata from './data/menudata.js';

const app = Fastify();

const port = 4000;

app.get('/', async (request, reply) => {
  return ("Hello, Fastify!");
});

app.get("/menu", async (request, reply) => { 1
  reply.send(menudata);
});

app.get("/hours", async (request, reply) => { 2
    reply.send(hoursdata);
});

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  } 
    console.log(`Server is running at ${address}`);
});