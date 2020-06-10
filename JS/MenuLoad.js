"use strict";

(function()
{
	window.addEventListener("load", main);
}());

var mainSource=window.parent;

function main(){

	var gameMusicControlState = true;
	var soundEfectsControlState = true;
    var namesLevel = ["The begining...","I need to find this cure...","Can't give up now...","Let´s finish this!"];
    var slot1 = document.getElementById('slot1');
    var slot2 = document.getElementById('slot2');
    var slot3 = document.getElementById('slot3');
    var audio = new Audio("../resources/SOUND/SF3_Effects/SFA3_43 - Yeah! The world's waitin' for ya.wav");
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav");
    var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");    
	var popup = document.getElementById('popupStartButton');
	var exitBtn = document.getElementById("ExitBtn");
	var continueBtn = document.getElementById('Continue');
	var deleteBtn = document.getElementById("Delete");
	var localDataBase = JSON.parse(localStorage.getItem('items'));
    var level0 = document.getElementById('Level0');
    var level1 = document.getElementById('Level1');
    var level2 = document.getElementById('Level2');
    var level3 = document.getElementById('Level3');
    var continueElem = document.getElementById('Continue');
    var deleteElem = document.getElementById('Delete');
    var name = document.getElementById('name');
    var startDate = document.getElementById('startDate');
	var overallScore = document.getElementById('overallScore');
	var image = document.getElementById("popup_contentStartButton");
	var levelName = document.getElementById('levelName');
	var aux = "";
	var gameMusicVol = localDataBase.gameMusicVol;
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var controlaCutscene = localDataBase.controlaCutscene;

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

	slot1.addEventListener("click",loadUser);
	slot2.addEventListener("click",loadUser);
	slot3.addEventListener("click",loadUser);

	slot1.addEventListener("mouseover", mouseOver);
    slot2.addEventListener("mouseover", mouseOver);
    slot3.addEventListener("mouseover", mouseOver);
    level0.addEventListener("mouseover", mouseOver);
    level1.addEventListener("mouseover", mouseOver);
    level2.addEventListener("mouseover", mouseOver);
    level3.addEventListener("mouseover", mouseOver);
    deleteBtn.addEventListener("mouseover", mouseOver);
    continueBtn.addEventListener("mouseover", mouseOver);
	exitBtn.addEventListener("mouseover", mouseOver);

	gameMusicControl.addEventListener("click",gameMusicListener);

	//AO CLICAR FORA DO POPUP, FECHA-O

    window.onclick = function(ev) {
        if (ev.target == popup) {
            popup.style.display = "none";
        }
	}
	
	//AO CLICAR ABRE O POPUP CORRESPONDENTE AO SLOT

	function loadUser(ev){
		audioBtn.play()
		switch (ev.currentTarget.id){
			case 'slot1':
			openPop(localDataBase.slotLoad1,level0,level1,level2,level3,levelName,name,startDate,image,namesLevel,deleteElem,popup,localDataBase,slot1,slot2,slot3,loadUser,continueBtn,overallScore, audioBtn);
			break;
			case 'slot2':
			openPop(localDataBase.slotLoad2,level0,level1,level2,level3,levelName,name,startDate,image,namesLevel,deleteElem,popup,localDataBase,slot1,slot2,slot3,loadUser,continueBtn,overallScore, audioBtn);
			break;
			case 'slot3':
			openPop(localDataBase.slotLoad3,level0,level1,level2,level3,levelName,name,startDate,image,namesLevel,deleteElem,popup,localDataBase,slot1,slot2,slot3,loadUser,continueBtn,overallScore, audioBtn);
			break;
		}
		popup.style.display = "block";
	}

	///ATUALIZAÇÃO DAS SLOTS

	updateSlot(localDataBase,slot1,slot2,slot3,loadUser);

	exitBtn.onclick = function() {
		audioBtn.play();
		localDataBase.gameMusicVol = gameMusicVol;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);
	}
	
	//CONFIGURAÇÃO SONS DO JOGO E EFEITOS

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

	function mouseOver(ev){
			audioOverBtn.play();
			setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
			}, 100);
	}
}

function openPop(slot,level0,level1,level2,level3,levelName,name,startDate,image,namesLevel,deleteElem,popup,localDataBase,slot1,slot2,slot3,loadUser,continueBtn,overallScore, audioBtn, aux){

	level0.addEventListener("mouseover", mouseOverLevels);
    level1.addEventListener("mouseover", mouseOverLevels);
    level2.addEventListener("mouseover", mouseOverLevels);
	level3.addEventListener("mouseover", mouseOverLevels);

	level0.addEventListener("mouseout", mouseOutLevels);
    level1.addEventListener("mouseout", mouseOutLevels);
    level2.addEventListener("mouseout", mouseOutLevels);
    level3.addEventListener("mouseout", mouseOutLevels);

	level0.addEventListener("click", enterLevel);
    level1.addEventListener("click", enterLevel);
    level2.addEventListener("click", enterLevel);
    level3.addEventListener("click", enterLevel);

    name.innerHTML = slot.name;
    startDate.innerHTML = slot.date;
	overallScore.innerHTML = "Overall Score: "+(slot.level0Score+slot.level1Score+slot.level2Score+slot.level3Score)

	//CONFORME O PROGRESSO DO USER, OS NIVEIS MUDAM DE COR E OS BOTOES FICAM ATIVOS
	
    switch (slot.level) {
        case 0:
			level0.style.color = "#000000";
			level0.style.backgroundColor = "#ffaa00";
			level1.style.color = "#000000";
			level1.style.backgroundColor = "#B9BDBD";
			level2.style.color = "#000000";
			level2.style.backgroundColor = "#B9BDBD";
			level3.style.color = "#000000";
			level3.style.backgroundColor = "#B9BDBD";
			enableButton(level0);
            disableButton(level1);
            disableButton(level2);
            disableButton(level3);
            break;
        case 1:
			level0.style.color = "#000000";
			level0.style.backgroundColor = "#ffaa00";
			level1.style.color = "#000000";
			level1.style.backgroundColor = "#ffaa00";
			level2.style.color = "#000000";
			level2.style.backgroundColor = "#B9BDBD";
			level3.style.color = "#000000";
			level3.style.backgroundColor = "#B9BDBD";
			enableButton(level0);
			enableButton(level1);
            disableButton(level2);
            disableButton(level3);
            break;
        case 2:
			level0.style.color = "#000000";
			level0.style.backgroundColor = "#ffaa00";
			level1.style.color = "#000000";
			level1.style.backgroundColor = "#ffaa00";
			level2.style.color = "#000000";
			level2.style.backgroundColor = "#ffaa00";
			level3.style.color = "#000000";
			level3.style.backgroundColor = "#B9BDBD";
			enableButton(level0);
			enableButton(level1);
			enableButton(level2);
            disableButton(level3);
            break;
        case 3:
			enableButton(level0);
			level0.style.backgroundColor = "#ffaa00";
			enableButton(level1);
			level1.style.backgroundColor = "#ffaa00";
			enableButton(level2);
			level2.style.backgroundColor = "#ffaa00";
			enableButton(level3);
			level3.style.backgroundColor = "#F4AD3D";
            level0.style.color = "#000000";
            level1.style.color = "#000000";
            level2.style.color = "#000000";
			level3.style.color = "#000000";
            break;
        default:
            level0.style.color = "#000000";
            level1.style.color = "#000000";
            level2.style.color = "#000000";
            level3.style.color = "#000000";
            break;

	}

	//CONTINUAR NO ULTIMO NIVEL DESBLOQUEADO
	
	continueBtn.onclick = function() {
		audioBtn.play();
		localDataBase.actUser = slot;
		localDataBase.userName = slot.name
		mainSource.postMessage('../level/HTML/Level'+slot.level+'.html', '*');
		localStorage.setItem('items',JSON.stringify(localDataBase));
	}

	//ELIMINAR O SLOT

	deleteElem.addEventListener("click", deleteLoad);
	function deleteLoad(ev){
		audioBtn.play();
		removeSlot(slot,localDataBase,slot1,slot2,slot3,localStorage,popup,loadUser)
	}

	//AO CLICAR NUM NIVEL, ENTRA NO CORRESPONDENTE

	function enterLevel(ev){
		audioBtn.play();
		localDataBase.actUser = slot;
		localDataBase.userName = slot.name;
		localDataBase.actUser.levelSelected = 0
		localStorage.setItem('items',JSON.stringify(localDataBase));
		switch(ev.currentTarget.id){
			case "Level0":
				mainSource.postMessage('../LEVEL/HTML/Part1.html', '*');
				break;
			case "Level1":
				mainSource.postMessage('../LEVEL/HTML/Part2.html', '*');
				break;
			case "Level2":
				mainSource.postMessage('../LEVEL/HTML/Part3.html', '*');
				break;
			case "Level3":
				mainSource.postMessage('../LEVEL/HTML/Part4.html', '*');
				break;
		}
	}

	//SE O MOUSE ESTÁ POR CIMA DE UM NIVEL, APERECEM AS INFORMAÇÕES DELE

    function mouseOverLevels(ev){
        switch (ev.currentTarget){
            case level0:
                if (level0.disabled == false) {
					aux = level0.style.backgroundColor;
					level0.style.backgroundColor = "rgba(0,0,0,0.4)";
                    levelName.innerHTML = namesLevel[0];
					overallScore.innerHTML = "Score Level 0: "+ slot.level0Score
				}
                break;
            case level1:
                if (level1.disabled == false) {
					aux = level1.style.backgroundColor;
					level1.style.backgroundColor = "rgba(0,0,0,0.4)";
                    levelName.innerHTML = namesLevel[1];
					overallScore.innerHTML = "Score Level 1: "+ slot.level1Score
                }
                break;
            case level2:
                if (level2.disabled == false) {
					aux = level2.style.backgroundColor;
					level2.style.backgroundColor = "rgba(0,0,0,0.4)";
                    levelName.innerHTML = namesLevel[2];
					overallScore.innerHTML = "Score Level 2: "+ slot.level2Score
                }
                break;
            case level3:
                if (level3.disabled == false) {
					aux = level3.style.backgroundColor;
					level3.style.backgroundColor = "rgba(0,0,0,0.4)";
                    levelName.innerHTML = namesLevel[3];
					overallScore.innerHTML = "Score Level 3: "+ slot.level3Score
                }
                break;
		}
	}

	//SE O MOUSE ESTIVER FORA DOS NIVEIS APARECE A INFORMAÇÃO GERAL

	function mouseOutLevels(ev){
		level0.style.backgroundColor = aux;
		levelName.innerHTML = namesLevel[slot.level];
		overallScore.innerHTML = "Score: "+(slot.level0Score+slot.level1Score+slot.level2Score+slot.level3Score);
		ev.currentTarget.style.backgroundColor= "#ffaa00";
	}

}

//FUNÇÃO QUE ELIMINA O SLOT

function removeSlot(slot,localDataBase,slot1,slot2,slot3,localStorage,popup,loadUser){
	switch (slot) {
		case localDataBase.slotLoad1:
			localDataBase.slotLoad1 = null;
			break;
		case localDataBase.slotLoad2:
			localDataBase.slotLoad2 = null;
			break;
		case localDataBase.slotLoad3:
			localDataBase.slotLoad3 = null;
			break;
	}
	localDataBase.userName = "None";
	updateSlot(localDataBase,slot1,slot2,slot3,loadUser);
	popup.style.display = "none";
	localStorage.setItem('items',JSON.stringify(localDataBase));
}

//DESATIVA O BOTÃO

function disableButton(b) {
    b.disabled  = true;
    b.style.cursor = "initial"
}

//ATIVA O BOTÃO

function enableButton(b) {
    b.disabled  = false;
    b.style.cursor = "pointer"
}

//FUNÇÃO QUE ATUALIZA OS SLOTS E TRATA DE OS INICIAR QUANDO SE ENTRA NO MENU

function updateSlot(localDataBase,slot1,slot2,slot3,loadUser){
    if (localDataBase.slotLoad1 == null) {
		slot1.removeEventListener("click",loadUser);
        slot1.innerHTML="------";
        disableButton(slot1);
    }
    else {
        slot1.innerHTML = localDataBase.slotLoad1.name + localDataBase.slotLoad1.date;
	}
	
    if (localDataBase.slotLoad2 == null) {
		slot2.removeEventListener("click",loadUser);
        slot2.innerHTML="------";
        disableButton(slot2);
    }
    else {
        slot2.innerHTML = localDataBase.slotLoad2.name + localDataBase.slotLoad2.date;
	}
	
    if (localDataBase.slotLoad3 == null) {
		slot3.removeEventListener("click",loadUser);
        slot3.innerHTML="------";
        disableButton(slot3);
    }
    else {
        slot3.innerHTML = localDataBase.slotLoad3.name + localDataBase.slotLoad3.date;
	}
}
