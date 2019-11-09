/**
    游戏的逻辑处理
 */

 var game = new Game();

game.timer = null;  // 定时器
game.scroll = 0;    // 得分

 game.init = function () {
    ground.init();
    snake.init();
    createFood();   // 生成食物

    var btn = document.getElementById('btn');
    btn.onclick = function () {
        game.start();
    }
    document.onkeydown = function (e) {
        if (e.keyCode == 37 && snake.direction != directionNum.right) {
            snake.direction = directionNum.left;
        }else if (e.keyCode == 38 && snake.direction != directionNum.up) {
            snake.direction = directionNum.top;
        }else if (e.keyCode == 39 && snake.direction != directionNum.left) {
            snake.direction = directionNum.right;
        }else if (e.keyCode == 40 && snake.direction != directionNum.top) {
            snake.direction = directionNum.up;
        }  
    }
}

game.start = function () {
    clearInterval(this.timer);
    this.timer = setInterval(function () {
        snake.getCollideSquare();
    }, intervalTime);
}

game.over = function () {
    clearInterval(this.timer);
    var conText = confirm(this.scroll);
    if (conText) {
        this.init();
    }
}

// 创建食物
function createFood () {
    var x = null;
    var y = null;

    var flag = true;
    while (flag) {
        // 排除在围墙生成食物
        x = Math.round(Math.random() * (td - 3) + 1);
        y = Math.round(Math.random() * (tr - 3) + 1);

        var flagTag = true;
        // 排除在蛇上面生成食物
        for (var i = snake.head; i; i = i.next) {
            if (x == i.x && y ==i.y) {
                // 这个条件成立，说明食物在蛇身上
                flagTag = false;
                break
            }
        }

        if (flagTag) {
            flag = false;
        }
    }

    var newFood = SquareFactory.create('Food', x, y, 'red');
    ground.remove(x, y);
    ground.append(newFood);
}

 game.init();