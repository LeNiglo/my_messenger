(function($) {
	var socket = io.connect('http://localhost:8080');
	//lancement de l'évenement 'add-friend' au clic
	$('.add-friend-btn').click(function(event) {
		event.preventDefault();
		socket.emit('requestFriend', {
			idFriend: $(this).attr('id-user')
		})
	});
	// gestion de l'évènement de bon envoi de la demande d'ajout d'ami à l'utilisateur
	socket.on('friendRequestSent', function() {
		alert('Request sent !');
	});
	// gestion de l'évènement d'affichage d'un ami
	socket.on('currentFriend', function(friend) {
		$('.friend-list').append($('<div>', {
			class: 'friend-list-item',
			text: friend.username,
			idUser: friend.id_user
		}));
	});
	// gestion de l'évènement de réception d'une demande d'ajout d'ami à l'ami
	socket.on('friendRequestReceived', function(requests) {
		for (var i = 0; i <requests.length; i++) {
			var friendRequestBlock = $('<div>', {
				class: 'friend-request',
				'idUser': requests[i].id_user
			}).append($('<p>', {
				class: 'friend-name',
				text: requests[i].username + ' asked to be your friend'
			})).append($('<button>', {
				class: 'btn accept-friend-btn',
				text: "Accept"
			})).append($('<button>', {
				class: 'btn refuse-friend-btn',
				text: "Refuse"
			}));
			$('.friend-request-list').append(friendRequestBlock);
		}
		//lancement de l'évenement 'accept-friend' au clic
		$('.accept-friend-btn').click(function(event) {
			event.preventDefault();
			$(this).parent().remove();
			socket.emit('acceptFriend', {
				idUser: $(this).parent().attr('idUser')
			})
		});
		$('.refuse-friend-btn').click(function(event) {
			event.preventDefault();
			$(this).parent().remove();
			socket.emit('refuseFriend', {
				idUser: $(this).parent().attr('idUser')
			})
		});
	});
	socket.on('newFriend', function() {
		alert('You have a new friend !');
	});
	socket.on('notFriend', function() {
		alert('Friend request rejected.');
	});
})(jQuery);

