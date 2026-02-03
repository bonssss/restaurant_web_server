import Fastify from 'fastify';

const fastify = Fastify();

const port = 3000;

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to the Library API' };
});

try{
    await fastify.listen({ port });
    console.log(`Server is running at http://localhost:${port}`);

}catch(err){
    console.error('Error starting server:', err);
    process.exit(1);
}
    