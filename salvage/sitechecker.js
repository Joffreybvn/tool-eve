

let startProcessSites = (event) => {
    event.preventDefault();

    // Get the inputs
    let inputs = Array.from(siteForm.querySelectorAll('textarea'))
        .concat(Array.from(siteForm.querySelectorAll('button')));


    // Disable the inputs
    for (let t of inputs) {
        t.disabled = true;
    }

    findSites(scanTextarea.value, bookmarksTextarea.value)
};

let findSites = (scan, bookmarks) => {

    scan = scan.split('\n');
    bookmarks = bookmarks.split('\n');

    // Get the combat site list
    let scan_array = [];

    for (let i = 0; i < scan.length; i++) {

        let data = scan[i].substring(0, 40);

        if (data.slice(-6) === "combat") {
            scan_array.push(data.slice(0, 7))
        }
    }

    console.log(scan_array);

    // Get the bookmarks list
    let bookmarks_array = [];

    for (let i = 0; i < bookmarks.length; i++) {
        bookmarks_array.push(bookmarks[i].substring(0, 7));
    }

    console.log(bookmarks_array);

    // Find the non-bookmarked sites
    let newSites_array = [];

    for (let i = 0; i < scan_array.length; i++) {
        let site = scan_array[i];

        if (bookmarks_array.includes(site) === false) {
            newSites_array.push(site)
        }
    }

    // Find the completed sites
    let completedSites_array = [];

    for (let i = 0; i < bookmarks_array.length; i++) {
        let bookmark = bookmarks_array[i];

        if (scan_array.includes(bookmark) === false) {
            completedSites_array.push(bookmark)
        }
    }

    let o = document.getElementsByTagName('output')[0];
    o.innerText = newSites_array + '<br>' + completedSites_array;
};

let siteForm = document.getElementById('siteForm');
siteForm.addEventListener('submit', startProcessSites);

let scanTextarea = document.getElementById('scan-textarea');
let bookmarksTextarea = document.getElementById('bookmarks-textarea');