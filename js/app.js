//Sets initial score to 0
let score = 0;
document.getElementById('score').innerHTML = score;

// Instruction Modal
$(document).ready(function() {
    $('#beginGame').modal('show');
});

/*
$(document).ready(function() {
    $('#popupModal').modal('fade');
});*/


// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed; //speed of the enemies
    this.sprite = 'images/enemy-bug.png'; // image/sprite of the enemies  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if(this.x > 550) {
		this.x = -125;
		this.speed = 165 + Math.floor(Math.random() * 250);
	}
	
	//Check for collisions
	if (player.x < this.x + 50 &&
	player.x + 40 > this. x &&
	player.y < this.y + 35 &&
	player.y + 40 > this.y) {
    player.x = 200; //resets player position 1
    player.y = 400; //resets player position 2
    score = 0; //resets score to 0 
    document.getElementById('score').innerHTML = score;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-princess-girl.png';
   

};

Player.prototype.update = function() {
   // Make player stay on canvas
   if(this.y > 400) {
       this.y = 400;
   } 

   if(this.x > 400) {
       this.x = 400;
   }

   if(this.x < 0) {
       this.x = 0;
   };

   let popupModal = document.querySelector('.popupModal');
   let popupText = document.querySelector('.popupText');
   //One point added to score when player reaches top of canvas
   //let popup = document.querySelector('.popup');
   if(this.y < 0) {
       this.x = 200;
       this.y = 400;
       score++;
       document.getElementById('score').innerHTML = score;
      if(score >= 10) {
        bootbox.alert({
            message: "Congratulations! You collected 10 hearts and helped the Princess spread love. Can you do it again?",
            className: 'bb-alternate-modal',
        });        
           document.getElementById('score').innerHTML = "0";
        
      }     
   }
};
/*
//let close = document.querySelector('.close');
$('.close').on('click', (function() {
    $('.popupModal').hide();
   
}));*/
 

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
};



// Movement around the board with arrow keys
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case "up":
          this.y -= this.speed + 30;
          break;
        case "down":
          this.y += this.speed + 40;
          break;
        case "left":
          this.x -= this.speed + 40;
          break;
        case "right":
          this.x += this.speed + 40;
          break;
      
     }
     
};

//new player variable
let player = new Player(200, 400, 60);

//create the array for enemies
//let allEnemies = [...Array(3)].map((_,i) => new Enemy(0, i+1));//[new Enemy()];
const allEnemies = [];
const enemyLocation = [50, 150, 225];

enemyLocation.forEach(function(locationY) {
    enemy = new Enemy(0, locationY, 100 + Math.floor(Math.random() * 450));
    //enemy = new Enemy(Math.floor(Math.random() * 400), locationY, 200);
    allEnemies.push(enemy);
});



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});





























    
     




