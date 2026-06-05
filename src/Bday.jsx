import { useEffect, useMemo, useRef, useState } from "react";

export default function Bday() {
  const rounds = [
    {
      name: "Teddy Bear",
      color: "#35d06f",
      reveal: "It's Froggy, our child!",
      dots: [
        { x: 140, y: 80 },
        { x: 190, y: 80 },
        { x: 120, y: 120 },
        { x: 210, y: 120 },
        { x: 165, y: 130 },
        { x: 145, y: 170 },
        { x: 185, y: 170 },
        { x: 165, y: 210 },
        { x: 130, y: 250 },
        { x: 200, y: 250 },
        { x: 140, y: 300 },
        { x: 190, y: 300 },
      ],
    },
    {
      name: "Flower",
      color: "#ff6db5",
      reveal: "It's the flowers I got you",
      dots: [
        { x: 165, y: 120 },
        { x: 125, y: 160 },
        { x: 205, y: 160 },
        { x: 125, y: 240 },
        { x: 205, y: 240 },
        { x: 165, y: 280 },
        { x: 165, y: 340 },
        { x: 165, y: 390 },
      ],
    },
    {
      name: "Heart",
      color: "#ff3b3b",
      reveal: "It's my heart, being given to you! <3",
      dots: [
        { x: 120, y: 120 },
        { x: 160, y: 90 },
        { x: 210, y: 120 },
        { x: 240, y: 170 },
        { x: 220, y: 230 },
        { x: 190, y: 280 },
        { x: 165, y: 320 },
        { x: 140, y: 280 },
        { x: 110, y: 230 },
        { x: 90, y: 170 },
      ],
    },
  ];

  const [showGame, setShowGame] = useState(false);
  const [started, setStarted] = useState(false);
  const [round, setRound] = useState(0);
  const [clickedDots, setClickedDots] = useState([]);
  const [revealedDots, setRevealedDots] = useState(1);
  const [showReveal, setShowReveal] = useState(false);
  const [finished, setFinished] = useState(false);

  const clickAudio = useMemo(() => new Audio("/clicking.mp3"), []);
  const winAudio = useMemo(() => new Audio("/right.mp3"), []);

  const currentRound = rounds[round];

  const startGame = () => {
    setStarted(true);
    setRound(0);
    setClickedDots([]);
    setRevealedDots(1);
    setShowReveal(false);
    setFinished(false);
  };

  const clickDot = (index) => {
    if (clickedDots.includes(index)) return;
    if (index !== clickedDots.length) return;

    clickAudio.currentTime = 0;
    clickAudio.play();

    const updated = [...clickedDots, index];
    setClickedDots(updated);

    if (revealedDots < currentRound.dots.length) {
      setRevealedDots((p) => p + 1);
    }

    if (updated.length === currentRound.dots.length) {
      winAudio.currentTime = 0;
      winAudio.play();

      if (round === 2) {
        setFinished(true);
      } else {
        setShowReveal(true);

        setTimeout(() => {
          setRound((p) => p + 1);
          setClickedDots([]);
          setRevealedDots(1);
          setShowReveal(false);
        }, 3000);
      }
    }
  };

  const downloadPrize = () => {
    const a = document.createElement("a");
    a.href = "/bdayprize.png";
    a.download = "bdayprize.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="game-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Shrikhand&display=swap');

        *{
          box-sizing:border-box;
        }

        body,html{
          margin:0;
          background:#0f0f0f;
          overflow-x:hidden;
          font-family:"Space Grotesk",sans-serif;
        }

        .game-page{
          min-height:100vh;
          background:#0f0f0f;
          color:#e9f3d1;
        }

        .wrap{
          max-width:1200px;
          margin:auto;
          padding:0 20px;
        }

        header{
          position:sticky;
          top:0;
          z-index:50;
          backdrop-filter:blur(6px);
          background:rgba(15,15,15,.92);
          border-bottom:1px solid #222;
        }

        .nav{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:14px 0;
        }

        .btn-news{
          padding:.55rem 1rem;
          border-radius:999px;
          background:linear-gradient(90deg,#fa0292,#f06161);
          color:#fff;
          text-decoration:none;
          font-weight:700;
        }

        .logo-strip{
          background:#c9b39a1a;
        }

        .logo-card{
          text-align:center;
          padding:28px;
        }

        .logo-title{
          font-family:"Shrikhand",cursive;
          font-size:52px;
        }

        .logo-sub{
          opacity:.75;
          margin-top:10px;
        }

        .lower{
          min-height:calc(100vh - 220px);
          background:#3E95A6;
          display:flex;
          flex-direction:column;
          align-items:center;
          justify-content:flex-start;
          padding-top:40px;
          position:relative;
          overflow:hidden;
        }

        .cups-track{
          width:100%;
          height:180px;
          position:relative;
          overflow:hidden;
          margin-bottom:40px;
        }

        .cups{
          position:absolute;
          width:180px;
          top:20px;
          animation:slidecups 10s linear infinite;
        }

        @keyframes slidecups{
          from{
            left:-220px;
          }
          to{
            left:calc(100% + 220px);
          }
        }

        .heart-btn{
          width:180px;
          height:160px;
          border:none;
          cursor:pointer;
          position:relative;
          transform:rotate(-45deg);
          background:linear-gradient(135deg,#ff0055,#ff4444);
          margin-top:10px;
        }

        .heart-btn:before,
        .heart-btn:after{
          content:"";
          position:absolute;
          width:180px;
          height:160px;
          border-radius:50%;
          background:linear-gradient(135deg,#ff0055,#ff4444);
        }

        .heart-btn:before{
          top:-90px;
          left:0;
        }

        .heart-btn:after{
          left:90px;
          top:0;
        }

        .heart-text{
          position:absolute;
          inset:0;
          display:flex;
          align-items:center;
          justify-content:center;
          transform:rotate(45deg);
          z-index:2;
          color:white;
          font-size:28px;
          font-family:"Shrikhand",cursive;
        }

        .overlay{
          position:fixed;
          inset:0;
          background:rgba(0,0,0,.75);
          display:flex;
          align-items:center;
          justify-content:center;
          z-index:999;
        }

        .modal{
          width:min(92vw,460px);
          min-height:720px;
          background:#111;
          border-radius:35px;
          padding:25px;
          text-align:center;
          position:relative;
        }

        .title{
          font-family:"Shrikhand",cursive;
          font-size:36px;
        }

        .play-btn{
          padding:14px 30px;
          border:none;
          border-radius:999px;
          background:linear-gradient(90deg,#fa0292,#f06161);
          color:white;
          cursor:pointer;
          font-size:18px;
          margin-top:20px;
        }

        .board{
          position:relative;
          width:330px;
          height:450px;
          margin:25px auto;
        }

        .dot{
          width:24px;
          height:24px;
          border-radius:50%;
          position:absolute;
          transform:translate(-50%,-50%);
          cursor:pointer;
          transition:.25s;
          background:#777;
        }

        .dot.active{
          box-shadow:0 0 18px rgba(255,255,255,.4);
        }

        .reveal{
          margin-top:20px;
          font-size:30px;
          font-family:"Shrikhand",cursive;
        }

        @media(max-width:768px){
          .logo-title{
            font-size:36px;
          }

          .board{
            transform:scale(.85);
          }
        }
      `}</style>

      <header>
        <div className="wrap nav">
          <div>
            <small>6th of June - Birth of the moon</small>
          </div>

          <a href="/" className="btn-news">
            Back To Poetry
          </a>
        </div>
      </header>

      <div className="logo-strip">
        <div className="wrap">
          <div className="logo-card">
            <div className="logo-title">
              Today will be a day worth remembering
            </div>

            <div className="logo-sub">
              The moment might not feel celebratory.
              But I could never let you bday go unoticed!
              Hope you enjoy the surprises! I love you, Melis!
            </div>
          </div>
        </div>
      </div>

      <section className="lower">
        {!showGame && (
          <>
            <div className="cups-track">
              <img
                src="/2cups.png"
                alt=""
                className="cups"
              />
            </div>

            <button
              className="heart-btn"
              onClick={() => setShowGame(true)}
            >
              <div className="heart-text">
                Play
              </div>
            </button>
          </>
        )}
      </section>

      {showGame && (
        <div className="overlay">
          <div className="modal">

            {!started ? (
              <>
                <h1 className="title">
                  Welcome to THE GAME SHOOOOOW!
                </h1>

                <button
                  className="play-btn"
                  onClick={startGame}
                >
                  Start Game
                </button>
              </>
            ) : (
              <>
                <h1 className="title">
                  Let's Connect The Dots
                </h1>

                <h3>
                  Round {round + 1}
                </h3>

                <div className="board">
                  {currentRound.dots
                    .slice(0, revealedDots)
                    .map((dot, index) => (
                      <div
                        key={index}
                        className={`dot ${
                          clickedDots.includes(index)
                            ? "active"
                            : ""
                        }`}
                        onClick={() =>
                          clickDot(index)
                        }
                        style={{
                          left: dot.x,
                          top: dot.y,
                          background:
                            clickedDots.includes(index)
                              ? currentRound.color
                              : "#777",
                        }}
                      />
                    ))}
                </div>

                {showReveal && (
                  <h1 className="reveal">
                    {currentRound.reveal}
                  </h1>
                )}

                {finished && (
                  <>
                    <h1 className="reveal">
                      Yay! You did itttt, my baby girl!🥳🎉❤️
                    </h1>

                    <button
                      className="play-btn"
                      onClick={downloadPrize}
                    >
                      Collect your birthday prize! 
                    </button>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
