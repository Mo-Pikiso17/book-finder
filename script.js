// DOM

// input text box
var textBox = document.querySelector('.searchInput');

// Search button
var btn = document.querySelector('.searchBtn');

// display area
var results = document.querySelector('.searchResults');


// links API to the input query.

// maximum number of books to display

var booksResults = 3;


// eventlistener for when the button is pressed the search is executed. 
// Create a search function
// link the function to the search button via the eventlistener.

// Hence I am searching an API for data; creat async functions


async function searchBooks(){
    console.log(textBox.value);

    //var endpoint = `https://www.googleapis.com/books/v1/volumes?q=${textBox.value}`;
    var endpoint = `https://www.googleapis.com/books/v1/volumes?q=` + textBox.value;
    console.log(endpoint);

    try {
        var response = await fetch(endpoint);
        var json = await response.json();
        console.log(json);

        var numOfBooks = Math.min(booksResults, json.items.length);
        console.log(numOfBooks);
    } catch(error) {
        console.log(error);
    }
    
    results.innerHTML = '';

    for (let i = 0; i < numOfBooks; i++) {
        var newBook = document.createElement("div");
        newBook.style.background = "black";
        newBook.style.borderRadius = "8px";
        newBook.style.padding = "7px";
        newBook.style.height = "395px";
        newBook.style.width = "800px";






        // newBook.style.padding = "10px 10px 10px 10px";

        // if (i % 2 == 0) {
        //     newBook.style.backgroundColor = 'rgb(240, 240, 255)';
        // } else{
        //     newBook.style.backgroundColor = 'lightcyan';
        // }

        var newTitle = document.createElement("h3");
        newTitle.class = "article_title";
        newTitle.style.color = "white";
        newTitle.innerHTML = json.items[i].volumeInfo.title;
        newBook.appendChild(newTitle);

        var authors = json.items[i].volumeInfo.authors.join(", ");
        if (authors) {
            var newAuthors = document.createElement("h4");
            newAuthors.style.color = "wheat";
            newAuthors.style.font = "arial";

            newAuthors.innerHTML = "Authors: " + authors;
            newBook.appendChild(newAuthors);
        }
        

        // if (json.items[i].volumeInfo.description) {
        //     var newDescription = document.createElement("p");
        //     newDescription.class = "article_description";
        //     newDescription.innerHTML = json.items[i].volumeInfo.description;
        //     newBook.appendChild(newDescription);
        // }

        if (json.items[i].volumeInfo.infoLink) {
            var newLink = document.createElement("a");
            newLink.href = json.items[i].volumeInfo.infoLink;
            newLink.innerHTML = "<p>More info</p>";
            newBook.appendChild(newLink);
        }

        if (json.items[i].volumeInfo.imageLinks.thumbnail) {
            var newImage = document.createElement("img");
            newImage.style.height = "230px";
            newImage.style.width = "180px";

            newImage.src = json.items[i].volumeInfo.imageLinks.thumbnail;
            newBook.appendChild(newImage);
        }

        results.appendChild(newBook);


       }   
       
}


// eventlistener
btn.addEventListener('click', searchBooks);