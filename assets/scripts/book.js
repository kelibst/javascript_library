
const addnote = document.querySelector('.add_note');
const formcontainer = document.querySelector('.form-container');
const formErrors = document.querySelector('.formErrorMessage');

const form = document.querySelector('form');
const retError = '';
const button = document.querySelector('button');
let booklist = [];
function Book(title, name, pages, readstatus = false) {
  this.title = title;
  this.name = name;
  this.pages = pages;
  this.readstatus = readstatus;
}

let read = '';

Book.prototype.info = function info() {
  if (this.readstatus) {
    read = 'Read!';
    return read;
  }
  read = 'Not Read!';
  return read;
};
Book.prototype.toggleStatus = function toggleStatus() {
  this.readstatus = !this.readstatus;
};


if (localStorage.length < 1) {
  booklist = [
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
  const storedlist = localStorage.getItem('booklist');
  booklist = JSON.parse(storedlist);
}


const render = function render(template, node, container = document.createElement('div')) {
  container.innerHTML = template;
  node.appendChild(container);
};


booklist.forEach((book) => {
  const bookexec = new Book(book.title.trim(), book.name.trim(), book.pages, book.readstatus);
  const node = document.getElementById('title');
  const template = `<div class="card m-4 p-relative text-center">
                    <div class="card-body mt-5">
                    <h5 class="card-title">${bookexec.name}</h5>
                    <p class="card-text">${bookexec.title}</p>
                    
                    <p class="card-text text-center"><span class="font-weight-bolder">Number of pages:  ${bookexec.pages}</span></p>
                    <a href="#" class="btn btn-info ptl-0">${bookexec.info()}</a>
                    <a href="#" class="btn btn-danger remove w-100">Remove Book</a>
                    </div>
                </div>`;
  render(template, node);
});

function validateField(inpFiled, errNum) {
  const errors = document.querySelector(`.error${errNum}`);

  inpFiled.addEventListener('keyup', () => {
    if (inpFiled.checkValidity()) {
      inpFiled.classList.remove('border-danger');
      inpFiled.classList.add('border-success');
      errors.innerText = '';
    } else {
      inpFiled.classList.add('border-danger');
      errors.innerText = 'This Input field is not valid!';
    }
  });
}

validateField(form.book_title, '1');
validateField(form.author_name, '2');
validateField(form.book_pages, '3');


button.addEventListener('click', (e) => {
  e.preventDefault();
  const btitle = form.book_title;
  const bname = form.author_name;
  const bpages = form.book_pages;
  if (btitle.checkValidity() && bname.checkValidity() && bpages.checkValidity()) {
    booklist.push({
      title: btitle.value.trim(),
      name: bname.value.trim(),
      pages: bpages.value,
      readstatus: form.book_status.value,
    });
    localStorage.setItem('booklist', JSON.stringify(booklist));

    const node = document.getElementById('title');
    const AddBook = new Book(form.book_title.value.trim(),
      form.author_name.value.trim(),
      form.book_pages.value,
      form.book_status.value);
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
    formErrors.classList.remove('d-block');
    formcontainer.classList.remove('d-flex');
  } else {
    formErrors.classList.add('d-block');
  }
});

const shelve = document.querySelector('.book-lists');

shelve.addEventListener('click', (e) => {
  if (e.target.classList.contains('remove')) {
    const text = e.target.parentElement.children[1].innerText;

    booklist = booklist.filter((books) => {
      if (books.title !== text) {
        return books;
      }
      return retError;
    });


    localStorage.setItem('booklist', JSON.stringify(booklist));
    e.target.parentElement.remove();
  }

  if (e.target.classList.contains('ptl-0')) {
    const text = e.target.parentElement.children[1].innerText;

    const stateLog = booklist.find((books) => {
      if (books.title === text) {
        return books;
      }
      return retError;
    });

    stateLog.readstatus = !stateLog.readstatus;
    const runbook = new Book(stateLog.title, stateLog.name, stateLog.pages, stateLog.readstatus);
    e.target.innerText = runbook.info();

    localStorage.setItem('booklist', JSON.stringify(booklist));
  }
});

addnote.addEventListener('click', () => {
  formcontainer.classList.add('d-flex');
});
formcontainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('form-container')) {
    formcontainer.classList.remove('d-flex');
  }

  e.stopImmediatePropagation();
});
