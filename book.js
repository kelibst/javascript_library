function Book (title, name, pages, read_status){
    this.title = title;
    this.name = name;
    this.pages = pages;
    this.read_status = read_status;

    this.info = function(){
        read = "";
        if (read_status) {
            read= "You read this book"
        }else{
            read = "not read yet"
        }

        return (`${title} by ${name}, ${pages}, ${read} `)
    }
}

const  Harry = new Book("Harry poter", "MG", 346, false)

console.log(Harry.info())