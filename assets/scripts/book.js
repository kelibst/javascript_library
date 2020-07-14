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
    container.setAttribute("class", "col-sm-4");
    container.innerHTML = template;
    node.appendChild(container)
}



book_list.forEach(function(book){
    
var node = document.getElementById("title");
    var template = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${book.name}</h5>
                    <p class="card-text">${book.title}.</p>
                    <a href="#" class="btn btn-primary">${book.pages}</a>
                    </div>
                </div>`;
    render(template,node)
});

var errors = [];

form = document.querySelector('form');
button = document.querySelector("button")

button.addEventListener('click', function(e){
    e.preventDefault();
    if(form.book_title.value.length<3 || form.author_name.value.length < 3){
        errors.push("Sorry Book title and Author name should be at least 3 characters long!")
    }
    book_list.push(new Book(form.book_title.value, form.author_name.value, form.book_pages.value, form.book_status.value),);


    

    
    var node = document.getElementById("title");
    var template = `<div class="card" style="width: 18rem;">
                    <div class="card-body">
                    <h5 class="card-title">${form.author_name.value}</h5>
                    <p class="card-text">${form.book_title.value}.</p>
                    <a href="#" class="btn btn-primary">${form.book_pages.value}</a>
                    </div>
                </div>`;
    render(template,node)
    form.reset();
})

