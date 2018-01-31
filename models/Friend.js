let connection = require('../config/db');

class Friend {
	static findFriends(idUser, callback) {
		connection.query('SELECT friends.id_user, user.username FROM friends LEFT JOIN user ON user.id_user=friends.id_user WHERE (id_friend = ? OR friends.id_user = ?) AND invitation = ? ORDER BY user.username', [idUser, idUser, 'accepted'], (err, result) => {
			if (err) throw err;
			callback(result);
		});
	}
	static findAFriend(idUser, callback) {
		connection.query('SELECT * FROM user WHERE id_user = ?', [idUser], (err, result) => {
			if (err) throw err;
			callback(result);
		});
	}
	static sendFriendRequest(idFriend, idUser, callback) {
		connection.query('INSERT INTO friends SET id_user = ?, id_friend = ?, invitation = ?', [idUser, idFriend, 'standBy'], (err, result) => {
			if (err) throw err;
			callback(result);
		});
	}
	static findFriendRequest(idUser, callback) {
		connection.query('SELECT friends.id_user, user.username FROM friends LEFT JOIN user ON user.id_user=friends.id_user WHERE id_friend = ? AND invitation = ?', [idUser, 'standBy'], (err, result) => {
			if (err) throw err;
			callback(result);
		});
	}
	static addFriend(idFriend, idUser, callback) {
		connection.query('UPDATE friends SET invitation = ? WHERE id_friend = ? AND id_User = ?', ['accepted', idUser, idFriend], (err, result) => {
			if (err) throw err;
			callback(result);
		});
	}
	static refuseFriend(idFriend, idUser, callback) {
		connection.query('UPDATE friends SET invitation = ? WHERE id_friend = ? AND id_User = ?', ['refused', idUser, idFriend], (err, result) => {
			if (err) throw err;
			callback(result);
		});
	}
}

module.exports = Friend;