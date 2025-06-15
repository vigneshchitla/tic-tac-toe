# tic_tac_toe.py

# Function to initialize the board
def create_board():
    return [[" " for _ in range(3)] for _ in range(3)]

# Function to display the board
def display_board(board):
    for row in board:
        print(" | ".join(row))
        print("---------")

# Function to handle player input
def get_player_move(player):
    while True:
        try:
            row = int(input(f"Player {player}, enter row (0, 1, 2): "))
            col = int(input(f"Player {player}, enter column (0, 1, 2): "))
            if 0 <= row < 3 and 0 <= col < 3:
                return row, col
            else:
                print("Invalid input. Row and column must be between 0 and 2.")
        except ValueError:
            print("Invalid input. Please enter numbers.")

# Function to place a move on the board
def make_move(board, row, col, player):
    if board[row][col] == " ":
        board[row][col] = player
        return True
    else:
        print("That cell is already occupied. Try again.")
        return False

# Function to check for a win
def check_win(board, player):
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True

    # Check columns
    for col in range(3):
        if all(board[row][col] == player for row in range(3)):
            return True

    # Check diagonals
    if board[0][0] == board[1][1] == board[2][2] == player:
        return True
    if board[0][2] == board[1][1] == board[2][0] == player:
        return True

    return False

# Function to check for a draw
def check_draw(board):
    for row in board:
        if " " in row:
            return False  # Found an empty space, not a draw
    return True  # No empty spaces, it's a draw

# Main game function
def play_game():
    board = create_board()
    current_player = "X"
    game_over = False

    while not game_over:
        display_board(board)
        row, col = get_player_move(current_player)

        if make_move(board, row, col, current_player):
            if check_win(board, current_player):
                display_board(board)
                print(f"Player {current_player} wins!")
                game_over = True
            elif check_draw(board):
                display_board(board)
                print("It's a draw!")
                game_over = True
            else:
                current_player = "O" if current_player == "X" else "X"

    print("Game Over.")

# Start the game
if __name__ == "__main__":
    play_game() 