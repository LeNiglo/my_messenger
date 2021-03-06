module.exports = {
   checkIfExist: function(name,bdd)
   {
        console.log("name");
        var sql = "SELECT username FROM user WHERE username = \""+name+"\"";
        return new Promise((resolve, reject) => {
            bdd.query(sql, function(err, result) { 
                if (err) reject(err);
                if(result.length  != 0) reject(false);
                resolve(true);
            });
        });
    },
    checkIfMailExist: function(mail,bdd)
    {
        console.log("mail");
        var sql = "SELECT username FROM user WHERE mail = \""+mail+"\"";
        return new Promise((resolve, reject) => {
            bdd.query(sql, function (err, result) {
                if (err) reject(err);            
                if(result.length  != 0) reject(false);
                resolve(true);
            });
        });
    },
    checkAuth : function(passwd,log,bdd)
    {
        console.log("check");
        var sql = "SELECT password,username,id_user FROM user WHERE mail = \""+log+"\" OR username  = \""+log+"\"";
        return new Promise((resolve, reject) => {
            bdd.query(sql, function (err, result) {
                if (err) throw reject(err);
                if (result.length  != 0) {
                    if(result[0].password != passwd) reject(false) 
                    resolve(result);
                }
                reject(false);
            });
        });
    },
    insertToDb : function(name,mail,passwd,bdd)
    {
        var sql = "INSERT INTO `user` (`username`,`mail`,`password`) VALUES ('"+name+"','"+mail+"','"+passwd+"')";
        bdd.query(sql, function (err, result) {
            if (err) throw err;
        });
    },
    findUserInfo : function(name, bdd)
    {
        var sql = "SELECT username, id_user FROM user WHERE username  = \""+name+"\"";
        return new Promise((resolve, reject) => {
            bdd.query(sql, function (err, result) {
                if (err) throw reject(err);
                resolve(result);
            });
        });
    },
    validateEmail : function(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return email.match(re);
    },
    validateUsername : function(username) {
        var pattern =/^[a-zA-Z0-9_-]+$/;
        return username.match(pattern);
    }
}