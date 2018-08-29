///////////////////////////////////
//  USER LOGOUT                 //
//////////////////////////////////

export const LogOut = () => {
    localStorage.removeItem('access_token');
    window.location.href = "/signin";
}