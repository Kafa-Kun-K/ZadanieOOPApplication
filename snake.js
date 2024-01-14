//board
const BoardConsts = {
    blockSize: 25,
    rows: 20,
    cols: 20
  }
  var board;
  var context;
  var bgimage = new Image();
  bgimage.src = 'shake.png';

  //snake head
  var player = { snake: { x: BoardConsts.blockSize * 5, y: BoardConsts.blockSize * 5 } }
  var velocityX = 0;
  var velocityY = 0;
  
  var snakeBody = [];
  
  //food
  var food = {
    x: 0,
    y: 0,
    placeFood: function() {
      this.x = Math.floor(Math.random() * BoardConsts.cols) * BoardConsts.blockSize;
      this.y = Math.floor(Math.random() * BoardConsts.rows) * BoardConsts.blockSize;
    }
  }
  
  var gameOver = false;
  
  window.onload = function() {
    board = document.getElementById("board");
    board.height = BoardConsts.rows * BoardConsts.blockSize;
    board.width = BoardConsts.cols * BoardConsts.blockSize;
    context = board.getContext("2d"); //used for drawing on the board
  
    food.placeFood();
    document.addEventListener("keyup", changeDirection);
    // update();
    setInterval(update, 1000 / 12.5);
  }
  
  function update() {
    if (gameOver) {
      return;
    }
  
    context.drawImage(bgimage, 0, 0, board.width, board.height);
    
    context.fillStyle = "brown";
    context.fillRect(food.x, food.y, BoardConsts.blockSize, BoardConsts.blockSize);
  
    if (player.snake.x == food.x && player.snake.y == food.y) {
      snakeBody.push([food.x, food.y]);
      food.placeFood()
    }
  
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
      snakeBody[0] = [player.snake.x, player.snake.y];
    }
  
    context.fillStyle = "darkgreen";
    player.snake.x += velocityX * BoardConsts.blockSize;
    player.snake.y += velocityY * BoardConsts.blockSize;
    context.fillRect(player.snake.x, player.snake.y, BoardConsts.blockSize, BoardConsts.blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
      context.fillRect(snakeBody[i][0], snakeBody[i][1], BoardConsts.blockSize, BoardConsts.blockSize);
    }
  
    //game over conditions
    if (player.snake.x < 0 || player.snake.x > (BoardConsts.cols * BoardConsts.blockSize) - 1 || player.snake.y < 0 || player.snake.y > (BoardConsts.rows * BoardConsts.blockSize) - 1) {
      gameOver = true;
      document.getElementById("sign").innerHTML="Game over";
    }
  
    for (let i = 0; i < snakeBody.length; i++) {
      if (player.snake.x == snakeBody[i][0] && player.snake.y == snakeBody[i][1]) {
        gameOver = true;
        document.getElementById("sign").innerHTML="Game over";
      }
    }
  }
  
  function changeDirection(e) {
    if (e.code == "ArrowUp" && velocityY != 1) {
      velocityX = 0;
      velocityY = -1;
    }
    else if (e.code == "ArrowDown" && velocityY != -1) {
      velocityX = 0;
      velocityY = 1;
    }
    else if (e.code == "ArrowLeft" && velocityX != 1) {
      velocityX = -1;
      velocityY = 0;
    }
    else if (e.code == "ArrowRight" && velocityX != -1) {
      velocityX = 1;
      velocityY = 0;
    }
  }