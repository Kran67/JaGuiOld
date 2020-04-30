/**
 * Cookie management class
 */
//#region Cookie
class Cookie {
    /**
     * Create/Modify a cookie
     * @param       {String}        name        the cookie name
     * @param       {String}        value       the cookie value
     * @param       {Number}        days        the cookie time duration (days)
     */
    static create(name, value, days) {
        //#region Variables déclaration
        let expires = null;
        //#endregion Variables déclaration
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
            expires = `; expires=${date.toGMTString()}`;
        }
        else {
            expires = String.EMPTY;
        }
        document.cookie = `${name}=${value}${expires}; path=/`;
    }
    /**
     * Read a cookie
     * @param       {String}        name        the cookie name
     * @returns     {String}        the cookie value
     */
    static read(name) {
        //#region Variables déclaration
        const nameEq = `${name}=`;
        const ca = document.cookie.split(';');
        //#endregion Variables déclaration
        ca.forEach(c => {
            c = c.trim();
            if (c.indexOf(nameEq) === 0) {
                return c.substring(nameEq.length, c.length);
            }
        });
        return String.EMPTY;
    }
    /**
     * Delete a cookie
     * @param       {String}        name        the cookie name
     */
    static erase(name) {
        create(name, String.EMPTY, -1);
    }
}
//#endregion Cookie
export { Cookie };