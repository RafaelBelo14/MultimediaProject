"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main(){
	var mainSource=window.parent;
	var exitBtn = document.getElementById("ExitBtn");

	var gameMusicControlState = true;
	var soundEfectsControlState = true;

	var gameMusicControl = document.getElementById('gameMusicControl');
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav");
    var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");

	var localDataBase = JSON.parse(localStorage.getItem('items'));
	var gameMusicVol = localDataBase.gameMusicVol;
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var controlaCutscene = localDataBase.controlaCutscene;

	//CONTROLO DA MUSICA AO ENTRAR NESTE MENU

	if (localDataBase.controlaCredits == 0){
		if (localDataBase.controlaCutscene == 1){
            gameMusicVol = 50;
            soundEfectsVol = 50;
            localDataBase.gameMusicVol = gameMusicVol;
            localDataBase.soundEfectsVol = soundEfectsVol;
            var mainSource=window.parent;
            localStorage.setItem('items',JSON.stringify(localDataBase));
			mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
		}
		else {
			if (gameMusicVol == 0) {
				gameMusicControlState = false;
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
			}
	
			if (soundEfectsVol == 0) {
				soundEfectsControlState = false;
			}
		}
	}
	else {
		if (gameMusicVol == 0) {
			gameMusicControlState = false;
			gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
		}

		if (soundEfectsVol == 0) {
			soundEfectsControlState = false;
		}
	}
	
	audioOverBtn.volume = localDataBase.soundEfectsVol/100;
    audioBtn.volume = localDataBase.soundEfectsVol/100;
	gameMusicControl.addEventListener("click",gameMusicListener);

	exitBtn.addEventListener("mouseover", function(){
		audioOverBtn.play();
		setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
		}, 100);
	});

	//SAIR DO MENU

	exitBtn.onclick = function() {
		audioBtn.play();
		localDataBase.gameMusicVol = gameMusicVol;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);
	}
	
	//CONFIGURAÇÃO DO SOM DO JOGO E EFEITOS

    function gameMusicListener(ev){
		var aux = manageGameMusic(ev,gameMusicControl,gameMusicControlState);
		if (aux === true || aux === false) {
			gameMusicControlState = aux;
			if (aux === false) {
				gameMusicVol = 0
			}
		}
		else {
			gameMusicVol = aux;
			if (gameMusicVol == 0) {
				gameMusicControlState = false;
			}
			else{
				gameMusicControlState = true;
			}
		}

		if (soundEfectsVol == 0){
			soundEfectsControlState = true;
			audioOverBtn.volume = 0.5;
			audioBtn.volume = 0.5;
			soundEfectsVol = 50;
			controlaCutscene = 0;
		}
		else{
			soundEfectsControlState = false;
			audioOverBtn.volume = 0;
			audioBtn.volume = 0;
			soundEfectsVol = 0;
			controlaCutscene = 1;
		}

		localDataBase.gameMusicVol = gameMusicVol;
		localDataBase.soundEfectsVol = soundEfectsVol;
		localDataBase.controlaCutscene = controlaCutscene;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
	}

	function manageGameMusic(ev,gameMusicControl,gameMusicControlState){
		if (gameMusicControlState) {
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
				return false
			}
			else {
				if (gameMusicVol == 0) {
					gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
					return 50;
				}
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
				return true
			}
	}
}
