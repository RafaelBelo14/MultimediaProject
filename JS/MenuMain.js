"use strict";

(function()
{
	window.addEventListener("load", main);
}());

//MENU PRINCIPAL

function main(){
	var mainSource=window.parent;

	var gameMusicControlState = true;
	var soundEfectsControlState = true;

	var easterEggBtn = document.getElementById('easterEgg');
	var easterEggText = document.getElementById('easterEggText');
	var easterEggPhoto = document.getElementById('easterEggPhoto');
    var popup1 = document.getElementById('popupStartButton');
    var popup2 = document.getElementById('popupExitButton');
    var btnStory = document.getElementById("StoryBtn");
    var btn1vs1 = document.getElementById("MultiBtn");
	var btnRanking = document.getElementById("RankingBtn");
	var btnOptions = document.getElementById("OptionsBtn");
	var btnHelp = document.getElementById("HelpBtn");
	var btnCredits = document.getElementById("CreditsBtn");
	var loginBtn = document.getElementById("LoginBtn");
	var loadBtn = document.getElementById("LoadBtn");
	var btnExit = document.getElementById("ExitBtn");
	var btnYes = document.getElementById("YesBtn");
	var btnNo = document.getElementById("NoBtn");
	var gameMusicControl = document.getElementById('gameMusicControl');
	var audioStory = new Audio("../resources/SOUND/SF3_Effects/SFA3_34 - That's it, buddy!.wav");
    var audio1vs1 = new Audio("../resources/SOUND/SF3_Effects/SFA3_07 - It's showtime.wav");
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav");
	var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");
	var esaterEggFound = new Audio("../resources/SOUND/SF3_Effects/Konami.mp3");

	var localDataBase = JSON.parse(localStorage.getItem('items'));
	var gameMusicVol = localDataBase.gameMusicVol;
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var controlaCutscene = localDataBase.controlaCutscene;
	localDataBase.controlaCredits = 1;

	//CONTROLO DA MUSICA AO ENTRAR NESTE MENU

	if (gameMusicVol == 0) {
		gameMusicControlState = false;
		gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
	}

	if (soundEfectsVol == 0) {
		soundEfectsControlState = false;
	}

	audioStory.volume= localDataBase.soundEfectsVol/100;
    audio1vs1.volume= localDataBase.soundEfectsVol/100;
    audioBtn.volume = localDataBase.soundEfectsVol/100;
	audioOverBtn.volume = localDataBase.soundEfectsVol/100;
	esaterEggFound.volume = localDataBase.soundEfectsVol/100;
	

	btnStory.addEventListener("mouseover", mouseOverLevels);
    btn1vs1.addEventListener("mouseover", mouseOverLevels);
    btnRanking.addEventListener("mouseover", mouseOverLevels);
    btnOptions.addEventListener("mouseover", mouseOverLevels);
    btnHelp.addEventListener("mouseover", mouseOverLevels);
    btnCredits.addEventListener("mouseover", mouseOverLevels);
    loginBtn.addEventListener("mouseover", mouseOverLevels);
    loadBtn.addEventListener("mouseover", mouseOverLevels);
    btnExit.addEventListener("mouseover", mouseOverLevels);
    btnYes.addEventListener("mouseover", mouseOverLevels);
    btnNo.addEventListener("mouseover", mouseOverLevels);

	gameMusicControl.addEventListener("click",gameMusicListener);

	easterEggBtn.onclick = function(){
		easterEggText.style.display = "block";
		easterEggPhoto.style.display = "block";
		esaterEggFound.play();
	}

	//AÇÕES AO CLICAR EM CADA BOTÃO

	btnExit.onclick = function() {
		audioBtn.play();
		popup2.style.display = "block";
    }
    btnStory.onclick = function() {
    	audioBtn.play();
    	audioStory.play();
        popup1.style.display = "block";
    }
    btn1vs1.onclick = function() {
    	if (audio1vs1.volume != 0){
    		audioBtn.play();
	    	audio1vs1.play();
	    	setTimeout(function(){  mainSource.postMessage('Menu1vs1.html', '*'); }, 1500);
    	}
    	else{
    		mainSource.postMessage('Menu1vs1.html', '*');
    	}
    }
	btnRanking.onclick = function() {
		audioBtn.play();
		setTimeout(function(){  mainSource.postMessage('MenuRanking.html', '*'); }, 200);
    }
	btnOptions.onclick = function() {
		audioBtn.play();
		setTimeout(function(){  mainSource.postMessage('MenuOptions.html', '*'); }, 200);
    }
	btnCredits.onclick = function() {
		audioBtn.play();
		setTimeout(function(){  mainSource.postMessage('MenuCredits.html', '*'); }, 200);
    }
	btnHelp.onclick = function() {
		audioBtn.play();
		setTimeout(function(){  mainSource.postMessage('MenuHelp.html', '*'); }, 200);
    }
	loginBtn.onclick = function() {
		audioBtn.play();
        setTimeout(function(){  mainSource.postMessage('MenuLogin.html', '*'); }, 200);
    }
	loadBtn.onclick = function() {
		audioBtn.play();
        setTimeout(function(){  mainSource.postMessage('MenuLoad.html', '*'); }, 200);
    }
    btnYes.onclick = function(){
    	audioBtn.play();
    	setTimeout(function(){  mainSource.postMessage("end", "*"); }, 200);
    }
    btnNo.onclick = function(){
    	audioBtn.play();
    	popup2.style.display = "none";
    }
    window.onclick = function(ev) {
        if (ev.target == popup1) {
            popup1.style.display = "none";
        }
        else if (ev.target == popup2) {
            popup2.style.display = "none";
        }
	}
	
	//CONFIGURAÇÃO SOM DO JOGO E EFEITOS

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
			audio1vs1.volume = 0.5;
			audioStory.volume = 0.5;
			audioBtn.volume = 0.5;
			audioOverBtn.volume = 0.5;
			esaterEggFound = 0.5;
			soundEfectsVol = 50;
			controlaCutscene = 0;
		}
		else{
			soundEfectsControlState = false;
			audio1vs1.volume = 0;
			audioStory.volume = 0;
			audioBtn.volume = 0;
			audioOverBtn.volume = 0;
			esaterEggFound = 0;
			soundEfectsVol = 0;
			controlaCutscene = 1;
		}
		
		localDataBase.soundEfectsVol = soundEfectsVol;
		localDataBase.gameMusicVol = gameMusicVol;
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

	function mouseOverLevels(ev){
		audioOverBtn.play();
		setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
		}, 100);
	}
}
