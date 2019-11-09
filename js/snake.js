/** 
    蛇的逻辑操作
*/

var snake = new Snake();

snake.head = null;  // 蛇头
snake.tail = null;  // 蛇尾

var directionNum = {
    left: {
        x: -1,
        y: 0
    },
    up: {
        x: 0,
        y: 1
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    }
};

snake.init = function () {
    var snakeHead = SquareFactory.create('SnakeHead', 3, 1, 'deeppink');    // 创建蛇头
    var snakeBody1 = SquareFactory.create('SnakeBody', 2, 1, 'green');      
    var snakeBody2 = SquareFactory.create('SnakeBody', 1, 1, 'green');

    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead);
    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1);
    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2);

    snake.head = snakeHead;     // 更新蛇头对象
    snake.tail = snakeBody2;    // 更新蛇尾对象

    // 链式操作 链表关系
    snakeHead.next = snakeBody1;
    snakeHead.last = null;
    snakeBody1.next = snakeBody2;
    snakeBody1.last = snakeHead;
    snakeBody2.next = null;
    snakeBody2.last = snakeBody1;

    snake.direction = directionNum.right;
}

// 获取碰撞的那个方块
snake.getCollideSquare = function () {
    var square = ground.SquareTable[this.head.y + this.direction.y][this.head.x + this.direction.x];

    var type = square.collide();
    this.collideMethod[type](square);
}

snake.collideMethod = {
    move: function (square, boolean) {
        // 创建新的蛇身
        var newBody = SquareFactory.create('SnakeBody', snake.head.x, snake.head.y, 'green');
        ground.remove(snake.head.x, snake.head.y);      // 删除蛇头
        ground.append(newBody); 

        // 更新链式操作 链表关系
        newBody.next = snake.head.next;
        newBody.last = null;
        newBody.next.last = newBody;
        
        // 创建新的蛇头
        var newHead = SquareFactory.create('SnakeHead', square.x, square.y, 'deeppink');
        ground.remove(square.x, square.y);      // 删除地板小方块
        ground.append(newHead);
        snake.head = newHead;       // 更新蛇头对象

        // 更新链式操作 链表关系
        newHead.next = newBody;
        newHead.last = null;
        newBody.last = newHead;

        // 判断要不要删除蛇尾
        if (!boolean) {
            var newSquare = SquareFactory.create('Floor', snake.tail.x, snake.tail.y, 'gray');
            ground.remove(snake.tail.x, snake.tail.y);
            ground.append(newSquare);
            snake.tail = snake.tail.last;    // 更新蛇尾对象
        }
    },
    eat: function (square) {
        this.move(square, true);
        createFood();               // 重新生成食物
        game.scroll += 1;           // 得分+1
    },
    die: function () {
        game.over();
    }
}

// snake.init();
// snake.getCollideSquare();