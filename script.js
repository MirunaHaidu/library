const myLibrary = [];


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    let message = `${this.title} by ${this.author}, ${this.pages} pages, `;
    return this.read ? (message += 'read') : (message += 'not read yet');
};

function addBookToLibrary(book) {
    myLibrary.push(book);
}


// ---------------- HTML  -------------------------


