function Book (title, name, pages, read_status=false){
    this.title = title;
    this.name = name;
    this.pages = pages;
    this.read_status = read_status;
    
}

Book.prototype.info = function(){
    read = "";
    if (this.read_status) {
        var read= "Read!"
        return read;
    }else{
        var read = "Not Read!"
        return read;
    }

    return (`${this.title} by ${this.name}, ${this.pages}, ${read} `)
}
Book.prototype.toggleStatus = function(){
    return this.read_status = !this.read_status;
}



if(localStorage.length < 1){
    var book_list = [
    {title: 'Lord of the Rings', name:'JRR Tolkien', pages: 300, read_status: true},
    {title: 'Neuromante', name: 'William Gibson', pages: 200, read_status: true},
    {title: 'The Call of The Wild', name: 'Jack London', pages: '80'},
    {title: "Hitchiker's Guide to The Galaxy", name: 'Douglas Adams', pages: '250', read_status: true},
]
}else{
    var stored_list = localStorage.getItem('book_list')
    var book_list = JSON.parse(stored_list);
}


var render = function(template, node, container = document.createElement("div") ){
    
    container.innerHTML = template;
    node.appendChild(container)
}



book_list.forEach(function(book){
 
  book_exec = new Book(book.title,book.name,book.pages,book.read_status);  
var node = document.getElementById("title");
    var template = `<div class="card m-4 p-relative text-center">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${book_exec.name}</h5>
                    <p class="card-text">${book_exec.title}</p>
                    
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${book_exec.pages}</span></p>
                    <a href="#" class="btn btn-info ptl-0">${book_exec.info()}</a>
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
    render(template,node)
});

var errors = [];

form = document.querySelector('form');
button = document.querySelector("button")

button.addEventListener('click', function(e){
    e.preventDefault();
    if(form.book_title.value.length < 3 || form.author_name.value.length < 3){
        errors.push("Sorry Book title and Author name should be at least 3 characters long!")
    }
    book_list.push({title: form.book_title.value, name: form.author_name.value, pages: form.book_pages.value, read_status: form.book_status.value});
    localStorage.setItem('book_list', JSON.stringify(book_list));
    
    var node = document.getElementById("title");
    var AddBook = new Book(form.book_title.value, form.author_name.value, form.book_pages.value, form.book_status.value);
    var template = `<div class="card text-center m-4">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${form.author_name.value}</h5>
                    <p class="card-text">${form.book_title.value}</p>
                    <a href="#" class="btn btn-info ptl-0">${AddBook.info()}</a>
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${form.book_pages.value}</span></p>
                  
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
    render(template,node)
    form.reset();
})

shelve = document.querySelector('.book-lists');

shelve.addEventListener('click', function(e){
    if (e.target.classList.contains("remove")){
        var text = e.target.parentElement.children[1].innerText;
        alert('You are about to remove this book!')
        book_list = book_list.filter(function(books){
            if(books.title != text){
        
                return books;        
            }
            
            
        });
   
        localStorage.setItem('book_list', JSON.stringify(book_list));
     e.target.parentElement.remove();
    }

    if (e.target.classList.contains("ptl-0")){
        var text = e.target.parentElement.children[1].innerText;
       
        book_reading = book_list.find(function(books){
            if(books.title == text){
                books.read_status = !books.read_status;
                run_book = new Book(books.title, books.name, books.pages, books.read_status)
                e.target.innerText = run_book.info();
                alert('You are about to change the read status of this book!')
                localStorage.setItem('book_list', JSON.stringify(book_list));
                return books;        
            }
          
        });
        
    }
})

