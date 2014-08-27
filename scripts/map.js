/******************************************************************************/
/* MAP                                                                        */
/******************************************************************************/
/* The map represents the contents of the board.                              */
/******************************************************************************/
var Map = (function Map() {
  var content;
  
  /* Sets a piece to a specified location on the board */
  function setXY(piece, x, y) {
    if(piece == null && inBounds(x, y)) {
      content[y][x] = null;
    } else if (piece instanceof Piece && piece.owner instanceof Player && piece.location instanceof Location && inBounds(x, y)) {
      content[piece.location.y][piece.location.x] = piece;
    } else {
      return false;
    }

    return true;
  }
  
  /* Boolean function that determines if a location doesn't exceed the map */
  function inBounds(x, y) {
    return x >= 0 && y >= 0 && x < Chess.mapLength && y < Chess.mapLength;
  }
  
  return {
    /* Initializes the board with empty slots */
    init : function() {
      var emptyArray = new Array(Chess.mapLength);

      for(var i = 0; i < emptyArray.length; i++){
        emptyArray[i] = new Array(Chess.mapLength);
      }

      content = emptyArray;
    },

    /* Returns the contents of the map on a specified location */
    getXY : function(x, y) {
      return (content[y] && content[y][x]) ? content[y][x] : null;
    },

    /* Determines if a specified movement is allowed, given the constraints
     * of the board, the type of piece and the pieces that may be on the 
     * piece's path from source to destination */
    isMovementPossible : function(movement) {
      if(!inBounds(movement.source.x, movement.source.y))
        return false;

      if(!inBounds(movement.destination.x, movement.destination.y))
        return false;

      return movement.piece.isMovementPossible(movement, this);
    },

    /* Executes a given movement: makes sure the movement is allowed, and then
     * performs the changes on the board and on the piece's properties */
    executeMovement : function(movement) {
      if(this.isMovementPossible(movement)) {
        setXY(null, movement.source.x, movement.source.y);
        movement.piece.setXY(movement.destination.x, movement.destination.y);
        setXY(movement.piece, movement.destination.x, movement.destination.y);

        return true;
      }

      return false;
    },

    /* Finds and returns an array of all the pieces present on the board */
    getPieces : function(player) {
      var pieces = [], tile = null;

      for(var y = 0; y < Chess.mapLength; y++)
        for(var x = 0; x < Chess.mapLength; x++) {
          tile = content[y][x];
          if(tile != null && tile.owner.color == player.color)
            pieces.push(tile);
        }

      return pieces;
    },
    
    /* Adds a piece on the board */
    addPiece : function(piece) {
      setXY(piece, piece.location.x, piece.location.y);
    },
    
    /* Boolean function that determines if a location doesn't exceed the map */
    inBounds : function(x, y) {
      return inBounds(x, y);
    },
    
    /* Getter for the board's contents */
    getContent : function() {
      return content;
    }
  }
}());
/******************************************************************************/