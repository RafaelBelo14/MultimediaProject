"use strict";

(function()
{
	window.addEventListener("load", main);
}());

const path = "../resources/IMAGES/BUTTONS/"

function main(){
	var mainSource=window.parent;
	var soundEfectsControlState = true;
	var gameMusicControlState = true;
	var exitBtn = document.getElementById("ExitBtn");
	var soundEfectsUp = document.getElementById("soundEfectsUp");
	var soundEfectsDown = document.getElementById('soundEfectsDown');
	var soundEfectsControl =document.getElementById('soundEfectsControl');
	var sliderSoundEfects = document.getElementById('sliderSoundEfectsImg');
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav")
    var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");
	var gameMusicUp = document.getElementById('gameMusicUp');
	var gameMusicDown = document.getElementById('gameMusicDown');
	var gameMusicControl = document.getElementById('gameMusicControl');
	var sliderGameMusic = document.getElementById('sliderGameMusicImg');
	var localDataBase = JSON.parse(localStorage.getItem('items'))
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var gameMusicVol = localDataBase.gameMusicVol;

	soundEfectsUp.addEventListener("click",soundEfectsListener);
	soundEfectsDown.addEventListener("click",soundEfectsListener);
	soundEfectsControl.addEventListener("click",soundEfectsListener);

	soundEfectsUp.addEventListener("mouseover", mouseOverLevels);
    soundEfectsDown.addEventListener("mouseover", mouseOverLevels);
    gameMusicUp.addEventListener("mouseover", mouseOverLevels);
    gameMusicDown.addEventListener("mouseover", mouseOverLevels);
    exitBtn.addEventListener("mouseover", mouseOverLevels);


	gameMusicUp.addEventListener("click",gameMusicListener);
	gameMusicDown.addEventListener("click",gameMusicListener);
	gameMusicControl.addEventListener("click",gameMusicListener);

	//CONTROLO DA MUSICA AO ENTRAR NESTE MENU

	if (soundEfectsVol == 0) {
		soundEfectsControlState = false;
		soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
	}

	if (gameMusicVol == 0) {
		gameMusicControlState = false;
		gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
	}

	audioOverBtn.volume = localDataBase.soundEfectsVol/100;
	audioBtn.volume = localDataBase.soundEfectsVol/100;

	//CONFORME O NIVEL DO VOLUME, A FUNÇÃO ATUALIZA A POSIÇÃO DO SLIDE

	updateSlider(sliderSoundEfects,sliderGameMusic,soundEfectsVol,gameMusicVol);

	function soundEfectsListener(ev){
		audioBtn.play();
		var aux = manageSoundEfects(ev,soundEfectsUp,soundEfectsDown,soundEfectsControl,soundEfectsVol,soundEfectsControlState,sliderSoundEfects);
		if (aux === true || aux === false) {
			soundEfectsControlState = aux;
			if (aux === false) {
				soundEfectsVol = 0;
				audioBtn.volume = 0;
				audioOverBtn.volume = 0;
			}
		}
		else {
			soundEfectsVol = aux;
			if (soundEfectsVol == 0) {
				soundEfectsControlState = false;
				audioBtn.volume = 0;
				audioOverBtn.volume = 0;
			}
			else{
				soundEfectsControlState = true;
				audioBtn.volume = soundEfectsVol/100;
				audioOverBtn.volume = soundEfectsVol/100;
			}
		}
		
	}

	function gameMusicListener(ev){
		audioBtn.play();
		var aux = manageGameMusic(ev,gameMusicUp,gameMusicDown,gameMusicControl,gameMusicVol,gameMusicControlState,sliderGameMusic);
		if (aux === true || aux === false) {
			gameMusicControlState = aux;
			if (aux === false) {
				gameMusicVol = 0
				localDataBase.controlaCutscene = 1;
			}
		}
		else {
			gameMusicVol = aux;
			if (gameMusicVol == 0) {
				gameMusicControlState = false;
			}
			else{
				gameMusicControlState = true;
				localDataBase.controlaCutscene = 0;
			}
		}
		mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
		localStorage.setItem('items',JSON.stringify(localDataBase));
	}

	exitBtn.onclick = function() {
		audioBtn.play();
		localDataBase.soundEfectsVol = soundEfectsVol;
    	localDataBase.gameMusicVol = gameMusicVol;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);
    }

    function mouseOverLevels(ev){
		audioOverBtn.play();
		setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
		}, 100);
	}
}

function updateSlider(sliderSoundEfects,sliderGameMusic,soundEfectsVol,gameMusicVol){
	sliderGameMusic.src  = path + "volumeBar" + gameMusicVol+".png";
	sliderSoundEfects.src  = path + "volumeBar" + soundEfectsVol+".png";
}

//ATUALIZA O SLIDE (MUDA AS IMAGENS) CONFORME AS AÇÕES NOS BUTÕES

function manageGameMusic(ev,gameMusicUp,gameMusicDown,gameMusicControl,gameMusicVol,gameMusicControlState,sliderGameMusic){
	switch (ev.currentTarget.id) {
		case "gameMusicUp":
			if (gameMusicVol == 0) {
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
			}
			if (gameMusicVol != 100) {
				gameMusicVol += 25;
				let imaName = path + "volumeBar" + gameMusicVol+".png";
				sliderGameMusic.src  = imaName;
			}
			return gameMusicVol;
		case "gameMusicDown":
			if (gameMusicVol != 0) {
				gameMusicVol -= 25
				let imaName = path + "volumeBar" + gameMusicVol+".png";
				sliderGameMusic.src  = imaName;
			}
			if (gameMusicVol == 0) {
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
			}
			else {
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
			}
			return gameMusicVol;
		case "gameMusicControl":
			if (gameMusicControlState) {
				sliderGameMusic.src  = path + "volumeBar0.png";
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
				return false
			}
			else {
				if (gameMusicVol == 0) {
					sliderGameMusic.src  = path + "volumeBar50.png";
					gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
					return 50;
				}
				let imaName = path + "volumeBar" + gameMusicVol+".png";
				sliderGameMusic.src  = imaName;
				gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
				return true
			}
			return
	}
}

function manageSoundEfects(ev,soundEfectsUp,soundEfectsDown,soundEfectsControl,soundEfectsVol,soundEfectsControlState,sliderSoundEfects){
	switch (ev.currentTarget.id) {
		case "soundEfectsUp":
			if (soundEfectsVol == 0) {
				soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
			}
			if (soundEfectsVol != 100) {
				soundEfectsVol += 25;
				let imaName = path + "volumeBar" + soundEfectsVol+".png";
				sliderSoundEfects.src  = imaName;
			}
			return soundEfectsVol;
		case "soundEfectsDown":
			if (soundEfectsVol != 0) {
				soundEfectsVol -= 25
				let imaName = path + "volumeBar" + soundEfectsVol+".png";
				sliderSoundEfects.src  = imaName;
			}
			if (soundEfectsVol == 0) {
				soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
			}
			else {
				soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
			}
			return soundEfectsVol;
		case "soundEfectsControl":
			if (soundEfectsControlState) {
				sliderSoundEfects.src  = path + "volumeBar0.png";
				soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
				return false
			}
			else {
				if (soundEfectsVol == 0) {
					sliderSoundEfects.src  = path + "volumeBar50.png";
					soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
					return 50;
				}
				let imaName = path + "volumeBar" + soundEfectsVol+".png";
				sliderSoundEfects.src  = imaName;
				soundEfectsControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWith.png')";
				return true
			}
	}
}
