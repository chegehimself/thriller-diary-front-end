// signup
// SignUp user

/////////////////////////////////////////////////////
//   USER SIGNUP                                   //
/////////////////////////////////////////////////////
function signUp(){
    document.getElementById("signup-form").addEventListener("submit", (event) => {
        event.preventDefault();
      const password = document.getElementById("password");
      const username = document.getElementById("username");
    
      const email = document.getElementById("email");
    
      const credentials = {
          email: email.value,
          password: password.value,
          username: username.value
      };
    //   console.log(`${credentials}`)
      fetch("//api-thriller-diary.herokuapp.com/api/v1/auth/signup", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(credentials)
          })
          .then(res => res.json())
          .then(data => {
            const response_message  = Object.values(data);
            let received = response_message[1];
            if (received == `user exists`){
                // yell at the user
                const ResponseMessage =  `<h5 class="text-red">That email is already registered</h5>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else if(received == `Invalid usernamee.Try again`) {
                const ResponseMessage =  `<h5 class="text-red">Invalid username.Try again</h5>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else if (received == `Invalid email.Try again`){
                const successMessage = response_message[0];
                const ResponseMessageSuccess = `<h5 class="text-red">Invalid email.Try again</h5>`;
                let SuccessmessageBody = document.getElementById("return");
                SuccessmessageBody.innerHTML = ResponseMessageSuccess
            }
            else if(response_message[0] == `success`) {
                // window.location.href = "/signin";
                const ResponseMessage =  `<h5 class="text-green">Registration Successful!</h5>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
                window.location.assign("/signin");
            }
            else{
                const ResponseMessageSuccess = `<h5 class="text-red">Registration failed.Try again</h5>`;
                let SuccessmessageBody = document.getElementById("return");
                SuccessmessageBody.innerHTML = ResponseMessageSuccess
            }
    
          })
          .catch(err => console.log(err));
    });
}

module.exports = signUp