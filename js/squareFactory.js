/**
    工厂模式
 */

function SquareFactory () {

}

SquareFactory.prototype.init = function (square, color, action) {
    square.viewContent.style.position = 'absolute';
    square.viewContent.style.left = square.x * squareWidth + 'px';
    square.viewContent.style.top = square.y * squareWidth + 'px';
    square.viewContent.style.width = square.width + 'px';
    square.viewContent.style.height = square.height + 'px';
    square.viewContent.style.backgroundColor = color;

    square.collide = function () {
        return action;
    }
}

// 地板小方块
SquareFactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth);
    this.init(floor, color, squareTag.move);
    return floor;
}

// 围墙
SquareFactory.prototype.Wall = function (x, y, color) {
    var wall = new Wall(x, y, squareWidth, squareWidth);
    this.init(wall, color, squareTag.die);
    return wall;
}

// 蛇头
SquareFactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth);
    this.init(snakeHead, color, squareTag.die);
    snakeHead.upDate(x, y);     // 更新位置信息
    return snakeHead;
}

// 蛇身
SquareFactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth);
    this.init(snakeBody, color, squareTag.die)
    return snakeBody;
}

// 食物
SquareFactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth);
    this.init(food, color, squareTag.eat);
    food.upDate(x, y);          // 更新位置信息
    return food;
}

SquareFactory.create = function (type, x, y, color) {
    if (typeof SquareFactory.prototype[type] == 'undefined') {
        throw 'no this type';
    }
    SquareFactory.prototype[type].prototype = new SquareFactory();
    return new SquareFactory.prototype[type](x, y, color);
}