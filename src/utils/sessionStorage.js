export const setSession = () => {
    sessionStorage.setItem('isLoggedIn',true);
}

export const getSession = () => {
    return sessionStorage.getItem('isLoggedIn');
}