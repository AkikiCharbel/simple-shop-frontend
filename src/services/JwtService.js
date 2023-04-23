export const JwtService = {
    saveToken(token) {
      localStorage.setItem('bearer', token);
    },
    getToken() {
      localStorage.getItem('bearer');
    },
    destroyToken() {
      localStorage.removeItem('bearer')
    },
    setAdmin(param) {
      localStorage.setItem('isAdmin',param)
    },
    getAdmin(){
      return localStorage.getItem('isAdmin')
    },
    setUser(param) {
      localStorage.setItem('User',param)
    },
    getUser(){
      return localStorage.getItem('User')
    }
  }
  