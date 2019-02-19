module.exports = {
    validatePassword(password) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
        if(!strongRegex.test(password)){
            return false;
        }
        else{
            return true;
        }
    }
}