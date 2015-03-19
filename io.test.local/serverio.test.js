var io = require('socket.io')(6588);
var qrCode = require('qrcode-npm');

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};


var binding = {};

var connectedControllers = {};

io.on('connection', function (socket) {
	socket.on('leftstep', function() {
		io.sockets.connected[binding[(socket.id).toString()]].emit('leftstep');
	});
	socket.on('rightstep', function() {
		io.sockets.connected[binding[(socket.id).toString()]].emit('rightstep');
	});


	socket.on('get qr', function(callback) {
		var qr = qrCode.qrcode(4, 'M');
		var id = (socket.id).toString();
		qr.addData("http://test.local/mobile.html?auth_token=" + id);
		qr.make();
		callback(qr.createImgTag(10));
	});

	socket.on('bind', function(auth_token, callback) {
		// проверяем существует ли такой PC-клиент идентификатор сессии которого равен auth_token
		if(io.sockets.connected[auth_token] == undefined) {
			callback({error: "Предоставлен неверный токен"});
		} else {
			// связываем себя с клиентом
			binding[(socket.id).toString()] = auth_token;
			// добавляем себя в массив управляющих этим клиентом
			if(connectedControllers[auth_token] == undefined) {
				connectedControllers[auth_token] = [(socket.id).toString()];
			} else {
				connectedControllers[auth_token].push((socket.id).toString());
			}
			// шлём сообщение PC-клиенту что мы подключились к нему
			io.sockets.connected[auth_token].emit('binded');
			callback({

			});
		}
	});

	socket.on('disconnect', function() {
		// если мы являемся управляющим
		if((pc = binding[(socket.id).toString()]) != undefined) {
			// удаляем себя оттуда из забинженых управляющих для PC которым мы управляли
		    connectedControllers[pc].remove((socket.id).toString());
			// разрываем биндинг между собой и PC
			delete binding[(socket.id).toString()];
			io.sockets.connected[pc].emit('unbinded');
		}
		// если мы клиент на PC
		else if((controllers = connectedControllers[(socket.id).toString()]) != undefined) {
			// рассылаем всем управляющим сообщение о том что мы отключились и разрываем биндинг между собой и каждым из управляющих
			controllers.forEach(function(controllerId) {
				io.sockets.connected[controllerId].emit('unbinded');
				delete binding[controllerId];
			});
			// удаляем себя из объекта "клиент - управляющие"
			delete connectedControllers[(socket.id).toString()];
		}
	});
});