/////////////////////////////////
//     Modify an Entry        //
////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    title = document.getElementById('title');
    description = document.getElementById('description');
    const token = JSON.parse(localStorage.getItem('access_token'));
    entryId = Number(location.pathname.match(/\d+/)[0]);
    const EntriesUrl = `//api-thriller-diary.herokuapp.com/api/v1/entries/${entryId}`;
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
    const EntriesUrl = `//api-thriller-diary.herokuapp.com/api/v1/entries/${entryId}`;
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    let errors = document.getElementById('errors');
    errors.innerHTML = `<h3 class="text-blue">Processing...</h3>`;

    const content = {
        title: title.value,
        description: description.value
    }

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
            console.log(data.status)
            if (data.status == `success`){
                let errors = document.getElementById('errors');
                errors.innerHTML = `<h3 class="text-green">Entry Updated!</h3>`;
            }
            else
            {
                errors.innerHTML = `<h3 class="text-red">Please input all the fields correctly!</h3>`;
            }
        })}).catch(err => console.log(err));
    });
    }
