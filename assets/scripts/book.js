function Book (title, name, pages, read_status){
    this.title = title;
    this.name = name;
    this.pages = pages;
    this.read_status = read_status;
    
}

Book.prototype.info = function(){
    read = "";
    if (this.read_status) {
        var read= "You read this book"
    }else{
        var read = "not read yet"
    }

    return (`${this.title} by ${this.name}, ${this.pages}, ${read} `)
}

var book_list = [
    new Book('Lord of the Rings', 'JRR Tolkien', 300, true),
    new Book('Neuromante', 'William Gibson', 200, true),
    new Book('The Call of The Wild', 'Jack London', '80'),
    new Book("Hitchiker's Guide to The Galaxy", 'Douglas Adams', '250', true),
]


var render = function(template, node, container = document.createElement("div") ){
    
    container.innerHTML = template;
    node.appendChild(container)
}



book_list.forEach(function(book){
    
var node = document.getElementById("title");
    var template = `<div class="card m-4 text-center">
                    <div class="card-body">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text">${book.title}</p>
                    
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${book.pages}</span></p>
                
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
    book_list.push(new Book(form.book_title.value, form.author_name.value, form.book_pages.value, form.book_status.value),);
    
    var node = document.getElementById("title");
    var template = `<div class="card text-center m-4">
                    <div class="card-body">
                    <h5 class="card-title">${form.author_name.value}</h5>
                    <p class="card-text">${form.book_title.value}</p>
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
       
        book_list = book_list.filter(function(books){
            if(books.title != text){
        
                return books;        
            }
            
            
        });
    
        console.log(book_list);
     e.target.parentElement.remove();
    }
})

