"use strict";

//CLASSE COM AS INFORMAÇÕES DA BASE DE DADOS

class setUp
{
	constructor()
	{
		this.soundEfectsVol = 50;
		this.gameMusicVol = 50;
		this.userName = "None";
		this.actUser = null;
		this.slotLoad1 = null;
		this.slotLoad2 = null;
		this.slotLoad3 = null;
		this.wins = 0;
		this.loses = 0;
		this.box1 = 2;
		this.box2 = 2;
		this.box3 = 2;
		this.effects = 0;
		this.controlaCutscene = 0;
		this.controlaCredits = 0;
		this.multiplayer = [0,0,0];
		this.ScoreRounds = 0;
		this.ranking = [];
	}
}
