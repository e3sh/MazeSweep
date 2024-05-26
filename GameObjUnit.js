function GameObjectUnit(game){

    const g = game;

    const W_MAX = Math.trunc(g.RESO_X/16);
    const H_MAX = Math.trunc(g.RESO_Y/16);

    this.r = 0;
    this.vr = 0;
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;

    this.old_X = 0;
    this.old_y = 0;

    this.living = true;
    this.glow = true;
    this.running = false;
    this.select = false;

    let note;
    let notescore;
    let notetime;

    let map;
    let route;

    let mov;

    let mode;

    this.init = function(g, x, y, m=0){

        this.r = 0;
        this.vr = 0;
        this.x =  x;
        this.y =  y;
        this.old_x = this.x;
        this.old_y = this.y;

        notescore = g.beep.makeScore(["C3"], 250, 0.3);

        route = new routecheck(0);
        mov = {route:[], cnt:0, vx:0, vy:0, ix:0, iy:0 };

        mode = m;
        //console.log(mode);

        if (mode == 0) this.select = true;
        this.living = true;
        this.glow = true;
    }

    this.routeSet = function(goal){
        route.init(g.fieldMap.wall, {x:this.x, y:this.y},{x:goal.x, y:goal.y});
        mov.route = route.result();
        mov.cnt = 0;

        //this.running = true;
    }

    this.setNote = function(n){
        note = n;
        notetime = 0;
    }
  
    this.step = function(g, input, result){
        map = g.fieldMap;

        let x = input.x;
        let y = input.y;
        let r = (input.left)?-1:(input.right)?1:0;

        let speed = 0;

        if (mode == 0){
            let im = input.mouse;
            if (im.button != -1 && mov.cnt <= 8){

                let x = Math.trunc((im.x)/16);
                let y = Math.trunc((im.y)/16);

                if (y >=0 && y < map.unit.length){
                    if (x >= 0 && x < map.unit[y].length) {
                        if (!map.wall[y][x]){
                            //map.unit[y][x] = 2;
                            //const routeCheck = new routecheck(0);
                            route.init(map.wall, {x:this.x, y:this.y},{x:x, y:y});

                            mov.route = route.result();
                            mov.cnt = 0;

                            //this.running = true;
                        }
                    }
                }
            }
            speed = 1;
        } else {
            /*
            let im = input.mouse;
            if (im.button != -1){
                if (this.glow){
                    //console.log("x:" + this.x + " y:" + this.y + " m:" + map.wall.length);
                    route.init(map.wall, {x:this.x, y:this.y},{x:this.x, y:29});
                    mov.route = route.result();
                    mov.cnt = 0;

                    this.glow = false;
                }
            }
            if (!this.glow && mov.route.length < 1) this.living = false;
            if (map.wall[this.y][this.x]) this.living = false;
            */
        }
        let vx = speed*x;
        let vy = speed*y;

        if ( x==0 && y == 0){
            if ((mov.cnt < 1)&&( mov.route.length > 0)){
                let w = mov.route.pop();
                mov.vx = w.vx;
                mov.vy = w.vy;

                mov.ix = w.vx;
                mov.iy = w.vy;

                mov.cnt = 16;
            }else{
                //if (mov.route.length < 16){
                mov.vx = 0;
                mov.vy = 0;

                //map.unit[this.y][this.x] = this; 
                //}
            }
            mov.cnt--;
            vx = mov.vx;
            vy = mov.vy;

            this.running = (mov.cnt >= 0)?true:false;
        }

        if ((mode != 0)&&(mov.cnt < 1)&&( mov.route.length == 0)) {
            this.living = false;
            //map.wall[this.y][this.x] = true;
        }
        //if (mode !=0 && vy<0) vy = 0;

        let tx = this.x;
        let ty = this.y;

        if ((vx!=0 || vy!=0)){//||result.clrf) {

            this.old_x = this.x;
            this.old_y = this.y;

            let tajs = 1;//(g.deltaTime()/(1000/60));//speed DeltaTime ajust 60f base
            let wx = this.x + (vx * tajs);
            let wy = this.y + (vy * tajs);

            if (!map.wall[wy][wx])
            {
                this.x = wx;//this.x + (vx * tajs);
                this.y = wy;//this.y + (vy * tajs);
            }
            
            if (this.x < 0)	this.x = 0;
            if (this.x > W_MAX)	this.x = W_MAX;
            if (this.y < 0)	this.y = 0;
            if (this.y > H_MAX)	this.y = H_MAX;

            if (g.time() > notetime) note.busy = false;
            if ((!note.busy)&&(!result.clrf)){
                for (let i in notescore){
                    let n = notescore[i]; 
                    n.use = false;
                }
                notetime = g.time() + 240;
            }else{
                if (note.busy) note.changeFreq(65*(speed/2));
            }
        }
    }
    
    this.draw = function(g){
        map = g.fieldMap;

        let wx = Math.trunc(this.x);
        let wy = Math.trunc(this.y);

        let mvcol   = (this.select)?"yellow":"orange";
        let col     = (this.select)?"yellow":(map.wall[wy][wx])?"red":"white";

        if (this.running){//(mov.cnt > 0){
            g.screen[0].fill(wx*16-mov.ix*mov.cnt, wy*16-mov.iy*mov.cnt, 15,15,	mvcol);
        }else{
            g.screen[0].fill(wx*16, wy*16, 15,15,	col);
        }
        let r = route.result();
        for (let i in r){
            let st = Number(i).toString(36);
            g.font["std"].putchr(st,r[i].x*16 ,r[i].y*16);
        }
    }
}
