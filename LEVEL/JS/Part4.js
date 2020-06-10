"use strict";

(function()
{
	window.addEventListener("load", main);
}());

function main(){

	var vid = document.getElementById("video");
	var button = document.getElementById("button");
	var mainSource=window.parent;
	var localDataBase = JSON.parse(localStorage.getItem('items'));
	var gameMusicVol = localDataBase.gameMusicVol;

	console.log(gameMusicVol);

	if (gameMusicVol == 0){
		localDataBase.controlaCutscene = 0;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		vid.volume = gameMusicVol;
	}
	else{
		gameMusicVol = 0;
		localDataBase.gameMusicVol = gameMusicVol;
		localDataBase.controlaCutscene = 1;
		localStorage.setItem('items',JSON.stringify(localDataBase));
		mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
	}
	
	vid.style.display = "block";
	vid.addEventListener("ended", videoEndedHandler);
	vid.play();
	
	button.onclick = function() {
		setTimeout(function(){  
			mainSource.postMessage('../level/HTML/Level3.html', '*'); 
		}, 200);
    }
}

function videoEndedHandler(ev)
{
    var mainSource=window.parent;
    mainSource.postMessage('../level/HTML/Level3.html', '*');
}