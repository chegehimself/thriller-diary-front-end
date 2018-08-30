//////////////////////////////
//  DELETE ENTRY           //
/////////////////////////////

const DeleteEntry = () => {
    const entryId = Number(location.pathname.match(/\d+/)[0]);
    if (!confirm(`Are you sure want to delete this entry?`)) 
        return false;
    else{
    let btn;
    setTimeout(() => { $(btn).attr('disabled', 'disabled'); }, 1);
    const token = JSON.parse(localStorage.getItem('access_token'));
    const errors = document.getElementById("errors");
    const fordelete = document.getElementById("toDelete");
    console.log(entryId)
    fetch(`//api-thriller-diary.herokuapp.com/api/v1/entries/${entryId}`, {
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
            errors.innerHTML = `<h5 class="text-red">Entry Not found!</h5>`;
        }
        else if (data.status == `success`){
            // $(".single").css("display", "none");
            errors.innerHTML = `<h5 class="text-green">Entry Deleted!</h5>`;
            window.location.assign("/dashboard");
        }
}).catch(err => console.log(err));
}
}

module.exports = DeleteEntry