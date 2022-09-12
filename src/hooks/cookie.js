import { Cookies } from 'react-cookie'

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
    return cookies.set(name, value, { path: '/' });
}

export const getCookie = (name) => {
    return cookies.get(name);
}

export const removeCookie = (name) => {
    console.log("remove cookie")
    return cookies.remove(name, { path: "/" });
}