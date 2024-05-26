// mazemake 
//
// operation function propaty method
// createObject: map = new mazemake(w, h);// mapsize
// initialize/reset : map.init();

// mapcreateComplite: map.ready (true/false) neg. false/complite, true/running ?busy

//map.draw(map.wall, "dsp_d");//DOM <p> Draw wall(array);
//map.draw(map.floo, "dsp_e");

function mazemake( w , h){

    let map_wall;
    let map_floor;
    let map_unit;

    this.wall = map_wall;  
    this.floo = map_floor;
    this.unit = map_unit; 

    this.ready;

    //this.draw = mapdraw;
    this.draw = mapcanvasdraw;

    let mlog;
    let x; 
    let y;
    let r;

    const MAP_W = w;
    const MAP_H = h;

    const vx = [ 0, 1, 0, -1 ]; const vy = [ -1, 0, 1, 0];


    this.init = function(){

        map_wall = fillarray(MAP_W, MAP_H, true);  
        map_floor = fillarray(MAP_W, MAP_H, true);
        map_unit = fillarray(MAP_W, MAP_H, 0);  

        for (let i=1; i<MAP_H; i+=2){
            for (let j=1; j<MAP_W; j+=2){

                //map_wall[i][j]   = false;
                map_floor[i][j]   = false;
            }   
        }

        this.ready = false;
        x = 1;
        y = 1;
        r = 2;

        mlog = [];

        map_floor[y][x] = true;
        mlog.push({x:x, y:y});
    }

    this.step = function(){

        if (this.ready) return;
    
        if (check(x, y, r)){

            map_wall[y][x]   = false;
            map_wall[y+vy[r]][x+vx[r]]   = false;
            map_floor[y+vy[r]*2][x+vx[r]*2]  = true;

            x += vx[r]*2;
            y += vy[r]*2;

            mlog.push({x:x, y:y});
        }else{
            map_wall[y][x]   = false;

            let wr = -1;
            for (let i=0; i<4; i++){
                if (check(x, y, i)){
                    wr = i;
                }
            }
            if (wr == -1){
                let w = mlog.pop();
                //if (mlog.length>0){ w = mlog.pop() };
                x = w.x; y = w.y;

                r = (r+2)%4
            }
        }
        if (Math.random()*3 < 1) {
            let vr = (Math.random()*2 < 1)?1:3;
            r = (r+vr)%4; 
        }

        if (!mapdraw(map_floor, "dsp_e")){ this.ready = true;}

        this.wall = map_wall;  
        this.floo = map_floor; 
        this.unit = map_unit;  
    }

    function check(x, y, r){
        let f = false;
        if ((x+vx[r]*2 >= 1)&&(x+vx[r]*2 < MAP_W-1)&&(y+vy[r]*2 >= 1)&&(y+vy[r]*2 < MAP_H-1)){
            if (!(map_floor[ (y+vy[r]*2) ][ (x+vx[r]*2) ])){
                f = true;
            }else{
                f= false;
            }
        }else{
            f= false;
        }
        return f;
    }

    function fillarray(w , h, p){
        let ary = Array(h);
        ary.fill([]);
        for (let i in ary){
            ary[i] = Array(w);
            ary[i].fill(p);
        }
        return ary;
    }

    function mapdraw(map, id){
        let flg = false;
        let st = "";
        for (let i in map){
            for (let j in map[i]){
                if (map[i][j]){
                    //st += String.fromCharCode("0".charCodeAt(0)+map[i][j]) + ".";
                    st += "■";
                    //flg = true;
                } else {
                    st += "□";
                    flg = true;
                }
            }
            st += "<br>";
        }
        //document.getElementById(id).innerHTML = st;
        return flg;
    }

    function mapcanvasdraw(ctx, map, id){
        let flg = false;
        let st = "";
        for (let i in map){
            for (let j in map[i]){
                if (map[i][j]){
                    ctx.beginPath();
                    ctx.fillStyle = "cyan";
                    ctx.fillRect(j*16,i*16,15,15);
                    //flg = true;
                } else {
                    flg = true;
                }
            }
        }
        return flg;
    }
   
}