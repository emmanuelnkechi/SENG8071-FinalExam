# SENG8071 Final Exam

## Online Bookstore Database Executable

## Table of Contents

- [SENG8071 Final Exam](#seng8071-final-exam)
  - [Online Bookstore Database Executable](#online-bookstore-database-executable)
  - [Table of Contents](#table-of-contents)
  - [1. Project Overview](#1-project-overview)
  - [2. Features](#2-features)
  - [3. Installation](#3-installation)
    - [Prerequisites](#prerequisites)
  - [4. Database Setup](#4-database-setup)
  - [5. SQL Queries for Requirements](#5-sql-queries-for-requirements)
    - [Power Writers](#power-writers)
    - [Loyal Customers](#loyal-customers)
    - [Well-Reviewed Books](#well-reviewed-books)
    - [Most Popular Genre by Sales](#most-popular-genre-by-sales)
    - [10 Most Recent Posted Reviews](#10-most-recent-posted-reviews)
  - [6. Books Table DDL \& DML](#6-books-table-ddl--dml)
    - [Data Definition Language (DDL)](#data-definition-language-ddl)
    - [Data Manipulation Language (DML)](#data-manipulation-language-dml)
      - [1. Create](#1-create)
      - [2. Read](#2-read)
      - [3. Update](#3-update)
      - [4. Delete](#4-delete)
  - [7. TypeScript Interface for Books Table](#7-typescript-interface-for-books-table)
    - [Interface](#interface)
    - [Entity](#entity)
    - [CRUD Operations](#crud-operations)
  - [8. Technologies Used](#8-technologies-used)
    - [Authors](#authors)
    - [Acknowledgments](#acknowledgments)

---

## 1. Project Overview

This project involves designing a database system for an online bookstore. The bookstore sells physical books, e-books, and audiobooks. Customers can browse the catalog, make purchases, and leave reviews. Authors and publishers are also part of the system.
It includes SQL scripts for schema creation, CRUD operations, a TypeScript interface for data modification, and an API connection.

---

## 2. Features

- **Power Writers**: Identify authors with more than X books in the same genre published within the last X years.
- **Loyal Customers**: Identify customers who have spent more than X dollars in the last year.
- **Well-Reviewed Books**: Identify books with a better user rating than average.
- **Most Popular Genre**: Determine the most popular genre by sales.
- **Recent Reviews**: Display the 10 most recent reviews posted by customers.

---

## 3. Installation

### Prerequisites

Before starting, ensure you have the following installed:

- [VirtualBox](https://www.virtualbox.org/) with a Fedora VM running.
- [PostgreSQL](https://www.postgresql.org/) - Database management system.

---

## 4. Database Setup

1. **Start PostgreSQL**:

   - Ensure your PostgreSQL server is running on your Fedora VM.

2. **Access PostgreSQL**:

   - Use a PostgreSQL client to access your PostgreSQL server.

3. **Create Database**:

   - Create the `bookstore` database.

4. **Import Database Schema**:

   - Use the provided SQL file to create tables and initial data structure. *DDL*.

     ```sql
     -- Create Authors Table
     CREATE TABLE Authors (
         author_Id SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         about TEXT,
         date_of_birth DATE
     );

     -- Create Publishers Table
     CREATE TABLE Publishers (
         publisherId SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         address VARCHAR(255)
     );

     -- Create Books Table
     CREATE TABLE Books (
         book_Id SERIAL PRIMARY KEY,
         title VARCHAR(255) NOT NULL,
         genre VARCHAR(100),
         publicationDate DATE,
         price DECIMAL(10, 2),
         format VARCHAR(10) CHECK (format IN ('physical', 'ebook', 'audiobook')),
         author_Id INT,
         publisherId INT,
         averageRating DECIMAL(2, 1),
         FOREIGN KEY (author_Id) REFERENCES Authors(author_Id),
         FOREIGN KEY (publisherId) REFERENCES Publishers(publisherId)
     );

     -- Create Customers Table
     CREATE TABLE Customers (
         customerId SERIAL PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE,
         date_of_birth DATE,
         totalSpent DECIMAL(10, 2)
     );

     -- Create Reviews Table
     CREATE TABLE Reviews (
         review_Id SERIAL PRIMARY KEY,
         customerId INT,
         book_Id INT,
         rating INT,
         comment TEXT,
         reviewDate DATE,
         FOREIGN KEY (customerId) REFERENCES Customers(customerId),
         FOREIGN KEY (book_Id) REFERENCES Books(book_Id)
     );
     ```

5. **Inserting Sample Data**:

   - Authors Table:

   ```sql
   INSERT INTO Authors (name, about, date_of_birth)
   VALUES ('E. Edikan Uwem', 'American novelist and short story writer.', '1896-05-30');

   INSERT INTO Authors (name, about, date_of_birth)
   VALUES ('Tony Stark', 'English novelist, essayist, journalist, and critic.', '1803-06-15');
   ```

   - Publishers Table:

   ```sql
   INSERT INTO Publishers (name, address)
   VALUES ('Marvel', '55 Book St, New York, NY');

   INSERT INTO Publishers (name, address)
   VALUES ('Medium Books', '956 Salamada Ave, London, UK');
   ```

   - Books Table:

   ```sql
   -- Assuming author_Id and publisherId correspond to the authors and publishers inserted above.
   INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
   VALUES ('The Great Gatsby', 'Fiction', '2000-04-10', 10.99, 'physical', 1, 1, 4.5);

   INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
   VALUES ('1984', 'Dystopian', '1999-06-08', 15.99, 'ebook', 2, 2, 4.7);
   ```

   - Customers Table:

   ```sql
   INSERT INTO Customers (name, email, date_of_birth, totalSpent)
   VALUES ('Ade Adegbesan', 'ade@gmail.com', '1990-05-15', 1500.00);

   INSERT INTO Customers (name, email, date_of_birth, totalSpent)
   VALUES ('Nkechi Emmanuel', 'chichi@yahoo.com', '1985-08-20', 2000.00);
   ```

   - Reviews Table:

   ```sql
   -- Assuming customerId and book_Id correspond to the customers and books inserted above.
   INSERT INTO Reviews (customerId, book_Id, rating, comment, reviewDate)
   VALUES (1, 1, 5, 'Great book, loved the characters!', '2023-05-01');

   INSERT INTO Reviews (customerId, book_Id, rating, comment, reviewDate)
   VALUES (2, 2, 4, 'Interesting and thought-provoking.', '2023-06-15');
   ```

---

## 5. SQL Queries for Requirements

Before starting, ensure you have successfully inserted all the sample data.

### Power Writers

```sql
-- Assuming author_Id corresponds to the authors inserted above.
-- Insert more books published by these authors in the 'Fiction' genre within the last 5 years.
INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('Tinkerbell', 'Fiction', '2020-01-01', 19.99, 'physical', 1, 1, 4.2);

INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('EndGame', 'Fiction', '2021-05-10', 15.99, 'ebook', 1, 2, 4.5);

INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('X-Men', 'Fiction', '2024-03-15', 12.99, 'audiobook', 1, 1, 4.0);

INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('Demon Slayer', 'Fiction', '2021-07-20', 14.99, 'physical', 1, 2, 4.7);

INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('Solo Leveling', 'Fiction', '2023-11-30', 17.99, 'ebook', 1, 1, 4.3);

INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('50 Shades of Didi', 'Fiction', '2017-12-05', 10.99, 'audiobook', 2, 2, 4.6);

INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('Who Did It', 'Fiction', '2018-09-01', 16.99, 'physical', 2, 1, 4.4);

-- SQL query to identify author(s) who have published more than 5 books in the 'Fiction' genre within the last 5 years.
SELECT author_Id, name
FROM Authors
WHERE author_Id IN (
    SELECT author_Id
    FROM Books
    WHERE genre = 'Fiction'
      AND publicationDate >= CURRENT_DATE - INTERVAL '5 years'
    GROUP BY author_Id
    HAVING COUNT(book_Id) > 5
);
```

### Loyal Customers

```sql
SELECT customerId, name
FROM Customers
WHERE totalSpent > 1500
```

### Well-Reviewed Books

```sql
SELECT book_Id, title
FROM Books
WHERE averageRating > (SELECT AVG(averageRating) FROM Books);
```

### Most Popular Genre by Sales

```sql
SELECT genre
FROM Books
GROUP BY genre
ORDER BY SUM(price) DESC
LIMIT 1;
```

### 10 Most Recent Posted Reviews

```sql
SELECT customerId, book_Id, rating, comment, reviewDate
FROM Reviews
ORDER BY reviewDate DESC
LIMIT 10;
```

---

## 6. CRUD/DML For All Tables

### Books Table

- Create

```sql
-- Insert a new book (This has already been created)
INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('The Great Gatsby', 'Fiction', '2000-04-10', 10.99, 'physical', 1, 1, 4.5);

-- Insert another book (This has already been created)
INSERT INTO Books (title, genre, publicationDate, price, format, author_Id, publisherId, averageRating)
VALUES ('Ade goes to school', 'Dystopian', '2024-06-28', 35.99, 'ebook', 2, 2, 4.7);
```

- Read

```sql
-- Select all books
SELECT * FROM Books;

-- Select a book by ID
SELECT * FROM Books WHERE book_Id = 1;

-- Select books by a specific author
SELECT * FROM Books WHERE author_Id = 1;

-- Select books within a specific price range
SELECT * FROM Books WHERE price BETWEEN 10 AND 20;
```

- Update

```sql
-- Update a book's price and average rating
UPDATE Books
SET price = 12.99, averageRating = 4.6
WHERE book_Id = 1;

-- Update a book's genre and format
UPDATE Books
SET genre = 'Classic', format = 'audiobook'
WHERE book_Id = 2;
```

- Delete

```sql
-- Delete a book
DELETE FROM Books
WHERE book_Id = 1;
```

---

### Authors Table

- Create

   ```sql
   INSERT INTO Authors (name, about, date_of_birth)
   VALUES ('E. Edikan Uwem', 'American novelist and short story writer.', '1896-05-30');

   INSERT INTO Authors (name, about, date_of_birth)
   VALUES ('Tony Stark', 'English novelist, essayist, journalist, and critic.', '1803-06-15');
   ```

- Read

```sql
-- Select all authors
SELECT * FROM Authors;

-- Select an author by ID
SELECT * FROM Authors WHERE author_Id = 1;
```

- Update

```sql
-- Update an author
UPDATE Authors
SET name = 'Didi Hi' 
WHERE author_Id = 1;
```

- Delete

```sql
-- Delete an author
DELETE FROM Authors
WHERE author_Id = 1;
```

---

### Customers Table

- Create

 ```sql
   INSERT INTO Customers (name, email, date_of_birth, totalSpent)
   VALUES ('Ade Adegbesan', 'ade@gmail.com', '1990-05-15', 1500.00);

   INSERT INTO Customers (name, email, date_of_birth, totalSpent)
   VALUES ('Nkechi Emmanuel', 'chichi@yahoo.com', '1985-08-20', 2000.00);
   ```

- Read

```sql
-- Select all customers
SELECT * FROM Customers;
```

- Update

```sql
-- Update a book's price and average rating
UPDATE Customers
SET name = 'Random' 
WHERE customerId = 1;
```

- Delete

```sql
-- Delete a customer
DELETE FROM Customers
WHERE customerId = 1;
```

---

### Publishers Table

- Create

```sql
   INSERT INTO Publishers (name, address)
   VALUES ('Marvel', '55 Book St, New York, NY');

   INSERT INTO Publishers (name, address)
   VALUES ('Medium Books', '956 Salamada Ave, London, UK');
   ```

- Read

```sql
-- Select all publishers
SELECT * FROM Publishers;
```

- Update

```sql
-- Update a publisher
UPDATE Publishers 
SET name = 'Random House' 
WHERE publisherId = 1;
```

- Delete

```sql
-- Delete a publisher
DELETE FROM Publisher
WHERE publisherId = 1;
```

---

### Reviews Table

- Create

   ```sql
   -- Assuming customerId and book_Id correspond to the customers and books inserted above.
   INSERT INTO Reviews (customerId, book_Id, rating, comment, reviewDate)
   VALUES (1, 1, 5, 'Great book, loved the characters!', '2023-05-01');

   INSERT INTO Reviews (customerId, book_Id, rating, comment, reviewDate)
   VALUES (2, 2, 4, 'Interesting and thought-provoking.', '2023-06-15');
   ```

- Read

```sql
-- Select all reviews
SELECT * FROM Reviews;
```

- Update

```sql
UPDATE Reviews
SET rating = 5.0
WHERE review_Id = 1;
```

- Delete

```sql
-- Delete a review
DELETE FROM Reviews
WHERE review_Id = 1;
```

---

## 7. TypeScript Interface for Books Table

### Interface

```typescript
interface Book {
  book_Id: number;
  title: string;
  genre: string;
  publicationDate: Date;
  price: number;
  format: "physical" | "ebook" | "audiobook";
  author_Id: number;
  publisherId: number;
  averageRating: number;
}
```

### Entity

```typescript
@Entity()
export class BookEntity implements Book {
  @PrimaryGeneratedColumn()
  book_Id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column()
  @IsNotEmpty()
  genre: string;

  @Column({ type: "date" })
  @IsNotEmpty()
  @IsDate()
  publicationDate: Date;

  @Column("decimal")
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @Column()
  @IsNotEmpty()
  @IsEnum(["physical", "ebook", "audiobook"])
  format: "physical" | "ebook" | "audiobook";

  @Column()
  @IsNotEmpty()
  author_Id: number;

  @Column()
  @IsNotEmpty()
  publisherId: number;

  @Column("decimal")
  @IsNumber()
  averageRating: number;
}
```

### CRUD Operations

```typescript
// Create a new book
router.post("/", async (req: Request, res: Response) => {
  const bookRepository = getCustomRepository(BookRepository);
  const book = bookRepository.create(req.body as BookEntity);
  await bookRepository.save(book);
  res.status(201).json(book);
});

// Read all books
router.get("/", async (req: Request, res: Response) => {
  const bookRepository = getCustomRepository(BookRepository);
  const books = await bookRepository.find();
  res.status(200).json(books);
});

// Update a book by ID
router.put("/:id", async (req: Request, res: Response) => {
  const bookRepository = getCustomRepository(BookRepository);
  const book_Id = parseInt(req.params.id, 10);
  const book = await bookRepository.findOne({ where: { book_Id } });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  bookRepository.merge(book, req.body);
  await bookRepository.save(book);
  res.status(200).json(book);
});

// Delete a book by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const bookRepository = getCustomRepository(BookRepository);
  const book_Id = parseInt(req.params.id, 10);
  const book = await bookRepository.findOne({ where: { book_Id } });
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  await bookRepository.remove(book);
  res.status(200).json({ message: "Book deleted successfully" });
});
```

---

## 8. Technologies Used

- Database: PostgreSQL
- Tools: pgAdmin, Typescript,  Git (Version Control), GitHub (Code Hosting)

---

### Authors

- [Edikan Ekanem](https://github.com/EdisCode) - (Database Design, Documentation, CRUD Operations, Integration Testing)
- [Adeoluwatomiwa Adegbesan](https://github.com/Adeoluwatomi) - (DDL/DML Scripts, CRUD Operations, Typescript Interface, Unit Testing)
- [Nkechi Emmanuel](https://github.com/emmanuelnkechi) - (Typescript Interface, SQL Queries for Requirements, CRUD Operations)

---

### Acknowledgments

- Special thanks to **Andy Chow** & **Kevin Kang** for guidance and support.
