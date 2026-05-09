import { useEffect, useMemo, useState } from "react";

export default function Game() {
  const answer = "MELIS";

  const [started, setStarted] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [input, setInput] = useState("");
  const [flashWrong, setFlashWrong] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem("hangman_stats");

    return saved
      ? JSON.parse(saved)
      : {
          attempts: 0,
          wrongGuesses: 0,
          rightGuesses: 0,
        };
  });

  useEffect(() => {
    localStorage.setItem("hangman_stats", JSON.stringify(stats));
  }, [stats]);

  const wrongAudio = useMemo(() => new Audio("/wrong.mp3"), []);
  const rightAudio = useMemo(() => new Audio("/right.mp3"), []);

  const startGame = () => {
    setStarted(true);
    setGuessed([]);
    setWrongCount(0);
    setInput("");
    setVictory(false);

    setStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }));
  };

  const submitLetter = (letter) => {
    if (!letter) return;

    const upper = letter.toUpperCase();

    if (guessed.includes(upper)) return;

    const updated = [...guessed, upper];
    setGuessed(updated);

    if (answer.includes(upper)) {
      setStats((prev) => ({
        ...prev,
        rightGuesses: prev.rightGuesses + 1,
      }));

      const won = answer
        .split("")
        .every((char) => updated.includes(char));

      if (won) {
        setVictory(true);
        rightAudio.currentTime = 0;
        rightAudio.play();
      }
    } else {
      setWrongCount((prev) => prev + 1);

      setStats((prev) => ({
        ...prev,
        wrongGuesses: prev.wrongGuesses + 1,
      }));

      wrongAudio.currentTime = 0;
      wrongAudio.play();

      setFlashWrong(true);

      setTimeout(() => {
        setFlashWrong(false);
      }, 500);
    }
  };

  return (
    <section className="game-page">
      <style>{`
        :root{
          --bg:#0f0f0f;
          --card:#171717;
          --soft:#222;
          --text:#e9f3d1;
          --brand:#5cc0ff;
          --brown:#c9b39a1a;
          --radius:22px;
          --gap:18px;
        }

        *{
          box-sizing:border-box;
        }

        html,body{
          margin:0;
          overflow-x:hidden;
          width:100%;
          font-family:"Space Grotesk",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        }

        .game-page{
          min-height:100vh;
          background:#3E95A6;
          color:var(--text);
          overflow-x:hidden;
          padding-bottom:80px;
        }

        a{
          text-decoration:none;
        }

        .wrap{
          max-width:1200px;
          margin:0 auto;
          padding:0 20px;
        }

        header{
          position:sticky;
          top:0;
          z-index:50;
          backdrop-filter:saturate(1.2) blur(6px);
          background:linear-gradient(180deg,rgba(15,15,15,.9),rgba(15,15,15,.6));
          border-bottom:1px solid #222;
        }

        .nav{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          padding:14px 0;
          position:relative;
          width:100%;
        }

        .brand{
          display:flex;
          align-items:center;
          gap:12px;
          font-weight:700;
          letter-spacing:.5px;
        }

        .brand small{
          opacity:.6;
          font-weight:600;
          color:white;
        }

        .btn-news{
          padding:.5rem .85rem;
          border-radius:999px;
          color:#111;
          background:linear-gradient(90deg,#fa0292,#f06161);
          font-weight:800;
          letter-spacing:.2px;
          border:1px solid #00000020;
          box-shadow:0 2px 10px #ff6a0033;
          transition:transform .2s ease;
        }

        .btn-news:hover{
          transform:translateY(-1px) scale(1.03);
        }

        .logo-strip{
          background:var(--brown);
          border-bottom:1px solid #24211c;
        }

        .logo-card{
          margin:22px auto;
          border-radius:var(--radius);
          padding:28px 20px;
          background:#201a1411;
          border:1px solid #3a342b33;
          display:grid;
          place-items:center;
          text-align:center;
        }

        .logo-title{
          font-family:"Shrikhand", cursive;
          color:var(--text);
          font-size:clamp(26px,5vw,48px);
        }

        .logo-sub{
          opacity:.75;
          margin-top:.35rem;
          font-size:.95rem;
        }

        .game-area{
          display:flex;
          align-items:center;
          justify-content:center;
          padding:70px 20px 20px;
        }

        .play-btn{
          padding:14px 34px;
          border-radius:999px;
          border:none;
          background:linear-gradient(90deg,#fa0292,#f06161);
          color:var(--text);
          font-family:"Shrikhand", cursive;
          font-size:20px;
          cursor:pointer;
          animation:pulse 1.2s infinite;
          box-shadow:0 6px 20px #ff6a0036;
          transition:transform .25s ease;
        }

        .play-btn:hover{
          transform:scale(1.08);
        }

        @keyframes pulse{
          0%{
            transform:scale(1);
          }
          50%{
            transform:scale(1.08);
          }
          100%{
            transform:scale(1);
          }
        }

        .game-wrap{
          display:flex;
          justify-content:center;
          padding:34px 16px 0;
        }

        .game-modal{
          width:min(900px,100%);
          background:rgba(13,19,32,0.85);
          border:1px solid rgba(255,255,255,.08);
          border-radius:30px;
          padding:28px;
          box-shadow:0 20px 60px rgba(0,0,0,.45);
          backdrop-filter:blur(14px);
          transition:background .4s ease;
        }

        .game-modal.flash{
          animation:flashRed .5s ease;
        }

        @keyframes flashRed{
          0%{
            background:rgba(120,0,0,.85);
          }
          100%{
            background:rgba(13,19,32,.85);
          }
        }

        .play-holder{
          display:flex;
          justify-content:center;
          margin-top:18px;
        }

        .word-section{
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:24px;
          flex:1;
          min-width:260px;
        }

        .hang-title{
          font-size:clamp(28px,4vw,42px);
          text-align:center;
          font-family:"Shrikhand", cursive;
          margin:0;
        }

        .slots{
          display:flex;
          gap:14px;
          flex-wrap:wrap;
          justify-content:center;
        }

        .slot{
          width:54px;
          height:64px;
          border-bottom:4px solid white;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:34px;
          text-transform:uppercase;
          cursor:pointer;
          font-family:"Shrikhand", cursive;
        }

        .mobile-input{
          opacity:0;
          position:absolute;
          pointer-events:none;
        }

        .used{
          font-size:14px;
          opacity:.7;
          text-align:center;
          line-height:1.6;
        }

        .stats{
          margin-top:34px;
          text-align:center;
          opacity:.85;
          line-height:2;
          font-size:15px;
        }

        .victory{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.7);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:999;
          padding:20px;
        }

        .victory-card{
          background:#111827;
          border-radius:28px;
          padding:34px;
          text-align:center;
          max-width:420px;
          width:100%;
          border:1px solid rgba(255,255,255,.08);
          animation:popIn .4s ease;
        }

        @keyframes popIn{
          from{
            transform:scale(.7);
            opacity:0;
          }
          to{
            transform:scale(1);
            opacity:1;
          }
        }

        .victory-card h2{
          font-size:34px;
          margin-bottom:12px;
          font-family:"Shrikhand", cursive;
        }

        .victory-card p{
          opacity:.85;
          line-height:1.6;
          margin-bottom:20px;
        }

        @media (max-width: 820px){
          .nav{
            justify-content:space-between;
            align-items:center;
          }

          .brand{
            justify-content:center;
            width:100%;
            text-align:center;
          }
        }

        @media (max-width:768px){
          .game-modal{
            padding:22px 16px;
            border-radius:24px;
          }

          .slot{
            width:46px;
            height:56px;
            font-size:28px;
          }

          .play-btn{
            font-size:18px;
            width:100%;
            max-width:280px;
          }
        }
      `}</style>

      <header>
        <div className="wrap nav">
          <div className="brand">
            <small>Specially for the baby girl...</small>
          </div>

          <a href="/" className="btn-news">
            Back To Poetry
          </a>
        </div>
      </header>

      <div className="logo-strip">
        <div className="wrap">
          <div className="logo-card">
            <div className="logo-title">You're The Poetry</div>

            <div className="logo-sub">
              I put the words into place · But the meaning of thoses
              words · Will always be you
            </div>
          </div>
        </div>
      </div>

      {!showGame && (
        <div className="game-area">
          <button
            className="play-btn"
            onClick={() => setShowGame(true)}
          >
            Play
          </button>
        </div>
      )}

      {showGame && (
        <>
          <div className="game-wrap">
            <div className={`game-modal ${flashWrong ? "flash" : ""}`}>
              {!started ? (
                <div className="play-holder">
                  <button className="play-btn" onClick={startGame}>
                    Start Game
                  </button>
                </div>
              ) : (
                <div className="word-section">
                  <h1 className="hang-title">
                    Guess the name ❤️
                  </h1>

                  <div className="slots">
                    {answer.split("").map((letter, index) => (
                      <div key={index} className="slot">
                        {guessed.includes(letter) ? letter : ""}
                      </div>
                    ))}
                  </div>

                  <input
                    className="mobile-input"
                    type="text"
                    maxLength={1}
                    value={input}
                    onChange={(e) => {
                      const value = e.target.value;
                      setInput(value);
                      submitLetter(value);
                    }}
                  />

                  <button
                    className="play-btn"
                    onClick={() => {
                      const value = prompt("Enter a letter");

                      if (value) {
                        submitLetter(value);
                      }
                    }}
                  >
                    Guess Letter
                  </button>

                  <div className="used">
                    Used letters:
                    <br />
                    {guessed.join(", ")}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="stats">
            Attempts: {stats.attempts}
            <br />
            Right guesses: {stats.rightGuesses}
          </div>
        </>
      )}

      {victory && (
        <div className="victory">
          <div className="victory-card">
            <h2>You Won ❤️</h2>

            <p>
              You guessed her name correctly.
            </p>

            <button
              className="play-btn"
              onClick={startGame}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
