class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        this.history = [];
        this.isSinglePlayer = true;
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];

        this.initializeElements();
        this.attachEventListeners();
    }

    initializeElements() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.playerTurnDisplay = document.querySelector('.player-turn');
        this.scoreDisplays = {
            X: document.querySelector('.score-x span'),
            O: document.querySelector('.score-o span')
        };
        this.restartButton = document.getElementById('restartButton');
        this.resetScoreButton = document.getElementById('resetScore');
        this.themeToggle = document.getElementById('themeToggle');
        this.singlePlayerButton = document.getElementById('singlePlayer');
        this.multiPlayerButton = document.getElementById('multiPlayer');
        this.historyList = document.getElementById('historyList');
    }

    attachEventListeners() {
        this.cells.forEach(cell => {
            cell.addEventListener('click', (e) => this.handleCellClick(e));
        });

        this.restartButton.addEventListener('click', () => this.restartGame());
        this.resetScoreButton.addEventListener('click', () => this.resetScore());
        this.themeToggle.addEventListener('change', () => this.toggleTheme());
        this.singlePlayerButton.addEventListener('click', () => this.setGameMode(true));
        this.multiPlayerButton.addEventListener('click', () => this.setGameMode(false));
    }

    handleCellClick(e) {
        const cell = e.target;
        const index = Array.from(this.cells).indexOf(cell);

        if (this.board[index] !== '' || !this.gameActive) return;

        this.makeMove(index);

        if (this.isSinglePlayer && this.gameActive && this.currentPlayer === 'O') {
            setTimeout(() => this.makeAIMove(), 500);
        }
    }

    makeMove(index) {
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
    }

    makeAIMove() {
        const emptyCells = this.board
            .map((cell, index) => cell === '' ? index : null)
            .filter(cell => cell !== null);

        if (emptyCells.length > 0) {
            const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            this.makeMove(randomIndex);
        }
    }

    checkWin() {
        return this.winningCombinations.some(combination => {
            return combination.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }

    checkDraw() {
        return this.board.every(cell => cell !== '');
    }

    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScore();
        this.playerTurnDisplay.textContent = `Player ${this.currentPlayer} wins!`;
        this.highlightWinningCells();
        this.addHistory(`Player ${this.currentPlayer} won.`);
    }

    handleDraw() {
        this.gameActive = false;
        this.playerTurnDisplay.textContent = "It's a draw!";
        this.cells.forEach(cell => cell.classList.add('draw'));
        this.addHistory("Game ended in a draw.");
    }

    highlightWinningCells() {
        this.winningCombinations.forEach(combination => {
            if (combination.every(index => this.board[index] === this.currentPlayer)) {
                combination.forEach(index => {
                    this.cells[index].classList.add('winning-cell');
                });
            }
        });
    }

    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        this.playerTurnDisplay.textContent = `Player ${this.currentPlayer}'s Turn`;
    }

    restartGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.playerTurnDisplay.textContent = "Player X's Turn";
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('winning-cell', 'draw');
        });
    }

    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScore();
    }

    updateScore() {
        this.scoreDisplays.X.textContent = this.scores.X;
        this.scoreDisplays.O.textContent = this.scores.O;
    }

    toggleTheme() {
        document.body.setAttribute('data-theme', 
            this.themeToggle.checked ? 'dark' : 'light'
        );
    }

    setGameMode(singlePlayer) {
        this.isSinglePlayer = singlePlayer;
        this.singlePlayerButton.classList.toggle('active', singlePlayer);
        this.multiPlayerButton.classList.toggle('active', !singlePlayer);
        this.restartGame();
    }

    addHistory(outcome) {
        this.history.push(outcome);
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        this.historyList.innerHTML = '';
        this.history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            this.historyList.appendChild(li);
        });
    }
}

// Initialize the game
const game = new TicTacToe(); 