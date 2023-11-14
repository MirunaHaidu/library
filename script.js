const myLibrary = [];


function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

Book.prototype.info = function () {
    let message = `${this.title} by ${this.author}, ${this.pages} pages, `;
    return this.isRead ? (message += 'read') : (message += 'not read yet');
};

function addBookToLibrary(book) {
    if (!isInLibrary(book)) {
        myLibrary.push(book);
    }

}

const getBookFromLibrary = (title) => myLibrary.find((book) => book.title === title);


function isInLibrary(book) {
    for (let i = 0; i < myLibrary.length; i++) {
        if (book.title === myLibrary[i].title &&
            book.author === myLibrary[i].author &&
            book.pages === myLibrary[i].pages &&
            book.isRead === myLibrary[i].isRead) {
            return true;
        }
    }
    return false;
}


// ---------------- UI  -------------------------
const addButton = document.getElementById('addBookBtn');
const booksGrid = document.getElementById('booksGrid');
const addBookModal = document.getElementById('addBookModal');
const errorMsg = document.getElementById('errorMsg');
const overlay = document.getElementById('overlay');
const addBookForm = document.getElementById('addBookForm');


const openAddBookModal = () => {
    addBookForm.reset();
    addBookModal.classList.add('active');
    overlay.classList.add('active');

}

const closeAddBookModal = () => {
    addBookModal.classList.remove('active')
    overlay.classList.remove('active')
    errorMsg.classList.remove('active')
    errorMsg.textContent = ''
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeAddBookModal()
}

const resetBookGrid = () => {
    booksGrid.innerHTML = '';
}

const updateBooksGrid = () => {
    resetBookGrid();
    for (let book of myLibrary) {
        createBookCard(book);
    }
}

const createBookCard = (book) => {
    const bookCard = document.createElement('div');
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pages = document.createElement('p');
    const buttonGroup = document.createElement('div');
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button');

    bookCard.classList.add('book-card');
    buttonGroup.classList.add('button-group');
    readBtn.classList.add('btn');
    removeBtn.classList.add('btn')
    readBtn.onclick = (e) => toggleRead(e);
    removeBtn.onclick = (e) => removeBook(e);

    title.textContent = `${book.title}`;
    author.textContent = `${book.author}`;
    pages.textContent = `${book.pages}`;
    removeBtn.textContent = 'Remove';

    if (book.isRead) {
        readBtn.textContent = 'Read';
        readBtn.classList.add('btn-green');
    } else {
        readBtn.textContent = 'Not read';
        readBtn.classList.add('btn-red');
    }

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    buttonGroup.appendChild(readBtn);
    buttonGroup.appendChild(removeBtn);
    bookCard.appendChild(buttonGroup);
    booksGrid.appendChild(bookCard);
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
}

const addBook = (e) => {
    e.preventDefault();

    const existingBook = getBookFromLibrary(getBookFromInput().title);

    if (existingBook) {
        errorMsg.textContent = 'This book already exists in your library!';
        errorMsg.classList.add('active');
        return;
    }
    addBookToLibrary(getBookFromInput());
    updateBooksGrid();
    closeAddBookModal();
}

const removeBookFromLibrary = (title) => {
    const index = myLibrary.findIndex((book) => book.title === title);
    if (index !== -1) {
        myLibrary.splice(index, 1);
    }
};


const toggleRead = (e) => {
    console.log("Toggle Read function called");
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll('"', '');
    console.log("Book title:", title);

    const book = getBookFromLibrary(title);
    console.log("Book object:", book);

    book.isRead = !book.isRead;
    console.log("Updated Book object:", book);

    updateBooksGrid();
}


addButton.onclick = () => {
    console.log("Add button clicked");
    openAddBookModal();
};
overlay.onclick = () => {
    console.log("Overlay clicked");
    closeAddBookModal();
};
addBookForm.onsubmit = (e) => {
    console.log("Form submitted");
    addBook(e);
};



