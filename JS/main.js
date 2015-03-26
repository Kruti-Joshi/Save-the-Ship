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
    game.load.audio('cheer','Assets/Sounds/cheer.mp3');
},
    

create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.bgMusic = this.game.add.audio('bgMusic');
    this.bgMusic.loop = true;
    this.bgMusic.play();
    
    //background
    this.background = this.game.add.sprite(0,0,'bg');
    this.sea = this.game.add.sprite(0,0,'sea');
    
    this.question = game.add.group();
    this.question.enableBody = true;
    
    this.ship = this.question.create(this.game.world.centerX,340,'ship');
    this.ship.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.ship);
    this.ship.body.gravity.y=3;
    
    this.text = this.question.create(this.game.world.centerX,420, 'question');
    this.text.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.text);
    this.text.body.gravity.y=3;
    
    this.seafg = this.game.add.sprite(0,400,'seafg');
    
    this.hasB = this.game.add.sprite(30, 40, 'has');
    this.hasB.inputEnabled = true;
    this.hasB.events.onInputDown.add(this.answer,this);
    
    this.haveB = this.game.add.sprite(150,40,'have');
    this.haveB.inputEnabled = true;
    this.haveB.events.onInputDown.add(this.answer,this);
    this.haveB.name="have";
    
    this.amhasB = this.game.add.sprite(270,40,'amhas');
    this.amhasB.inputEnabled = true;
    this.amhasB.events.onInputDown.add(this.answer,this);
    
    this.ishavingB = this.game.add.sprite(390,40,'ishaving');
    this.ishavingB.inputEnabled = true;
    this.ishavingB.events.onInputDown.add(this.answer,this);
    
    
},

update: function() {
    if (this.ship.y > 500)
    {
        this.ship.kill();
        this.bgMusic.stop();
        this.bgMusic.loop = false;
        var lose = this.game.add.text(this.game.world.centerX,this.game.world.centerY,"You Lose!",{fontSize:'40px',fill:'#000'});
        lose.anchor.setTo(0.5);
    }
    
},

answer: function(sprite) {
   if(sprite.name == "have")
   {
       this.bgMusic.stop();
       this.bgMusic.loop = false;       
       this.state.start('WinState');
   }
}
    
};

var winState = {
    init: function() {
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    //have the game centered horizontally and vertically
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
},


preload: function() {
    game.load.image('bg', 'Assets/Images/sky.svg');
    game.load.image('sea', 'Assets/Images/sea.png');
    game.load.image('seafg','Assets/Images/seafg.png');
    game.load.image('ship','Assets/Images/ship.png');
    game.load.image('question','Assets/Images/question.png');
    
    game.load.audio('cheer','Assets/Sounds/cheer.mp3');
},
    
create: function() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    
    this.background = this.game.add.sprite(0,0,'bg');
    this.sea = this.game.add.sprite(0,-100,'sea');
    
    this.floatShip = game.add.group();
    this.floatShip.enableBody = true;
    
    this.ship = this.floatShip.create(this.game.world.centerX,340,'ship');
    this.ship.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.ship);
    
    this.text = this.game.add.text(this.game.world.centerX,420, 'I have three oranges',{fontSize:'22px',fill:'#000'},this.floatShip);
    this.text.anchor.setTo(0.5);
    this.game.physics.arcade.enable(this.text);
    
    this.seafg = this.game.add.sprite(0,400,'seafg');
    
    this.cheer = this.game.add.audio('cheer');
    this.cheer.play();
    
    var win = this.game.add.text(this.game.world.centerX,this.game.world.centerY-200,"Well Done!",{fontSize:'50px',fill:'#000'});
        win.anchor.setTo(0.5);
},
    
update: function() {
    this.ship.body.velocity.x=70;
    this.text.position.x+=1.2;
    
    this.floatShip.checkWorldBounds = true;
    this.floatShip.outOfBoundsKill = true;
}
};

var game = new Phaser.Game(800, 600, Phaser.AUTO);
game.state.add('GameState',GameState);
game.state.add('WinState',winState);
game.state.start('GameState');
