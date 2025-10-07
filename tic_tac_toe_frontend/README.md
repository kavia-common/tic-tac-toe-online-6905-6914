# Tic Tac Toe Game

A modern implementation of the classic Tic Tac Toe game built with React.

## Features

- Two game modes: Player vs Player and Player vs AI
- Clean, modern UI with Ocean Professional theme
- Responsive design for all screen sizes
- Accessibility features including ARIA labels
- Game controls:
  - New Game: Reset the current game
  - vs AI/vs Player: Toggle between AI and human opponent
  - Player Switch: Change the current player (X/O)

## Theme

The game uses the Ocean Professional theme with the following colors:
- Primary: #2563EB (Blue)
- Secondary: #F59E0B (Amber)
- Error: #EF4444 (Red)
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to play the game.

## Game Rules

- X always goes first
- Players take turns placing their marks (X or O)
- First player to get 3 in a row (horizontally, vertically, or diagonally) wins
- When all 9 squares are filled and no winner, the game is a draw

## AI Strategy

The AI opponent follows these priorities:
1. Win if possible
2. Block opponent from winning
3. Take center square if available
4. Take corner squares
5. Take side squares
This creates a challenging but beatable opponent.
