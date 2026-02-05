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
      let { title, author } = request.body || {};
      title = title && title.trim();
      author = author && author.trim();

      if (!title || !author) {
        return reply.status(400).send({ error: 'Title and author are required' });
      }

      try {
        // check for existing book with same title
        const existing = await Book.findOne({ where: { title } });
        if (existing) {
          return reply.status(409).send({ error: 'A book with this title already exists' });
        }

        const newBook = await Book.create({ title, author });
        return reply.status(201).send(newBook);
      } catch (err) {
        console.error(err);
        // fallback: handle unique constraint errors from the DB/ORM
        // if (err && err.name === 'SequelizeUniqueConstraintError') {
        //   return reply.status(409).send({ error: 'A book with this title already exists' });
        // }
        return reply.status(500).send({ error: 'Internal server error' });
      }
    });

    fastify.get('/', async (request, reply) => {
    try{
        const books = await Book.findAll();
        reply.send(books);
    }catch(err){
        console.error(err);
        reply.send(err)
    }
});


// update book

fastify.put('/:id', async (request, reply) => {
  const id = Number(request.params.id);
  const { title, author } = request.body || {};

  if (!title || !author) {
    return reply.status(400).send({ error: 'Title and author are required' });
  }

  try {
    const book = await Book.findByPk(id);

    if (!book) {
      return reply.status(404).send({ error: 'Book not found' });
    }

    book.title = title;
    book.author = author;
    await book.save();

    return reply.send(book);
  } catch (err) {
    console.error(err);
    return reply.status(500).send({ error: err.message });
  }
});

//pathch book
fastify.patch('/:id', async (request, reply) => {
    const id = Number(request.params.id);
    const { title, author } = request.body || {};
    if (!title && !author) {
        return reply.status(400).send({ error: 'At least one of title or author is required' });
    }
    try {
        const book = await Book.findByPk(id);
        if (!book) {
            return reply.status(404).send({ error: 'Book not found' });
        }

        if (title) book.title = title;
        if (author) book.author = author;
        await book.save();
        return reply.send(book);
    } catch (err) {
        console.error(err);
        return reply.status(500).send({ error: err.message });
    }
});


//delegete book

    fastify.delete('/:id', async (request, reply) => {
        const { id } = request.params;
        try{
            const book = await Book.findByPk(id); 
            if(book){
                await book.destroy();
                reply.send({ message: 'Book deleted successfully' });
            }else{
                reply.status(404).send({ error: 'Book not found' });
            }
        }catch(err){
            console.error(err);
            reply.send(err)
        }
    });

    
}



export default booksRouter;