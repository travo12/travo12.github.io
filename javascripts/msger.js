

//function ChangeButtonName()
//		{
//		document.getElementById("send_button").innerHTML = "Send";
//		}

/*		$(function()
	{
		var connection = $.connection("http://localhost:8080/signalr");
		connection.start()
		.done(function(){
			connection.send("Hi There!");
			
		})
		.fail(function() {
			alert("Error connecting to realtime service");
		});
		
		
	}); */
		// above didnt work, but still useful code
	//	var username;
		
		chatwindow = document.getElementById("chatwindow");		
		//wsUri = document.getElementById("uname");
		//wsUri.value = "http://localhost:8080";
		
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = "Welcome to Trav's Javascript Chat!";
		chatwindow.appendChild(pre);
		
		var pree = document.createElement("p");
		pree.style.wordWrap = "break-word";
		pree.innerHTML ="Enter a Username and Press Connect!"
		chatwindow.appendChild(pree);	
		
	$(function() {
		//$.connection.hub.url = "http://travserver.cloudapp.net:8080/signalr";
		
				
		$.connection.hub.url = "http://sigrmsgserver.azurewebsites.net/signalr";
		
		//$.connection.hub.url = "http://localhost:49795";
						
		var chat = $.connection.chatHub;
		
		chat.client.broadcastMessage = function (name, message) {
			
			
			
			var outmsg = name;
			outmsg.concat(": ", message);
			
			var pre = document.createElement("p");
			pre.style.wordWrap = "break-word";
			pre.innerHTML = name + ": " + message; 
			chatwindow.appendChild(pre);
					
		};
		
		
		
		$('#uname').val(prompt('Enter your name:', ''));
		
		$('#msgbox').focus();
		
		$.connection.hub.logging = true;
		
		$.connection.hub.start().done(function() {
			
			var isrdy = document.createElement("p");
			isrdy.style.wordWrap = "break-word";
			isrdy.innerHTML ="Server is connected! start Chatting!"; 
			chatwindow.appendChild(isrdy);
			
			
			$("#send_button").click(function() {
				
				chat.server.send($('#uname').val(), $('#msgbox').val());
				
				$("#msgbox").val("").focus();
			
			});
			
			$(document).keypress(function(event){
		
				var keycode = (event.keyCode ? event.keyCode : event.which);
				if(keycode == '13'){
					chat.server.send($('#uname').val(), $('#msgbox').val());
					
					$("#msgbox").val("").focus();
				
				}
				
			});
			
		
		});
	
	});
				
			
		
		
	
	