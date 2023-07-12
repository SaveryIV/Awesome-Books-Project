const $addButton = document.querySelector('#add');
const $cards = document.querySelector('.div-remove');
const $titleInput = document.querySelector('#title');
const $authorInput = document.querySelector('#author');

class Books {
  constructor() {
    this.books = [];
    this.$removeButtons = null;
    this.initializeRemoveButtons();
  }

  initializeRemoveButtons() {
    this.$removeButtons = document.querySelectorAll('.remove-button');
    this.$removeButtons.forEach((removeButton) => {
      removeButton.addEventListener('click', () => {
        const bookTitle = removeButton.previousElementSibling.querySelector('.book-title').textContent;
        this.books = this.books.filter((book) => book.title !== bookTitle);
        localStorage.setItem('books', JSON.stringify(this.books));
        removeButton.parentNode.remove();
      });
    });
  }

  addBook() {
    if ($titleInput.value === '' || $authorInput.value === '') {
      $authorInput.value = 'Unknown';
      $titleInput.value = 'Unknown';
    }
    const book = {
      title: $titleInput.value,
      author: $authorInput.value,
    };
    this.books.push(book);

    const bookHTML = `
      <div class="card-book">
        <div class="text-container">
          <h3 class="book-title">${book.title}</h3> <span>by</span>
          <h3>${book.author}</h3>
        </div>
        <button class="remove-button">Remove</button>
        <hr>
      </div>
    `;

    $cards.insertAdjacentHTML('beforeend', bookHTML);
    localStorage.setItem('books', JSON.stringify(this.books));
    const element = document.querySelectorAll('.card-book');
    element.forEach((element, index) => {
      if (index % 2 === 1) {
        element.classList.add('alt');
      }
    });
    const removeButton = $cards.querySelector('.remove-button:last-child');
    removeButton.addEventListener('click', () => {
      removeButton.parentNode.remove();
    });
  }
}

const myBooks = new Books();

$addButton.addEventListener('click', () => {
  if ($authorInput !== '' && $titleInput !== '') {
    myBooks.addBook();
    $authorInput.value = '';
    $titleInput.value = '';
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const booksSaved = JSON.parse(localStorage.getItem('books'));
  myBooks.books.push(booksSaved);

  if (booksSaved) {
    myBooks.books = booksSaved;
    const booksHTML = myBooks.books.map((book) => `
      <div class="card-book">
        <div class="text-container">
          <h3 class="book-title">${book.title}</h3> <span> by </span>
          <h3>${book.author}</h3>
        </div>
        <button class="remove-button">Remove</button>
        <hr>
      </div>
    `).join('');
    $cards.innerHTML = booksHTML;
    const element = document.querySelectorAll('.card-book');
    element.forEach((element, index) => {
      if (index % 2 === 1) {
        element.classList.add('alt');
      }
    });
    myBooks.initializeRemoveButtons();
  }
});
