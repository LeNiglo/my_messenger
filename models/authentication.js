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
    }
}