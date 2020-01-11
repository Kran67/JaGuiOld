/**
 * Cookie management class
 */
class Cookie {
    /**
     * Create/Modify a cookie
     * @param       {String}        name        the cookie name
     * @param       {String}        value       the cookie value
     * @param       {Number}        days        the cookie time duration (days)
     */
    static create(name, value, days) {
        let expires = null;
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
        const nameEq = `${name}=`;
        const ca = document.cookie.split(";");
        //while (c.charAt(0) === String.SPACE) {
        //    c = c.substring(1, c.length);
        //}
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
export { Cookie };