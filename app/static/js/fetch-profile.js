/////////////////////////////////////////////////////
//  FETCH USER PROFILE                             //
/////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const ProfileUrl = '//api-thriller-diary.herokuapp.com/api/v1/users/profile';
    fetch(`${ProfileUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        }
    })

    .then((response)=>{
        response.json().then((data) => {
            const user = Object.values(data['Profile'])
            console.log(user[0])
            const userinfo = document.getElementById("name");
            const usermail = document.getElementById("email");
            userinfo.innerHTML = `${user[1]}!`;
            usermail.innerHTML = `${user[2]}!`;

        })})
            .catch(err => console.log(err));


});