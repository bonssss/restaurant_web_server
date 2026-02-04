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
    
}

export default booksRouter;