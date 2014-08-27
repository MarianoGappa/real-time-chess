/* This objects handles all board gui representation. Should GUI change to
 * use canvas, for example, then this is the only object that should be replaced. */
var BoardGUI = (function() {
  var map = [new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8), new Array(8)];
  var mapLength = 8;
  
  /* Translates a location tuple to a div's id */
  var calculateId = function(x, y) {
    return 'square' + (((y) * 8 + x + 1)).toString();
  };
  
  /* Determines the adequate string representation for a given piece object */
  var calculatePiece = function(piece) {
    if(!piece || !piece.name)
      return "";
    
    if(piece.name == "queen")
      return "&#9819;";
    if(piece.name == "king")
      return "&#9818;";
    if(piece.name == "bishop")
      return "&#9821;";
    if(piece.name == "knight")
      return "&#9822;";
    if(piece.name == "rook")
      return "&#9820;";
    return "";
  };
  
  return {
    /* Initializes a board */
    setBoard : function(newMap) { map = newMap; },
    
    /* Renders a piece movement on the DOM */
    renderMovement : function(movement) {
      var sourceId = calculateId(movement.source.x, movement.source.y);
      var destinationId = calculateId(movement.destination.x, movement.destination.y);
      var pieceCharacter = calculatePiece(movement.piece);
      
      map[movement.source.x][movement.source.y] = [];
      map[movement.destination.x][movement.destination.y] = movement.piece;
      
      $('#' + sourceId).html("");
      $('#' + destinationId).html("<span style='color: " + movement.piece.color + ";'>" + pieceCharacter + "</span>");
    },
    
    /* Renders the complete board on the DOM */
    renderBoard : function() {
      var pieceCharacter;
      var tileId;
      
      for(var x = 0; x < mapLength; x++) {
        for(var y = 0; y < mapLength; y++) {
          pieceCharacter = calculatePiece(map[x][y]);
          tileId = calculateId(x, y);
          
          $('#' + tileId).html(pieceCharacter);
        }
      }
    }
  }
}());