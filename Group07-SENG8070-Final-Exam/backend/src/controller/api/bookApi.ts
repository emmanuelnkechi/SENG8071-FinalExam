import { Express, Request, Response } from "express";
import { BookService } from "../../backendServices/BookService";
import { Book } from "../../model/Book";

export default class BookApi {
  private bookService: BookService;
  private express: Express;

  constructor(express: Express) {
    this.express = express;
    this.bookService = new BookService();

    // Get all books
    this.express.get("/api/books", async (req: Request, res: Response) => {
      try {
        const books = await this.bookService.list();
        res.json({
          data: books,
          message: "Books retrieved successfully",
          status: 200,
        });
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error retrieving books",
          status: 500,
        });
      }
    });

    // Get a book by ID
    this.express.get("/api/books/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const book = await this.bookService.read(parseInt(id));
        if (book) {
          res.json({
            data: book,
            message: "Book retrieved successfully",
            status: 200,
          });
        } else {
          res.status(404).json({
            data: {},
            message: "Book not found",
            status: 404,
          });
        }
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error retrieving book",
          status: 500,
        });
      }
    });

    // Create a new book
    this.express.post("/api/books", async (req: Request, res: Response) => {
      try {
        const newBook = await this.bookService.create(req.body as Book);
        res.status(201).json({
          data: newBook,
          message: "Book created successfully",
          status: 201,
        });
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error creating book",
          status: 500,
        });
      }
    });

    // Update a book by ID
    this.express.put("/api/books/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const updatedBook = await this.bookService.update(parseInt(id), req.body as Partial<Book>);
        if (updatedBook) {
          res.json({
            data: updatedBook,
            message: "Book updated successfully",
            status: 200,
          });
        } else {
          res.status(404).json({
            data: {},
            message: "Book not found",
            status: 404,
          });
        }
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error updating book",
          status: 500,
        });
      }
    });

    // Delete a book by ID
    this.express.delete("/api/books/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const deleted = await this.bookService.delete(parseInt(id));
        if (deleted) {
          res.status(200).json({
            data: { id },
            message: "Book deleted successfully",
            status: 200,
          });
        } else {
          res.status(404).json({
            data: {},
            message: "Book not found",
            status: 404,
          });
        }
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error deleting book",
          status: 500,
        });
      }
    });
  }
}
