function getUrlVars()
	{
	    var vars = [], hash;
	    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	    for(var i = 0; i < hashes.length; i++)
	    {
	        hash = hashes[i].split('=');
	        vars.push(hash[0]);
	        vars[hash[0]] = hash[1];
	    }
	    return vars;
	}
	$(window).load(function() {
		var socket = io('http://localhost:6588/');
		var auth_token = getUrlVars()['auth_token'];
		console.log(auth_token);
		if(auth_token == undefined) {
			$('#content').html("<p style=\"color:red;\">Отсутствует токен</p>");
		} else {
			socket.on('connect', function () {
				socket.emit('bind', auth_token, function(result) {
					if(result.error != undefined) {
						$('#content').html("<p style=\"color:red;\">" + result.error + "</p>");
					} else {
						$('#btnl').on('click', function() {
							socket.emit('leftstep');
						});
						$('#btnr').on('click', function() {
							socket.emit('rightstep');
						});
					}
				});
			});
			socket.on('unbinded', function() {
				$('#content').html("<p style=\"color:red;\">Клиент отсоединился</p>");
			});
		}
	});
