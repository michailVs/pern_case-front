export default class User {
    constructor() {
        this._isAuth = false
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    get isAuth() {
        return this._isAuth
    }
}