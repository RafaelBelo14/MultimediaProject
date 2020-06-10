"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){
	var mainSource=window.parent;
	var gameMusicControlState = true;
	var soundEfectsControlState = true;
	var easterEggPhoto = document.getElementById('easterEggPhoto');
	var btnStart = document.getElementById("StartBtn");
	var Start = document.getElementById("Start");
	var btnExit = document.getElementById("ExitBtn");
	var arrowleft1 = document.getElementById("arrow_left_1");
	var arrowleft2 = document.getElementById("arrow_left_2");
	var arrowright1 = document.getElementById("arrow_right_1");
	var arrowright2 = document.getElementById("arrow_right_2");
	var player1label = document.getElementById("player1");
	var player2label = document.getElementById("player2");
	var fig1 = document.getElementById("fig1");
	var fig2 = document.getElementById("fig2");
	var fig3 = document.getElementById("fig3");
	var fig4 = document.getElementById("fig4");
	var image1 = 1;
	var image2 = 2;
	var mapa = 0;
	var i = 30;
	var mapa1 = document.getElementById("mapa1Btn");
	var mapa2 = document.getElementById("mapa2Btn");
	var mapa3 = document.getElementById("mapa3Btn");
	var mapa4 = document.getElementById("mapa4Btn");
	var popup = document.getElementById("popupChooseMap");
	var popupInstructions = document.getElementById("popupSeeInstructions");
	var gameMusicControl = document.getElementById('gameMusicControl');
	var audioEntrada = new Audio("../resources/SOUND/SF3_Effects/SFA3_27 - Select your character.wav");
	var audioArrows = new Audio("../resources/SOUND/VF_Effects/Swing1.wav");
	var audioStart = new Audio("../resources/SOUND/SF3_Effects/SFA3_31 - That's great! Super! Excellent!.wav");
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav");
	var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");
	var hurryUp = new Audio("../resources/SOUND/SF3_Effects/Hurry.mp3");
	var localDataBase = JSON.parse(localStorage.getItem('items'));
	var gameMusicVol = localDataBase.gameMusicVol;
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var controlaCutscene = localDataBase.controlaCutscene;

	audioEntrada.volume= localDataBase.soundEfectsVol/100;
    audioArrows.volume= localDataBase.soundEfectsVol/100;
    audioStart.volume= localDataBase.soundEfectsVol/100;
    audioBtn.volume = localDataBase.soundEfectsVol/100;
	audioOverBtn.volume = localDataBase.soundEfectsVol/100;
	hurryUp.volume = localDataBase.soundEfectsVol/100;

	audioEntrada.play();

	//CONTROLO DO SOM E EFEITOS DO JOGO AO ENTRAR NA PÁGINA

	if (gameMusicVol == 0) {
		gameMusicControlState = false
		gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
	}

	if (soundEfectsVol == 0) {
		soundEfectsControlState = false;
	}

	gameMusicControl.addEventListener("click",gameMusicListener);

	btnStart.addEventListener("mouseover", mouseOverLevels);
	btnExit.addEventListener("mouseover", mouseOverLevels);
    mapa1.addEventListener("mouseover", mouseOverLevels);
    mapa2.addEventListener("mouseover", mouseOverLevels);
    mapa3.addEventListener("mouseover", mouseOverLevels);
    mapa4.addEventListener("mouseover", mouseOverLevels);
	Start.addEventListener("mouseover", mouseOverLevels);
	arrowleft1.addEventListener("click",arrowleft1Handler);
	arrowleft2.addEventListener("click",arrowleft2Handler);
	arrowright1.addEventListener("click",arrowright1Handler);
	arrowright2.addEventListener("click",arrowright2Handler);

	//CONFIGURAÇÃO DAS SETAS DE ESCOLHA DAS PERSONAGENS

	function arrowleft1Handler(ev){
		if (image1 == 1) {
			image1 = 6;
		}
		else{
			image1--;
		}
		i -= 1;
		if (i == 0){
			easterEgg(easterEggPhoto, hurryUp);
		}
		click();
		image1 = atualizaPlayer1(image1);
	}
	function arrowleft2Handler(ev){
		if (image2 == 1) {
			image2 = 6;
		}
		else{
			image2--;
		}
		i -= 1;
		if (i == 0){
			easterEgg(easterEggPhoto, hurryUp);
		}
		click();
		image2 = atualizaPlayer2(image2);
	}
	function arrowright1Handler(ev){
		if (image1 == 6) {
			image1 = 1;
		}
		else{
			image1++;
		}
		i -= 1;
		if (i == 0){
			easterEgg(easterEggPhoto, hurryUp);
		}
		click();
		image1 = atualizaPlayer1(image1);
	}
	function arrowright2Handler(ev){
		if (image2 == 6) {
			image2 = 1;
		}
		else{
			image2++;
		}
		i -= 1;
		if (i == 0){
			easterEgg(easterEggPhoto, hurryUp);
		}
		click();
		image2 = atualizaPlayer2(image2);
	}

	//ENTRA NO MAPA AO CLICAR SOBRE O MAPA OU PERSONAGENS DESSE MAPA

	mapa1.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 0;
		popupInstructions.style.display = "block";
    }
    fig1.onclick = function(){
		audioStart.play();
		audioBtn.play();
		mapa = 0;
        popupInstructions.style.display = "block";
    }
    fig2.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 0;
        popupInstructions.style.display = "block";
    }
    mapa2.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 1;
        popupInstructions.style.display = "block";
    }
    fig3.onclick = function(){
		audioStart.play();
		audioBtn.play();
		mapa = 1;
        popupInstructions.style.display = "block";

    }
    fig4.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 1;
        popupInstructions.style.display = "block";
    }
    mapa3.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 2;
        popupInstructions.style.display = "block";
    }
    fig5.onclick = function(){
		audioStart.play();
		audioBtn.play();
		mapa = 2;
        popupInstructions.style.display = "block";
    }
    fig6.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 2;
        popupInstructions.style.display = "block";
    }
    mapa4.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 3;
		popupInstructions.style.display = "block";
    }
    fig7.onclick = function(){
		audioStart.play();
		audioBtn.play();
		mapa = 3;
        popupInstructions.style.display = "block";
    }
    fig8.onclick = function() {
		audioStart.play();
		audioBtn.play();
		mapa = 3;
        popupInstructions.style.display = "block";
    }

	Start.onclick = function() {
		localDataBase.multiplayer = [image1, image2, mapa];
		localStorage.setItem('items',JSON.stringify(localDataBase));
		mainSource.postMessage('../LEVEL/HTML/multiplayer.html', '*');
	}

	//ABRE O POPUP DOS MAPAS

    btnStart.onclick = function() {
    	audioStart.play();
    	audioBtn.play();
        popup.style.display = "block";
	}
	
	//SAI DO MENU 1VS1

    btnExit.onclick = function() {
    	audioBtn.play();
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
			audioEntrada.volume = 0.5;
			audioStart.volume = 0.5;
			audioArrows.volume = 0.5;
			audioBtn.volume = 0.5;
			audioOverBtn.volume = 0.5;
			hurryUp.volume = 0.5;
			soundEfectsVol = 50;
			controlaCutscene = 0;
		}
		else{
			soundEfectsControlState = false;
			audioEntrada.volume = 0;
			audioStart.volume = 0;
			audioArrows.volume = 0;
			audioBtn.volume = 0;
			audioOverBtn.volume = 0;
			hurryUp.volume = 0;
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

	//AO CLICAR FORA DOS POPUPS, FECHA OS POPUPS

	window.onclick = function(ev) {
        if (ev.target == popup) {
            popup.style.display = "none";
		}
		if (ev.target == popupInstructions){
			popupInstructions.style.display = "none";
		}
	}
	
	//ATUALIZAÇÃO DAS PERSONAGENS

    function atualizaPlayer1(image1){
		switch(image1){
			case 1:
				player1.src = "../resources/IMAGES/PERSONAGENS/level0_boss/level0_boss_standing2.gif";
				break;
			case 2:
				player1.src = "../resources/IMAGES/PERSONAGENS/level1_boss/level1_boss_standing2.gif";
				break;
			case 3:
				player1.src = "../resources/IMAGES/PERSONAGENS/level2_boss/level2_boss_standing2.gif";
				break;
			case 4:
				player1.src = "../resources/IMAGES/PERSONAGENS/level3_boss/level3_boss_standing2.gif";
				break;
			case 5:
				player1.src = "../resources/IMAGES/PERSONAGENS/heroi4/heroi4_standing2.gif";
				break;
			case 6:
				player1.src = "../resources/IMAGES/PERSONAGENS/heroi5/heroi5_standing2.gif";
				break;
		}

		return image1
	}

	function atualizaPlayer2(image2){
		switch(image2){
			case 1:
				player2.src = "../resources/IMAGES/PERSONAGENS/level0_boss/level0_boss_standing.gif";
				break;
			case 2:
				player2.src = "../resources/IMAGES/PERSONAGENS/level1_boss/level1_boss_standing.gif";
				break;
			case 3:
				player2.src = "../resources/IMAGES/PERSONAGENS/level2_boss/level2_boss_standing.gif";
				break;
			case 4:
				player2.src = "../resources/IMAGES/PERSONAGENS/level3_boss/level3_boss_standing.gif";
				break;
			case 5:
				player2.src = "../resources/IMAGES/PERSONAGENS/heroi4/heroi4_standing.gif";
				break;
			case 6:
				player2.src = "../resources/IMAGES/PERSONAGENS/heroi5/heroi5_standing.gif";
				break;
		}

		return image2
	}

	//BARULHO DAS SETAS

	function click(){
		audioArrows.play();
		setTimeout(function(){ 
			audioArrows.pause();
			audioArrows.currentTime = 0; 
		}, 100);
	}

	//ANIMAÇÃO DO MOUSE SOBRE OS MAPAS NO POPUP

	function mouseOverLevels(ev){
		audioOverBtn.play();
		setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
		}, 100);
		if (ev.currentTarget.id == "mapa1Btn"){
			fig3.style.display = "none";
			fig4.style.display = "none";
			fig5.style.display = "none";
			fig6.style.display = "none";
			fig7.style.display = "none";
			fig8.style.display = "none";
			if (image1 - 1 <= 3){
				fig1.src = "../resources/IMAGES/PERSONAGENS/level" + (image1 - 1) + "_boss/level" + (image1 - 1) + "_boss_standing2.gif";
				fig1.style.width = "150px";
				fig1.style.height = "150px";
				fig1.style.top = "500px";
				fig1.style.right = "450px";
				fig1.style.display = "block";
			}
			else{
				fig1.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image1 - 1) + "/heroi" + (image1 - 1) + "_standing2.gif";
				fig1.style.width = "150px";
				fig1.style.height = "150px";
				fig1.style.top = "500px";
				fig1.style.right = "450px";
				fig1.style.display = "block";
			}
			if (image2 - 1 <= 3){
				fig2.src = "../resources/IMAGES/PERSONAGENS/level" + (image2 - 1) + "_boss/level" + (image2 - 1) + "_boss_standing.gif";
				fig2.style.width = "150px";
				fig2.style.height = "150px";
				fig2.style.top = "500px";
				fig2.style.right = "150px";
				fig2.style.display = "block";
			}
			else{
				fig2.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image2 - 1) + "/heroi" + (image2 - 1) + "_standing.gif";
				fig2.style.width = "150px";
				fig2.style.height = "150px";
				fig2.style.top = "500px";
				fig2.style.right = "150px";
				fig2.style.display = "block";
			}			
		}
		if (ev.currentTarget.id == "mapa2Btn"){
			fig1.style.display = "none";
			fig2.style.display = "none";
			fig5.style.display = "none";
			fig6.style.display = "none";
			fig7.style.display = "none";
			fig8.style.display = "none";
			if (image1 - 1 <= 3){
				fig3.src = "../resources/IMAGES/PERSONAGENS/level" + (image1 - 1) + "_boss/level" + (image1 - 1) + "_boss_standing2.gif";
				fig3.style.width = "150px";
				fig3.style.height = "150px";
				fig3.style.top = "500px";
				fig3.style.left = "170px";
				fig3.style.display = "block";
			}
			else{
				fig3.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image1 - 1) + "/heroi" + (image1 - 1) + "_standing2.gif";
				fig3.style.width = "150px";
				fig3.style.height = "150px";
				fig3.style.top = "500px";
				fig3.style.left = "170px";
				fig3.style.display = "block";
			}
			if (image2 - 1 <= 3){
				fig4.src = "../resources/IMAGES/PERSONAGENS/level" + (image2 - 1) + "_boss/level" + (image2 - 1) + "_boss_standing.gif";
				fig4.style.width = "150px";
				fig4.style.height = "150px";
				fig4.style.top = "500px";
				fig4.style.left = "500px";
				fig4.style.display = "block";
			}
			else{
				fig4.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image2 - 1) + "/heroi" + (image2 - 1) + "_standing.gif";
				fig4.style.width = "150px";
				fig4.style.height = "150px";
				fig4.style.top = "500px";
				fig4.style.left = "500px";
				fig4.style.display = "block";
			}	
		}
		if (ev.currentTarget.id == "mapa3Btn"){
			fig1.style.display = "none";
			fig2.style.display = "none";
			fig3.style.display = "none";
			fig4.style.display = "none";
			fig7.style.display = "none";
			fig8.style.display = "none";
			if (image1 - 1 <= 3){
				fig5.src = "../resources/IMAGES/PERSONAGENS/level" + (image1 - 1) + "_boss/level" + (image1 - 1) + "_boss_standing2.gif";
				fig5.style.width = "150px";
				fig5.style.height = "150px";
				fig5.style.top = "820px";
				fig5.style.right = "450px";
				fig5.style.display = "block";
			}
			else{
				fig5.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image1 - 1) + "/heroi" + (image1 - 1) + "_standing2.gif";
				fig5.style.width = "150px";
				fig5.style.height = "150px";
				fig5.style.top = "820px";
				fig5.style.right = "450px";
				fig5.style.display = "block";
			}
			if (image2 - 1 <= 3){
				fig6.src = "../resources/IMAGES/PERSONAGENS/level" + (image2 - 1) + "_boss/level" + (image2 - 1) + "_boss_standing.gif";
				fig6.style.width = "150px";
				fig6.style.height = "150px";
				fig6.style.top = "820px";
				fig6.style.right = "150px";
				fig6.style.display = "block";
			}
			else{
				fig6.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image2 - 1) + "/heroi" + (image2 - 1) + "_standing.gif";
				fig6.style.width = "150px";
				fig6.style.height = "150px";
				fig6.style.top = "820px";
				fig6.style.right = "150px";
				fig6.style.display = "block";
			}		
		}
		if (ev.currentTarget.id == "mapa4Btn"){
			fig1.style.display = "none";
			fig2.style.display = "none";
			fig3.style.display = "none";
			fig4.style.display = "none";
			fig5.style.display = "none";
			fig6.style.display = "none";
			if (image1 - 1 <= 3){
				fig7.src = "../resources/IMAGES/PERSONAGENS/level" + (image1 - 1) + "_boss/level" + (image1 - 1) + "_boss_standing2.gif";
				fig7.style.width = "150px";
				fig7.style.height = "150px";
				fig7.style.top = "820px";
				fig7.style.left = "170px";
				fig7.style.display = "block";
			}
			else{
				fig7.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image1 - 1) + "/heroi" + (image1 - 1) + "_standing2.gif";
				fig7.style.width = "150px";
				fig7.style.height = "150px";
				fig7.style.top = "820px";
				fig7.style.left = "170px";
				fig7.style.display = "block";
			}
			if (image2 - 1 <= 3){
				fig8.src = "../resources/IMAGES/PERSONAGENS/level" + (image2 - 1) + "_boss/level" + (image2 - 1) + "_boss_standing.gif";
				fig8.style.width = "150px";
				fig8.style.height = "150px";
				fig8.style.top = "820px";
				fig8.style.left = "500px";
				fig8.style.display = "block";
			}
			else{
				fig8.src = "../resources/IMAGES/PERSONAGENS/heroi" + (image2 - 1) + "/heroi" + (image2 - 1) + "_standing.gif";
				fig8.style.width = "150px";
				fig8.style.height = "150px";
				fig8.style.top = "820px";
				fig8.style.left = "500px";
				fig8.style.display = "block";
			}	
		}
   }

   //AO CLICAR 30 VEZES NAS SETAS, APARECE O EASTEREGG

   function easterEgg(easterEggPhoto, hurryUp){
	easterEggPhoto.style.display = "block";
	hurryUp.play();
	setTimeout(() => {
		easterEggPhoto.style.display = "none";
	}, 3500);
   }
}
