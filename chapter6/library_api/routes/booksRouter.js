import Book from "../models/books.js";

async function booksRouter(fastify, _opts) {
//     fastify.get('/', async (request, reply) => {
//         try{
//             const books = await Book.findAll();
//             reply.send(books);
//         }catch(err){
//             console.error(err);
//             reply.send(err)
//         }
//     }); 


// fastify.get('/:id', async (request, reply) => {
//     const { id } = request.params;
//     try{
//         const book  =  await Book.findByPk(id);
//         if(book){
//             reply.send(book);
//         }else{
//             reply.status(404).send({ error: 'Book not found' });
//         }
//     }catch(err){
//         console.error(err);
//         reply.send(err)
//     }
// });


     fastify.get('/:id', async (request, reply) => {
    const { id } = request.params;

    // Validate ID
    if (isNaN(id)) {
      return reply.status(400).send({ error: 'Invalid ID' });
    }

    try {
      const book = await Book.findByPk(id);

      if (!book) {
        return reply.status(404).send({ error: 'Book not found' });
      }

      return reply.send(book);

    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: 'Internal server error' });
    }
  });

    fastify.post('/', async (request, reply) => {
        const { title, author } = request.body;
        try{
            const newBook =  await Book.create({ title, author });
            reply.status(201).send(newBook);
        }catch(err){
            console.error(err);
            reply.send(err)
        }
    });
    
}

export default booksRouter;