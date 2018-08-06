/////////////////////////////////
//     Modify an Entry        //
////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    title = document.getElementById('title');
    description = document.getElementById('description');
    const token = JSON.parse(localStorage.getItem('access_token'));
    console.log(window.location.pathname);
    entryId = Number(location.pathname.match(/\d+/)[0]);
    console.log(entryId)
    const EntriesUrl = `http://127.0.0.1:5000/api/v1/entries/${entryId}`;
    fetch(`${EntriesUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        }
    })

    .then((response)=>{
        response.json().then((data) => {
            title.value = data.entry.title;
            description.value = data.entry.description;
        })})
            .catch(err => console.log(err));
});

const Modify = () => {
    document.getElementById("add-form").addEventListener("submit", (event) => {
        event.preventDefault();
    // get token
    const token = JSON.parse(localStorage.getItem('access_token'));
    event.preventDefault();
    const EntriesUrl = `http://127.0.0.1:5000/api/v1/entries/${entryId}`;
    const title = document.getElementById('title');
    const description = document.getElementById('description');

    const content = {
        title: title.value,
        description: description.value
    }
    console.log(content);

    fetch(`${EntriesUrl}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        },
        body: JSON.stringify(content)
    })
    .then((response)=>{
        response.json().then((data) => {
            console.log(data)
        })}).catch(err => console.log(err));
    });
    }
