all_images = new Array (
"img/vent.jpg",
"img/vent1.jpg",
"img/vent2.jpg",
"img/vent3.jpg");
var ImgNum = 0;
var ImgLength = all_images.length - 1;
var delay = 1000;
var lock = false;
var run;
var a=1;
function chgImg(direction) {
 if (document.images) {
  ImgNum = ImgNum + direction;
  if (ImgNum > ImgLength) { ImgNum = 0; }
  if (ImgNum < 0) { ImgNum = ImgLength; }
  document.slide_show.src = all_images[ImgNum];
 }
}



	$(window).load(function() {
		// var socket = io('http://localhost:6588/');
		// socket.emit('get qr', function(qr) {
		// 		$('#qr').html(qr);
		// });
		// socket.on('toggle', function() {
		// 	if (lock == true) {
		// 	 	 lock = false;
		// 	 	 window.clearInterval(run);
		// 	 	}
		// 	 else {
		// 		  lock = true;
		// 	  	run = setInterval("chgImg(1)", delay);
		// 	 }
		// });
		// socket.on('binded', function() {
		// 	$("#messages").append("<li style=\"color: green;\">К Вам присоединился оппонент</li>");
		// });
		// socket.on('unbinded', function() {
		// 	$("#messages").append("<li style=\"color: red;\">Оппонент отсоединился</li>");
		// });
	});

