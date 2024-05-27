//----------------------------------------------------------------------
//Scene
//----------------------------------------------------------------------
// UI
function SceneGameUI(){

	const X = 0;
	const Y = 480-32;

	const BAR_W = 640;
	//const BAR_Y = 32;

	let ene;
	let result;
	let time;

	let speed;
	let lap;
	let finalf
	let finalw;

	this.step = function(g, input, p){

		ene = p.ene;
		result = p.result;
		time = p.time

		speed = 1;//p.status.speed;
		lap = 0;//p.laplist;
		finalf = false;
		finalw = false;
		for (let i in lap){
			if (lap[i].count > 3) finalf = true;
			if (lap[0].count + lap[0].par < lap[i].count + lap[i].par) finalw = true;
		}
	}
	this.draw = function(g){
		/*
		const BAR_Y = -16;
		g.screen[0].fill(X	,Y+BAR_Y  ,BAR_W,16,"white");
		g.screen[0].fill(X+1,Y+BAR_Y+1,BAR_W-2,14,"black");
		g.screen[0].fill(X+1,Y+BAR_Y+1,(BAR_W-2)*(ene.before	/ene.max), 14,"yellow");
		g.screen[0].fill(X+1,Y+BAR_Y+1,(BAR_W-2)*(ene.now	/ene.max), 14,((ene.now/ene.max)<0.2)?"red":"cyan");
		*/
		//g.font["std"].putchr("PLAYER:" + ene.now + " SCORE:" + Math.trunc(result.score) + " STAGE:" + result.stage + " TIME:" + time, X, Y);
		//g.font["std"].putchr("PLAYER:" + ene.now + " STAGE:" + result.stage, X, Y);
	
		let st="";for (let i=1; i<ene.now;i++)st+="A";
		g.font["std"].putchr("PLAYER:" + st, X, Y);
		g.font["std"].putchr("STAGE :" + result.stage + " SCORE:" + Math.trunc(result.score),  X, Y+8);

		/*
        g.screen[1].fill(0,240,16,200,"yellowgreen");
        g.screen[1].fill(1,241,14,198-(198*(speed/30)),"black");

		g.font["std"].putchr(Math.trunc(speed) + " ", X+4, Y-16);//SPEED


		const LR_X = 640-120;
		const LR_Y = 200;

		let md = 0;
		if (Boolean(lap)) {
			g.screen[1].fill(LR_X, LR_Y, 80, 8*lap.length, "black");

		    if (Boolean(lap[0])) md = lap[0].count + lap[0].par;
		}
		for (let i in lap){
			const t = (i==0)?"PLAYER":"ENEMY ";
			g.screen[1].fill(LR_X+40, LR_Y+i*8+6-lap[i].count, 38*lap[i].par, 1+lap[i].count
				,(md < lap[i].count + lap[i].par)?"red":"limegreen");
			g.font["std"].putchr(t + " LAP:" + lap[i].count,LR_X,LR_Y+i*8);
		}

		if (finalf && (Math.trunc(g.time()/333)%2 ==0)) {

			g.screen[1].fill(320-30, LR_Y-16, 66, 8, (finalw)?"red":"black");
			g.font["std"].putchr("FINAL LAP",320-24, LR_Y-16);
		}
		*/
		//g.kanji.print("強化：[正面][側面][僚機]", X, Y+16);

		//g.kanji.print("　　　[||| ][||| ][||| ][||| ][||| ]", X, Y+24);
	}
}
//----------------------------------------------------------------------
// TitleScene
function SceneResult(){

	const X = 640/2;
	const Y = 480-16;

	const BAR_X = 24;
	const BAR_Y = 480-16;
	
	let slot = 0;
	let pf 
	let runtime

	this.step = function(g, input){
		//Non Process (Draw Only)
	}
	this.draw = function(g){

		g.screen[1].fill(X-100-9, Y-300-12, 18*11, 24, "black");
		g.font["std"].putchr("STAGE CLEAR", X-100, Y-300, 3);
		g.font["std"].putchr("STAGE CLEAR", X, Y);
	}
}
//----------------------------------------------------------------------
// TitleScene
function SceneTitle(){

	const X = 640/2 -160;
	const Y = 480/2 -100;

	let inp;

	const Title = [
		//"Thema  ----/---- (Donichi thread--)"
		,""
		,"     MAZE SWEEP PRACTICE"
		,""
		,""
		,""
		,""
		,""
		,"           START SPACE KEY"
		,"                     or GamePad Button X/A"
		,""
		,""
		,""
		//,"[Method of Operation]"
		//,"STEERING  : Q,E or GamePad Button L/R"
		//,"ACCELE    : W key or GamePad LeftAnalogStick UP"
		//,"BLAKE     : S key or GamePad LeftAnalogStick DOWN"
		//,"SHOT      : SPACE key or GamePad Button X/A"
	];

	this.step = function(g, input, p){
		inp = input;

		delay = ((p.delay - g.time()) <0);

		let rf = false;
		if (delay){
			if (input.trigger) rf = true;
            if (input.mouse.button != -1) rf = true;
		}	
		return rf;
	}
	this.draw = function(g){

		for (let i in Title){
			g.font["std"].putchr(Title[i], X, Y+i*8);
		}

		/*
		//g.screen[0].putImage(g.asset.image["title"].img,X-250, Y-100	);
		g.font["std"].putchr("TANK BATTLE Style/ERA-TANK",			X, Y+8	);
		g.kanji.print("ゲームタイトルを表示させる場所/戦車風味/爆発反応装甲",X, Y+16	);
		g.font["std"].putchr("START SPACE KEY",			X, Y+80		);
		g.font["std"].putchr("or GamePad Button X/A",		X, Y+88		);
		g.kanji.print("[操作]移動 WASD or 矢印キー or GamePad 左アナログスティック",X, Y+128		);
		g.kanji.print("攻撃 スペースキー or GamePad Button X/A",		X, Y+136		);
		g.kanji.print("砲塔攻撃方向の固定 Zキー or GamePad Button L/R",	X, Y+144		);
		g.kanji.print(" ",		X, Y+88		);
		*/
	}
}
//----------------------------------------------------------------------
// GameOverScene
function SceneGameOver(){

	const X = 640/2;
	const Y = 480-32;//32;//480/2;

	let stage;
	let score;
	let delay;

	this.step = function(g, input, p){

		stage = p.stage;
		score = Math.trunc(p.score);
		delay = ((p.delay - g.time()) <0);

		if (delay){
			g.sprite.itemFlash();
			if (input.trigger){
				return true;
			};
		}
	}
	this.draw = function(g){

		g.screen[1].fill(X-100-12, Y-280-16, 24*9, 32, "black");
		g.font["std"	].putchr("GAME OVER",		 X-100, Y-280,4	);
		//g.font["std"	].putchr("STAGE:" + stage,	 X-80, Y,	);
		//g.font["std"	].putchr("SCORE:" + score, X-80, Y+30	);
		g.font["std"	].putchr(":" + (delay?"OK":"WAIT") , X, Y+8);
	}
}
//----------------------------------------------------------------------
// DEBUGScene(DeltaTime)
function SceneDebug(){

	const X = 640 - 100;
	const Y = 0;

	let block;
	let deltatime;
	let collision;
	let sprite;
	let input;

	this.step = function(g, i, p){

		block	= p.block;
		deltatime= g.deltaTime().toString().substring(0, 5);
		collision= p.collision;
		sprite	= p.sprite;
		input = i;
	}
	this.draw = function(g){

		//g.screen[0].fill(1024 - 100, 0,100,32,"black");

		//g.font["8x8white"	].putchr("block:"	 + block	,X, Y+24);
		g.font["8x8white"	].putchr("DeltaT:"	 + deltatime,X, Y	);
		//g.font["8x8red"		].putchr("Sprite:"	 + sprite	,X, Y+ 8);
		let IX = (input.x != 0)?((input.x > 0)?"R":"L"):"-";
		let IY = (input.y != 0)?((input.y > 0)?"D":"U"):"-";
		let T = (input.trigger)?"T":"-";
		//let L = (input.left)?"S":"-";
		let S = (input.right)?"S":"-";
		g.font["8x8green"	].putchr("Input:" + IY + ":" + IX + ":" + T + ":" + S , X, Y+16);
	}
}
//----------------------------------------------------------------------
// GPadScene(I/Ostatus)
function SceneGPad(){

	const X = 0;
	const Y = 48;

	let st;

	let r;

	this.step = function(g, i, p){

		st = g.gamepad.infodraw()

		let k = i.keycode;

		let ws = ""
		for (let i in k){
			if (Boolean(k[i])){
				ws += "[" + i + "]";//+ (k[i]?"o":".");
			}
		} 
		st.push("");
		st.push("[Keyboard]");
		st.push(ws);

		ws = "x:" + i.mouse.x + ",y:" + i.mouse.y + ",btn:" + i.mouse.button;
		
		st.push("");
		st.push("[Mouse]");
		st.push(ws);

		r = {x:i.mouse.x, y:i.mouse.y};

	}
	this.draw = function(g){

		for (let i in st){
			g.font["std"].putchr(st[i],X, Y+i*8);
		}
		g.screen[1].fill(r.x, r.y, 2, 2, "white");
	}
}
//----------------------------------------------------------------------
// VGPadScene(I/Ostatus)
function SceneVGPad(){

	const X = 0;
	const Y = 0;

	let st;

	this.step = function(g, i, p){

		let s = g.vgamepad.check();

		st = [];

		st.push("state button:" + s.button);
		st.push("state deg   :" + s.deg);
		st.push("state distance:" + s.distance);
	}
	this.draw = function(g){

		g.vgamepad.draw(g.screen[1]);

        let cl = {};
        cl.draw = function(device){
			device.beginPath();
            device.globalAlpha = 1.0;

		}
		g.screen[1].putFunc(cl);

		for (let i in st){
		//	g.font["8x8white"].putchr(st[i],X, Y+i*8);
		}
	}
}
