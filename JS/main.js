var GameState ={

init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //have the game centered horizontally and vertically
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
},


preload: function() {
    game.load.image('bg', 'Assets/Images/stormy-sky.png');
    game.load.image('sea', 'Assets/Images/sea.png');
    game.load.image('seafg','Assets/Images/seafg.png');
    game.load.image('ship','Assets/Images/ship.png');
    game.load.image('question','Assets/Images/question.png');
    
    game.load.image('has','Assets/Images/has.png');
    game.load.image('have','Assets/Images/have.png');
    game.load.image('amhas','Assets/Images/amhas.png');
    game.load.image('ishaving','Assets/Images/ishaving.png');
    
    game.load.audio('bgMusic','Assets/Sounds/shipwreck.mp3');
},
    

create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.bgMusic = this.game.add.audio('bgMusic');
    this.bgMusic.loop = true;
    this.bgMusic.play();
    
    //background
    this.background = this.game.add.sprite(0,0,'bg');
    this.sea = this.game.add.sprite(0,0,'sea');
    //this.ship = this.game.add.sprite(this.game.world.centerX,340,'ship');
    this.question = game.add.group();
    this.question.enableBody = true;
    
    var ship = this.question.create(this.game.world.centerX,340,'ship');
    ship.anchor.setTo(0.5);
    var text = this.question.create(this.game.world.centerX,420, 'question');
    text.anchor.setTo(0.5);
    
    this.seafg = this.game.add.sprite(0,400,'seafg');
    
    this.hasB = this.game.add.sprite(30, 40, 'has');
    this.hasB.inputEnabled = true;
    this.hasB.events.onInputDown.add(this.answer,this);
    this.haveB = this.game.add.sprite(150,40,'have');
    this.haveB.inputEnabled = true;
    this.haveB.events.onInputDown.add(this.answer,this);
    this.amhasB = this.game.add.sprite(270,40,'amhas');
    this.amhasB.inputEnabled = true;
    this.amhasB.events.onInputDown.add(this.answer,this);
    this.ishavingB = this.game.add.sprite(390,40,'ishaving');
    this.ishavingB.inputEnabled = true;
    this.ishavingB.events.onInputDown.add(this.answer,this);
    
    
},

update: function() {
    this.question.body.velocity.y=2;
    
},

answer: function(sprite) {
   
}
    
};

var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState',GameState);
game.state.start('GameState');

