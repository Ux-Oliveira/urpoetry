import { useEffect, useMemo, useRef, useState } from "react";

export default function Game() {
  const answer = "MELIS";

  const [started, setStarted] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [flashWrong, setFlashWrong] = useState(false);
  const [victory, setVictory] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [shakeMan, setShakeMan] = useState(false);

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
    localStorage.setItem(
      "hangman_stats",
      JSON.stringify(stats)
    );
  }, [stats]);

  const wrongAudio = useMemo(
    () => new Audio("/wrong.mp3"),
    []
  );

  const rightAudio = useMemo(
    () => new Audio("/right.mp3"),
    []
  );

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
    }, 150);
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
        .every((char) =>
          updated.includes(char)
        );

      if (won) {
        setVictory(true);

        rightAudio.currentTime = 0;
        rightAudio.play();
      }
    } else {
      setWrongCount((prev) => prev + 1);

      setStats((prev) => ({
        ...prev,
        wrongGuesses:
          prev.wrongGuesses + 1,
      }));

      wrongAudio.currentTime = 0;
      wrongAudio.play();

      setFlashWrong(true);
      setShakeMan(true);

      setTimeout(() => {
        setFlashWrong(false);
      }, 400);

      setTimeout(() => {
        setShakeMan(false);
      }, 500);
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

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [started, guessed]);

  return (
    <section className="game-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Shrikhand&display=swap');

        :root{
          --bg:#0f0f0f;
          --card:#171717;
          --text:#e9f3d1;
          --brown:#c9b39a1a;
          --radius:22px;
          --store-bg:#3E95A6;
        }

        *{
          box-sizing:border-box;
        }

        html,
        body{
          margin:0;
          width:100%;
          overflow-x:hidden;
          background:var(--bg);
          font-family:"Space Grotesk",sans-serif;
        }

        body{
          color:var(--text);
        }

        .game-page{
          min-height:100vh;
          background:var(--bg);
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
          background:
            linear-gradient(
              180deg,
              rgba(15,15,15,.95),
              rgba(15,15,15,.72)
            );

          border-bottom:1px solid #222;
        }

        .nav{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          padding:14px 0;
        }

        .brand{
          display:flex;
          align-items:center;
        }

        .brand small{
          opacity:.7;
          color:var(--text);
          font-weight:600;
        }

        .btn-news{
          padding:.55rem 1rem;
          border-radius:999px;
          color:#111;
          background:
            linear-gradient(
              90deg,
              #fa0292,
              #f06161
            );

          font-weight:800;
          border:1px solid #00000020;
          box-shadow:
            0 2px 10px #ff6a0033;

          transition:.25s ease;
        }

        .btn-news:hover{
          transform:translateY(-2px);
        }

        /* TOP CARD SECTION */

        .logo-strip{
          background:var(--brown);
          border-bottom:
            1px solid #24211c;
        }

        .logo-card{
          margin:22px auto;
          border-radius:28px;
          padding:28px 20px;

          background:#201a1411;

          border:
            1px solid #3a342b33;

          display:grid;
          place-items:center;
          text-align:center;
        }

        .logo-title{
          font-family:"Shrikhand",cursive;
          font-size:
            clamp(30px,5vw,52px);
        }

        .logo-sub{
          margin-top:.4rem;
          opacity:.7;
          font-size:.95rem;
          line-height:1.7;
        }

        /* BLUE SECTION */

        .game-section{
          background:var(--store-bg);

          min-height:
            calc(100vh - 180px);

          padding:
            60px 20px 90px;
        }

        .game-inner{
          max-width:1200px;
          margin:0 auto;
        }

        .game-area{
          display:flex;
          justify-content:center;
          align-items:center;
        }

        /* BUTTON */

        .play-btn{
          padding:14px 34px;

          border:none;
          border-radius:999px;

          background:
            linear-gradient(
              90deg,
              #fa0292,
              #f06161
            );

          color:white;

          font-family:
            "Shrikhand",
            cursive;

          font-size:20px;

          cursor:pointer;

          animation:
            pulse 1.2s infinite;

          box-shadow:
            0 6px 20px
            #ff6a0036;

          transition:.25s ease;
        }

        .play-btn:hover{
          transform:scale(1.07);
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
        }

        .game-modal{
          position:relative;

          width:min(92vw,430px);

          height:min(88vh,860px);

          background:
            radial-gradient(
              circle at top,
              rgba(35,35,35,.9),
              rgba(8,8,8,.97)
            );

          border-radius:38px;

          border:
            1px solid
            rgba(255,255,255,.08);

          overflow:hidden;

          padding:22px 18px;

          box-shadow:
            0 30px 80px rgba(0,0,0,.45),
            inset 0 0 0 1px rgba(255,255,255,.03);

          display:flex;
          flex-direction:column;
          align-items:center;

          transition:
            background .35s ease,
            transform .25s ease;
        }

        .game-modal::before{
          content:"";

          position:absolute;

          top:10px;
          left:50%;

          transform:translateX(-50%);

          width:120px;
          height:8px;

          border-radius:999px;

          background:
            rgba(255,255,255,.14);
        }

        .game-modal.flash{
          animation:
            flashRed .4s ease;
        }

        @keyframes flashRed{
          0%{
            background:#7c1212;
          }

          100%{
            background:
              radial-gradient(
                circle at top,
                rgba(35,35,35,.9),
                rgba(8,8,8,.97)
              );
          }
        }

        .start-screen{
          width:100%;
          height:100%;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        /* TITLE */

        .hang-title{
          margin:
            22px 0 12px;

          font-size:
            clamp(30px,4vw,44px);

          line-height:1.2;

          text-align:center;

          font-family:
            "Shrikhand",
            cursive;
        }

        /* HANGMAN */

        .hangman-zone{
          width:100%;

          display:flex;
          align-items:center;
          justify-content:center;

          min-height:330px;

          position:relative;
        }

        .gallows{
          position:relative;

          width:220px;
          height:300px;

          transform-origin:top center;
        }

        .gallows.shake{
          animation:
            shake .4s ease;
        }

        @keyframes shake{
          0%{
            transform:rotate(0deg);
          }

          25%{
            transform:rotate(2deg);
          }

          50%{
            transform:rotate(-2deg);
          }

          75%{
            transform:rotate(1deg);
          }

          100%{
            transform:rotate(0deg);
          }
        }

        .base{
          position:absolute;

          bottom:0;
          left:10px;

          width:140px;
          height:8px;

          background:white;

          border-radius:20px;
        }

        .pole{
          position:absolute;

          left:45px;
          bottom:0;

          width:8px;
          height:250px;

          background:white;

          border-radius:20px;
        }

        .topbar{
          position:absolute;

          top:20px;
          left:45px;

          width:120px;
          height:8px;

          background:white;

          border-radius:20px;
        }

        .rope{
          position:absolute;

          top:20px;
          left:160px;

          width:4px;
          height:40px;

          background:#ddd;
        }

        .head{
          position:absolute;

          top:58px;
          left:137px;

          width:48px;
          height:48px;

          border:
            5px solid white;

          border-radius:50%;

          opacity:0;

          transform:
            scale(.3);

          transition:
            .3s ease;
        }

        .body{
          position:absolute;

          top:105px;
          left:159px;

          width:5px;
          height:78px;

          background:white;

          opacity:0;

          transform:
            scaleY(.1);

          transform-origin:top;

          transition:
            .3s ease;
        }

        .arm-left,
        .arm-right,
        .leg-left,
        .leg-right{
          position:absolute;

          height:5px;

          background:white;

          opacity:0;

          transition:
            .3s ease;
        }

        .arm-left{
          top:124px;
          left:122px;

          width:42px;

          transform:
            rotate(-30deg);
        }

        .arm-right{
          top:124px;
          left:159px;

          width:42px;

          transform:
            rotate(30deg);
        }

        .leg-left{
          top:190px;
          left:122px;

          width:50px;

          transform:
            rotate(35deg);
        }

        .leg-right{
          top:190px;
          left:155px;

          width:50px;

          transform:
            rotate(-35deg);
        }

        .show{
          opacity:1;
          transform:scale(1);
        }

        /* WORD */

        .word-section{
          margin-top:auto;

          width:100%;

          display:flex;
          flex-direction:column;
          align-items:center;

          padding-bottom:8px;
        }

        .slots{
          display:flex;
          justify-content:center;
          gap:14px;
          flex-wrap:wrap;

          cursor:text;
        }

        .slot{
          width:54px;
          height:66px;

          display:flex;
          align-items:center;
          justify-content:center;

          border-bottom:
            4px solid white;

          font-size:34px;

          text-transform:uppercase;

          font-family:
            "Shrikhand",
            cursive;
        }

        .slot:hover{
          opacity:.85;
        }

        .used{
          margin-top:20px;

          text-align:center;

          line-height:1.8;

          font-size:14px;

          opacity:.72;
        }

        .hidden-input{
          position:absolute;
          opacity:0;
          pointer-events:none;
        }

        /* STATS */

        .stats{
          margin-top:30px;

          text-align:center;

          color:#111;

          font-size:15px;

          line-height:2;

          font-weight:700;
        }

        /* VICTORY */

        .victory{
          position:fixed;
          inset:0;

          background:
            rgba(0,0,0,.72);

          display:flex;
          align-items:center;
          justify-content:center;

          z-index:999;

          padding:20px;
        }

        .victory-card{
          width:100%;
          max-width:420px;

          background:#111827;

          border-radius:30px;

          padding:34px;

          text-align:center;

          border:
            1px solid
            rgba(255,255,255,.08);

          animation:
            popIn .4s ease;
        }

        .victory-card h2{
          margin-bottom:12px;

          font-size:34px;

          font-family:
            "Shrikhand",
            cursive;
        }

        .victory-card p{
          opacity:.84;
          line-height:1.7;
          margin-bottom:20px;
        }

        @keyframes popIn{
          from{
            transform:
              scale(.7);

            opacity:0;
          }

          to{
            transform:
              scale(1);

            opacity:1;
          }
        }

        /* MOBILE */

        @media (max-width:820px){

          .nav{
            gap:10px;
          }

          .brand{
            width:100%;
            justify-content:center;
          }
        }

        @media (max-width:768px){

          .game-section{
            padding:
              40px 14px 80px;
          }

          .game-modal{
            width:min(95vw,430px);

            height:82vh;

            border-radius:32px;

            padding:20px 14px;
          }

          .hangman-zone{
            min-height:280px;
          }

          .gallows{
            transform:scale(.92);
          }

          .slot{
            width:46px;
            height:58px;
            font-size:28px;
          }

          .play-btn{
            width:100%;
            max-width:280px;
            font-size:18px;
          }
        }
      `}</style>

      {/* NAV */}

      <header>
        <div className="wrap nav">
          <div className="brand">
            <small>
              Specially for the baby girl...
            </small>
          </div>

          <a
            href="/"
            className="btn-news"
          >
            Back To Poetry
          </a>
        </div>
      </header>

      {/* TOP CARD */}

      <div className="logo-strip">
        <div className="wrap">
          <div className="logo-card">
            <div className="logo-title">
              You're The Poetry
            </div>

            <div className="logo-sub">
              I put the words into place ·
              But the meaning of those
              words · Will always be you
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
                onClick={() =>
                  setShowGame(true)
                }
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
                    flashWrong
                      ? "flash"
                      : ""
                  }`}
                >

                  {!started ? (
                    <div className="start-screen">
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

                        <div
                          className={`gallows ${
                            shakeMan
                              ? "shake"
                              : ""
                          }`}
                        >

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
                            .map(
                              (
                                letter,
                                index
                              ) => (
                                <div
                                  key={index}
                                  className="slot"
                                >
                                  {guessed.includes(
                                    letter
                                  )
                                    ? letter
                                    : ""}
                                </div>
                              )
                            )}
                        </div>

                        {/* MOBILE KEYBOARD */}

                        <input
                          ref={
                            hiddenInputRef
                          }
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

                            e.target.value =
                              "";
                          }}
                        />

                        <div className="used">
                          Used letters
                          <br />

                          {guessed.length
                            ? guessed.join(
                                ", "
                              )
                            : "None yet"}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* OUTSIDE MODAL */}

              <div className="stats">
                Attempts:
                {" "}
                {stats.attempts}

                <br />

                Right guesses:
                {" "}
                {stats.rightGuesses}

                <br />

                Wrong guesses:
                {" "}
                {stats.wrongGuesses}
              </div>
            </>
          )}
        </div>
      </section>

      {/* VICTORY */}

      {victory && (
        <div className="victory">
          <div className="victory-card">

            <h2>
              You Won ❤️
            </h2>

            <p>
              You guessed her name
              correctly.
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
