"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main(){
	var mainSource=window.parent;
	var audio = new Audio("../resources/SOUND/SF3_Effects/SFA3_44 - Can you march the way to glory.wav");
    var audioBtn = new Audio("../resources/SOUND/VF_Effects/NageStart.wav");
    var audioOverBtn = new Audio("../resources/SOUND/SF3_Effects/Click.wav");
	var gameMusicControlState = true;
	var soundEfectsControlState = true;
	var exitBtn = document.getElementById('ExitBtn');
	var gameMusicControl = document.getElementById('gameMusicControl');
	var rank = document.getElementsByTagName('H1');
	var localDataBase = JSON.parse(localStorage.getItem('items'));
	var gameMusicVol = localDataBase.gameMusicVol;
	var soundEfectsVol = localDataBase.soundEfectsVol;
	var controlaCutscene = localDataBase.controlaCutscene;
	var btn1 = document.getElementById('b1');
    var btn2 = document.getElementById('b2');
    var btn3 = document.getElementById('b3');
    var btn4 = document.getElementById('b4');
    var btn5 = document.getElementById('b5');
    var btn6 = document.getElementById('b6');
    var btn7 = document.getElementById('b7');
	var btn8 = document.getElementById('b8');

    btn1.addEventListener("click", deleteRank);
    btn2.addEventListener("click", deleteRank);
    btn3.addEventListener("click", deleteRank);
    btn4.addEventListener("click", deleteRank);
    btn5.addEventListener("click", deleteRank);
    btn6.addEventListener("click", deleteRank);
    btn7.addEventListener("click", deleteRank);
    btn8.addEventListener("click", deleteRank);
	gameMusicControl.addEventListener("click",gameMusicListener);
	
	btn1.addEventListener("mouseover", mouseOverLevels);
    btn2.addEventListener("mouseover", mouseOverLevels);
    btn3.addEventListener("mouseover", mouseOverLevels);
    btn4.addEventListener("mouseover", mouseOverLevels);
    btn5.addEventListener("mouseover", mouseOverLevels);
    btn6.addEventListener("mouseover", mouseOverLevels);
    btn7.addEventListener("mouseover", mouseOverLevels);
    btn8.addEventListener("mouseover", mouseOverLevels);
	exitBtn.addEventListener("mouseover", click);
	
	btn1.addEventListener("mouseout", mouseOutLevels);
    btn2.addEventListener("mouseout", mouseOutLevels);
    btn3.addEventListener("mouseout", mouseOutLevels);
    btn4.addEventListener("mouseout", mouseOutLevels);
    btn5.addEventListener("mouseout", mouseOutLevels);
    btn6.addEventListener("mouseout", mouseOutLevels);
    btn7.addEventListener("mouseout", mouseOutLevels);
	btn8.addEventListener("mouseout", mouseOutLevels);
	
	//ATUALIZA O RANKING POR ORDEM DE (SCORE * NIVEL)

	writeDaStuffYouKnow(rank,localDataBase);

	//ATUALIZA OS BOTÕES E SE ESTÃO ATIVOS OU DESATIVOS

	checkButtons(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, localDataBase.ranking);

	//CONTROLO DA MUSICA AO ENTRAR NESTE MENU

	if (gameMusicVol == 0) {
		gameMusicControlState = false;
		gameMusicControl.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/volumeWithout.png')";
	}

	if (soundEfectsVol == 0) {
		soundEfectsControlState = false;
	}

    audioOverBtn.volume = localDataBase.soundEfectsVol/100;
    audioBtn.volume = localDataBase.soundEfectsVol/100;
	audio.volume= localDataBase.soundEfectsVol/100;
	audio.play();
	
	exitBtn.onclick = function() {
		audioBtn.play();
		localDataBase.gameMusicVol = gameMusicVol;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		setTimeout(function(){  mainSource.postMessage('MenuMain.html', '*'); }, 200);
    }

    function deleteRank(ev){
    	audioBtn.play();
		localDataBase.ranking = elimina_ranking(ev, localDataBase.ranking);
		localStorage.setItem('items',JSON.stringify(localDataBase));
		writeDaStuffYouKnow(rank, localDataBase);
		checkButtons(btn1, btn2, btn3, btn4, btn5, btn6, btn7, btn8, localDataBase.ranking);
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
			audioBtn.volume = 0.5;
			audio.volume = 0.5;
			soundEfectsVol = 50;
			controlaCutscene = 0;
		}
		else{
			soundEfectsControlState = false;
			audioOverBtn.volume = 0;
			audioBtn.volume = 0;
			audio.volume = 0;
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

	//AO CLICAR NO BOTÃO DE ELIMINAR, ESTE MUDARÁ DE COR E DESATIVAR-SE-À

    function mouseOverLevels(ev){
        switch (ev.currentTarget){
            case btn1:
                if (btn1.disabled == false) {
                	click();
                    btn1.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
				}
                break;
            case btn2:
                if (btn2.disabled == false) {
                	click();
                    btn2.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;
            case btn3:
                if (btn3.disabled == false) {
                	click();
                    btn3.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;
            case btn4:
                if (btn4.disabled == false) {
                	click();
                    btn4.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;
            case btn5:
                if (btn5.disabled == false) {
                	click();
                    btn5.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;
            case btn6:
                if (btn6.disabled == false) {
                	click();
                    btn6.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;  
            case btn7:
                if (btn7.disabled == false) {
                	click();
                    btn7.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;
            case btn8:
                if (btn8.disabled == false) {
                	click();
                    btn8.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn1.png')";
                }
                break;
        }
    }

    function mouseOutLevels(ev){
    	ev.currentTarget.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}

	function click(){
		audioOverBtn.play();
		setTimeout(function(){ 
			audioOverBtn.pause();
			audioOverBtn.currentTime = 0; 
		}, 100);
	}

}

function writeDaStuffYouKnow(rank,localDataBase, array_sorted) {
	let slot1=  localDataBase.slotLoad1;
	let slot2=  localDataBase.slotLoad2;
	let slot3=  localDataBase.slotLoad3;
	var array_sorted = [];
	if (slot1) {
		localDataBase.ranking = insersion(slot1,localDataBase.ranking)
	}
	if (slot2) {
		localDataBase.ranking = insersion(slot2,localDataBase.ranking)
	}
	if (slot3) {
		localDataBase.ranking = insersion(slot3,localDataBase.ranking)
	}
	if (localDataBase.ranking.length >= 8) {
		localDataBase.ranking = localDataBase.ranking.slice(0,8);
	}
	for (var j = 0; j < rank.length; j++){
		if (localDataBase.ranking[j] != undefined) {
				array_sorted.push([localDataBase.ranking[j].name, localDataBase.ranking[j].level * localDataBase.ranking[j].totalScore]);
		}
	}

	//DÁ SORT DA LISTA DE  USERS

	array_sorted = insertionSort(array_sorted);
	array_sorted = array_sorted.reverse();

	for (var j = 0; j < rank.length; j++){
		if (localDataBase.ranking[j] != undefined) {
			for (var i = 0; i < array_sorted.length; i++){
				if (localDataBase.ranking[j].name == array_sorted[i][0]){
					var aux = [];
					aux = localDataBase.ranking[j];
					localDataBase.ranking[j] = localDataBase.ranking[i];
					localDataBase.ranking[i] = aux;
				}
			}
		}
	}

	//ESCREVE NA TABELA

	for (var i = 0; i < rank.length; i++) {
		if (array_sorted[i] != null) {
			rank[i].innerHTML = (i+1) + " - " + array_sorted[i][0] + " | Ranking Score - "+ array_sorted[i][1].toFixed(2) + " points";
		}
		else {
			rank[i].innerHTML = "-------";
		}
	}
	localStorage.setItem('items',JSON.stringify(localDataBase));
}

//PROCURA O USER NA BASE DE DADOS

function find(userName,ranking) {
	for (var i = 0; i < ranking.length; i++) {
		if (ranking[i].name == userName) {
			return true;
		}
	}
	return false
}

//REMOVE UM USER DA BASE DE DADOS

function remove(newUser,ranking) {
	for (var i = 0; i < ranking.length; i++) {
		if (ranking[i].name == newUser.name) {
			ranking.splice(i, 1)
		}
	}
	return ranking
}

//INSERE USER

function insersion(newUser,ranking) {
	var findIt = find(newUser.name,ranking)
	if (findIt) {
		ranking = remove(newUser,ranking);
	}
	ranking.splice(0,0,newUser);
	return ranking
}

//RETIRA DO RANKING

function elimina_ranking(ev, ranking){

	switch(ev.currentTarget.id){
		case "b1":
			ranking.splice(0, 1);
			break
		case "b2":
			ranking.splice(1, 1);
			break
		case "b3":
			ranking.splice(2, 1);
			break
		case "b4":
			ranking.splice(3, 1);
			break
		case "b5":
			ranking.splice(4, 1);
			break
		case "b6":
			ranking.splice(5, 1);
			break
		case "b7":
			ranking.splice(6, 1);
			break
		case "b8":
			ranking.splice(7, 1);
			break
	}
	return ranking
}

//FAZ O MESMO QUE O "HOVER" NO CSS

function checkButtons(btn1, btn2, btn3,btn4, btn5, btn6, btn7, btn8, ranking){
	if (ranking[0] != undefined){
		enableButton(btn1);
		btn1.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn1);
		btn1.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[1] != undefined){
		enableButton(btn2);
		btn2.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn2);
		btn2.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[2] != undefined){
		enableButton(btn3);
		btn3.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn3);
		btn3.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[3] != undefined){
		enableButton(btn4);
		btn4.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn4);
		btn4.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[4] != undefined){
		enableButton(btn5);
		btn5.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn5);
		btn5.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[5] != undefined){
		enableButton(btn6);
		btn6.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn6);
		btn6.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[6] != undefined){
		enableButton(btn7);
		btn7.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn7);
		btn7.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
	if (ranking[7] != undefined){
		enableButton(btn8);
		btn8.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn.png')";
	}
	else{
		disableButton(btn8);
		btn8.style.backgroundImage = "url('../resources/IMAGES/BUTTONS/DeleteBtn2.png')";
	}
}

function disableButton(b) {
    b.disabled  = true;
    b.style.cursor = "initial"
}

function enableButton(b) {
    b.disabled  = false;
    b.style.cursor = "pointer"
}

//ALGORITMO DE ORDENAMENTO

function insertionSort(inputArr){
	let length = inputArr.length;
	
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j][1] > key[1]) {
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
    }
    return inputArr;
};
