const express = require('express');
const app = express();
const server = app.listen(8080);
const io = require('socket.io').listen(server);
const session = require('express-session')
const bodyParser = require('body-parser');
const pool = require('./config/db.js');
var auth = require('./models/authentication.js');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var ssn ;
app.use(session({secret: 'messengerMARL'}));
//MIDDLEWARE
app.use(express.static('public'));

//MOTEUR DE TEMPLATE
app.set('view engine', 'ejs');

//HOME
app.get('/', function(req, res) { 
    ssn = req.session;
    if(ssn.username) {
		res.redirect('/messenger')
    }
    else
    res.render('index.ejs');
});

//VIEWS
app.get('/messenger', (req, res) => {
	res.render('chat');
});

//LOGIN
app.post('/logIn', urlencodedParser, function(req, res) {
    ssn = req.session;
    if(ssn.username) {
       res.redirect('/messenger')
    }
    else
    {
        auth.checkAuth(req.body.password,req.body.log,pool).then((result) => {
        ssn.username = result[0].username;
        ssn.idUser = result[0].id_user;
        res.redirect('/');
       }, (erreur)=> {
           res.render('index.ejs',{errLog: "Invalid username or password."});
           return false;
       });
    }
   
});

//SIGNUP
app.post('/signUp', urlencodedParser, function(req, res) {
    ssn = req.session;
    if(ssn.username) {
    	res.redirect('/messenger')
    }
    else
    {
        if(auth.validateUsername(req.body.username))
        {
            if(auth.validateEmail(req.body.mail))
            {
                auth.checkIfExist(req.body.username,pool).then((result) => {
                    return auth.checkIfMailExist(req.body.mail,pool);
                }, (erreur)=> {
                    res.render('index.ejs',{errSign: "Username already used."});
                    return false;
                }).then((result) => {
                    if(!result) return false;
                    auth.insertToDb(req.body.username,req.body.mail,req.body.password,pool);
                    ssn.username = req.body.username;
                    auth.findUserInfo(ssn.username,pool).then((result) => {
                    ssn.idUser = result[0].id_user;
                    res.redirect('/');
                    }, (erreur)=> {
                        return false;
                    });
                }, (erreur)=> {
                    res.render('index.ejs',{errSign: "Mail already used."});
                    return false;
                });
            }
            else
            {
                res.render('index.ejs',{errSign: "Invalid email."});
            }
        }
        else
        {
            res.render('index.ejs',{errSign: "Invalid username."});
        }
    }
});

//LOGOUT
app.get('/logout',function(req,res){
 req.session.destroy(function(err) {
   if(err) {
     console.log(err);
   } else {
     res.redirect('/');
   }
 });
});

//SOCKET
io.sockets.on('connection', function (socket) {
	console.log(socket.id);
	var relationShip = require('./models/Friend.js');
	//vérification de l'existance de demande d'ajout d'amis en attente
	relationShip.findFriendRequest(idUser, function(currentRequests){
		if(currentRequests.length > 0) {
			socket.emit('friendRequestReceived', currentRequests);
		}
	});
	//Récupération de la liste d'amis
	relationShip.findFriends(idUser, function(friends){
		console.log(friends);
		if(friends.length > 0) {
			for(var i in friends) {
		    	socket.emit('currentFriend', friends[i]);
		    }
		}
	});

	//envoi d'une demande d'ajout d'amis
	socket.on('requestFriend', function(friend) {
		relationShip.sendFriendRequest(friend.idFriend, idUser, function(){
			socket.emit('friendRequestSent');
		})
	});
	//mise à jour de la relation d'amitié à l'acceptation de la demande et ajout dans la liste d'amis sur la page
	socket.on('acceptFriend', function(sender) {
		relationShip.addFriend(sender.idUser, idUser, function(friend){
			socket.emit('newFriend');
		})
		relationShip.findAFriend(sender.idUser, function(friend) {
			socket.emit('currentFriend', friend[0]);
		});
	});
	//mise à jour de la relation d'amitié au refus de la demande
	socket.on('refuseFriend', function(sender) {
		relationShip.refuseFriend(sender.idUser, idUser, function(){
		socket.emit('notFriend');
		})
	});
});
