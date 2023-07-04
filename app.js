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
    this.$removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener('click', () => {
        this.deleteBook(index);
        removeButton.parentNode.remove();
      });
    });
  }

  deleteBook(index) {
    this.books.splice(index, 1);
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  addBook() {
    const book = {
      title: $titleInput.value,
      author: $authorInput.value,
    };
    this.books.push(book);

    const bookHTML = `
      <div class="card-book">
        <h3>${book.title}</h3>
        <h3>${book.author}</h3>
        <button class="remove-button">Remove</button>
        <hr>
      </div>
    `;

    $cards.insertAdjacentHTML('beforeend', bookHTML);
    localStorage.setItem('books', JSON.stringify(this.books));

    const lastIndex = this.books.length - 1;
    const removeButton = $cards.querySelector('.remove-button:last-child');
    removeButton.addEventListener('click', () => {
      this.deleteBook(lastIndex);
      removeButton.parentNode.remove();
    });
  }
}

const myBooks = new Books();

$addButton.addEventListener('click', () => {
  myBooks.addBook();
  $authorInput.value = '';
  $titleInput.value = '';
});

document.addEventListener('DOMContentLoaded', () => {
  const booksSaved = JSON.parse(localStorage.getItem('books'));

  if (booksSaved) {
    myBooks.books = booksSaved;
    const booksHTML = myBooks.books.map((book) => `
      <div class="card-book">
        <h3>${book.title}</h3>
        <h3>${book.author}</h3>
        <button class="remove-button">Remove</button>
        <hr>
      </div>
    `).join('');

    $cards.innerHTML = booksHTML;
    myBooks.initializeRemoveButtons();
  }
});
