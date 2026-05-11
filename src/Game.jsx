import { useEffect, useMemo, useRef, useState } from "react";

export default function Game() {

  const levels = [
    {
      answer: "YOU",
      title: "Level 1",
      subtitle: "Hint: To whom do I belong to?",
    },

    {
      answer: "MELIS",
      title: "Level 2",
      subtitle: "Hint: Who's the most beautiful woman in the world?",
    },

    {
      answer: "CHERRY",
      title: "Level 3",
      subtitle: "Hint: What fruit are your lips made of?",
    },

    {
      answer: "ALWAYS",
      title: "Level 4",
      subtitle: "Hint: Until when will I love you?",
    },
  ];

  const [currentLevel, setCurrentLevel] =
    useState(0);

  const answer =
    levels[currentLevel].answer;

  const [started, setStarted] =
    useState(false);

  const [guessed, setGuessed] =
    useState([]);

  const [wrongCount, setWrongCount] =
    useState(0);

  const [flashWrong, setFlashWrong] =
    useState(false);

  const [victory, setVictory] =
    useState(false);

  const [lost, setLost] =
    useState(false);

  const [showGame, setShowGame] =
    useState(false);

  const [shakeMan, setShakeMan] =
    useState(false);

  const hiddenInputRef = useRef(null);

  const [stats, setStats] = useState(() => {
    const saved =
      localStorage.getItem(
        "hangman_stats"
      );

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

    setLost(false);

    setCurrentLevel(0);

    setStats((prev) => ({
      ...prev,
      attempts: prev.attempts + 1,
    }));

    setTimeout(() => {
      hiddenInputRef.current?.focus();
    }, 150);
  };

  const nextLevel = () => {

    if (
      currentLevel <
      levels.length - 1
    ) {

      setCurrentLevel(
        (prev) => prev + 1
      );

      setGuessed([]);

      setWrongCount(0);

      setVictory(false);

      setLost(false);

      setTimeout(() => {
        hiddenInputRef.current?.focus();
      }, 150);

    } else {

      setVictory(false);

      setStarted(false);

      setShowGame(false);

      setCurrentLevel(0);

      setGuessed([]);

      setWrongCount(0);

      alert(
        "Such a good girl! I'm proud of you! ❤️"
      );
    }
  };

  const returnToMenu = () => {

    setLost(false);

    setStarted(false);

    setShowGame(false);

    setCurrentLevel(0);

    setGuessed([]);

    setWrongCount(0);
  };

  const submitLetter = (letter) => {

    if (!letter) return;

    if (victory || lost) return;

    const upper =
      letter.toUpperCase();

    if (
      !/^[A-Z]$/.test(upper)
    ) {
      return;
    }

    if (
      guessed.includes(upper)
    ) {
      return;
    }

    const updated = [
      ...guessed,
      upper,
    ];

    setGuessed(updated);

    if (
      answer.includes(upper)
    ) {

      setStats((prev) => ({
        ...prev,
        rightGuesses:
          prev.rightGuesses + 1,
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

      const newWrong =
        wrongCount + 1;

      if (newWrong > 6) {
        return;
      }

      setWrongCount(newWrong);

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

      if (newWrong === 6) {

        setTimeout(() => {
          setLost(true);
        }, 500);
      }
    }
  };

  useEffect(() => {

    if (!started) return;

    const handleKeyDown = (
      e
    ) => {

      const key = e.key;

      if (
        /^[a-zA-Z]$/.test(key)
      ) {
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

  }, [
    started,
    guessed,
    wrongCount,
    victory,
    lost,
  ]);

  return (
    <section className="game-page">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Shrikhand&display=swap');

        :root{
          --bg:#0f0f0f;
          --text:#e9f3d1;
          --brown:#c9b39a1a;
          --store-bg:#3E95A6;
        }

        *{
          box-sizing:border-box;
        }

        html,
        body{
          margin:0;
          overflow-x:hidden;
          background:#0f0f0f;
          font-family:"Space Grotesk",sans-serif;
        }

        .game-page{
          min-height:100vh;
          background:#0f0f0f;
          color:var(--text);
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

          backdrop-filter:
            saturate(1.2)
            blur(6px);

          background:
            linear-gradient(
              180deg,
              rgba(15,15,15,.95),
              rgba(15,15,15,.72)
            );

          border-bottom:
            1px solid #222;
        }

        .nav{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:20px;
          padding:14px 0;
        }

        .brand small{
          opacity:.7;
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

          transition:.25s ease;
        }

        .btn-news:hover{
          transform:translateY(-2px);
        }

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
          margin-top:.5rem;

          opacity:.7;

          line-height:1.7;
        }

        .game-section{
          background:var(--store-bg);

          min-height:
            calc(100vh - 180px);

          padding:
            60px 20px 100px;
        }

        .game-inner{
          max-width:1200px;
          margin:0 auto;
        }

        .game-area{
          display:flex;
          justify-content:center;
        }

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

          transition:.25s ease;
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
        }

        .game-modal{

          position:relative;

          width:min(92vw,430px);

          height:min(92vh,940px);

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

          padding:
            24px 18px 65px;

          box-shadow:
            0 30px 80px rgba(0,0,0,.45);

          display:flex;
          flex-direction:column;
          align-items:center;
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

        .game-modal::before{
          content:"";

          position:absolute;

          top:10px;
          left:50%;

          transform:
            translateX(-50%);

          width:120px;
          height:8px;

          border-radius:999px;

          background:
            rgba(255,255,255,.14);
        }

        .start-screen{
          width:100%;
          height:100%;

          display:flex;
          align-items:center;
          justify-content:center;
        }

        .level-text{
          margin-top:16px;

          font-size:15px;

          letter-spacing:3px;

          text-transform:uppercase;

          opacity:.65;
        }

        .level-title{
          margin:
            8px 0 8px;

          font-size:
            clamp(34px,5vw,52px);

          line-height:1.1;

          text-align:center;

          font-family:
            "Shrikhand",
            cursive;
        }

        .level-subtitle{
          text-align:center;

          opacity:.72;

          line-height:1.6;

          margin-bottom:10px;

          max-width:300px;
        }

        .hangman-zone{
          width:100%;

          display:flex;
          align-items:center;
          justify-content:center;

          min-height:320px;
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

        .base,
        .pole,
        .topbar,
        .rope,
        .body,
        .arm-left,
        .arm-right,
        .leg-left,
        .leg-right{
          position:absolute;
        }

        .base{
          bottom:0;
          left:10px;

          width:140px;
          height:8px;

          background:white;
        }

        .pole{
          left:45px;
          bottom:0;

          width:8px;
          height:250px;

          background:white;
        }

        .topbar{
          top:20px;
          left:45px;

          width:120px;
          height:8px;

          background:white;
        }

        .rope{
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

          transform:scale(.3);

          transition:.3s ease;
        }

        .body{
          top:105px;
          left:159px;

          width:5px;
          height:78px;

          background:white;

          opacity:0;

          transform:scaleY(.1);

          transform-origin:top;
        }

        .arm-left,
        .arm-right,
        .leg-left,
        .leg-right{
          height:5px;

          background:white;

          opacity:0;
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

        .word-section{
          width:100%;

          display:flex;
          flex-direction:column;
          align-items:center;

          margin-top:auto;

          padding-bottom:20px;
        }

        .slots{
          display:flex;
          justify-content:center;
          gap:14px;
          flex-wrap:nowrap;

          min-height:70px;

          width:100%;

          cursor:text;
        }

        .slot{
          width:54px;
          height:66px;

          min-width:54px;

          display:flex;
          align-items:center;
          justify-content:center;

          border-bottom:
            4px solid white;

          font-size:34px;

          font-family:
            "Shrikhand",
            cursive;
        }

        .used{
          margin-top:28px;

          text-align:center;

          line-height:1.9;

          font-size:14px;

          opacity:.75;

          width:100%;

          padding:
            0 14px;

          word-break:break-word;
        }

        .hidden-input{
          position:absolute;
          opacity:0;
          pointer-events:none;
        }

        .stats{
          margin-top:30px;

          text-align:center;

          color:#111;

          font-size:15px;

          line-height:2;

          font-weight:700;
        }

        .victory,
        .lost-screen{
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
        }

        .victory-card h2{
          font-size:34px;

          font-family:
            "Shrikhand",
            cursive;
        }

        .victory-card p{
          opacity:.82;

          line-height:1.7;

          margin:
            12px 0 22px;
        }

        @media (max-width:768px){

          .game-modal{
            width:min(95vw,430px);

            height:88vh;

            border-radius:32px;

            padding:
              22px 14px 75px;
          }

          .hangman-zone{
            min-height:260px;
          }

          .gallows{
            transform:scale(.9);
          }

          .slot{
            width:46px;
            min-width:46px;
            height:58px;

            font-size:28px;
          }

          .play-btn{
            width:100%;
            max-width:280px;
          }

          .used{
            font-size:13px;
          }
        }
      `}</style>

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
                      <div className="level-text">
                        {levels[currentLevel].title}
                      </div>

                      <h1 className="level-title">
                        Hangman
                      </h1>

                      <div className="level-subtitle">
                        {
                          levels[currentLevel]
                            .subtitle
                        }
                      </div>

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

      {victory && (

        <div className="victory">

          <div className="victory-card">
            <h2>Woah baby, you did it!</h2>
            <p>
              You solved
              {" "}
              {levels[currentLevel].title}
            </p>

             <button
  className="play-btn"
  onClick={() => {

    if (
      currentLevel <
      levels.length - 1
    ) {

      nextLevel();

    } else {

      window.open(
        "https://www.youtube.com/watch?v=7a4LxvHSAis",
        "_blank"
      );
    }
  }}
>
  {currentLevel <
  levels.length - 1
    ? "Next Level"
    : "Collect your reward!"}
</button>

          </div>
        </div>
      )}

      {lost && (

        <div className="lost-screen">

          <div className="victory-card">

            <h2>
              Ahhh, my angel, you lost 💔
            </h2>

            <p>
              I'm so sorry. Better luck next time!
            </p>

            <button
  className="play-btn"
  onClick={() => {

    if (
      currentLevel <
      levels.length - 1
    ) {

      nextLevel();

    } else {

      window.open(
        "https://www.youtube.com/watch?v=7a4LxvHSAis",
        "_blank"
      );
    }
  }}
>
  {currentLevel <
  levels.length - 1
    ? "Next Level"
    : "Collect your reward!"}
</button>

          </div>
        </div>
      )}
    </section>
  );
}
