document.getElementById('myForm').addEventListener('submit', saveBookmark);

// function to save the bookmarks

function saveBookmark(event) {

    // prevent default form behaviour
    event.preventDefault();

    // grab form values
    let siteName = document.getElementById('siteName').value;
    let siteURL = document.getElementById('siteURL').value;


    if (!validateForm(siteName, siteURL)) {
        return false;
    }

    // add the values to an object
    const bookmark = {
        name: siteName,
        url: siteURL,
    };
    // test bookmarks
    if (localStorage.getItem('bookmarks') === null) {
        // init array
        let bookmarks = [];

        // push items
        bookmarks.push(bookmark);
        // set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get an item
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // add bookmark to array
        bookmarks.push(bookmark);

        // reset back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    // clear form

    document.getElementById('myForm').reset();

    // refetch bookmarks
    fetchBookmarks();
}
// deletebookmarks
function deleteBookmark(url) {
    // get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove from array
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //  refetch bookmarks
    fetchBookmarks();
}

// fetchBookmarks

function fetchBookmarks() {
    // get bookmarks from the localStorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // output id
    let bookmarksResults = document.getElementById('bookmarksResults');

    // build output

    bookmarksResults.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            '<a class="btn" target="_blank" href="' + url + '">Visit</a>' +
            '<a onclick="deleteBookmark(\'' + url + '\')" id="delete"  href="#">Delete</a>'
        '</h3>' +
        '</div>'

    }
}

// validate function
function validateForm(siteName, siteURL) {
    // validation
    if (!siteName || !siteURL) {
        alert('Please fill in the form');
    }

    // url regex
    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}