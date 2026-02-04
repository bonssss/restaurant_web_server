async function booksRouter(fastify, _opts) {
    fastify.get('/:id', async (request, reply) => {
        const { id } = request.params;
        try{
            const book  = {id};
            reply.send(book);
        }catch(err){
            console.error(err);
            reply.send(err)
        }
    });

    fastify.post('/', async (request, reply) => {
        const { title, author } = request.body;
        try{
            const newBook = { id: Date.now(), title, author };
            reply.status(201).send(newBook);
        }catch(err){
            console.error(err);
            reply.send(err)
        }
    });
    
}

export default booksRouter;