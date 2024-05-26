function StageControl(game){

	const ROW = 60;
	const COL = 80;

	let rank;

	const bgImage = new OffscreenCanvas( game.RESO_X, game.RESO_Y );
	const bgCtx  = bgImage.getContext("2d" ,{
			alpha:false
			,willReadFrequently:true
		}
	);

	let map;

	let g = game;

	this.reflectFieldMap = function(){

		g.fieldMap = map;
	}
	
	this.init = function(){

		rank = 1;

		//const dev = bgCtx;
		//const cpmap = mapImageCreate(dev);

		//g.CHECKPOINT_MAP = cpmap;

		map = new mazemake(39, 39);
		map.init();

		while (!map.ready){
			map.step(); //Generate
		}	
	}

	this.change = function(stage, GObj){

		rank = stage;

		/*
		for (let i=1; i<4; i++){
			let enemy = new GameObjectEnemy(g);
			enemy.spriteItem = g.sprite.itemCreate("Enemy", true, 28, 28);
			enemy.spriteItem.pos(800 - i * 32,100);
			enemy.init(8 + i*2 + rank, (15-i)/10, 2+i);//maxspeed, accel, lane
			GObj.push(enemy);

			enemy = new GameObjectEnemy(g);
			enemy.spriteItem = g.sprite.itemCreate("Enemy", true, 28, 28);
			enemy.spriteItem.pos(800 - i * 32,260);
			enemy.init(8 + (i+3)*2 + rank, (15-(i+3))/10, 4-i);//maxspeed, accel, lane
			GObj.push(enemy);
		}
		*/
	}	

	this.step = function(g, input, result){
		/*
		if (map.ready){
			map.init();
		}
		map.step();
		*/

		let spriteTable = g.sprite.itemList();
		//---------------------breakcheck(block sprite hit check
		for (let i in spriteTable){
			let p = spriteTable[i];

			let sp = spriteTable[i];
			if (!sp.living) continue;
			if (!sp.collisionEnable) continue;
			if (!sp.visible) continue;

			let w = p.collision.w;
			let h = p.collision.h;													
			
			/*
			if (p.id == "Player"){
				let imgd = bgCtx.getImageData(p.x - w/2, p.y - h/2, w ,h);
				c = 0;
				for (let i=1; i < imgd.data.length; i+=4){
					c += (imgd.data[i] != 0)?0:1;
				}
				if (c != 0 ) p.wall = true;
			}
			*/
		}
	}
	this.draw = function(g){

		//const vp = g.viewport.viewtoReal;
		//let r = vp(0,0);
		//g.screen[0].putImage(bgImage, r.x, r.y);

		let l = Math.trunc(g.time()/10);

		for (let i in map.wall){
			for (let j in map.wall[i]){
				if (map.wall[i][j]){
					g.screen[0].fill(j*16,i*16, 15,15,	"cyan");
				} 
				//g.font["std"].putchr((i%10)+ ":", 0, 8+i*16);
				//if (i==10) g.font["std"].putchr((j%10)+ ":", 6+j*16, (l+i*16)%640);
			}
		}
	}
}
