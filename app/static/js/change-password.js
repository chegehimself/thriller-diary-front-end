//////////////////////////////////////
// CHANGE PASSWORD                  //
//////////////////////////////////////

const ChangePassword = () => {
    document.getElementById("password-form").addEventListener("submit", (event) => {
        event.preventDefault();
    // get token
    const token = JSON.parse(localStorage.getItem('access_token'));

    let errors = document.getElementById('status');
    errors.innerHTML = `<h3 class="text-blue">Processing...</h3>`
    // fetch userid
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
            const PasswordUrl = `//api-thriller-diary.herokuapp.com/api/v1/users/change_password/`;
            const old_password = document.getElementById('old-password');
            const new_password = document.getElementById('new-password');
            const confirm = document.getElementById('confirmation');
        
            const content = {
                old_password: old_password.value,
                new_password: new_password.value,
                confirmation: confirm.value
            }
        
            fetch(`${PasswordUrl}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "access_token": token
                },
                body: JSON.stringify(content)
            })
            .then((response)=>{
                response.json().then((data) => {
                    let errors = document.getElementById('status');
                    const messageList = Object.values(data);
                    const message = messageList[1];
                    console.log(message)
                    if (data.status == `success`){
                        errors.innerHTML = `<h4 class="text-green">Password Updated!</h4>`;
                    }
                    else if (message == `Incorrect old password`){
                        errors.innerHTML = `<h4 class="text-error">Incorrect Old Password!</h4>`;
                    }
                    else if (message == `Password mismatch`){
                        errors.innerHTML = `<h4 class="text-error">Password Confirmation Mismatch!</h4>`;
                    }
                    else{
                        errors.innerHTML = `<h4 class="text-error">Incorrect credentials!</h4>`;
                    }
                })}).catch(err => console.log(err));
        })
    })
        
    });
    }

    module.exports = ChangePassword