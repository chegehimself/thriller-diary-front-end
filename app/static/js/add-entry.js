///////////////////////////////////
//              Add entries      //
///////////////////////////////////
const AddEntry = () => {
    document.getElementById("add-form").addEventListener("submit", (event) => {
        event.preventDefault();
    const token = JSON.parse(localStorage.getItem('access_token'));
    const title = document.getElementById("title");
    const description = document.getElementById("description");
    const errors = document.getElementById("errors");
    errors.innerHTML = `<h4 class="text-blue">processing... </h4>`;

    const EntryData = {
        title: title.value,
        description: description.value,
    };

    fetch("//api-thriller-diary.herokuapp.com/api/v1/entries/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        },
        body: JSON.stringify(EntryData)
    })
    .then(res => res.json())
    .then(data => {
        if (data.message == `Please input valid title`){
            errors.innerHTML = `<h3 class="text-red">Please input valid title</h3>`;
        }
        else if (data.status == `success`){
            errors.innerHTML = `<h3 class="text-green">Entry Added!</h3>`;
            window.location.href = "/entries";
        }
        else{
            errors.innerHTML = `<h3 class="text-red">Please input all the fields correctly</h3>`;
        }
}).catch(err => console.log(err));
});
}
