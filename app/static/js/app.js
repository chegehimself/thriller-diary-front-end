'use strict'

/////////////////////////////////////////////////////
//   HOMEPAGE WELCOME MESSAEGE                     //
/////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    // fetch for landing page
let message = document.getElementById('welcoming-message');

// const WelcomeUrl = '//api-thriller-diary.herokuapp.com/api/v1/auth/';
const WelcomeUrl = '//api-thriller-diary.herokuapp.com/api/v1/auth/';
fetch(`${WelcomeUrl}`, {
    method: "GET"
})

    .then((response)=>{
        response.json().then((data) => {
        console.log(data)
        const warmWelcome = Object.values(data.Message)

        const FetchedMessage =  `<h2 class="text-white">${warmWelcome}</h2>`

        message.innerHTML = FetchedMessage
        
        })})
        .catch(err => console.log(err));
    // your code here
 }, false);

// signup
// SignUp user

/////////////////////////////////////////////////////
//   USER SIGNUP                                   //
/////////////////////////////////////////////////////
const signUp = () => {
document.getElementById("signup-form").addEventListener("submit", (event) => {
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
    //   fetch("//api-thriller-diary.herokuapp.com/api/v1/auth/signup/", {
      fetch("//api-thriller-diary.herokuapp.com/api/v1/auth/signup", {
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
                const ResponseMessage =  `<h3 class="text-red">Invalid username.Try again</h3>`;
                let messageBody = document.getElementById("return");
                messageBody.innerHTML = ResponseMessage
            }
            else {
                const successMessage = response_message[0];
                const ResponseMessageSuccess = `<h3 class="text-green">Registration ${successMessage}ful!</h3>`;
                let SuccessmessageBody = document.getElementById("return");
                SuccessmessageBody.innerHTML = ResponseMessageSuccess
                // redirect for login
                window.location.href = "/signin";
            }
    
          })
          .catch(err => console.log(err));
    });
}

/////////////////////////////////////////////////////
//   USER LOGOIN                                   //
/////////////////////////////////////////////////////

let Token = {};

const signIn = () => {
document.getElementById("signin-form").addEventListener("submit", (event) => {
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
        console.log(data['token'])
        // user token
        const token = data['token']
        localStorage.setItem('access_token', JSON.stringify(token));
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
            // redirect for dasho
            window.location.href = "/dashboard";
        }

        })
        .catch(err => console.log(err));
    });

}

/////////////////////////////////////////////////////
//  FETCH ALL ENTRIES                              //
/////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const token = JSON.parse(localStorage.getItem('access_token'));
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
            let entries_view = document.getElementById('tbody');
            const entries = Object.values(data['Entries'])
            if (entries.length == 0){
                entries_view.innerHTML = `<div><p>Your entries will appear here</p></div>`;
            }
            else{
                let all_entries = `<tr>
                                   <th>Entry</th>
                                   <th>Date Created</th>
                                   <th class="action" colspan="3">Actions</th>
                                   </tr>`;
                entries.forEach((single) => {
                    all_entries +=
                    `<tr>
                    <td class="tdata">${single.title}</td>
                    <td class="tdata">${single.date_created}</td>
                    <td class="view tdata"><li><a href="/view/${single.id}"> View</a></li></td>
                    <td class="edit tdata"><li><a href="/modify/${single.id}"> Edit</a></li></td>
                    </tr>`;
                })
                entries_view.innerHTML = all_entries;
            }
        })})
            .catch(err => console.log(err));
});


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
        console.log(data.status)
        if (data.status == 401){
            errors.innerHTML = `<h3 class="text-red">Please Input all fields correctly!</h3>`;
        }
        else if (data.status == `success`){
            errors.innerHTML = `<h3 class="text-green">Entry Added!</h3>`;
        }
}).catch(err => console.log(err));
});
}

/////////////////////////////////////////////////////
//  FETCH USER PROFILE                             //
/////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    const token = JSON.parse(localStorage.getItem('access_token'));
    const EntriesUrl = '//api-thriller-diary.herokuapp.com/api/v1/users/profile';
    fetch(`${EntriesUrl}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "access_token": token
        }
    })

    .then((response)=>{
        response.json().then((data) => {
            const user = Object.values(data['Profile'])
            console.log(user[1])
            const userinfo = document.getElementById("name");
            const usermail = document.getElementById("email");
            userinfo.innerHTML = `${user[1]}!`;
            usermail.innerHTML = `${user[2]}!`;

        })})
            .catch(err => console.log(err));
});