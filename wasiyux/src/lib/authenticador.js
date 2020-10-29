
    
    function Login(pswd, pass){
        let auth = false
       
        if (pswd === pass) auth = true
        
        sessionStorage.setItem('validate', auth )
        return auth
    }

    function Logout(){
                 
        sessionStorage.removeItem('validate')
        
    }

    function isAuthorization() {
        
        const auth = (sessionStorage.getItem('validate')) ? sessionStorage.getItem('validate') : false
        return auth

    }

