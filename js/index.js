'use strict'

// fetch for landing page
let message = document.getElementById('welcoming-message');

const WelcomeUrl = 'http://api-thriller-diary.herokuapp.com/api/v1/auth/';
fetch(`${WelcomeUrl}`)

    .then((response)=>{
        response.json().then((data) => {
        const warmWelcome = Object.values(data.Message.Message[0])

        const FetchedMessage =  `<h2 class="text-white">${warmWelcome}</h2>`

        message.innerHTML = FetchedMessage
        
        })})
        .catch(err => console.log(err));
