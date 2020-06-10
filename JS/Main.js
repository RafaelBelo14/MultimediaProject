"use strict";

(function()
{
	window.addEventListener("load", main);
}());

const path = "HTML/"

function main(){

	var texto = document.getElementById("p1");
	var punch = document.getElementById("punch");
	var punch_stand = document.getElementById("punch_stand");
	var setUpObject = new setUp();

	// INICIA AUDIO 

	var audio = document.getElementsByTagName('audio')[0];
	audio.controls = true;
	audio.onplay = function() {
		audio.controls = false;
		texto.style.display = "none";
	};
	audio.play().catch(function(){
		console.log("Audio started playing");
	});
	audio.volume = 0.10;

	// INICIA O ENVIO DE MESSAGENS PELO postMessage

  	var iframe = document.getElementById('mainIframe');
	window.addEventListener("message", windowListener);
	if (localStorage.getItem("items") === null) {
		localStorage.setItem('items',JSON.stringify(setUpObject));
	}
	else {
		var localDataBase = JSON.parse(localStorage.getItem('items'))
		localDataBase.soundEfectsVol = 50;
		localDataBase.gameMusicVol = 50;
		localStorage.setItem('items',JSON.stringify(localDataBase));
	}
    function windowListener(ev)
    {
		//MUDA O VOLUME CONFORME A MENSAGEM
		var message = ev.data;
		if (message.indexOf("SOM") != -1) {
			var messageSplit = message.split("|")
			if (messageSplit[1] == "MENU") {
				audio.volume = Number(messageSplit[2])/400;
			}
		}

		//SE O UTILIZADOR SAIR DO JOGO
		else if (message.indexOf("end") != -1){
			audio.controls = false;
			iframe.parentNode.removeChild(iframe);
			texto.style.display = "block";
			texto.innerHTML = "THANKS FOR PLAYING!";
			texto.style.textAlign = "center";
			texto.style.fontSize = "60px";
			punch.style.display = "block";
			setTimeout(() => {
				punch.style.display = "none";
				punch_stand.style.display = "block";
			}, 2000);
			

		}
		else {
			localDataBase = JSON.parse(localStorage.getItem('items'));
			if (localDataBase.gameMusicVol == 0) {
				audio.muted = false;
			}
			//MUDA A IFRAME
			iframe.src = path+message;
		}
	}
}
