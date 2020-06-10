//CLASSE QUE CRIA O BOTÃO

class Button {
    constructor(x, y, sprite){
        this.button = game.add.button(x, y, sprite, function clickEventLister() {
            this.actionOnClick()
        }, this, 1, 0, 2);
    }
    actionOnClick (){ return 0;}
}

//CLASE DO BOTÃO DE RETORNAR AO MENU PRINCIPAL

class ExitBtn extends Button {
    constructor(x, y, sprite) {
        super(x, y, sprite);
    }
    actionOnClick (){
        //ATUALIZA A BASE DE DADOS
       var mainSource=window.parent
       localDataBase.loses = 0;
       localDataBase.wins = 0;
       localDataBase.box1 = 2;
       localDataBase.box2 = 2;
       localDataBase.box3 = 2;
       localDataBase.ScoreRounds = 0;
       localStorage.setItem('items',JSON.stringify(localDataBase));
       mainSource.postMessage('MenuMain.html', '*');
   }
}

//CLASSE DO BOTÃO DE PAUSAR O JOGO

class PauseBtn extends Button {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        soundGame.button.visible=false;
        exitGame.button.visible=false;
        //MOSTRA AS INTRUÇÕES
        this.spriteMenu = game.add.sprite(200,90, "HelpMenu");
        this.spriteMenu.visible = false;
    }
    //PÕE OS BOTÕES VISIVEIS
    actionOnClick (){
        if (game.paused) {
            soundGame.button.visible=false;
            exitGame.button.visible=false;
            this.spriteMenu.visible = false;
            game.paused = false;
        }else {
            this.spriteMenu.visible = true;
            soundGame.button.visible=true;
            exitGame.button.visible=true;
            game.paused = true;
        }
   }
}

////CLASSE DO BOTÃO DE TIRAR O SOM

class OptionsBtn extends Button {
    constructor(x, y, sprite) {
        super(x, y, sprite);
        this.soundOn=true;
    }
    actionOnClick (){
        if (this.soundOn) {
            this.button.setFrames(1,2,0);
            this.soundOn=false;
            gameMusicVol = 0;
            soundEfectsVol = 0;
            localDataBase.effects = 1;
            localDataBase.controlaCutscene = 0;
            localDataBase.gameMusicVol = gameMusicVol;
            localDataBase.soundEfectsVol = soundEfectsVol;
            localStorage.setItem('items',JSON.stringify(localDataBase));
            var mainSource=window.parent;
            mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
        }
        else {
            this.button.setFrames(1,0,2);
            this.soundOn=true;
            gameMusicVol = 50;
            soundEfectsVol = 50;
            localDataBase.effects = 0;
            localDataBase.controlaCutscene = 1;
            localDataBase.gameMusicVol = gameMusicVol;
            localDataBase.soundEfectsVol = soundEfectsVol;
            localStorage.setItem('items',JSON.stringify(localDataBase));
            var mainSource=window.parent;
            mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
        }
    }

    inicia(){
        if (localDataBase.controlaCutscene == 1){
            gameMusicVol = 50;
            soundEfectsVol = 50;
            localDataBase.gameMusicVol = gameMusicVol;
            localStorage.soundEfectsVol = soundEfectsVol;
            var mainSource=window.parent;
            localStorage.setItem('items',JSON.stringify(localDataBase));
			mainSource.postMessage('SOM|MENU|'+ gameMusicVol, '*');
        }
    }

    atualiza(){
        if (gameMusicVol == 0){
            this.button.frame = 2;
            this.soundOn=false;
            localDataBase.effects = 1;
            localStorage.setItem('items',JSON.stringify(localDataBase));
        }
        else{
            localDataBase.effects = 0;
            localStorage.setItem('items',JSON.stringify(localDataBase));
        }
    }
}