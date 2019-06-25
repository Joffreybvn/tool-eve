

let startProcessSites = (event) => {
    event.preventDefault();

    // Get the inputs
    let inputs = Array.from(siteForm.querySelectorAll('textarea'))
        .concat(Array.from(siteForm.querySelectorAll('button')));

    changeInputState(inputs, true); // Disable the inputs

    if (findSites(scanTextarea.value, bookmarksTextarea.value)) {
        changeInputState(inputs, false); // Enable the inputs
    }
};

let findSites = (scan, bookmarks) => {

    scan = scan.split('\n');
    console.log(scan);
    bookmarks = bookmarks.split('\n');
    console.log(bookmarks);

    // Get the combat site list
    let scan_array = [];

    for (let i = 0; i < scan.length; i++) {
        scan_array.push(scan[i].substring(0, 7));
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

    // Print the sites to salvage
    let output_salvage = document.getElementById('output-salvage');
    if (completedSites_array.length === 0) {
        completedSites_array = "Nothing"
    }
    output_salvage.innerText = '' + completedSites_array;

    // Print the new anomalies
    let output_anomaly = document.getElementById('output-anomaly');
    if (newSites_array.length === 0) {
        newSites_array = "Nothing"
    }
    output_anomaly.innerText = '' + newSites_array;

    return true;
};

let changeInputState = (inputs, state) => {

    for (let t of inputs) {
        t.disabled = state;
    }
};

let siteForm = document.getElementById('siteForm');
siteForm.addEventListener('submit', startProcessSites);

let scanTextarea = document.getElementById('scan-textarea');
let bookmarksTextarea = document.getElementById('bookmarks-textarea');