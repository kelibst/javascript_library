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
const  Harry = new Book("Harry poter", "MG", 346, false)

book_list.forEach(item, function(){
    console.log(item)
});

var title = document.getElementById("title");
