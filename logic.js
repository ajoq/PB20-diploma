// Расширенное задание
// Выбор игрока и размер поля - сделать проверку на нечисловое значение
// Чуть уменьшил размер шрифта для тестирования больших размеров полей

let board = []; //Задаем массив поля
let players = ['x', 'o']; // Массив с игроками
let activePlayer = 0; // Вводим активного игрока
let gameSteps = 0; // Вводим счетчик для количества ходов
let noWinGameSteps = 0; //Счетчик кол-ва ходов для ничьей

// Функция отрисовки поля
function createCustomBoard(size) {
  for (let i = 0; i < size; i++) {
    board.push([]);
    for (let i2 = 0; i2 < size; i2++) {
      board[i].push('');
    }
  }
}

// Рандом для назначения № игрока
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function startGame() {

  //Обнуляем игровое поле
  board = [];

  //Запрашиваем размер игрового поля и рисуем его

  let sizeBoard = Number(prompt('Введите размер игрового поля (не менее 3)'));

  if (sizeBoard < 3) {
    alert('Тогда рисуем 3х3');
    sizeBoard = 3;
  };

  createCustomBoard(sizeBoard);

  // Обнуляем кол-во ходов и задаем кол-во ходов для ничьей
  gameSteps = 0;
  noWinGameSteps = (sizeBoard **2);

  // Даем выбрать игрока пользователю, если игрок баловник - решаем за него
  let choosePlayer = Number(prompt('Выберите, какой игрок будет ходить первым: 1 или 2'));

  if (choosePlayer === 1) {
    activePlayer = players[0];
  } else if (choosePlayer === 2) {
    activePlayer = players[1];
  } else if (choosePlayer > 2 || choosePlayer < 1 || choosePlayer === NaN) {
    choosePlayer = Number(prompt('Нужно выбрать либо игрока 1, либо игрока 2'));
      if (choosePlayer > 2 || choosePlayer < 1) {
         choosePlayer = Number(prompt('Вы играть пришли или баловаться? Попробуем еще раз :)'));
          if (choosePlayer > 2 || choosePlayer < 1) {
            choosePlayer = getRandomInt(1,3) - 1;
            activePlayer = players[choosePlayer];
            alert('Ну все, хватит. Первым ходит игрок № ' + (choosePlayer + 1));
          }
      }
  }   

  renderBoard(board);
}

// Действия по клику
function click(numberRow, numberCol) {
  board[numberRow][numberCol] = activePlayer;
  renderBoard(board);
  gameSteps += 1;

  if (winnerCombinationRow(activePlayer) === true || winnerCombinationCol(activePlayer) === true || winnerCombinationDiagonalLeftRight(activePlayer) === true || winnerCombinationDiagonalRightLeft(activePlayer) === true) {
    showWinner(playerNumber(activePlayer));
  } else if (gameSteps === noWinGameSteps) {
    noWinner(); // Функция вывода окна с информацией о ничьей
  } else {
     playerTransfer(activePlayer);
  };
}


// Функция передачи хода игроку
function playerTransfer(valueActivePlayer) {
  if (valueActivePlayer === players[0]) {
    activePlayer = players[1];
  } else {
    activePlayer = players[0];
  }  
}

// Определяем номер игрока для объявления выигрыша

function playerNumber(valuePlayerNumber) {
  return players.indexOf(valuePlayerNumber);
}

// Проверяем на выигрышные комбинации

//Проверка на горизонталь
function winnerCombinationRow(player) {
  for (let iRow = 0; iRow < board.length; iRow++) {
    let winCount = 0;

    for (let iCol = 0; iCol < board[iRow].length; iCol++) {
      if (board[iRow][iCol] === player) {
        winCount += 1;
      }
      if (winCount === board[iRow].length) return true;
    }
  }
}

//Проверка на вертикаль
function winnerCombinationCol(player) {
  for (let iRow = 0; iRow < board.length; iRow++) {
    let winCount = 0;

    for (let iCol = 0; iCol < board[iRow].length; iCol++) {
      if (board[iCol][iRow] === player) {
        winCount += 1;
      }
      if (winCount === board[iRow].length) return true;
    }
  }
}

//Проверка на диагональ слева направо
function winnerCombinationDiagonalLeftRight(player) {
  for (let iRow = 0; iRow < board.length; iRow++) {
    let winCount = 0;

    for (let iCol = 0; iCol < board[iRow].length; iCol++) {
      if (board[iCol][iCol] === player) {
        winCount += 1;
      }
      if (winCount === board[iRow].length) return true;
    }
  }
}

//Проверка на диагональ справа налево
function winnerCombinationDiagonalRightLeft(player) {
  for (let iRow = 0; iRow < board.length; iRow++) {
    let winCount = 0;
    let row = 0;
    let reverseCol = board.length;

    for (let iCol = 0; iCol < board[iRow].length; iCol++) {
      reverseCol -= 1;
      if (board[row][reverseCol] === player) {
        winCount += 1;
      }
      row += 1;
      if (winCount === board[iRow].length) return true;
    }
  }
}