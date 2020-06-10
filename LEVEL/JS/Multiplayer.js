var game = new Phaser.Game(1150,600, Phaser.CANVAS, 'multiplayer', {preload: preload, create: create, update: update, render: render});


var localDataBase = JSON.parse(localStorage.getItem('items'));
var playerstate = 0; vilaostate = 0;
var posicao_player = 0; posicao_vilao = 1;
var estamina = 0; estamina2 = 0; bar_vida = 0; bar_vida2 = 0; bar_estamina = 0; bar_estamina2 = 0; ataque = 0;

function preload() {

	switch (localDataBase.multiplayer[0]){
		case 1:
			game.load.spritesheet('player_movements', '../../resources/IMAGES/PERSONAGENS/vilao0_level/spritesheet.png', 300, 300);
			break;
		case 2:
			game.load.spritesheet('player_movements', '../../resources/IMAGES/PERSONAGENS/vilao1_level/spritesheet.png', 300, 300);
			break;
		case 3:
			game.load.spritesheet('player_movements', '../../resources/IMAGES/PERSONAGENS/vilao2_level/spritesheet.png', 300, 300);
			break;
		case 4:
			game.load.spritesheet('player_movements', '../../resources/IMAGES/PERSONAGENS/vilao3_level/spritesheet.png', 300, 300);
			break;
		case 5:
			game.load.spritesheet('player_movements', '../../resources/IMAGES/PERSONAGENS/heroi_level/spritesheet.png', 300, 300);
			break;
		case 6:
			game.load.spritesheet('player_movements', '../../resources/IMAGES/PERSONAGENS/heroi1_level/spritesheet.png', 300, 300);
			break;

	}

	switch (localDataBase.multiplayer[1]){
		case 1:
			game.load.spritesheet('vilao_movements', '../../resources/IMAGES/PERSONAGENS/vilao0_level/spritesheet.png', 300, 300);
			break;
		case 2:
			game.load.spritesheet('vilao_movements', '../../resources/IMAGES/PERSONAGENS/vilao1_level/spritesheet.png', 300, 300);
			break;
		case 3:
			game.load.spritesheet('vilao_movements', '../../resources/IMAGES/PERSONAGENS/vilao2_level/spritesheet.png', 300, 300);
			break;
		case 4:
			game.load.spritesheet('vilao_movements', '../../resources/IMAGES/PERSONAGENS/vilao3_level/spritesheet.png', 300, 300);
			break;
		case 5:
			game.load.spritesheet('vilao_movements', '../../resources/IMAGES/PERSONAGENS/heroi_level/spritesheet.png', 300, 300);
			break;
		case 6:
			game.load.spritesheet('vilao_movements', '../../resources/IMAGES/PERSONAGENS/heroi1_level/spritesheet.png', 300, 300);
			break;

	}

	switch (localDataBase.multiplayer[2]){
		case 0:
			game.load.spritesheet('fundo', '../../resources/IMAGES/LEVELS/sprite0.png', 1200, 600);
			game.load.image('plata', '../../resources/IMAGES/LEVELS/level0_plata.png');
			game.load.image('plata_sup', '../../resources/IMAGES/LABELS/plata_sup0.png');
			break;
		case 1:
			game.load.spritesheet('fundo', '../../resources/IMAGES/LEVELS/sprite1.png', 1200, 600);
			game.load.image('plata', '../../resources/IMAGES/LEVELS/level1_plata.png');
			game.load.image('plata_sup', '../../resources/IMAGES/LABELS/plata_sup0.png');
			break;
		case 2:
			game.load.spritesheet('fundo', '../../resources/IMAGES/LEVELS/sprite2.png', 1200, 600);
			game.load.image('plata', '../../resources/IMAGES/LEVELS/level2_plata.png');
			game.load.image('plata_sup', '../../resources/IMAGES/LABELS/plata_sup2.png');
			break;
		case 3:
			game.load.spritesheet('fundo', '../../resources/IMAGES/LEVELS/sprite3.png', 1200, 600);
			game.load.image('plata', '../../resources/IMAGES/LEVELS/level3_plata.png');
			game.load.image('plata_sup', '../../resources/IMAGES/LABELS/plata_sup3.png');
			break;
	}

	//PLATAFORMAS, BOXES E LABELS
	game.load.image('win', '../../resources/IMAGES/LABELS/win.png');
	game.load.image('ko', '../../resources/IMAGES/LABELS/ko.png');
	game.load.spritesheet('vida', '../../resources/IMAGES/BARRAS/sprite_vida.png', 300, 300);
	game.load.image('player1', '../../resources/IMAGES/LABELS/Player1LabelMulti.png');
	game.load.image('player2', '../../resources/IMAGES/LABELS/Player2LabelMulti.png');
	game.load.spritesheet('estamina', '../../resources/IMAGES/BARRAS/sprite_estamina.png', 300, 300);
	game.load.spritesheet('vida2', '../../resources/IMAGES/BARRAS/sprite_vida2.png', 300, 300);
    game.load.spritesheet('estamina2', '../../resources/IMAGES/BARRAS/sprite_estamina2.png', 300, 300);
    game.load.spritesheet('box1', '../../resources/IMAGES/LABELS/labelMultiplayer.png', 40, 32);
	game.load.spritesheet('box2', '../../resources/IMAGES/LABELS/labelMultiplayer.png', 40, 32);
    game.load.spritesheet('box3', '../../resources/IMAGES/LABELS/labelMultiplayer.png', 40, 32);
    
	

	//MENU
    game.load.image('HelpMenu','../../resources/IMAGES/BUTTONS/LabelsPauseMulti.png');
    game.load.spritesheet('soundGame','../../resources/IMAGES/BUTTONS/soundGame.png',60,53);
	game.load.spritesheet('exitGame','../../resources/IMAGES/BUTTONS/exitGame.png',60,53);
	game.load.spritesheet('pauseGame','../../resources/IMAGES/BUTTONS/pauseGame.png', 60,53);

	//AUDIO
	localDataBase = JSON.parse(localStorage.getItem('items'))
	gameMusicVol = localDataBase.gameMusicVol;
	soundEfectsVol = localStorage.soundEfectsVol;

	// AUDIO PERSONAGENS

	game.load.audio('hit','../../resources/SOUND/levels/fall.wav');
	game.load.audio('attack','../../resources/SOUND/levels/2BH.wav');
	game.load.audio('fall','../../resources/SOUND/levels/Down.wav');
	game.load.audio('jump','../../resources/SOUND/levels/jump.wav');
	game.load.audio('round1','../../resources/SOUND/levels/1round.wav');
	game.load.audio('round2','../../resources/SOUND/levels/2round.wav');
	game.load.audio('round3','../../resources/SOUND/levels/3round.wav');
	game.load.audio('youWin','../../resources/SOUND/levels/youWin.wav');
	game.load.audio('KO','../../resources/SOUND/levels/KO.wav');
	game.load.audio('doubleKO','../../resources/SOUND/levels/doubleKO.wav');
	game.load.audio('gameOver','../../resources/SOUND/levels/gameOver.wav');

}
	
function create() {

	localDataBase.controlaCutscene = 2;

	if (localDataBase.loses == undefined && localDataBase.wins == undefined){
		localDataBase.loses = 0;
		localDataBase.wins = 0;
	}

	if (localDataBase.ScoreRounds == undefined){
		localDataBase.ScoreRounds = 0;
	}

	if (localDataBase.effects == undefined){
		localDataBase.effects = 0;
	}

	if (localDataBase.box1 == undefined && localDataBase.box2 == undefined && localDataBase.box3 == undefined){
		localDataBase.box1 = 2;
		localDataBase.box2 = 2;
		localDataBase.box3 = 2;
	}

	console.log("W -> " + localDataBase.wins);
	console.log("L -> " + localDataBase.loses);
	console.log("Box1 -> " + localDataBase.box1);
	console.log("Box2 -> " + localDataBase.box2);
	console.log("Box3 -> " + localDataBase.box3);
	console.log("P1 -> " + localDataBase.multiplayer[0]);
	console.log("P2 -> " + localDataBase.multiplayer[1]);
	console.log("Fundo -> " + localDataBase.multiplayer[2]);

	key = game.input.keyboard.createCursorKeys();

    keyK = game.input.keyboard.addKey(Phaser.Keyboard.K);
    keyL = game.input.keyboard.addKey(Phaser.Keyboard.L);
    keyA = game.input.keyboard.addKey(Phaser.Keyboard.A);
    keyS = game.input.keyboard.addKey(Phaser.Keyboard.S);
    keyD = game.input.keyboard.addKey(Phaser.Keyboard.D);
    keyW = game.input.keyboard.addKey(Phaser.Keyboard.W);
    keyR = game.input.keyboard.addKey(Phaser.Keyboard.R);
	keyT = game.input.keyboard.addKey(Phaser.Keyboard.T);
	
	attack = game.add.audio('attack');
	hit = game.add.audio('hit');
	fall = game.add.audio('fall');
	jump = game.add.audio('jump');
	round1 = game.add.audio('round1');
	round2 = game.add.audio('round2');
	round3 = game.add.audio('round3');
	youWin = game.add.audio('youWin');
	doubleKO = game.add.audio('doubleKO');
	simpleKO = game.add.audio('KO');


	game.physics.startSystem(Phaser.Physics.ARCADE);

	criaMapas();

	player = game.add.sprite(30, 150, 'player_movements');
	vilao = game.add.sprite(830, 150, 'vilao_movements');

	criaAnimacoes();
	
	// CONFIGURAÇÃO PLAYER

	game.physics.enable(player, Phaser.Physics.ARCADE);
	player.body.setSize(100, 100, 110, 140);
	player.body.collideWorldBounds = true;
	player.body.gravity.y = 1000;

	// CONFIGURAÇÃO VILÃO

	game.physics.enable(vilao, Phaser.Physics.ARCADE);
	vilao.body.setSize(110, 140, 90, 100);
	vilao.body.collideWorldBounds = true;
	vilao.body.gravity.y = 1000;

	// CONFIGURAÇÃO ESTAMINA E VIDA DAS PERSONAGENS

	vida = game.add.sprite(50, -80, 'vida', 40);
	estamina = game.add.sprite(50, 0, 'estamina', 0);
	vida2 = game.add.sprite(800, -80, 'vida2', 40);
	estamina2 = game.add.sprite(800, 0, 'estamina2', 0);

	// CONFIGURAÇÃO DAS LABELS

	win = game.add.image(370, 350, 'win');
	win.visible = false;

	ko = game.add.image(350, 200, 'ko');
	ko.visible = false;

	//BUTTONS
	soundGame = new OptionsBtn(10,280,"soundGame");
	exitGame = new ExitBtn(10,350,"exitGame");
	pauseGame = new PauseBtn(550,20,"pauseGame");

	//PLAYERS LABELS
	player1_label = game.add.image(100, 300, "player1");
	player2_label = game.add.image(920, 300, "player2");
	player1_label.scale.setTo(0.3, 0.3);
	player2_label.scale.setTo(0.3, 0.3);
	setTimeout(() => {
		player1_label.visible = false;
		player2_label.visible = false;
	}, 3000);

	console.log(localDataBase.controlaCutscene);
	soundGame.inicia();
	soundGame.atualiza();

	startLabels(round1, round2, round3);
}
	
function update() {
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(vilao, platforms);
	if (playerstate == 0){
		playerUpadte(); 
	}
	if (vilaostate == 0){
		vilaoUpdate();
	}
	if (bar_estamina == 0){
		atualizaEstamina();
	}
	if (bar_estamina2 == 0){
		atualizaEstamina2();
	}

	atualizaSom();
}

function render() {

	//game.debug.body(player);
	//game.debug.body(vilao);
	//game.debug.body(plata);

	//game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 600, 70, "#00ff00");

}

// UPDATE DO PLAYER E VILÃO

function playerUpadte() {
	player.body.velocity.x = 0;

	if(keyA.isDown && !keyR.isDown && !keyT.isDown && !keyW.isDown && playerstate == 0){
		player.animations.play("walk_left");
		player.body.velocity.x += -300;
		posicao_player = 1;
	}
	else if(keyD.isDown && !keyR.isDown && !keyT.isDown && !keyW.isDown && playerstate == 0){
		player.animations.play("walk_right");
		player.body.velocity.x += 300;
		posicao_player = 0;
	}
	else{
		if (playerstate == 0 && posicao_player == 0){
			player.animations.play("stand_right");
		}
		else if (playerstate == 0 && posicao_player == 1){
			player.animations.play("stand_left");
		}
	}

	if (keyW.isDown && (player.body.velocity.y == 0)){
		playerstate = 1;
		if (posicao_player == 0){
			player.animations.play('jump_right');
			jump.play();
		}
		else {
			player.animations.play('jump_left');
			jump.play();
		}
		player.body.velocity.y = -700;
		setTimeout(() => {
			playerstate = 0;
		}, 700);
	}

	if(keyR.isDown && playerstate == 0 && !keyA.isDown && !keyD.isDown){
		playerstate = 1;
		player.body.velocity.x = 0;
		if (posicao_player == 0){
			player.animations.play('attack_right');
			attack.play();
		}
		else {
			player.animations.play('attack_left');
			attack.play();
		}
		ataque = 0;
		setTimeout(() => {
			game.physics.arcade.overlap(player, vilao, checkColission_player2vilao, null, this);
		}, 200);
		setTimeout(() => {
            playerstate = 0;
		}, 450);

	}

	if(keyT.isDown && playerstate == 0 && !keyA.isDown && !keyD.isDown && estamina.frame == 40){
		playerstate = 1;
		player.body.velocity.x = 0;
		if (posicao_player == 0){
			player.animations.play('specialAttack_right');
			attack.play();
		}
		else {
			player.animations.play('specialAttack_left');
			attack.play();
		}
		ataque = 1;
		setTimeout(() => {
			game.physics.arcade.overlap(player, vilao, checkColission_player2vilao, null, this);
		}, 100);
		setTimeout(() => {
            playerstate = 0;
			estamina.frame = 0;
			bar_estamina = 0;
		}, 550);
	}
}

function vilaoUpdate() {
	vilao.body.velocity.x = 0;

	if(key.left.isDown && !keyK.isDown && !keyL.isDown && !key.up.isDown && vilaostate == 0){
		vilao.animations.play("walk_left");
		vilao.body.velocity.x += -300;
		posicao_vilao = 1;
	}
	else if(key.right.isDown && !keyK.isDown && !keyL.isDown && !key.up.isDown && vilaostate == 0){
		vilao.animations.play("walk_right");
		vilao.body.velocity.x += 300;
		posicao_vilao = 0;
	}
	else{
		if (vilaostate == 0 && posicao_vilao == 0){
			vilao.animations.play("stand_right");
		}
		else if (vilaostate == 0 && posicao_vilao == 1){
			vilao.animations.play("stand_left");
		}
	}

	if (key.up.isDown && (vilao.body.velocity.y == 0)){
		vilaostate = 1;
		if (posicao_vilao == 0){
			vilao.animations.play('jump_right');
			jump.play();
		}
		else {
			vilao.animations.play('jump_left');
			jump.play();
		}
		vilao.body.velocity.y = -700;
		setTimeout(() => {
			vilaostate = 0;
		}, 700);
	}

	if(keyK.isDown && vilaostate == 0 && !key.left.isDown && !key.right.isDown){
		vilaostate = 1;
		vilao.body.velocity.x = 0;
		if (posicao_vilao == 0){
			vilao.animations.play('attack_right');
			attack.play();
		}
		else {
			vilao.animations.play('attack_left');
			attack.play();
		}
		ataque = 0;
		setTimeout(() => {
			game.physics.arcade.overlap(vilao, player, checkColission_vilao2player, null, this);
		}, 200);
		setTimeout(() => {
            vilaostate = 0;
		}, 450);

	}

	if(keyL.isDown && vilaostate == 0 && !key.left.isDown && !key.right.isDown && estamina2.frame == 40){
		vilaostate = 1;
		vilao.body.velocity.x = 0;
		if (posicao_vilao == 0){
			vilao.animations.play('specialAttack_right');
			attack.play();
		}
		else {
			vilao.animations.play('specialAttack_left');
			attack.play();
		}
		ataque = 1;
		setTimeout(() => {
			game.physics.arcade.overlap(vilao, player, checkColission_vilao2player, null, this);
		}, 100);
		setTimeout(() => {
            vilaostate = 0;
			estamina2.frame = 0;
			bar_estamina2 = 0;
		}, 550);
	}
}

// VERIFICAÇÃO DE COLISÕES ENTRE PLAYER -> VILÃO E VILÃO -> PLAYER

function checkColission_player2vilao(){

	if (vida2.frame < 15 && ataque == 1){
		vida2.frame = 0;
		ataque = 0;
	}
	else if (vida2.frame >= 15 && ataque == 1){
		vida2.frame -= 15;
		ataque = 0;
	}
	else{
		vida2.frame -= 5;
	}

	if (vida2.frame > 0){
		if (posicao_player == 0 && player.body.x < vilao.body.x){
			vilao.animations.play("fall_left");
			hit.play();
			fall.play();
			vilao.body.velocity.x = 50;
		}
		else if (posicao_player == 1 && player.body.x > vilao.body.x){
			vilao.animations.play("fall_right");
			hit.play();
			fall.play();
			vilao.body.velocity.x = -50;
		}
		vilaostate = 1;
		setTimeout(() => {
			vilao.body.velocity.x = 0;
			vilaostate = 0;
		}, 850);
    }
    else{
        vilaostate = 1;
		if (posicao_vilao == 0){
			vilao.animations.play("dead_right");
			fall.play();
		}
		else{
			vilao.animations.play("dead_left");
			fall.play();
		}
		mudaFrameBox(0);
		setTimeout(() => {
			var mainSource=window.parent
			localDataBase.loses += 1;
			if (localDataBase.loses == 2){
				win.visible = true;
				player1_label = game.add.image(370, 200, "player1");
				player1_label.visible = true;
				if (localDataBase.wins == 0){
					doubleKO.play();
				}
				setTimeout(() => {
					youWin.play();
				}, 1200);
				setTimeout(() => {
					winGame();
				}, 3500);
			}
			else if (localDataBase.loses < 2 && localDataBase.wins < 2){
				ko.visible = true;
				simpleKO.play();
				atualizaBox(0);
				localStorage.setItem('items',JSON.stringify(localDataBase));
				setTimeout(() => {
					mainSource.postMessage('../level/HTML/multiplayer.html', '*');
				}, 2500);
			}
		}, 700);
    }
}

function checkColission_vilao2player(){

	if (vida.frame < 15 && ataque == 1){
		vida.frame = 0;
		ataque = 0;
	}
	else if (vida.frame >= 15 && ataque == 1){
		vida.frame -= 15;
		ataque = 0;
	}
	else{
		vida.frame -= 5;
	}
	
	if (vida.frame > 0){
		if (posicao_vilao == 0 && vilao.body.x < player.body.x){
			player.animations.play("fall_left");
			hit.play();
			fall.play();
			player.body.velocity.x = 50;
		}
		else if (posicao_vilao == 1 && vilao.body.x > player.body.x){
			player.animations.play("fall_right");
			hit.play();
			fall.play();
			player.body.velocity.x = -50;
		}
		playerstate = 1;
		setTimeout(() => {
			player.body.velocity.x = 0;
			playerstate = 0;
		}, 850);
    }
    else{
        playerstate = 1;
		if (posicao_player == 0){
			player.animations.play("dead_right");
			fall.play();
		}
		else{
			player.animations.play("dead_left");
			fall.play();
		}
		mudaFrameBox(1);
		setTimeout(() => {
			var mainSource=window.parent
			localDataBase.wins += 1;
			if (localDataBase.wins == 2){
				win.visible = true;
				if (localDataBase.loses == 0){
					doubleKO.play();
				}
				setTimeout(() => {
					youWin.play();
				}, 1200);
				setTimeout(() => {
					winGame();
				}, 3500);
			}
			else if (localDataBase.loses < 2 && localDataBase.wins < 2){
				ko.visible = true;
				simpleKO.play();
				atualizaBox(1);
				localStorage.setItem('items',JSON.stringify(localDataBase));
				setTimeout(() => {
					mainSource.postMessage('../level/HTML/multiplayer.html', '*');
				}, 2500);
			}
		}, 700);
    }
}


// ATUALIZAÇÃO DA ESTAMINA DE CADA PERSONAGEM

function atualizaEstamina(){
	bar_estamina = 1;
	setTimeout(() => {
		if (estamina.frame < 40){
			estamina.frame += 10;
			bar_estamina = 0;
		}
	}, 3000);
}

function atualizaEstamina2(){
	bar_estamina2 = 1;
	setTimeout(() => {
		if (estamina2.frame < 40){
			estamina2.frame += 10;
			bar_estamina2 = 0;
		}
	}, 3000);
}

function winGame(){

	var mainSource=window.parent;
	localDataBase = JSON.parse(localStorage.getItem('items'));
	localDataBase.loses = 0;
    localDataBase.wins = 0;
	localDataBase.box1 = 2;
	localDataBase.box2 = 2;
	localDataBase.box3 = 2;
	localStorage.setItem('items',JSON.stringify(localDataBase));
	mainSource.postMessage('MenuMain.html', '*');
}

function atualizaBox(number){

	if (localDataBase.box1 == 2){
		localDataBase.box1 = number;
		localStorage.setItem('items',JSON.stringify(localDataBase));

		return
	}

	else if (localDataBase.box2 == 2){
		localDataBase.box2 = number;
		localStorage.setItem('items',JSON.stringify(localDataBase));

		return
	}

	else if (localDataBase.box3 == 2){
		localDataBase.box3 = number;
		localStorage.setItem('items',JSON.stringify(localDataBase));

		return
	}
}

function mudaFrameBox(number){
	if (localDataBase.box1 == 2){
		box1.frame = number
		return
	}

	else if (localDataBase.box2 == 2){
		box2.frame = number
		return
	}

	else if (localDataBase.box3 == 2){
		box3.frame = number
		return
	}
}

function startLabels(round1, round2, round3){

	box1 = game.add.sprite(520, 100, "box1", localDataBase.box1);
	box2 = game.add.sprite(560, 100, "box2", localDataBase.box2);
	box3 = game.add.sprite(600, 100, "box3", localDataBase.box3);
	
	if (localDataBase.box1 == 2){
		round1.play();
	}
	else if (localDataBase.box1 != 2 && localDataBase.box2 == 2){
		round2.play();
	}
	else if (localDataBase.box1 != 2 && localDataBase.box2 != 2){
		round3.play();
	}
}

function atualizaSom(){
	if (localDataBase.effects == 0){
		game.sound.mute = false;
	}
	else{
		game.sound.mute = true;
	}
}

function criaMapas(){
	switch (localDataBase.multiplayer[2]){
		case 0:
			map = game.add.sprite(0, 0, 'fundo');
			map.animations.add('fundo', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			map.animations.play("fundo");
			platforms = game.add.group();
			platforms.enableBody = true;
			var ground = platforms.create(0, 524, 'plata');
			plata = platforms.create(350, 300, 'plata_sup');
			ground.body.immovable = true;
			plata.body.immovable = true;
			plata.body.setSize(400, 70, 40, 10);
			return;
		case 1:
			map = game.add.sprite(0, 0, 'fundo');
			map.animations.add('fundo', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			map.animations.play("fundo");
			platforms = game.add.group();
			platforms.enableBody = true;
			var ground = platforms.create(0, 524, 'plata');
			plata = platforms.create(350, 300, 'plata_sup');
			ground.body.immovable = true;
			plata.body.immovable = true;
			plata.body.setSize(400, 70, 40, 10);
			return;
		case 2:
			map = game.add.sprite(0, 0, 'fundo');
			map.animations.add('fundo', [0, 1, 2, 3, 4], 10, true);
			map.animations.play("fundo");
			platforms = game.add.group();
			platforms.enableBody = true;
			var ground = platforms.create(0, 524, 'plata');
			ground.animations.add('plata_gif', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
			ground.animations.play("plata_gif");
			plata = platforms.create(280, 300, 'plata_sup');
			ground.body.immovable = true;
			plata.body.immovable = true;
			plata.body.setSize(500, 70, 40, 10);
			return;
		case 3:
			map = game.add.sprite(0, 0, 'fundo');
			map.animations.add('fundo', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 10, true);
			map.animations.play("fundo");
			platforms = game.add.group();
			platforms.enableBody = true;
			var ground = platforms.create(0, 515, 'plata');
			plata = platforms.create(280, 290, 'plata_sup');
			ground.body.immovable = true;
			plata.body.immovable = true;
			plata.body.setSize(550, 70, 40, 10);
			return;
	}
}

function criaAnimacoes(){
	switch (localDataBase.multiplayer[0]){
		case 1:

			player.animations.add('stand_left', [195, 196, 197, 198, 199, 200], 9, true);
			player.animations.add('walk_left', [180, 181, 182, 183 , 184, 185], 9, true);
			player.animations.add('attack_left', [105, 106, 107, 108, 109, 110], 12, false);
			player.animations.add('specialAttack_left', [165, 166, 167, 168], 10, false);
			player.animations.add('jump_left', [150, 151, 152, 153, 154, 155, 156, 157, 158, 159 , 160, 161], 15, false);
			player.animations.add('fall_left', [135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146], 15, false);
			player.animations.add('dead_left', [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131], 12, false);

			player.animations.add('stand_right', [75, 76, 77, 78, 79, 80], 9, true);
			player.animations.add('walk_right', [90, 91, 92, 93, 94, 95], 9, true);
			player.animations.add('attack_right', [0, 1, 2, 3, 4, 5], 12, false);
			player.animations.add('specialAttack_right', [60, 61, 62, 63], 10, false);
			player.animations.add('jump_right', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56], 15, false);
			player.animations.add('fall_right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 15, false);
			player.animations.add('dead_right', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 12, false);
			break;
		case 2:

			player.animations.add('stand_left', [156, 157, 158, 159, 160, 161, 162, 163], 9, true);
			player.animations.add('walk_left', [169, 170, 171, 172], 9, true);
			player.animations.add('attack_left', [91, 92, 93, 94, 95], 12, false);
			player.animations.add('specialAttack_left', [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 152], 10, false);
			player.animations.add('jump_left', [130, 131, 132, 133, 134, 135, 136, 137, 138, 139 , 140, 141, 142], 10, false);
			player.animations.add('fall_left', [117, 118, 119, 120, 121, 122, 123, 124, 125, 126], 15, false);
			player.animations.add('dead_left', [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115], 12, false);

			player.animations.add('stand_right', [65, 66, 67, 68, 69, 70, 71, 72], 9, true);
			player.animations.add('walk_right', [78, 79, 80, 81], 9, true);
			player.animations.add('attack_right', [0, 1, 2, 3, 4], 12, false);
			player.animations.add('specialAttack_right', [52, 53, 54, 55, 56, 57, 58, 59, 60, 61], 10, false);
			player.animations.add('jump_right', [39, 40, 41, 42, 43, 44, 45, 46, 47, 48 , 49, 50, 51], 10, false);
			player.animations.add('fall_right', [26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 15, false);
			player.animations.add('dead_right', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 12, false);
			break;
		case 3:

			player.animations.add('stand_left', [240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258], 9, true);
			player.animations.add('walk_left', [260, 261, 262, 263, 264, 265], 9, true);
			player.animations.add('attack_left', [140, 140, 142, 143], 12, false);
			player.animations.add('specialAttack_left', [220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239], 10, false);
			player.animations.add('jump_left', [200, 201, 202, 203, 204, 205, 206, 207, 208, 209 , 210, 211, 212, 213], 10, false);
			player.animations.add('fall_left', [180, 181, 182, 183, 184, 185, 186, 187], 15, false);
			player.animations.add('dead_left', [160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170], 12, false);

			player.animations.add('stand_right', [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118], 9, true);
			player.animations.add('walk_right', [120, 121, 122, 123, 124, 125], 9, true);
			player.animations.add('attack_right', [0, 1, 2, 3], 12, false);
			player.animations.add('specialAttack_right', [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99], 10, false);
			player.animations.add('jump_right', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], 10, false);
			player.animations.add('fall_right', [40, 41, 42, 43, 44, 45, 46, 47], 15, false);
			player.animations.add('dead_right', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 12, false);
			break;
		case 4:

			player.animations.add('stand_left', [204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220], 9, true);
			player.animations.add('walk_left', [221, 222, 223, 224, 225], 9, true);
			player.animations.add('attack_left', [119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129], 12, false);
			player.animations.add('specialAttack_left', [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199], 10, false);
			player.animations.add('jump_left', [170, 171, 172, 173, 174, 175, 176, 177, 178, 179 , 180, 181, 142], 10, false);
			player.animations.add('fall_left', [153, 154, 155, 156, 157, 158, 159, 160, 161, 162], 12, false);
			player.animations.add('dead_left', [136, 137, 138, 139, 140, 141, 142, 143, 144, 145], 12, false);

			player.animations.add('stand_right', [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101], 9, true);
			player.animations.add('walk_right', [102, 103, 104, 105, 106], 9, true);
			player.animations.add('attack_right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 12, false);
			player.animations.add('specialAttack_right', [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], 10, false);
			player.animations.add('jump_right', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60 , 61, 62, 63], 10, false);
			player.animations.add('fall_right', [34, 35, 36, 37, 38, 39, 40, 41, 42, 43], 15, false);
			player.animations.add('dead_right', [17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 12, false);
			break;
		case 5:

			player.animations.add('stand_left', [65, 66, 67, 68, 69, 70, 71], 9, true);
			player.animations.add('walk_left', [78, 79, 80, 81, 82, 83 , 84], 9, true);
			player.animations.add('attack_left', [0, 1, 2, 3, 4, 5, 6], 12, false);
			player.animations.add('specialAttack_left', [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62], 12, false);
			player.animations.add('jump_left', [39, 40, 41, 42, 43, 44, 45 ,46, 47, 48 ,49 ,50, 51], 20, false);
			player.animations.add('fall_left', [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], 20, false);
			player.animations.add('dead_left', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, false);

			player.animations.add('stand_right', [156, 157, 158, 159, 160, 161, 162], 9, true);
			player.animations.add('walk_right', [169, 170, 171, 172, 173, 174, 175], 9, true);
			player.animations.add('attack_right', [91, 92, 93, 94, 95, 96, 97], 12, false);
			player.animations.add('specialAttack_right', [143, 144, 145, 146, 147, 148, 149 , 150, 151, 152 ,153 ,154, 155], 12, false);
			player.animations.add('jump_right', [130, 131, 132, 133, 134, 135, 136 , 137, 138, 139 ,140 ,141, 142], 20, false);
			player.animations.add('fall_right', [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129], 20, false);
			player.animations.add('dead_right', [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114], 20, false);
			break;
		case 6:

			player.animations.add('stand_left', [55, 56, 57, 58, 59, 60, 61, 62, 63], 10, true);
			player.animations.add('walk_left', [66, 67, 68, 69, 70, 71], 10, true);
			player.animations.add('attack_left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, false);
			player.animations.add('specialAttack_left', [44, 45, 46, 47, 48, 49, 50, 51, 52], 12, false);
			player.animations.add('jump_left', [33, 34, 35, 36, 37, 38, 39, 40, 41], 12, false);
			player.animations.add('fall_left', [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 12, false);
			player.animations.add('dead_left', [11, 12, 13, 14, 15, 16, 17, 18, 19], 10, false);
	
			player.animations.add('stand_right', [132, 133, 134, 135, 136, 137, 138, 139, 140], 10, true);
			player.animations.add('walk_right', [143, 144, 145, 146, 147, 148], 9, true);
			player.animations.add('attack_right', [121, 122, 123, 124, 125, 126, 127, 128, 129, 130], 12, false);
			player.animations.add('specialAttack_right', [77, 78, 79, 80, 81, 82, 83, 84, 85], 12, false);
			player.animations.add('jump_right', [110, 111, 112, 113, 114, 115, 116, 117, 118], 12, false);
			player.animations.add('fall_right', [99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109], 20, false);
			player.animations.add('dead_right', [88, 89, 90, 91, 92, 93, 94, 95, 96], 10, false);
			break;
	}

	switch (localDataBase.multiplayer[1]){
		case 1:
			
			vilao.animations.add('stand_left', [195, 196, 197, 198, 199, 200], 9, true);
			vilao.animations.add('walk_left', [180, 181, 182, 183 , 184, 185], 9, true);
			vilao.animations.add('attack_left', [105, 106, 107, 108, 109, 110], 12, false);
			vilao.animations.add('specialAttack_left', [165, 166, 167, 168], 10, false);
			vilao.animations.add('jump_left', [150, 151, 152, 153, 154, 155, 156, 157, 158, 159 , 160, 161], 15, false);
			vilao.animations.add('fall_left', [135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146], 15, false);
			vilao.animations.add('dead_left', [120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131], 12, false);

			vilao.animations.add('stand_right', [75, 76, 77, 78, 79, 80], 9, true);
			vilao.animations.add('walk_right', [90, 91, 92, 93, 94, 95], 9, true);
			vilao.animations.add('attack_right', [0, 1, 2, 3, 4, 5], 12, false);
			vilao.animations.add('specialAttack_right', [60, 61, 62, 63], 10, false);
			vilao.animations.add('jump_right', [45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56], 15, false);
			vilao.animations.add('fall_right', [30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40], 15, false);
			vilao.animations.add('dead_right', [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 12, false);
			break;

		case 2:
			
			vilao.animations.add('stand_left', [156, 157, 158, 159, 160, 161, 162, 163], 9, true);
			vilao.animations.add('walk_left', [169, 170, 171, 172], 9, true);
			vilao.animations.add('attack_left', [91, 92, 93, 94, 95], 12, false);
			vilao.animations.add('specialAttack_left', [143, 144, 145, 146, 147, 148, 149, 150, 151, 152, 152], 10, false);
			vilao.animations.add('jump_left', [130, 131, 132, 133, 134, 135, 136, 137, 138, 139 , 140, 141, 142], 10, false);
			vilao.animations.add('fall_left', [117, 118, 119, 120, 121, 122, 123, 124, 125, 126], 15, false);
			vilao.animations.add('dead_left', [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115], 12, false);

			vilao.animations.add('stand_right', [65, 66, 67, 68, 69, 70, 71, 72], 9, true);
			vilao.animations.add('walk_right', [78, 79, 80, 81], 9, true);
			vilao.animations.add('attack_right', [0, 1, 2, 3, 4], 12, false);
			vilao.animations.add('specialAttack_right', [52, 53, 54, 55, 56, 57, 58, 59, 60, 61], 10, false);
			vilao.animations.add('jump_right', [39, 40, 41, 42, 43, 44, 45, 46, 47, 48 , 49, 50, 51], 10, false);
			vilao.animations.add('fall_right', [26, 27, 28, 29, 30, 31, 32, 33, 34, 35], 15, false);
			vilao.animations.add('dead_right', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25], 12, false);
			break;
	
		case 3:
			
			vilao.animations.add('stand_left', [240, 241, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251, 252, 253, 254, 255, 256, 257, 258], 9, true);
			vilao.animations.add('walk_left', [260, 261, 262, 263, 264, 265], 9, true);
			vilao.animations.add('attack_left', [140, 140, 142, 143], 12, false);
			vilao.animations.add('specialAttack_left', [220, 221, 222, 223, 224, 225, 226, 227, 228, 229, 230, 231, 232, 233, 234, 235, 236, 237, 238, 239], 10, false);
			vilao.animations.add('jump_left', [200, 201, 202, 203, 204, 205, 206, 207, 208, 209 , 210, 211, 212, 213], 10, false);
			vilao.animations.add('fall_left', [180, 181, 182, 183, 184, 185, 186, 187], 15, false);
			vilao.animations.add('dead_left', [160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170], 12, false);

			vilao.animations.add('stand_right', [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118], 9, true);
			vilao.animations.add('walk_right', [120, 121, 122, 123, 124, 125], 9, true);
			vilao.animations.add('attack_right', [0, 1, 2, 3], 12, false);
			vilao.animations.add('specialAttack_right', [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99], 10, false);
			vilao.animations.add('jump_right', [60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73], 10, false);
			vilao.animations.add('fall_right', [40, 41, 42, 43, 44, 45, 46, 47], 15, false);
			vilao.animations.add('dead_right', [20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30], 12, false);
			break;

		case 4:
			
			vilao.animations.add('stand_left', [204, 205, 206, 207, 208, 209, 210, 211, 212, 213, 214, 215, 216, 217, 218, 219, 220], 9, true);
			vilao.animations.add('walk_left', [221, 222, 223, 224, 225], 9, true);
			vilao.animations.add('attack_left', [119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129], 12, false);
			vilao.animations.add('specialAttack_left', [187, 188, 189, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199], 10, false);
			vilao.animations.add('jump_left', [170, 171, 172, 173, 174, 175, 176, 177, 178, 179 , 180, 181, 142], 10, false);
			vilao.animations.add('fall_left', [153, 154, 155, 156, 157, 158, 159, 160, 161, 162], 12, false);
			vilao.animations.add('dead_left', [136, 137, 138, 139, 140, 141, 142, 143, 144, 145], 12, false);

			vilao.animations.add('stand_right', [85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101], 9, true);
			vilao.animations.add('walk_right', [102, 103, 104, 105, 106], 9, true);
			vilao.animations.add('attack_right', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 12, false);
			vilao.animations.add('specialAttack_right', [68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80], 10, false);
			vilao.animations.add('jump_right', [51, 52, 53, 54, 55, 56, 57, 58, 59, 60 , 61, 62, 63], 10, false);
			vilao.animations.add('fall_right', [34, 35, 36, 37, 38, 39, 40, 41, 42, 43], 15, false);
			vilao.animations.add('dead_right', [17, 18, 19, 20, 21, 22, 23, 24, 25, 26], 12, false);
			break;

		case 5:
			
			vilao.animations.add('stand_left', [65, 66, 67, 68, 69, 70, 71], 9, true);
			vilao.animations.add('walk_left', [78, 79, 80, 81, 82, 83 , 84], 9, true);
			vilao.animations.add('attack_left', [0, 1, 2, 3, 4, 5, 6], 12, false);
			vilao.animations.add('specialAttack_left', [52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62], 12, false);
			vilao.animations.add('jump_left', [39, 40, 41, 42, 43, 44, 45 ,46, 47, 48 ,49 ,50, 51], 20, false);
			vilao.animations.add('fall_left', [26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38], 20, false);
			vilao.animations.add('dead_left', [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23], 20, false);
	
			vilao.animations.add('stand_right', [156, 157, 158, 159, 160, 161, 162], 9, true);
			vilao.animations.add('walk_right', [169, 170, 171, 172, 173, 174, 175], 9, true);
			vilao.animations.add('attack_right', [91, 92, 93, 94, 95, 96, 97], 12, false);
			vilao.animations.add('specialAttack_right', [143, 144, 145, 146, 147, 148, 149 , 150, 151, 152 ,153 ,154, 155], 12, false);
			vilao.animations.add('jump_right', [130, 131, 132, 133, 134, 135, 136 , 137, 138, 139 ,140 ,141, 142], 20, false);
			vilao.animations.add('fall_right', [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129], 20, false);
			vilao.animations.add('dead_right', [104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114], 20, false);
			break;

		case 6:

			vilao.animations.add('stand_left', [55, 56, 57, 58, 59, 60, 61, 62, 63], 10, true);
			vilao.animations.add('walk_left', [66, 67, 68, 69, 70, 71], 10, true);
			vilao.animations.add('attack_left', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 12, false);
			vilao.animations.add('specialAttack_left', [44, 45, 46, 47, 48, 49, 50, 51, 52], 12, false);
			vilao.animations.add('jump_left', [33, 34, 35, 36, 37, 38, 39, 40, 41], 12, false);
			vilao.animations.add('fall_left', [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32], 12, false);
			vilao.animations.add('dead_left', [11, 12, 13, 14, 15, 16, 17, 18, 19], 10, false);
	
			vilao.animations.add('stand_right', [132, 133, 134, 135, 136, 137, 138, 139, 140], 10, true);
			vilao.animations.add('walk_right', [143, 144, 145, 146, 147, 148], 9, true);
			vilao.animations.add('attack_right', [121, 122, 123, 124, 125, 126, 127, 128, 129, 130], 12, false);
			vilao.animations.add('specialAttack_right', [77, 78, 79, 80, 81, 82, 83, 84, 85], 12, false);
			vilao.animations.add('jump_right', [110, 111, 112, 113, 114, 115, 116, 117, 118], 12, false);
			vilao.animations.add('fall_right', [99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109], 20, false);
			vilao.animations.add('dead_right', [88, 89, 90, 91, 92, 93, 94, 95, 96], 10, false);
			break;
	}
}