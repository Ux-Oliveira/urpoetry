import { useEffect, useMemo, useRef, useState } from "react";

export default function Game() {
  const answer = "MELIS";

  const [started, setStarted] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [flashWrong, setFlashWrong] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showGame, setShowGame] = useState(false);

  const hiddenInputRef = useRef(null);

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
    setVictory(false);

    setStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }));

    setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 100);
  };

  const submitLetter = (letter) => {
    if (!letter) return;

    const upper = letter.toUpperCase();

    if (!/^[A-Z]$/.test(upper)) return;

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
      }, 400);
    }
  };

  useEffect(() => {
    if (!started) return;

    const handleKeyDown = (e) => {
      const key = e.key;

      if (/^[a-zA-Z]$/.test(key)) {
        submitLetter(key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [started, guessed]);

  return (
    <section className="game-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&family=Shrikhand&display=swap');

        :root{
          --bg:#0f0f0f;
          --card:#171717;
          --soft:#222;
          --text:#e9f3d1;
          --brand:#5cc0ff;
          --brown:#c9b39a1a;
          --radius:22px;
          --gap:18px;

          --store-bg:#3E95A6;
        }

        *{
          box-sizing:border-box;
        }

        html,body{
          margin:0;
          background:var(--bg);
          color:var(--text);
          overflow-x:hidden;
          width:100%;
          font-family:"Space Grotesk",system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;
        }

        .game-page{
          min-height:100vh;
          background:var(--bg);
          color:var(--text);
          overflow-x:hidden;
        }

        a{
          text-decoration:none;
        }

        .wrap{
          max-width:1200px;
          margin:0 auto;
          padding:0 20px;
        }

        /* NAV */

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
          color:var(--text);
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
          transform:translateY(-1px);
        }

        /* LOGO STRIP */

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

        /* BLUE GAME SECTION */

        .game-section{
          background:var(--store-bg);
          min-height:calc(100vh - 180px);
          padding:60px 20px 90px;
        }

        .game-inner{
          max-width:1200px;
          margin:0 auto;
        }

        .game-area{
          display:flex;
          align-items:center;
          justify-content:center;
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

        /* MODAL */

        .game-wrap{
          display:flex;
          justify-content:center;
          margin-top:20px;
        }

        .game-modal{
          position:relative;

          width:min(92vw,420px);
          aspect-ratio:9 / 16;

          background:rgba(10,10,10,.92);

          border-radius:34px;

          border:1px solid rgba(255,255,255,.08);

          overflow:hidden;

          box-shadow:
            0 25px 80px rgba(0,0,0,.45),
            inset 0 0 0 1px rgba(255,255,255,.03);

          padding:26px 20px;

          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-start;

          transition:background .35s ease;
        }

        .game-modal.flash{
          animation:flashRed .4s ease;
        }

        @keyframes flashRed{
          0%{
            background:#6e1111;
          }
          100%{
            background:rgba(10,10,10,.92);
          }
        }

        .hang-title{
          font-size:clamp(28px,4vw,40px);
          text-align:center;
          font-family:"Shrikhand", cursive;
          margin:0 0 16px;
          line-height:1.2;
        }

        /* GALLOWS */

        .hangman-zone{
          width:100%;
          display:flex;
          justify-content:center;
          align-items:center;
          margin-top:10px;
          margin-bottom:20px;
          min-height:280px;
        }

        .gallows{
          position:relative;
          width:180px;
          height:250px;
        }

        .base{
          position:absolute;
          bottom:0;
          left:0;
          width:120px;
          height:8px;
          background:white;
          border-radius:20px;
        }

        .pole{
          position:absolute;
          left:30px;
          bottom:0;
          width:8px;
          height:220px;
          background:white;
          border-radius:20px;
        }

        .topbar{
          position:absolute;
          left:30px;
          top:20px;
          width:100px;
          height:8px;
          background:white;
          border-radius:20px;
        }

        .rope{
          position:absolute;
          top:20px;
          left:122px;
          width:4px;
          height:34px;
          background:#ddd;
        }

        .head{
          position:absolute;
          top:52px;
          left:101px;
          width:44px;
          height:44px;
          border:5px solid white;
          border-radius:50%;
          opacity:0;
          transform:scale(.5);
        }

        .body{
          position:absolute;
          top:95px;
          left:121px;
          width:5px;
          height:70px;
          background:white;
          opacity:0;
          transform:scaleY(.2);
          transform-origin:top;
        }

        .arm-left,
        .arm-right{
          position:absolute;
          top:112px;
          width:44px;
          height:5px;
          background:white;
          opacity:0;
        }

        .arm-left{
          left:84px;
          transform:rotate(-30deg);
          transform-origin:right center;
        }

        .arm-right{
          left:121px;
          transform:rotate(30deg);
          transform-origin:left center;
        }

        .leg-left,
        .leg-right{
          position:absolute;
          top:170px;
          width:48px;
          height:5px;
          background:white;
          opacity:0;
        }

        .leg-left{
          left:84px;
          transform:rotate(35deg);
          transform-origin:right center;
        }

        .leg-right{
          left:121px;
          transform:rotate(-35deg);
          transform-origin:left center;
        }

        .show{
          opacity:1;
          transition:all .3s ease;
          transform:scale(1);
        }

        /* WORD */

        .word-section{
          width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          margin-top:auto;
          padding-bottom:10px;
        }

        .slots{
          display:flex;
          gap:12px;
          flex-wrap:wrap;
          justify-content:center;
          margin-bottom:20px;
        }

        .slot{
          width:52px;
          height:62px;

          border-bottom:4px solid white;

          display:flex;
          align-items:center;
          justify-content:center;

          font-size:32px;
          text-transform:uppercase;

          font-family:"Shrikhand", cursive;

          cursor:text;
        }

        .slot:hover{
          opacity:.85;
        }

        .used{
          font-size:14px;
          opacity:.7;
          text-align:center;
          line-height:1.7;
          margin-top:16px;
        }

        .hidden-input{
          position:absolute;
          opacity:0;
          pointer-events:none;
        }

        /* STATS */

        .stats{
          margin-top:26px;
          text-align:center;
          color:#111;
          font-weight:700;
          line-height:2;
          font-size:15px;
        }

        /* VICTORY */

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

        @media (max-width:820px){
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

          .game-section{
            padding:40px 14px 80px;
          }

          .game-modal{
            width:min(95vw,420px);
            border-radius:28px;
            padding:20px 14px;
          }

          .slot{
            width:44px;
            height:54px;
            font-size:28px;
          }

          .hangman-zone{
            min-height:240px;
          }

          .play-btn{
            font-size:18px;
            width:100%;
            max-width:280px;
          }
        }
      `}</style>

      {/* NAV */}

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

      {/* LOGO STRIP */}

      <div className="logo-strip">
        <div className="wrap">
          <div className="logo-card">
            <div className="logo-title">
              You're The Poetry
            </div>

            <div className="logo-sub">
              I put the words into place · But the
              meaning of thoses words · Will always
              be you
            </div>
          </div>
        </div>
      </div>

      {/* BLUE SECTION */}

      <section className="game-section">
        <div className="game-inner">

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
                <div
                  className={`game-modal ${
                    flashWrong ? "flash" : ""
                  }`}
                >
                  {!started ? (
                    <div
                      style={{
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center",
                        width:"100%",
                        height:"100%",
                      }}
                    >
                      <button
                        className="play-btn"
                        onClick={startGame}
                      >
                        Start Game
                      </button>
                    </div>
                  ) : (
                    <>
                      <h1 className="hang-title">
                        Guess the name ❤️
                      </h1>

                      {/* HANGMAN */}

                      <div className="hangman-zone">
                        <div className="gallows">

                          <div className="base"></div>
                          <div className="pole"></div>
                          <div className="topbar"></div>
                          <div className="rope"></div>

                          <div
                            className={`head ${
                              wrongCount >= 1
                                ? "show"
                                : ""
                            }`}
                          ></div>

                          <div
                            className={`body ${
                              wrongCount >= 2
                                ? "show"
                                : ""
                            }`}
                          ></div>

                          <div
                            className={`arm-left ${
                              wrongCount >= 3
                                ? "show"
                                : ""
                            }`}
                          ></div>

                          <div
                            className={`arm-right ${
                              wrongCount >= 4
                                ? "show"
                                : ""
                            }`}
                          ></div>

                          <div
                            className={`leg-left ${
                              wrongCount >= 5
                                ? "show"
                                : ""
                            }`}
                          ></div>

                          <div
                            className={`leg-right ${
                              wrongCount >= 6
                                ? "show"
                                : ""
                            }`}
                          ></div>
                        </div>
                      </div>

                      {/* WORD */}

                      <div className="word-section">

                        <div
                          className="slots"
                          onClick={() =>
                            hiddenInputRef.current?.focus()
                          }
                        >
                          {answer
                            .split("")
                            .map((letter, index) => (
                              <div
                                key={index}
                                className="slot"
                              >
                                {guessed.includes(letter)
                                  ? letter
                                  : ""}
                              </div>
                            ))}
                        </div>

                        {/* MOBILE KEYBOARD */}

                        <input
                          ref={hiddenInputRef}
                          className="hidden-input"
                          type="text"
                          inputMode="text"
                          autoCapitalize="characters"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="false"
                          maxLength={1}
                          onChange={(e) => {
                            submitLetter(
                              e.target.value
                            );

                            e.target.value = "";
                          }}
                        />

                        <div className="used">
                          Used letters
                          <br />
                          {guessed.length
                            ? guessed.join(", ")
                            : "None yet"}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* OUTSIDE MODAL */}

              <div className="stats">
                Attempts: {stats.attempts}
                <br />
                Right guesses: {stats.rightGuesses}
                <br />
                Wrong guesses: {stats.wrongGuesses}
              </div>
            </>
          )}
        </div>
      </section>

      {/* VICTORY */}

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
