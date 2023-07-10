const $addButton = document.querySelector('#add');
const $cards = document.querySelector('.div-remove');
const $titleInput = document.querySelector('#title');
const $authorInput = document.querySelector('#author');
let books = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function deleteBook() {
  const $removeButtons = document.querySelectorAll('.remove-button');
  $removeButtons.forEach((removeButton) => {
    removeButton.addEventListener('click', () => {
      const bookTitle = removeButton.parentNode.querySelector('.book-title').textContent;
      books = books.filter((book) => book.title !== bookTitle);
      localStorage.setItem('books', JSON.stringify(books));
      removeButton.parentNode.remove();
    });
  });
}

function addBook() {
  const book = new Book($titleInput.value, $authorInput.value);
  books.push(book);

  const bookHTML = `
    <div class="card-book">
      <h3 class="book-title">${book.title}</h3>
      <h3>${book.author}</h3>
      <button class="remove-button">Remove</button>
      <hr>
    </div>
  `;

  $cards.insertAdjacentHTML('beforeend', bookHTML);
  localStorage.setItem('books', JSON.stringify(books));

  deleteBook();
}

$addButton.addEventListener('click', () => {
  addBook();
  $authorInput.value = '';
  $titleInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  const booksSaved = JSON.parse(localStorage.getItem('books'));
  books.push(booksSaved);

  if (booksSaved) {
    books = booksSaved;
    const booksHTML = books.map((book) => `
      <div class="card-book">
        <h3 class="book-title">${book.title}</h3>
        <h3>${book.author}</h3>
        <button class="remove-button">Remove</button>
        <hr>
      </div>
    `).join('');

    $cards.innerHTML = booksHTML;

    deleteBook();
  }
});
