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

        
        const FetchedMessage =  ` 
                                <p class="text-white">
                                    Are you tired of writing your dairy on paper and having to carry 
                                    the book everywhere you go?
                                </p>
                                <p class="text-white">
                                    Imagine of accessing your Dairy from everywhere you want, at anytime you want 
                                    and suprisingly, not only with a computer but also a mobile device readily 
                                    available from your pocket or handbag..Or just borrow from a friend for a second.
                                </p>
                                <p class="text-white">
                                    Your Struggle Ends right now, right here! Click the button below to join us and get a chance to 
                                    enjoy our <b>free</b> services.
                                </p>
                                `

        message.innerHTML = FetchedMessage
        
        })})
        .catch(err => console.log(err));
    // your code here
 }, false);