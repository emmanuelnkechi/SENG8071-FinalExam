import { Express, Request, Response } from "express";
import { AuthorService } from "../../backendServices/AuthorService";
import { Author } from "../../model/Author";

export default class AuthorApi {
  private authorService: AuthorService;
  private express: Express;

  constructor(express: Express) {
    this.express = express;
    this.authorService = new AuthorService();

    // Get all authors
    this.express.get("/api/authors", async (req: Request, res: Response) => {
      try {
        const authors = await this.authorService.list();
        res.json({
          data: authors,
          message: "Authors retrieved successfully",
          status: 200,
        });
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error retrieving authors",
          status: 500,
        });
      }
    });

    // Get an author by ID
    this.express.get("/api/authors/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const author = await this.authorService.read(parseInt(id));
        if (author) {
          res.json({
            data: author,
            message: "Author retrieved successfully",
            status: 200,
          });
        } else {
          res.status(404).json({
            data: {},
            message: "Author not found",
            status: 404,
          });
        }
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error retrieving author",
          status: 500,
        });
      }
    });

    // Create a new author
    this.express.post("/api/authors", async (req: Request, res: Response) => {
      try {
        const newAuthor = await this.authorService.create(req.body as Author);
        res.status(201).json({
          data: newAuthor,
          message: "Author created successfully",
          status: 201,
        });
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error creating author",
          status: 500,
        });
      }
    });

    // Update an author by ID
    this.express.put("/api/authors/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const updatedAuthor = await this.authorService.update(parseInt(id), req.body as Partial<Author>);
        if (updatedAuthor) {
          res.json({
            data: updatedAuthor,
            message: "Author updated successfully",
            status: 200,
          });
        } else {
          res.status(404).json({
            data: {},
            message: "Author not found",
            status: 404,
          });
        }
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error updating author",
          status: 500,
        });
      }
    });

    // Delete an author by ID
    this.express.delete("/api/authors/:id", async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const deleted = await this.authorService.delete(parseInt(id));
        if (deleted) {
          res.status(200).json({
            data: { id },
            message: "Author deleted successfully",
            status: 200,
          });
        } else {
          res.status(404).json({
            data: {},
            message: "Author not found",
            status: 404,
          });
        }
      } catch (error) {
        res.status(500).json({
          data: {},
          message: "Error deleting author",
          status: 500,
        });
      }
    });
  }
}
