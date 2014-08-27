/* Fixed-movement pieces are Kings and Knights: pieces that move to certain
 * locations on the map, by jumping to them no matter what is inbetween */
function FixedMovementPiece() {
  this.__proto__ = new Piece();

  this.isMovementPossible = function(movement, map) {
    var tileContent = map.getXY(movement.destination.x, movement.destination.y);

    if(tileContent != map.emptyTile && tileContent.owner.color == movement.piece.owner.color)
      return false;

    return true;
  }

  this.getAllBlindPossibleMovements = function(map) {
    var movements = [];

    var piece = this;
    $.each(piece.deltas, function(index, delta) {
      if(map.inBounds(piece.location.x + delta.x, piece.location.y + delta.y)) {
        movements.push(new Movement(piece, new Location(piece.location.x, piece.location.y), new Location(piece.location.x + delta.x, piece.location.y + delta.y)));
      }
    });

    return movements;
  }  
}

/* Rook-like pieces are rooks and queens: they move horizontally or vertically
 * through a straight line */
function RookLikePiece() {
  this.getAllBlindPossibleMovements = function(piece, map) {
    var max = Chess.mapLength - 1;

    var movements = [];
    for(var x = 0; x <= max; x++)
      if(x != piece.location.x)
        movements.push(new Movement(piece, new Location(piece.location.x, piece.location.y), new Location(x, piece.location.y)));

    for(var y = 0; y <= max; y++)
      if(y != piece.location.y)
        movements.push(new Movement(piece, new Location(piece.location.x, piece.location.y), new Location(piece.location.x, y)));

    return movements;
  }
}

/* Bishop-like pieces are bishops and queens: they move diagonally */
function BishopLikePiece() {
  this.getAllBlindPossibleMovements = function(piece, map) {
    var deltaPatterns = [
      new Location(-1, -1),
      new Location(-1, 1),
      new Location(1, -1),
      new Location(1, 1)
    ];

    var movements = [];
    $.each(deltaPatterns, function(index, deltaPattern) {
      var x = piece.location.x;
      var y = piece.location.y;
      var outOfBounds = false;

      while(!outOfBounds) {
        x += deltaPattern.x;
        y += deltaPattern.y;

        if(map.inBounds(x, y)) {
          movements.push(new Movement(piece, new Location(piece.location.x, piece.location.y), new Location(x, y)));
        } else
          outOfBounds = true;
      }
    });

    return movements;
  }  
}

/* Knights are different from other pieces in that there is a specific set of
 * movements than a knight can perform, given its current position */
function Knight() {
  this.__proto__ = new FixedMovementPiece();
  
  this.name = "knight"
  
  this.deltas = [
    new Location(-2, -1),
    new Location(-1, -2),
    new Location(1, -2),
    new Location(2, -1),
    new Location(-2, 1),
    new Location(-1, 2),
    new Location(1, 2),
    new Location(2, 1)
  ];
}

/* Kings are different from other pieces in that there is a specific set of
 * movements than a king can perform, given its current position */
function King() {
  this.__proto__ = new FixedMovementPiece();
  
  this.name = "king"

  this.deltas = [
    new Location(-1, -1),
    new Location(0, -1),
    new Location(1, -1),
    new Location(-1, 0),
    new Location(1, 0),
    new Location(-1, 1),
    new Location(0, 1),
    new Location(1, 1)
  ];
}

/* Bishop objects borrow behavior from the "BishopLikePiece" object */
function Bishop() {
  this.bishopLikePiece = new BishopLikePiece();
  
  this.__proto__ = new Piece();
  
  this.name = "bishop"
  
  this.getAllBlindPossibleMovements = function(map) {
    return this.bishopLikePiece.getAllBlindPossibleMovements(this, map);
  }  
}

/* Queen objects borrow behavior from the "BishopLikePiece" and "RookLikePiece" objects */
function Queen() {
  this.rookLikePiece = new RookLikePiece();
  this.bishopLikePiece = new BishopLikePiece();

  this.__proto__ = new Piece();
  
  this.name = "queen"

  this.getAllBlindPossibleMovements = function(map) {
    return this.rookLikePiece.getAllBlindPossibleMovements(this, map).concat(this.bishopLikePiece.getAllBlindPossibleMovements(this, map));
  }
}

/* Rook objects borrow behavior from the "RookLikePiece" object */
function Rook() {
  this.rookLikePiece = new RookLikePiece();
  this.__proto__ = new Piece();
  
  this.name = "rook"

  this.getAllBlindPossibleMovements = function(map) {
    return this.rookLikePiece.getAllBlindPossibleMovements(this, map);
  }
}