import Cookies from "js-cookie";

export const isAdmin = (): boolean => {
    return (Cookies.get('role')) === 'admin';
}