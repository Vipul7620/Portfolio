import { useCallback, useEffect, useRef, useState } from "react";

const playerCharacters = [
  { color: "#8b5cf6", shape: "rect" },
  { color: "#14b8a6", shape: "circle" },
  { color: "#f97316", shape: "rect" },
  { color: "#eab308", shape: "circle" },
  { color: "#ec4899", shape: "rect" },
];

function getRandomPlayerIndex(exclude: number) {
  let idx = Math.floor(Math.random() * playerCharacters.length);
  while (idx === exclude && playerCharacters.length > 1) {
    idx = Math.floor(Math.random() * playerCharacters.length);
  }
  return idx;
}

const GameComponent = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [score, setScore] = useState(0);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const gameLoopRef = useRef<number | null>(null);
  const soundEnabledRef = useRef(false);

  // Game state refs to avoid closure issues
  const playerRef = useRef({
    x: 0,
    y: 0,
    width: 20,
    height: 20,
    speed: 5,
    color: "#8b5cf6",
  });

  const obstaclesRef = useRef<Array<{ x: number, y: number, width: number, height: number, speed: number }>>([]);
  const scoreRef = useRef(0);
  const keysRef = useRef({
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false,
  });

  // Sound effects
  const createAudioElement = (src: string) => {
    const audio = new Audio(src);
    audio.volume = 0.3;
    return audio;
  };

  const soundEffects = useRef({
    point: createAudioElement("https://assets.codepen.io/291731/point.wav"),
    collision: createAudioElement("https://assets.codepen.io/291731/collision.wav"),
    gameStart: createAudioElement("https://assets.codepen.io/291731/game-start.wav"),
  });

  const playSound = (sound: keyof typeof soundEffects.current) => {
    if (soundEnabledRef.current) {
      soundEffects.current[sound].currentTime = 0;
      soundEffects.current[sound].play().catch(() => {
        // Ignore errors - browser might block autoplay
      });
    }
  };

  const [playerIndex, setPlayerIndex] = useState(0);
  const startGameRef = useRef<() => void>(() => { });
  const initGameRef = useRef<() => void>(() => { });

  const initGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    // Change player character on restart
    setPlayerIndex((prev) => getRandomPlayerIndex(prev));

    // Initialize player position
    playerRef.current = {
      x: canvas.width / 2 - 10,
      y: canvas.height - 40,
      width: 20,
      height: 20,
      speed: 5,
      color: playerCharacters[playerIndex].color,
    };

    // Reset game state
    obstaclesRef.current = [];
    scoreRef.current = 0;
    setScore(0);
  }, [playerIndex]);

  useEffect(() => { initGameRef.current = initGame; }, [initGame]);

  const gameOver = useCallback(() => {
    playSound("collision");

    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
      gameLoopRef.current = null;
    }

    setIsGameStarted(false);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Montserrat";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2 - 20);
    ctx.fillText(`Score: ${scoreRef.current}`, canvas.width / 2, canvas.height / 2 + 20);

    ctx.fillStyle = "#8b5cf6";
    ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 50, 150, 40);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "16px Montserrat";
    ctx.fillText("Play Again", canvas.width / 2, canvas.height / 2 + 75);

    // Restart game after 1.5 seconds
    setTimeout(() => {
      if (initGameRef.current) initGameRef.current();
      if (startGameRef.current) startGameRef.current();
    }, 1500);
  }, [playSound]);

  const updateGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update player position based on keys
    if (keysRef.current.ArrowUp && playerRef.current.y > 0) {
      playerRef.current.y -= playerRef.current.speed;
    }
    if (keysRef.current.ArrowDown && playerRef.current.y < canvas.height - playerRef.current.height) {
      playerRef.current.y += playerRef.current.speed;
    }
    if (keysRef.current.ArrowLeft && playerRef.current.x > 0) {
      playerRef.current.x -= playerRef.current.speed;
    }
    if (keysRef.current.ArrowRight && playerRef.current.x < canvas.width - playerRef.current.width) {
      playerRef.current.x += playerRef.current.speed;
    }

    // Draw player
    ctx.fillStyle = playerRef.current.color;
    if (playerCharacters[playerIndex].shape === "circle") {
      ctx.beginPath();
      ctx.arc(
        playerRef.current.x + playerRef.current.width / 2,
        playerRef.current.y + playerRef.current.height / 2,
        playerRef.current.width / 2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    } else {
      ctx.fillRect(
        playerRef.current.x,
        playerRef.current.y,
        playerRef.current.width,
        playerRef.current.height
      );
    }

    // Add new obstacle randomly
    if (Math.random() < 0.02) {
      const width = Math.random() * 30 + 15;
      obstaclesRef.current.push({
        x: Math.random() * (canvas.width - width),
        y: -30,
        width,
        height: 15,
        speed: Math.random() * 2 + 2,
      });
    }

    // Update and draw obstacles
    for (let i = 0; i < obstaclesRef.current.length; i++) {
      const obstacle = obstaclesRef.current[i];
      obstacle.y += obstacle.speed;

      // Random colors for obstacles
      const colors = ["#3b82f6", "#14b8a6", "#ec4899", "#f97316", "#eab308"];
      ctx.fillStyle = colors[i % colors.length];
      ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);

      // Check collision
      if (
        playerRef.current.x < obstacle.x + obstacle.width &&
        playerRef.current.x + playerRef.current.width > obstacle.x &&
        playerRef.current.y < obstacle.y + obstacle.height &&
        playerRef.current.y + playerRef.current.height > obstacle.y
      ) {
        gameOver();
        return;
      }

      // Remove obstacles that have moved off screen and increase score
      if (obstacle.y > canvas.height) {
        obstaclesRef.current.splice(i, 1);
        i--;
        scoreRef.current += 10;
        setScore(scoreRef.current);
        playSound("point");
      }
    }

    // Draw score
    ctx.fillStyle = "#fff";
    ctx.font = "16px Montserrat";
    ctx.textAlign = "left";
    ctx.fillText(`Score: ${scoreRef.current}`, 10, 30);
  }, [playerIndex, gameOver]);

  const gameLoop = useCallback(() => {
    updateGame();
    gameLoopRef.current = requestAnimationFrame(gameLoop);
  }, [updateGame]);

  const startGame = useCallback(() => {
    setIsGameStarted(true);
    playSound("gameStart");

    if (gameLoopRef.current) {
      cancelAnimationFrame(gameLoopRef.current);
    }

    gameLoop();
  }, [gameLoop]);

  useEffect(() => { startGameRef.current = startGame; }, [startGame]);

  // Handle canvas interactions
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || isGameStarted) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if click is on the Play button area
    const buttonX = canvas.width / 2 - 75;
    const buttonY = canvas.height / 2 + 50;
    const buttonWidth = 150;
    const buttonHeight = 40;

    if (
      x >= buttonX &&
      x <= buttonX + buttonWidth &&
      y >= buttonY &&
      y <= buttonY + buttonHeight
    ) {
      initGame();
      startGame();
    }
  };

  useEffect(() => {
    // Initialize the game
    initGame();
    startGame();

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw start screen
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#FFFFFF";
    ctx.font = "24px Montserrat";
    ctx.textAlign = "center";
    ctx.fillText("Cube Dodge", canvas.width / 2, canvas.height / 2 - 50);

    ctx.font = "16px Montserrat";
    ctx.fillText("Use arrow keys to move", canvas.width / 2, canvas.height / 2 - 10);
    ctx.fillText("Avoid falling obstacles", canvas.width / 2, canvas.height / 2 + 20);

    ctx.fillStyle = "#8b5cf6";
    ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 50, 150, 40);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2 + 75);

    // Setup event listeners for keyboard
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        keysRef.current[e.key as keyof typeof keysRef.current] = true;
        // Prevent scrolling with arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
          e.preventDefault();
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key in keysRef.current) {
        keysRef.current[e.key as keyof typeof keysRef.current] = false;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Handle window resize
    const handleResize = () => {
      if (canvas && ctx) {
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        // Redraw start screen or game based on state
        if (!isGameStarted) {
          ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = "#FFFFFF";
          ctx.font = "24px Montserrat";
          ctx.textAlign = "center";
          ctx.fillText("Cube Dodge", canvas.width / 2, canvas.height / 2 - 50);

          ctx.font = "16px Montserrat";
          ctx.fillText("Use arrow keys to move", canvas.width / 2, canvas.height / 2 - 10);
          ctx.fillText("Avoid falling obstacles", canvas.width / 2, canvas.height / 2 + 20);

          ctx.fillStyle = "#8b5cf6";
          ctx.fillRect(canvas.width / 2 - 75, canvas.height / 2 + 50, 150, 40);

          ctx.fillStyle = "#FFFFFF";
          ctx.fillText("Start Game", canvas.width / 2, canvas.height / 2 + 75);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("resize", handleResize);
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [initGame, startGame, isGameStarted]);

  // Update sound state when mute toggle changes
  useEffect(() => {
    soundEnabledRef.current = !isMuted;
  }, [isMuted]);

  return (
    <div className="relative w-full h-96 md:h-[500px] bg-gray-900 rounded-2xl overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        onClick={handleCanvasClick}
      />

      <div className="absolute top-4 right-4 flex items-center gap-4">
        <button
          className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
          )}
        </button>

        {isGameStarted && (
          <div className="px-3 py-1 bg-white/10 rounded-full text-white text-sm">
            Score: {score}
          </div>
        )}
      </div>
    </div>
  );
};

export default GameComponent;
