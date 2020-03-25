class Auth {
  constructor() {
    this.authenticated = false;
    this.username = '';
  }

  login(cb, username) {
    this.authenticated = true;
    this.username = username;
    cb();
  }

  logout(cb) {
    this.authenticated = false;
    cb();
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getUsername() {
    return this.username;
  }
}

export default new Auth();
