"use strict";

//CLASSE COM AS INFORMAÇÕES DA BASE DE DADOS

class Slots
{
	constructor(name,date,level,totaltime,index)
	{
        this.name = name;
        this.date = date;
		this.level = level;
		this.index = 0;
		this.levelSelected = 0;
		this.level0Score = 0;
		this.level1Score = 0;
		this.level2Score = 0;
		this.level3Score = 0;
		this.totalScore = 0;
	}
}
