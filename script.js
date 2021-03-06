// Array
let myLibrary = [];

// Class Object
class Book {
    constructor(Title, Author, Pages, Read) {
        this.Title = Title;
        this.Author = Author;
        this.Pages = Pages;
        this.Read = Read;
    }
}

// Function to add into array
function addBookToLibrary(Title, Author, Pages, Read) {
    let book = new Book(Title, Author, Pages, Read);
    myLibrary.push(book);
    setData(); // saves data to local storage
    restore();
    displayBooks();
}

// Function to display books
function displayBooks() {
    const books = document.querySelector(".books");

    // to remove duplicates of added books
    const removeDiv = document.querySelectorAll('.card');
    for (let i = 0; i < removeDiv.length; i++) {
        removeDiv[i].remove();
    }

    // loop into the library array to add cards
    let index = 0;
    myLibrary.forEach(myLibrarys => {

        // creates div and adds card class
        const card = document.createElement("div");
        card.classList.add("card");
        books.appendChild(card);

        // loops through object to display onto card
        for (let key in myLibrarys) {
            console.log(`${key}: ${myLibrarys[key]}`);
            const para = document.createElement("p");
            para.textContent = (`${key}: ${myLibrarys[key]}`);
            card.appendChild(para);
        }

        // create button to toggle read or not read
        const readBtn = document.createElement('button');
        readBtn.classList.add('read-noread');
        readBtn.textContent = "Toggle Read";

        // links data attribute of Read to the array and card
        readBtn.dataset.linkedArray = index;
        //console.log(readBtn.dataset.linkedArray);
        card.appendChild(readBtn);
        
        //add toggle ability to each book 'read' button on click
        readBtn.addEventListener('click', () => { 
            let readToggle = readBtn.dataset.linkedArray;
            Book.prototype = Object.create(Book.prototype);
            console.log("initial value of Read: ", myLibrary[readToggle].Read);
            const toggleBook = new Book();
            // checks to see read status of yes or no
            if (myLibrary[readToggle].Read == "Yes") {
                toggleBook.Read = "No";
                myLibrary[readToggle].Read = toggleBook.Read;                
            } else if (myLibrary[readToggle].Read == "No") {
                toggleBook.Read = "Yes";
                myLibrary[readToggle].Read = toggleBook.Read;
            }
            setData(); 
            displayBooks();
        }); 

        // create button to remove book
        const removeBookBtn = document.createElement('button');
        removeBookBtn.classList.add('remove-book');
        removeBookBtn.textContent = "Remove Book";

        // links data attribute of array to card to remove
        removeBookBtn.dataset.linkedArray = index;
        //index++;
        card.appendChild(removeBookBtn);

        // removes the book from library
        removeBookBtn.addEventListener('click', () => {
            let rm = removeBookBtn.dataset.linkedArray;
            myLibrary.splice(parseInt(rm), 1);
            card.remove();
            setData();
            restore();
            displayBooks();
        });

        index++;
    });
}

// Function to blur background and display the book form
function toggleBlur() {
    const blur = document.querySelector('.add-book-btn'); //button
    const active = document.getElementById('blur'); //blur ID to active
    const bookForm = document.getElementById('book-form'); //
    blur.addEventListener('click', () => {
        active.classList.toggle('active'); // add 'active' class
        bookForm.classList.toggle('active'); // add 'active' class
    });
}

// Function to submit data to add book to library
function formData() {
    let Title = document.getElementById('Title').value;
    let Author = document.getElementById('Author').value;
    let Pages = document.getElementById('Pages').value;
    let Read = document.getElementById('Read').value;

    //if empty, do not allow
    if ((Title == "") || (Author == "") || (Pages == "") || (Read == "")) return;

    addBookToLibrary(Title, Author, Pages, Read);

    document.getElementById('add-book').reset();
}

// Listens for submit click to add to library
const submitBtn = document.querySelector('.submit');
const removeBlur = document.getElementById('blur'); // remove blur effect
const removeForm = document.getElementById('book-form'); // remove form after submitting
submitBtn.addEventListener('click', formData);
submitBtn.addEventListener('click', () => {
    formData;
    removeBlur.classList.remove('active');
    removeForm.classList.remove('active');
});

// Listens for reset click
const resetForm = document.querySelector('.reset');
resetForm.addEventListener('click', () => {
    document.getElementById('add-book').reset();
});

// Saves data to local storage
function setData() {
    localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

// brings back local storage when page refreshed
function restore() {
    if (!localStorage.myLibrary) {
        displayBooks();
    } else {
        let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
        objects = JSON.parse(objects);
        myLibrary = objects;
        displayBooks();
    }
}

toggleBlur(); // Toggles blur and displays form
displayBooks(); // Displays our library
restore();

