'use strict'

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
