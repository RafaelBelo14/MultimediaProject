"use strict";

(function()
{
	window.addEventListener("load", main);
}());


function main(){
	  var mainSource=window.parent;
    var btnStart = document.getElementById("StartBtn");
    var localDataBase = JSON.parse(localStorage.getItem('items'));

    var audio = new Audio("../resources/SOUND/SF3_Effects/SFA3_06 - Let's party.wav");
    var audioBtn = new Audio("../resources/SOUND/SF_Effetcs/20H.wav");

    if (localDataBase.effects == undefined){
      localDataBase.effects = 0;
      localStorage.setItem('items',JSON.stringify(localDataBase));
    }

    if (localDataBase.controlaCutscene == undefined){
      localDataBase.controlaCutscene = 0;
      localStorage.setItem('items',JSON.stringify(localDataBase));
    }

    if (localDataBase.controlaCredits == undefined){
      localDataBase.controlaCredits = 1;
      localStorage.setItem('items',JSON.stringify(localDataBase));
    }

    //ENTRA NO MENU PRINCIPAL

    btnStart.onclick = function() {
		audioBtn.play();
    	audio.play();
    	setTimeout(function(){ mainSource.postMessage('MenuMain.html', '*'); }, 1500);
    }
   
}
