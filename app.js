const $addButton = document.querySelector('#add');
const $remove = document.querySelector('.div-remove');
const $titleInput = document.querySelector('#title');
const $authorInput = document.querySelector('#author');
let books = [];

function Book(title, author) {
  this.title = title;
  this.author = author;
}

function addBook() {
  const book = new Book($titleInput.value, $authorInput.value);
  books.push(book);

  const bookHTML = `
    <div class="card-book">
      <h3>${book.title}</h3>
      <h3>${book.author}</h3>
      <button class="remove-button">Remove</button>
      <hr>
    </div>
  `;

  $remove.insertAdjacentHTML('beforeend', bookHTML);
  localStorage.setItem('books', JSON.stringify(books));

  const $removeButtons = document.querySelectorAll('.remove-button');
  $removeButtons.forEach((removeButton, index) => {
    removeButton.addEventListener('click', () => {
      books.splice(index, 1);
      localStorage.setItem('books', JSON.stringify(books));
      removeButton.parentNode.remove();
    });
  });
}

$addButton.addEventListener('click', () => {
  addBook();
  $authorInput.value = '';
  $titleInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  const booksSaved = JSON.parse(localStorage.getItem('books'));

  if (booksSaved) {
    books = booksSaved;
    const booksHTML = books.map((book) => `
      <div class="card-book">
        <h3>${book.title}</h3>
        <h3>${book.author}</h3>
        <button class="remove-button">Remove</button>
        <hr>
      </div>
    `).join('');

    $remove.innerHTML = booksHTML;

    const $removeButtons = document.querySelectorAll('.remove-button');
    $removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener('click', () => {
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        removeButton.parentNode.remove();
      });
    });
  }
});
