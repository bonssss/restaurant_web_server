import Fastify from 'fastify';

import formbody from '@fastify/formbody';
import routes from './routes/index.js';
const fastify = Fastify();
fastify.register(formbody);


const port = 3000;

// fastify.get('/', async (request, reply) => {
//   return { message: 'Welcome to the Library API' };
// });
fastify.get('/', async (_request, reply) => {
    reply.send({ message: 'Welcome to the Library API' });
}); 
fastify.register(routes, { prefix: '/api' });


fastify.setNotFoundHandler(async (request, reply) => {
    const {mesage, statusCode} = request.error || {};
    reply.status(statusCode || 500).send({
      error: mesage || 'Resource not found'});
});
try{
    await fastify.listen({ port });
    console.log(`Server is running at http://localhost:${port}`);

}catch(err){
    console.error('Error starting server:', err);
    process.exit(1);
}
