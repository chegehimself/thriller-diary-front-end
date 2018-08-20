/////////////////////////////////
//     Fetch a single Entry   //
////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
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
            title = document.getElementById('title');
            description = document.getElementById('description');
            console.log(data)
            description.innerHTML = `<p>${data.entry.description}</p>`;
            title.innerHTML = `<h2>${data.entry.title}</h2>`;
            date.innerHTML = `<h3> <i><em> <span class="date">${data.entry.created}</span> </em></i></h3>`
        })})
            .catch(err => console.log(err));
});