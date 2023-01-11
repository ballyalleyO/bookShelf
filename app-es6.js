class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
        const list = document.getElementById("book-list");
        //Create tr element
        const row = document.createElement("tr");
        //Insert cols
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>ISBN${book.isbn}</td>
        <td><a href="#" class="delete">REMOVE</a></td>
    `;
        list.appendChild(row);
    }

    showAlert(message, className) {

      //create div
      const div = document.createElement("div");
      // add classes
      div.className = `alert ${className}`;
      //add text
      div.appendChild(document.createTextNode(message));
      //get parent
      const container = document.querySelector(".container");

      const form = document.querySelector("#book-form");

      container.insertBefore(div, form);

      //set timeout
      setTimeout(function () {
        document.querySelector(".alert").remove();
      }, 3000);
    }

    deleteBook(target) {
         if (target.className === "delete") {
           target.parentElement.parentElement.remove();
         }}

    clearFields() {
         document.getElementById("title").value = "";
         document.getElementById("author").value = "";
         document.getElementById("isbn").value = "";
        }
}

 //Local Storage
    class Storage {
        static getBooksLS() {
            let books;

            if (localStorage.getItem('books') === null) {
                books = []
            } else {
                books = JSON.parse(localStorage.getItem("books"))
            }
        }

        static displayBooksLS() {
            const books = Storage.getBooksLS()
            books.forEach(book => {
                const ui = new UI

                //add book to UI
                ui.addBookToList(book)
            })
        }

        static addBookLS(book) {
            const books = Storage.getBooksLS();
            books.push(book);

            localStorage.setItem('books', JSON.stringify(books))
        }

        static removeBookLS(isbn) {
            console.log(isbn)
        }

    }

    //DOMLoadevent
    document.addEventListener('DOMContentLoaded', Storage.displayBooksLS)



    //Listeners for ADDING a book
document.getElementById('book-form')
.addEventListener('submit',
    function(e){
        const
            title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementById('isbn').value

        //instatiate book
        const book = new Book(title, author, isbn);

        //instatiate UI
        const ui = new UI();

        console.log(ui)
        //validation
        if (title === '' || author === '' || isbn === '') {
            //error show alert
            ui.showAlert('Please complete all fields', 'error')
        } else {
          //Add book to list
          ui.addBookToList(book);

          //Add to Local Storage
          Store.addBookLS(book)

          //clear fields
          ui.clearFields();

          ui.showAlert('Book added', 'success')
        }

        console.log(book);

        e.preventDefault();
    });


    // Listener for DELETING a book
    document.getElementById('book-list').addEventListener('click', function(e){
        const ui = new UI();
        if (e.target.className === 'delete') {
            ui.deleteBook(e.target)

            //remove from Local Storage
            Storage.removeBookLS(e.target.parentElement.previousElementSibling.textContent)
            ui.showAlert('Book removed', 'success')
        } else {
            ui.showAlert('Failed to remove the book', 'error')
        }
    })