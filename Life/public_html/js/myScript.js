cellSize = 20 ;
size = 30;

var life = {};

life.board = [];
life.borderX = (view.size.width - size*cellSize)/2;
life.borderY = (view.size.height - size*cellSize)/2;
life.coords = function (i,j){  x = this.borderX + i*cellSize; y = this.borderY + j*cellSize; return [x,y];};
life.init = function(){
    for(i=0; i< size;i++){
        var newCell = [];
        newTaille = this.board.push(newCell);
        for(j=0; j<size;j++){
            life.board[i][j] = new Cell(i, j);
        }
    }
};

life.saveState = function(){
    for(i=0; i< size;i++){
        for(j=0; j<size;j++){
            life.board[i][j].previousState = life.board[i][j].state;
        }
    }
};

life.getPreviousState = function(i,j){
    if( i<0 || i>29 || j<0 || j>29){
        return 0;
    }
    else{
        return this.board[i][j].previousState;
    }
};

life.iterate = function(){
    this.saveState();
    
    for(i=0; i< size;i++){
        for(j=0; j<size;j++){
            res = this.getPreviousState(i-1,j-1) + this.getPreviousState(i-1,j) + this.getPreviousState(i-1,j+1) + this.getPreviousState(i,j-1) + this.getPreviousState(i, j+1) + this.getPreviousState(i+1,j-1) + this.getPreviousState(i+1,j) + this.getPreviousState(i+1,j+1);
            if(this.board[i][j].previousState === 0 ){
                if(res === 3){
                    this.board[i][j].live();
                }
            }
            else{
                if(res<2 || res>3){
                    this.board[i][j].die();
                }
            }
        }
    }
};

function Cell(i, j){
    this.i = i;
    this.j = j;
    this.state = 0;
    this.previousState  = 0;
    
//    var cercl = {};
//    cercl.center = life.coords(i,j);
//    cercl.radius = cellSize/2;
//    cercl.fillColor  = 'white';
//    cercl.strokeColor = 'blue';
    
    this.shape = new Path.Circle({center : life.coords(i,j), radius : cellSize/2, fillColor : 'white', strokeColor: 'blue'});
        
    this.live = function (){
        this.state = 1;
        this.shape.fillColor = 'cyan';
    };
    
    this.die = function (){
        this.state = 0;
        this.shape.fillColor = 'white';
    };
}

life.init();

// La configuration simple de la barre verticale
//life.board[5][4].live();
//life.board[5][5].live();
//life.board[5][6].live();


// La configuration de l'explosion
life.board[5][4].live();
life.board[5][5].live();
life.board[5][6].live();
life.board[5][7].live();
life.board[5][8].live();
life.board[9][4].live();
life.board[9][5].live();
life.board[9][6].live();
life.board[9][7].live();
life.board[9][8].live();
life.board[7][8].live();
life.board[7][4].live();

// Pour voir l'évolution a chaque saisi de g au clavier
function onKeyUp(event){
    if(event.key==='g'){
        console.log("Step");
        life.iterate();
    }
    else if(event.key==='i'){
        console.log("Step");
        life.init();
        // Mettre ici la configuration a laquelle on veut réinitialiser
        life.board[5][4].live();
        life.board[5][5].live();
        life.board[5][6].live();
        life.board[5][7].live();
        life.board[5][8].live();
        life.board[9][4].live();
        life.board[9][5].live();
        life.board[9][6].live();
        life.board[9][7].live();
        life.board[9][8].live();
        life.board[7][8].live();
        life.board[7][4].live();
    }
}


// Pour voir l'évolution à 60 itération par secondes
//function onFrame(){
//    life.iterate();
//}
