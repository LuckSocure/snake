
var ground = new Ground(positionX, positionY, squareWidth * td, squareWidth * tr);

ground.init = function () {
    this.viewContent.style.position = 'absolute';
    this.viewContent.style.left = this.x + 'px';
    this.viewContent.style.top = this.y + 'px';
    this.viewContent.style.width = this.width + 'px';
    this.viewContent.style.height = this.height + 'px';
    this.viewContent.style.backgroundColor = '#0ff';
    document.body.appendChild(this.viewContent);

    // var newSquare = SquareFactory.create('Floor', 1, 1, 'green');
    // console.log(newSquare)

    this.SquareTable = []; // 存储所有小方块，判断蛇的下一步

    for (var y = 0; y < tr; y ++) {
        this.SquareTable[y] = new Array(td);
        for (var x = 0; x < td; x ++) {
            if (x == 0 || x == td - 1 || y == 0 || y == tr - 1) {
                // 围墙
                var newSquare = SquareFactory.create('Wall', x, y, 'black');
            }else {
                // 小方块
                var newSquare = SquareFactory.create('Floor', x, y, 'gray');
            }
            this.append(newSquare);
            this.SquareTable[y][x] = newSquare;
        }
    }
}

ground.remove = function (x, y) {
    var curSquare = this.SquareTable[y][x];
    this.viewContent.removeChild(curSquare.viewContent);
    this.SquareTable[y][x] = null;
}

ground.append = function (square) {
    this.viewContent.appendChild(square.viewContent);
    this.SquareTable[square.y][square.x] = square;
}

// ground.init();