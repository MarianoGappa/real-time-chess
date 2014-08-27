/* Represent's an abstract piece. Should always be a __proto__ for a given piece
 * or piece type */
function Piece() {
  this.setXY = function(x, y) {
    this.location.x = x;
    this.location.y = y;
  }
  
  this.owner = null;
  this.location = new Location(0,0);

  this.getRandomColor = function () {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
  }
  
  this.color = this.getRandomColor();

  /* Determines if a given movement is allowed */
  this.isMovementPossible = function(movement, map) {
    var delta = new Location(this.getDelta(movement.source.x, movement.destination.x), this.getDelta(movement.source.y, movement.destination.y));
    var x = movement.source.x;
    var y = movement.source.y;
    var tileContent = map.emptyTile, reachedDestination = false;

    while(!reachedDestination) {
      x += delta.x;
      y += delta.y;

      tileContent = map.getXY(x, y);
      reachedDestination = (x == movement.destination.x && y == movement.destination.y);

      /* If current tile is not empty, then the loop will end here */
      if(tileContent != map.emptyTile) {
        /* If the tile is occupied by a piece owned by the current player */
        if(tileContent.owner.color == movement.piece.owner.color) {
          return false;
        /* If the tile is occupied by a piece owned by another player, but destination is reached */
        } else if(reachedDestination) {
          return true;
        /* If the tile is occupied by a piece owned by another player, and destination is not reached */
        } else
          return false;
      /* If current tile is empty and destination is reached */
      } else if (reachedDestination)
        return true;
    }
  }
  
  /* Recieves a list of possible movements and returns a sublist of these 
   * movements that are proven to be allowed */
  this.filterMovements = function(movements, map) {
    var possibleMovements = [];

    $.each(movements, function(index, movement) {
      if(this.isMovementPossible(movement, map))
        possibleMovements.push(movement);
    });

    return possibleMovements;
  }
  
  this.getDelta = function(source, destination) {
    if(source == destination)
      return 0;
    else
      return source < destination ? 1 : -1;
  }
}