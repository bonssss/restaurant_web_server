import Book from "../models/books.js";

async function booksRouter(fastify, _opts) {

  // ✅ GET all books
  fastify.get('/', async (request, reply) => {
    try {
      const books = await Book.findAll();
      return reply.send(books);
    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: err.message });
    }
  });

  // ✅ GET book by ID
  fastify.get('/:id', async (request, reply) => {
    const id = Number(request.params.id);

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
      return reply.status(500).send({ error: err.message });
    }
  });

  // ✅ CREATE book (with count logic)
  fastify.post('/', async (request, reply) => {
    let { title, author } = request.body || {};
    title = title && title.trim();
    author = author && author.trim();

    if (!title || !author) {
      return reply.status(400).send({ error: 'Title and author are required' });
    }

    try {
      const existing = await Book.findOne({ where: { title } });

      // ✅ If book exists → increment count
      if (existing) {
        existing.count += 1;
        await existing.save();
        return reply.send(existing);
      }

      // ✅ If not exists → create new book
      const newBook = await Book.create({
        title,
        author,
        count: 1
      });

      return reply.status(201).send(newBook);

    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: err.message });
    }
  });

  // ✅ UPDATE book (PUT)
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

  // ✅ PATCH book (partial update)
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

  // ✅ DELETE book
  fastify.delete('/:id', async (request, reply) => {
    const id = Number(request.params.id);

    try {
      const book = await Book.findByPk(id);

      if (!book) {
        return reply.status(404).send({ error: 'Book not found' });
      }

      await book.destroy();
      return reply.send({ message: 'Book deleted successfully' });

    } catch (err) {
      console.error(err);
      return reply.status(500).send({ error: err.message });
    }
  });
}

export default booksRouter;
