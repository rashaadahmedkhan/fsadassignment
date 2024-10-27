// src/components/BookList.js
import React, { useState } from 'react';

const Books = () => {
  const books = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction' },
    { title: '1984', author: 'George Orwell', genre: 'Fiction' },
    { title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Fiction'},
    { title: 'Moby-Dick', author: 'Herman Melville', genre: 'Fiction'},
    { title: 'War and Peace', author: 'Leo Tolstoy', genre: 'Fiction'},
    { title: 'Ulysses', author: 'James Joyce', genre: 'Fiction'},
    { title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Fiction'},
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fiction'},
    { title: 'Fahrenheit 451', author: 'Ray Bradbury', genre: 'Fiction'},
    // Add more books as needed
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 3; // Change this value for more/less books per page

  // Calculate the index of the first and last book for the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Calculate total pages
  const totalPages = Math.ceil(books.length / booksPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h2>Book List</h2>
      <ul>
        {currentBooks.map((book, index) => (
          <li key={index}>
            {book.title} by {book.author} category {book.genre}
          </li>
        ))}
      </ul>

      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index + 1}>
              <button onClick={() => paginate(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Books;
