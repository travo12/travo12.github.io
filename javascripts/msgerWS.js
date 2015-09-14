		var chatwindow;
		var wsUri;// = "ws://echo.websocket.org/";
		//var msgbox;
		var output;
		
		//document.getElementById("chatwindow").innerHTML = "hi<br>";
		
		
			
		
		chatwindow = document.getElementById("chatwindow");
				
		wsUri = document.getElementById("wsUri");
		wsUri.value = "ws://echo.websocket.org/";
		
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = "Welcome to Trav's Javascript Chat!";
		chatwindow.appendChild(pre);
		
		var pree = document.createElement("p");
		pree.style.wordWrap = "break-word";
		pree.innerHTML ="Enter a Username and Press Connect!"
		chatwindow.appendChild(pree);
		
		output = document.getElementById("msgbox");
		output.value = "it kind of works";
		
		
		
		function init()
		{
		//output = document.getElementById("msg_box");
		//output.value = "it kind of works";
		output.value = document.getElementById("msgbox").value;
		testwebsocket();
		}
		
		function testwebsocket()
		{
		websocket = new WebSocket(wsUri.value);
		websocket.onopen = function(evt) {onOpen(evt)};
		websocket.onclose = function(evt) {onClose(evt)};
		websocket.onmessage = function(evt) {onMessage(evt)};
		websocket.onerror = function(evt) {onError(evt)};
		}
		
		function onOpen(evt)
		{
		writeToScreen("CONNECTED");
		doSend(output.value);
		}
		
		function onClose(evt)
		{
		writeToScreen("DISCONNECTED");
		}
		
		function onMessage(evt)
		{
		writeToScreen('<span style = "color: blue;">RESPONSE: ' + evt.data+'</span>');
		websocket.close();
		}
		
		function onError(evt)
		{
		writeToScreen('<span style:"color:red;">ERROR:</span> ' + evt.data);
		}
		
		function doSend(message)
		{
		writeToScreen("SENT: " + message);
		websocket.send(message);
		}
		
		function writeToScreen(message)
		{
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = message;
		chatwindow.appendChild(pre);
		}
		
			function ChangeButtonName()
		{
		document.getElementById("send_button").innerHTML = "Send";
		init();
		
		}
						
		//window.addEventListener("load", init, false);