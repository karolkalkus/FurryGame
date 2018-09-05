var Furry = require('./furry.js');
var Coin = require('./coin.js');

function Game() {
    this.board = document.querySelectorAll('#board div');
    this.furry = new Furry();
    this.coin = new Coin();
    this.score = 0;
    var self = this;

    this.startGame = function () {
        this.idSetInterval = setInterval(function () {
            self.moveFurry()
        }, 250);
    };

    this.index = function (x, y) {
        return x + (y * 10);
    };

    this.showFurry = function () {
        this.board[this.index(this.furry.x, this.furry.y)].classList.add('furry');
    };

    this.showCoin = function () {
        this.board[this.index(this.coin.x, this.coin.y)].classList.add('coin');
    };



    this.moveFurry = function () {
        this.hideVisibleFurry();

        if (this.furry.direction == "right") {
            this.furry.x = this.furry.x + 1;
        } else if (this.furry.direction == "left") {
            this.furry.x = this.furry.x - 1;
        } else if (this.furry.direction == "up") {
            this.furry.y = this.furry.y - 1;
        } else if (this.furry.direction == "down") {
            this.furry.y = this.furry.y + 1;
        }
        this.gameOver();
        this.showFurry();
        this.checkCoinCollision();
        // this.gameOver();
    };

    this.hideVisibleFurry = function() {
        document.querySelector(".furry").classList.remove('furry');
    };


    this.furryDirection = function(event){
        if (event.which == 37){
            this.furry.direction = 'left';
        } else if (event.which == 39){
            this.furry.direction = 'right';
        } else if (event.which == 38){
            this.furry.direction = 'up';
        } else if (event.which == 40){
            this.furry.direction = 'down';
        }
    }

    document.addEventListener('keydown', function(event){
        self.furryDirection(event);
    });

    this.checkCoinCollision = function(){
        if (this.furry.x === this.coin.x && this.furry.y === this.coin.y){
            document.querySelector('.coin').classList.remove('coin');
            var score = document.querySelector('#score div strong');
            score.textContent = parseInt(score.textContent)+1;
            this.coin = new Coin ();
            this.showCoin();
        }
    };

    // this.gameOver = function() {
    //     if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
    //         clearInterval(this.idSetInterval);
    //         var over = document.querySelector("#over");
    //         var gameO= document.createElement('gameover');
    //         over.appendChild(gameO);
    //         gameO.innerHTml = this.score;
    //         document.querySelector('#over gameO').innerHTML = this.score;
    //         console.log("Koniec gry!");
    //         this.hideVisibleFurry();
    //
    //     }
    // }

    this.gameOver = function(){
        if (this.furry.x < 0 || this.furry.x > 9 || this.furry.y < 0 || this.furry.y > 9){
            clearInterval(this.idSetInterval);
            var over = document.getElementById('over');
            over.classList.remove('invisible');
            var score = document.querySelector('.endScore');
            var strong = document.querySelector('strong');
            score.textContent = strong.textContent;
            this.hideVisibleFurry();
        }
    }

}
module.exports = Game;
