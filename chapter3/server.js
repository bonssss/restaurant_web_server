// import Fastify from 'fastify';
// import hoursdata from './data/hoursdata.js';
// import menudata from './data/menudata.js';
// import ejs from 'ejs';
// import fastifyView from '@fastify/view';
// const app = Fastify();

// const port = 4000;

// app.register(fastifyView, {
//     engine: {
//         ejs: ejs,
//     },
// });

// app.get('/', async (request, reply) => {
// reply.view("views/index.ejs", { name: "What's Fare is Fair" });});

// app.get("/menu", async (request, reply) => { 1
// reply.view("views/menu.ejs", { menudata });});

// app.get('/hours', (req, reply) => { 5
//   const days = [
//     "monday",
//     "tuesday",
//     "wednesday",
//     "thursday",
//     "friday",
//     "saturday",
//     "sunday",
//   ];
//   reply.view("views/hours.ejs", { hoursdata, days });
// });

// app.listen({ port }, (err, address) => {
//   if (err) {
//     console.error(err);
//     process.exit(1);
//   } 
//     console.log(`Server is running at ${address}`);
// });



import Fastify from 'fastify';
import ejs from 'ejs';
import fastifyView from '@fastify/view';
import path from 'path';
import  fastifyStatic from '@fastify/static';

import hoursdata from './data/hoursdata.js';
import menudata from './data/menudata.js';

const app = Fastify();
const port = 4000;

const publicPath = path.join(process.cwd(), 'public');
app.register(fastifyStatic, {
  root: publicPath,
  prefix: '/public/', // optional: default '/'
});

app.register(fastifyView, {
  engine: { ejs },
  root: path.join(process.cwd(), 'views'),
});

app.get('/', async (request, reply) => {
  return reply.view('index.ejs', {
    name: "What's Fare is Fair",
  });
});

app.get('/menu', async (request, reply) => {
  return reply.view('menu.ejs', {
    menudata,
  });
});

app.get('/hours', async (req, reply) => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  return reply.view('hours.ejs', { hoursdata, days });
});

app.listen({ port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server is running at ${address}`);
});
