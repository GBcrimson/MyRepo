$('.Micro_Act').click(function() {
 if ($(this).hasClass("Off")) 
 	$(this).removeClass("Off").addClass("On")
  else 
  	$(this).removeClass("On").addClass("Off")
 }) 