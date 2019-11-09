/**
    定义常用的变量
*/

var td = 30; // 列数
var tr = 30; // 行数

var squareWidth = 20; // 方块大小

// 游戏区域开始的坐标
var positionX = 200;
var positionY = 100;

var intervalTime = 200; // 蛇的移动间隔

// 小方块的构造函数
function Shart (x, y, width, height, dom) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.viewContent = dom || document.createElement('div');
}

// 由于单例对象创建后，它的信息就不会改变了，所以用一个方法来更新位置信息
Shart.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + 'px';
    this.viewContent.style.top = y * squareWidth + 'px';
}

// 给方块一个标签
var squareTag = {
    move: 'move',
    eat: 'eat',
    die: 'die'
};

var Ground = tool.single(Shart);        // 整个游戏场景
var Floor = tool.extends(Shart);        // 游戏区域小方块
var Wall = tool.extends(Shart);         // 围墙

var SnakeHead = tool.single(Shart);     // 蛇头 单例对象
var SnakeBody = tool.extends(Shart);    // 蛇身
var Snake = tool.single();              // 蛇的构造函数
var Food = tool.single(Shart);          // 食物

var Game = tool.single();               // 游戏的构造函数