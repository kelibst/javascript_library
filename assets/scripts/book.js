add_note = document.querySelector('.add_note');
form_container = document.querySelector('.form-container');

form = document.querySelector('form');
button = document.querySelector("button")

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

