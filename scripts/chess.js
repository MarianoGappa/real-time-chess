/* Chess Singleton object. It was originally planned to have quite a lot of
 * behavior, but for now it only holds some global parameters. */
var Chess = (function () {
  return {
    mapLength : 8
  }
}());

/* Represents each player on the board. For now, as there is
 * only the computer, there is only one player.
 */
function Player(name, color, game) {
  this.name = name;
  this.color = color;
  this.pieces = [];
  this.game = game;
  
  this.getPieces = function() {
    return this.game.getPieces(this);
  }
}

/* Builder function used to create a random Piece */
function getRandomPiece() {
  switch(Math.floor(Math.random() * 5)) {
    case 0:
      return new Rook();
    case 1:
      return new Bishop();
    case 2:
      return new Queen();
    case 3:
      return new King();
    case 4:
      return new Knight();
  }
}

/* Helper function used to get a random position on the board */
function getRandomBoardPosition() {
  return Math.round(Math.random() * 8) + 1;
}

/* Represents a location on the board */
function Location(x, y) {
  this.x = x;
  this.y = y;
}

/* Represents a piece movement, from a source location to a destination location */
function Movement(piece, sourceLocation, destinationLocation) {
  if(!piece instanceof Piece)
    throw new Exception("piece is not an instance of Piece.")

  if(!sourceLocation instanceof Location)
    throw new Exception("sourceLocation is not an instance of Location.")

  if(!destinationLocation instanceof Location)
    throw new Exception("destinationLocation is not an instance of Location.")    

  this.piece = piece;
  this.source = sourceLocation;
  this.destination = destinationLocation; 
}