const express = require('express');
const app = express();
const server = app.listen(8080);
const io = require('socket.io').listen(server);

//MIDDLEWARE
app.use(express.static('public'));

//MOTEUR DE TEMPLATE
app.set('view engine', 'ejs');

//VARIABLE
var idUser = 1;

//VIEWS
app.get('/messenger', (req, res) => {
	res.render('chat');
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