
		
$(function() {
		chatwindow = document.getElementById("chatwindow");		

		// adding intro lines to chat window
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = "Welcome to Trav's Javascript Chat.";
		chatwindow.appendChild(pre);
		
		var pree = document.createElement("p");
		pree.style.wordWrap = "break-word";
		pree.innerHTML ="Enter a Username and Press Connect."
		chatwindow.appendChild(pree);	
	
		
						
		$.connection.hub.url = "http://sigrmsgserver.azurewebsites.net/signalr";
				
		var chat = $.connection.chatHub;
		
		//This is the function for signalR to call on a message
		chat.client.broadcastMessage = function (name, message) {
			
			
			
			var outmsg = name;
			outmsg.concat(": ", message);
			
			var pre = document.createElement("p");
			pre.style.wordWrap = "break-word";
			pre.innerHTML = name + ": " + message; 
			chatwindow.appendChild(pre);
					
		};
	
	var isready = 0;
	
	$('#uname').focus();
	
	$(document).keypress(function(event)
			{
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13')
				{
					if (isready == 0){
						startChat();
						isready = 1;
					}
				}	
			});	
		
	$("#connect_button").click(function() {
			startChat();
	});
		
	function startChat() {	
		$('#getusername').fadeOut(800);
		// for debugging
		$('#msgbox').focus();
		$.connection.hub.logging = true;
		//establish connection
		$.connection.hub.start().done(function() {
			// confirm connection established
			var isrdy = document.createElement("p");
			isrdy.style.wordWrap = "break-word";
			isrdy.innerHTML ="Server is connected! start Chatting!"; 
			chatwindow.appendChild(isrdy);
			
			//send a message on click of send button
			$("#send_button").click(function() {
				chat.server.send($('#uname').val(), $('#msgbox').val());
				$("#msgbox").val("").focus();
			});
			//send a message on enter keypress
			$(document).keypress(function(event)
			{
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13')
				{
					if (isready == 1){
						chat.server.send($('#uname').val(), $('#msgbox').val());
						$("#msgbox").val("").focus();
					}
				}
			});
		});
	}
});
				
			
		
		
	
	