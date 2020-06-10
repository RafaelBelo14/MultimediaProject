"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var gameMusicControlState = true;
	var soundEfectsControlState = true;
	var mainSource=window.parent;
	var playerFigure = document.getElementsByTagName('figure1');
	var popup = document.getElementById('popupStartButton');
	var exitBtn = document.getElementById("ExitBtn");
	var userInput = document.getElementById('userInput');
	var yesBtn = document.getElementById('Yes');
	var noBtn = document.getElementById("No");
	var startBtn = document.getElementById("StartGameBtn");
	var localDataBase = JSON.parse(localStorage.getItem('items'));
	var gameMusicVol = localDataBase.gameMusicVol;
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var controlaCutscene = localDataBase.controlaCutscene;
	var actUser;
	var audio = new Audio("../resources/SOUND/SF3_Effects/SFA3_13 - Go for it, man!.wav");
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav");
	var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");

	//CONTROLO DA MUSICA AO ENTRAR NESTE MENU

	if (gameMusicVol == 0) {
		gameMusicControlState = false;
		gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
	}

	if (soundEfectsVol == 0) {
		soundEfectsControlState = false;
	}

	audio.volume= localDataBase.soundEfectsVol/100;
    audioBtn.volume = localDataBase.soundEfectsVol/100;
    audioOverBtn.volume = localDataBase.soundEfectsVol/100;
	audio.play();

	startBtn.addEventListener("click", startClick);
	yesBtn.addEventListener("click", yesClick);
	noBtn.addEventListener("click", noClick);
	exitBtn.addEventListener("click", exitClick);

	gameMusicControl.addEventListener("click",gameMusicListener);

	startBtn.addEventListener("mouseover", mouseOverLevels);
    exitBtn.addEventListener("mouseover", mouseOverLevels);
    yesBtn.addEventListener("mouseover", mouseOverLevels);
	noBtn.addEventListener("mouseover", mouseOverLevels);

	//SÓ ENTRA NO JOGO SE O USER INSERIR UM NOME

	function startClick(ev) {
		audioBtn.play();
		if (userInput.value === "") {
			window.alert("NEED TO INSERT TEXT");
			return;
		}
		var flag = saveUser(mainSource,actUser,localStorage,userInput,localDataBase);
		if (!flag) {
			mainSource.postMessage('../LEVEL/HTML/Part1.html', '*');
		}
	}
	function yesClick(ev) {
		audioBtn.play();
		saveUser(mainSource,actUser,localStorage,userInput,localDataBase);
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);

	}

	function noClick() {
		audioBtn.play();
		localDataBase.gameMusicVol = gameMusicVol;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);
	}

	function exitClick() {
		audioBtn.play();
		localDataBase.gameMusicVol = gameMusicVol;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		goBack(userInput,mainSource,popup);
	}

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
			audio.volume = 0.5;
			audioBtn.volume = 0.5;
			soundEfectsVol = 50;
			controlaCutscene = 0;
		}
		else{
			soundEfectsControlState = false;
			audioOverBtn.volume = 0;
			audio.volume = 0;
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

	function mouseOverLevels(ev){
		audioOverBtn.play();
		setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
		}, 100);
	}
}

function goBack(userInput,mainSource,popup) {
	if (userInput.value == "") {
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);
	}
	else {
		popup.style.display = "block";
	}
	window.onclick = function(ev) {
        if (ev.target == popup) {
            popup.style.display = "none";
        }
    }
}

//GUARDA O USER NOVO (NOME, DATA DE CRIAÇÃO) E VERIFICA SE JÁ EXISTE ALGUM

function saveUser(mainSource,actUser,localStorage,userInput,localDataBase, playerFigure) {
	var actUser = userInput.value;
	var d = new Date();
	var month = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "June", "July","Aug.","Sept.","Oct.","Nov.","Dec.",];
	var day = d.getDate();
	switch (day) {
		case 1:
			day = day+"st"
			break;
		case 2:
			day = day+"nd"
			break;
		case 3:
			day = day+"rd"
			break;
		default:
			day = day+"th"
			break;
	}
	var flag = true;
	for (var i = 0; i < localDataBase.ranking.length; i++) {
		if (localDataBase.ranking[i].name == actUser) {
			flag = false;
		}
	}

	if (flag) {
		var data = " "+day+" " + month[d.getMonth()] +" " + d.getFullYear();
		var newUser = new Slots(actUser,data,0,0);
		if (localDataBase.slotLoad1 ==  null) {
			localDataBase.slotLoad1 = newUser;
			localDataBase.slotLoad1.index = 1;
			localDataBase.userName = actUser;
			localDataBase.actUser = newUser;
			localStorage.setItem('items',JSON.stringify(localDataBase));
		}
		else if (localDataBase.slotLoad2 ==  null) {
			localDataBase.slotLoad2 = newUser;
			localDataBase.slotLoad2.index = 2;
			localDataBase.userName = actUser;
			localDataBase.actUser = newUser;
			localStorage.setItem('items',JSON.stringify(localDataBase));
		}
		else if (localDataBase.slotLoad3 ==  null) {
			localDataBase.slotLoad3 = newUser;
			localDataBase.slotLoad3.index = 3;
			localDataBase.userName = actUser;
			localDataBase.actUser = newUser;
			localStorage.setItem('items',JSON.stringify(localDataBase));
		}
		else {
			alert("ALL SLOTS ARE FULL, DELETE ONE TO CREATE A NEW USER!");
			mainSource.postMessage('MenuLoad.html', '*');
			return true;
		}

	}
	else {
		alert("NAME ALREADY IN USE, PLEASE TRY ANOTHER ONE!");
		return true;
	}
}