
const addnote = document.querySelector('.add_note');
const formcontainer = document.querySelector('.form-container');

const form = document.querySelector('form');
const button = document.querySelector('button');

function Book(title, name, pages, readstatus = false) {
  this.title = title;
  this.name = name;
  this.pages = pages;
  this.readstatus = readstatus;
}

let read = '';

Book.prototype.info = function () {
  if (this.readstatus) {
    read = 'Read!';
    return read;
  }
  read = 'Not Read!';
  return read;
};
Book.prototype.toggleStatus = function () {
  this.readstatus = !this.readstatus;
};

if (localStorage.length < 1) {
  var book_list = [
    {
      title: 'Lord of the Rings', name: 'JRR Tolkien', pages: 300, readstatus: true,
    },
    {
      title: 'Neuromante', name: 'William Gibson', pages: 200, readstatus: true,
    },
    { title: 'The Call of The Wild', name: 'Jack London', pages: '80' },
    {
      title: "Hitchiker's Guide to The Galaxy", name: 'Douglas Adams', pages: '250', readstatus: true,
    },
  ];
} else {
  const stored_list = localStorage.getItem('book_list');
  var book_list = JSON.parse(stored_list);
}


const render = function (template, node, container = document.createElement('div')) {
  container.innerHTML = template;
  node.appendChild(container);
};


book_list.forEach((book) => {
  book_exec = new Book(book.title, book.name, book.pages, book.readstatus);
  const node = document.getElementById('title');
  const template = `<div class="card m-4 p-relative text-center">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${book_exec.name}</h5>
                    <p class="card-text">${book_exec.title}</p>
                    
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${book_exec.pages}</span></p>
                    <a href="#" class="btn btn-info ptl-0">${book_exec.info()}</a>
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
  render(template, node);
});

const errors = [];


button.addEventListener('click', (e) => {
  e.preventDefault();


  if (form.book_title.value.length < 3 || form.author_name.value.length < 3 || book_list.includes(form.book_title.value)) {
    alert('Sorry Book title and Author name should be at least 3 characters long!');
  } else {
    book_list.push({
      title: form.book_title.value, name: form.author_name.value, pages: form.book_pages.value, readstatus: form.book_status.value,
    });
    localStorage.setItem('book_list', JSON.stringify(book_list));

    const node = document.getElementById('title');
    const AddBook = new Book(form.book_title.value, form.author_name.value, form.book_pages.value, form.book_status.value);
    const template = `<div class="card text-center m-4">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${form.author_name.value}</h5>
                    <p class="card-text">${form.book_title.value}</p>
                    <a href="#" class="btn btn-info ptl-0">${AddBook.info()}</a>
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${form.book_pages.value}</span></p>
                  
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
    render(template, node);
    form.reset();
    formcontainer.classList.remove('d-flex');
  }
});

shelve = document.querySelector('.book-lists');

shelve.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    var text = e.target.parentElement.children[1].innerText;
    alert('You are about to remove this book!');
    book_list = book_list.filter((books) => {
      if (books.title != text) {
        return books;
      }
    });


    localStorage.setItem('book_list', JSON.stringify(book_list));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains('ptl-0')) {
    var text = e.target.parentElement.children[1].innerText;

    book_reading = book_list.find((books) => {
      if (books.title == text) {
        books.readstatus = !books.readstatus;
        run_book = new Book(books.title, books.name, books.pages, books.readstatus);
        e.target.innerText = run_book.info();
        alert('You are about to change the read status of this book!');
        localStorage.setItem('book_list', JSON.stringify(book_list));
        return books;
      }
    });
  }
});

addnote.addEventListener('click', (e) => {
  formcontainer.classList.add('d-flex');
});
formcontainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('form-container')) {
    formcontainer.classList.remove('d-flex');
  }

  e.stopImmediatePropagation();
});
