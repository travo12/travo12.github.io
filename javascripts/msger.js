
		
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
	
		
						
		$.connection.hub.url = "http://sigrmessageserver.azurewebsites.net/signalr";
				
		var chat = $.connection.chatHub;
		
		//This is the function for signalR to call on a message
		
		chat.client.broadcastMessage = function (message) {
			
			
				
			var pre = document.createElement("p");
			pre.style.wordWrap = "break-word";
			pre.innerHTML = message; 
			chatwindow.appendChild(pre);
					
		};  
		
		chat.client.ServerMessage = function (message) {
			
			
			
			
			
			var pre = document.createElement("p");
			pre.style.wordWrap = "break-word";
			pre.innerHTML = message; 
			pre.style.color = "magenta";
			chatwindow.appendChild(pre);
					
		};
		
	
	var isready = 0;
	var username;
	
	$('#uname').focus();
	
	$(document).keypress(function(event)
			{
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13')
				{
					if (isready == 0){
						isready = 1;
						startChat();
						
					}
				}	
			});	
		
	$("#connect_button").click(function() {
			startChat();
	});
		
	function startChat() {	
		$('#getusername').fadeOut(800);
		$('#msgbox').focus();
		// for debugging		
		$.connection.hub.logging = true;
		//establish connection
		$.connection.hub.start().done(function() {
			// confirm connection established
			var isrdy = document.createElement("p");
			isrdy.style.wordWrap = "break-word";
			isrdy.innerHTML ="Server is connected! start Chatting!"; 
			chatwindow.appendChild(isrdy);
			
			username = $("#uname").val();
			
			chat.server.join(username);
			
			//send a message on click of send button
			$("#send_button").click(function() {
				chat.server.send(username, $('#msgbox').val());
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
	window.onbeforeunload = closingCode;
	function closingCode(){
	   chat.server.leave(username);
	   return null;
	}
	
});
				
			
		
		
	
	