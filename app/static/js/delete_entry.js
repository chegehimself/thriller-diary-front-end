//////////////////////////////
//  DELETE ENTRY           //
/////////////////////////////

const DeleteEntry = () => {
    const entryId = Number(location.pathname.match(/\d+/)[0]);
    if (!confirm(`Are you sure want to delete entry id ${entryId}?`)) 
        return false;
    else{
    let btn;
    setTimeout(() => { $(btn).attr('disabled', 'disabled'); }, 1);
    const token = JSON.parse(localStorage.getItem('access_token'));
    const errors = document.getElementById("errors");
    const fordelete = document.getElementById("toDelete");
    console.log(entryId)
    fetch(`http://127.0.0.1:5000/api/v1/entries/${entryId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.status)
        if (data.status == `fail`){
            errors.innerHTML = `<h3 class="text-red">Entry Not found!</h3>`;
        }
        else if (data.status == `success`){
            $(".single").css("display", "none");
            errors.innerHTML = `<h3 class="text-green">Entry Deleted!</h3>`;
        }
}).catch(err => console.log(err));
}
}

