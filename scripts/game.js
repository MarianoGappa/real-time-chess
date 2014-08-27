/******************************************************************************/
/* GAME                                                                       */
/******************************************************************************/
/* This class contains the code used to test the game.                        */
/******************************************************************************/
var Game = (function() {
  var players = [];
  
  /* This function adds a player to the game */
  var addPlayer = function(player) {
    players.push(player);
  }
  
  /* This function takes an array of pieces an executes a movement on each */
  var movePieces = function(pieces) {
      var piece = pieces[Math.floor(Math.random()*pieces.length)];
      var movements = piece.getAllBlindPossibleMovements(Map);
      var chosenMovement = movements[Math.floor(Math.random() * movements.length)];
      if(Map.executeMovement(chosenMovement)) {
        BoardGUI.renderMovement(chosenMovement);
      }
  }
  
  return {
  /*
   * This is the testing point of the application. This script creates a few
   * pieces, and moves them across the board every second.
   */
  
    start : function() {
      var player = new Player('Mariano', 'red', this);

      addPlayer(player);
      Map.init();

      var pieces = [];
      for(var i = 1; i <= 10; i++) {
        var randomPiece = getRandomPiece();
        randomPiece.owner = player;
        randomPiece.setXY(Math.floor(Math.random() * 8), Math.floor(Math.random() * 8));
        pieces.push(randomPiece);
        Map.addPiece(randomPiece);
      }

      window.setInterval(movePieces, 100, pieces);      
    }
  };
}());