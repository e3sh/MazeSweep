// main NONTITLE(PwrRnkup) 2024/04/13- dncth16
//----------------------------------------------------------------------
function main() {

    const sysParam = {
		canvasId: "layer0",
        screen: [ 
			{ resolution: { w: 640, h: 640 , x:0, y:0 } }
            ,{ resolution: { w: 640, h: 640 , x:0, y:0 } }
        ]
	}
	const game = new GameCore( sysParam );

	//Game Asset Setup
	pictdata(game);

	const spfd = SpriteFontData();
	for (let i in spfd) {
	    game.setSpFont(spfd[i]);
	}
    /*
    game.kanji = new fontPrintControl(
        game
        ,game.asset.image["ASCII"].img,	 6, 8
        ,game.asset.image["JISLV1"].img,12, 8
    )
    */
    //Game Task Setup
	game.task.add(new GameTask_Main("main"));

	//
	game.screen[0].setBackgroundcolor("black");//"Navy"); 
    game.screen[0].setInterval(1); 

    game.viewport = new viewport();
    game.viewport.size(480, 640);
    //game.viewport.border(240,320);
    game.viewport.border(0,0);
    game.viewport.setPos(0,0);
    game.viewport.repeat(false);

    //game.RESO_X = 1600;
    //game.RESO_Y = 960;
    game.RESO_X = 640;
    game.RESO_Y = 640;

	game.run();
}

//----------------------------------------------------------------------
// SpriteFontData
function SpriteFontData() {

	let sp_ch_ptn = [];

    for (let i = 0; i < 7; i++) {
        for (j = 0; j < 16; j++) {
            ptn = {
                x: 12 * j,
                y: 16 * i,
                w: 12,
                h: 16
            }

            sp_ch_ptn.push(ptn);
        }
    }
    //12_16_font

    let sp8 = []; //spchrptn8(color)
    let cname = ["white", "red", "green", "blue"];

    for (let t = 0; t <= 3; t++) {

        let ch = [];

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 16; j++) {
                ptn = {
                    x: 6 * j,
                    y: 8 * i + 16,
                    w: 6,
                    h: 8
                };
                ch.push(ptn);
            }
        }
        sp8[ cname[t] ] = ch;
    }
    //↑↑

    return [
        { name: "std"     , id: "ASCII", pattern: sp8["white"] }
        ,{ name: "8x8red"  , id: "ASCII", pattern: sp8["red"] }
        ,{ name: "8x8green", id: "ASCII", pattern: sp8["green"] }
        ,{ name: "8x8blue" , id: "ASCII", pattern: sp8["blue"] }
		,{ name: "8x8white", id: "ASCII", pattern: sp8["white"] }

    ]
}

//----------------------------------------------------------------------
//Image Asset Setup
function pictdata(g){
	g.asset.imageLoad( "SPGraph","pict/cha.png"	);
	//g.asset.imageLoad( "title"  ,"pict/TitleLogo.png" );

	//g.asset.imageLoad( "JISLV1" ,"pict/k12x8_jisx0208c.png");
	g.asset.imageLoad( "ASCII"  ,"pict/k12x8_jisx0201c.png");
}
