import express from "express";
import { AppDataSource } from "./model/configuration"; // Ensure this points to your TypeORM configuration
import AuthorApi from "./controller/api/authorApi";
import BookApi from "./controller/api/bookApi"; // Assuming this was created earlier



const app = express();
const PORT = 8000;

app.use(express.json()); 

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    new AuthorApi(app); // Initialize the Author API
    new BookApi(app); // Initialize the Book API

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });