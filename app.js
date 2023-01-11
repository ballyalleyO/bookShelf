//Book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

//UI constructor
function UI() {

}

UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list');
    //Create tr element
    const row = document.createElement('tr')
    //Insert cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">REMOVE</a></td>
    `
    list.appendChild(row);
}

UI.prototype.deleteBook = function(target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}

//clear fields
UI.prototype.clearFields = function(){
    document.getElementById('title').value='';
    document.getElementById('author').value='';
    document.getElementById('isbn').value='';
}

//show alert
UI.prototype.showAlert = function(message, className) {
    //create div
    const div = document.createElement('div');
    // add classes
    div.className = `alert ${className}`
    //add text
    div.appendChild(document.createTextNode(message))
    //get parent
    const container = document.querySelector('.container')

    const form = document.querySelector('#book-form')

    container.insertBefore(div, form)

    //set timeout
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000)
}


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
        const ui= new UI();
        //validation
        if (title === '' || author === '' || isbn === '') {
            //error show alert
            ui.showAlert('Please complete all fields', 'error')
        } else {
          //Add book to list
          ui.addBookToList(book);
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
            ui.showAlert('Book removed', 'success')
        } else {
            ui.showAlert('Failed to remove the book', 'error')
        }
    })