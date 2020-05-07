document.getElementById('myForm').addEventListener('submit', saveBookmark);

// function to save the bookmarks

function saveBookmark(event){

    // grad form values
    let siteName = document.getElementById('siteName').value;
    let siteURL = document.getElementById('siteURL').value;

    // add the values to an object
    const bookmark={
        name:siteName,
        url:siteURL,
    };
    console.log(bookmark);
    // prevent default form behaviour
    event.preventDefault();
}