let myLibrary = [];

// Object Constructor
function Book(Title, Author, Pages, Read) {
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Read = Read;
    // this.function = function() {
    //     return (title + author + ", " + pages)
    // }

}

// Function to add into array
function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

// Function to display books
function displayBooks() {
    const books = document.querySelector(".books");

    // loop into the library array to add cards
    myLibrary.forEach(myLibrary => {
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        for (let key in myLibrary) {
            console.log(`${key}: ${myLibrary[key]}`);
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrary[key]}`);
            card.appendChild(para);
        }
        
    });
}

// Function to blur background as we add new book
function toggleBlur() {
    const blur = document.querySelector(".add-book-btn");
    const active = document.getElementById("blur");
    blur.addEventListener('click', () => {
        active.classList.toggle('active');
    });
}

// Function to add user input for books
function bookButton() {
    const add_book = document.querySelector(".add-book-btn");

}

addBookToLibrary("Blah Blah", "John Doe", 1234, "not read");
addBookToLibrary("Blah Blah", "John Doe", 1234, "not read");
addBookToLibrary("Blah Blah", "John Doe", 1234, "not read");
addBookToLibrary("Blah Blah", "John Doe", 1234, "not read");
addBookToLibrary("Blah Blah", "John Doe", 1234, "not read");
addBookToLibrary("Blah Blah", "John Doe", 1234, "not read");

toggleBlur();
displayBooks();