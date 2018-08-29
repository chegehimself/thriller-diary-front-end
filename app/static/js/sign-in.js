/////////////////////////////////////////////////////
//   USER LOGIN                                    //
/////////////////////////////////////////////////////

const signIn = () => {
    document.getElementById("signin-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const password = document.getElementById("password");
        const confirmation = document.getElementById("confirmation");
        
        const username = document.getElementById("username");
        const email = document.getElementById("email");
        
        const credentials = {
            email: email.value,
            password: password.value,
        };
        // console.log(JSON.stringify(credentials))
        //   fetch("//api-thriller-diary.herokuapp.com/api/v1/auth/login/", {
        fetch("//api-thriller-diary.herokuapp.com/api/v1/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
            .then(res => res.json())
            .then(data => {
            // user token
            const token = data['token']
            localStorage.setItem('access_token', JSON.stringify(token));
            const response_message  = Object.values(data);
            let received = response_message[1];
            
            if (received == `Check your details and try again`){
                // yell at the user
                const ResponseMessage =  `<h5 class="text-red">${received}</h5>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else if (received == "Oops! check your details and try again")
            {
                const ResponseMessage =  `<h5 class="text-red">${received}</h5>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else if (received == `Too short password(at least 4 characters needed)`){
                const ResponseMessage =  `<h5 class="text-red">Too short password(at least 4 characters needed)</h5>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else {
                const successMessage = response_message[0];
                const ResponseMessageSuccess = `<h5 class="text-green">Login successful!</h5>`;
                let SuccessmessageBody = document.getElementById("return");
                SuccessmessageBody.innerHTML = ResponseMessageSuccess
                // redirect for dasho
                window.location.assign("/dashboard");
            }
    
            })
            .catch(err => console.log(err));
        });
    
    }

module.exports = signIn