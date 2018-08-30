/////////////////////////////////
// Number of entries user Has  //
/////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    // get number of entries
    const EntriesUrl = '//api-thriller-diary.herokuapp.com/api/v1/entries/';
    fetch(`${EntriesUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        }
    })

    .then((response)=>{
        response.json().then((data) => {
            let entries_number = document.getElementById('num_of_entries');
            const entries = Object.values(data['Entries'])
            if (entries.length == 0){
                entries_number.innerHTML = 0;
            }
            else{
                entries_number.innerHTML = entries.length;
            }
        })})
            .catch(err => console.log(err));
});