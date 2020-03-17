class auth {
    constructor() {
        this.authenticated = false;
        if (localStorage.getItem('employee_id') != null &&
            localStorage.getItem('employee_id') != undefined) {
            this.authenticated = true;
        }
    }

    login(cb) {
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new auth();