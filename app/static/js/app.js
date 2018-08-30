'use strict'



///////////////////////////////////
//  USER LOGOUT                 //
//////////////////////////////////

const LogOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = "/signin";
}