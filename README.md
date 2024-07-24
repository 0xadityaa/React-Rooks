
<p align="center">
  <img src="https://github.com/0xadityaa/React-Rooks-UI/assets/62794227/a39ad447-66f6-42f6-8b3a-d93342a20744" alt="Icon" width="50" height="50">
  <h3 align="center">React Rooks</h3>
</p>

## About

React Rooks is a web-based chess game that allows users to play against an AI (Stockfish). It features game history, on-demand gameplay, real-time game analysis, player statistics, and three difficulty levels. The application includes user authentication for a personalized experience.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features
- **Play Against AI**: Challenge the Stockfish AI at three difficulty levels (easy, medium, hard).
- **Game History**: View your past games and analyze your moves.
- **On-Demand Gameplay**: Start a game whenever you want.
- **Real-Time Game Analysis**: Get insights and analysis during gameplay.
- **Player Statistics**: Track your performance and statistics.
- **Authentication**: Secure user authentication for personalized experience.

## Tech Stack
- **Frontend**: React.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, Next.js, MongoDB, WebSockets
- **Deployment**: Vercel
- **AI Integration**: Stockfish WASM (WebAssembly) that runs on client's browser
- **Authentication**: JWT (JSON Web Tokens)
- **Packages**: Chess.js, React-Chessboard

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/0xadityaa/React-Rooks-UI.git
    cd React-Rooks-UI
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up environment variables:
    Create a `.env.local` file in the root directory and add the following:
    ```env
    MONGODB_URL=<your_mongodb_url>
    JWT_SECRET=<your_jwt_secret>
    JWT_TOKEN_EXPIRY=6000
    JWT_REFRESH_TOKEN_EXPIRY=30000
    EXPIRY_PRESIGNED_URL_USER=120000
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
1. **Start a Game**: Log in and select a difficulty level to start a new game against the AI.
2. **View Game History**: Navigate to your profile to see your past games and their analysis.
3. **Real-Time Analysis**: During a game, view real-time analysis about your moves.
4. **Player Statistics**: Check your stats and performance metrics on your profile page.

## Contributing
Contributions are welcome! Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Add your commit message"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
