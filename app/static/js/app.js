'use strict'
const Welcome = () => {
// fetch for landing page
let message = document.getElementById('welcoming-message');

// const WelcomeUrl = 'http://api-thriller-diary.herokuapp.com/api/v1/auth/';
const WelcomeUrl = 'http://127.0.0.1:5000/api/v1/auth/';
fetch(`${WelcomeUrl}`)

    .then((response)=>{
        response.json().then((data) => {
        console.log(data)
        const warmWelcome = Object.values(data.Message)

        const FetchedMessage =  `<h2 class="text-white">${warmWelcome}</h2>`

        message.innerHTML = FetchedMessage
        
        })})
        .catch(err => console.log(err));

}
// signup
// SignUp user
const signUp = () => {
document.getElementById("signup-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password");
    const confirmation = document.getElementById("confirmation");
    // if (confirmation != password)
    //     {
    //         const response_message = `Password Mismatch`;
    //         const ResponseMessage =  `<h3 class="text-red">${response_message[1]}</h3>`;
    
    //         let messageBody = document.getElementById("response_message");
    //         messageBody.innerHTML = ResponseMessage
    //     }
      console.log(`we are sending data ...`)
    
      const username = document.getElementById("username");
      const email = document.getElementById("email");
    
      const credentials = {
          email: email.value,
          password: password.value,
          username: username.value
      };
      console.log(`${credentials}`)
    //   fetch("http://api-thriller-diary.herokuapp.com/api/v1/auth/signup/", {
      fetch("http://127.0.0.1:5000/api/v1/auth/signup", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json"
              },
              body: JSON.stringify(credentials)
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            const response_message  = Object.values(data);
            console.log(response_message[0])
            let received = response_message[1];
            
            if (received == `user exists`){
                // yell at the user
                const ResponseMessage =  `<h3 class="text-red">${received}</h3>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else if(received == `Invalid usernamee.Try again`) {
                const ResponseMessage =  `<h3 class="text-red">${received}</h3>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else {
                const successMessage = response_message[0];
                const ResponseMessageSuccess = `<h3 class="text-green">Registration ${successMessage}ful!</h3>`;
                let SuccessmessageBody = document.getElementById("return");
                SuccessmessageBody.innerHTML = ResponseMessageSuccess
                // redirect for login
                // window.location.href = "/login.html";
            }
    
          })
          .catch(err => console.log(err));
    });
}

// sign-in

let Token = {};

const signIn = () => {
document.getElementById("signin-form").addEventListener("submit", function (event) {
    event.preventDefault();
    const password = document.getElementById("password");
    const confirmation = document.getElementById("confirmation");
    console.log(`we are sending data ...`)
    
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    
    const credentials = {
        email: email.value,
        password: password.value,
    };
    //   fetch("http://api-thriller-diary.herokuapp.com/api/v1/auth/login/", {
    fetch("http://127.0.0.1:5000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        .then(res => res.json())
        .then(data => {
        console.log(data['token'])
        // user token
        Token.token = data['token'];
        const response_message  = Object.values(data);
        console.log(response_message[1])
        let received = response_message[1];
        
        if (received == `Check your details and try again`){
            // yell at the user
            const ResponseMessage =  `<h3 class="text-red">${received}</h3>`;
            let messageBody = document.getElementById("return");
            messageBody.innerHTML = ResponseMessage
        }
        else if (received == "Oops! check your details and try again")
        {
            const ResponseMessage =  `<h3 class="text-red">${received}</h3>`;
            let messageBody = document.getElementById("return");
            messageBody.innerHTML = ResponseMessage
        }
        else if (received == `Too short password(at least 4 characters needed)`){
            const ResponseMessage =  `<h3 class="text-red">check your details and try again</h3>`;
            let messageBody = document.getElementById("return");
            messageBody.innerHTML = ResponseMessage
        }
        else {
            const successMessage = response_message[0];
            const ResponseMessageSuccess = `<h3 class="text-green">Login successful!</h3>`;
            let SuccessmessageBody = document.getElementById("return");
            SuccessmessageBody.innerHTML = ResponseMessageSuccess
            // redirect for login
            window.location.href = "/dashboard";
        }

        })
        .catch(err => console.log(err));
    });

}

const getEnts = () => {
    alert(Token.token);
}