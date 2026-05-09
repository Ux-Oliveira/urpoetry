import { useEffect, useMemo, useState } from "react";

export default function Game() {
  const answer = "MELIS";

  const [started, setStarted] = useState(false);
  const [guessed, setGuessed] = useState([]);
  const [wrongCount, setWrongCount] = useState(0);
  const [input, setInput] = useState("");
  const [flashWrong, setFlashWrong] = useState(false);
  const [victory, setVictory] = useState(false);

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
    }
  };
     return (
  <section className="game-page">
    <style>{`
      * {
        box-sizing: border-box;
      }

      .game-page {
        min-height: 100vh;
        background:
          radial-gradient(circle at top, rgba(255,255,255,.06), transparent 30%),
          linear-gradient(180deg, #0d1320 0%, #09111c 100%);
        color: white;
        font-family: "Shrikhand", cursive;
        overflow-x: hidden;
        padding-bottom: 60px;
      }

      .wrap {
        width: min(1120px, calc(100% - 32px));
        margin-inline: auto;
      }

      header {
        position: sticky;
        top: 0;
        z-index: 100;
        backdrop-filter: blur(10px);
        background: rgba(5, 10, 20, 0.7);
        border-bottom: 1px solid rgba(255,255,255,.08);
      }

      .nav {
        min-height: 72px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .brand small {
        color: #fff;
        font-size: 15px;
        letter-spacing: .5px;
      }

      .btn-home {
        padding: 12px 22px;
        border-radius: 999px;
        text-decoration: none;
        border: none;
        background: linear-gradient(90deg, #fa0292, #f06161);
        color: white;
        font-size: 16px;
        box-shadow: 0 6px 20px #ff6a0036;
        transition: .25s ease;
      }

      .btn-home:hover {
        transform: scale(1.06);
      }

      .logo-strip {
        padding-top: 28px;
      }

      .logo-card {
        background: rgba(255,255,255,.05);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 24px;
        padding: 26px;
        text-align: center;
        backdrop-filter: blur(12px);
      }

      .logo-title {
        font-size: clamp(28px, 5vw, 48px);
        margin-bottom: 10px;
      }

      .logo-sub {
        font-size: 15px;
        opacity: .8;
        line-height: 1.6;
      }

      .game-wrap {
        display: flex;
        justify-content: center;
        padding: 34px 16px 0;
      }

      .game-modal {
        width: min(900px, 100%);
        background: rgba(13, 19, 32, 0.85);
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 30px;
        padding: 28px;
        box-shadow: 0 20px 60px rgba(0,0,0,.45);
        backdrop-filter: blur(14px);
        transition: background .4s ease;
      }

      .game-modal.flash {
        animation: flashRed .5s ease;
      }

      @keyframes flashRed {
        0% {
          background: rgba(120,0,0,.85);
        }
        100% {
          background: rgba(13,19,32,.85);
        }
      }

      .play-holder {
        display: flex;
        justify-content: center;
        margin-top: 18px;
      }

      .play-btn {
        padding: 14px 34px;
        border-radius: 999px;
        border: none;
        background: linear-gradient(90deg, #fa0292, #f06161);
        color: white;
        font-family: "Shrikhand", cursive;
        font-size: 20px;
        cursor: pointer;
        animation: pulse 1.2s infinite;
        box-shadow: 0 6px 20px #ff6a0036;
        transition: .25s ease;
      }

      .play-btn:hover {
        transform: scale(1.08);
      }

      @keyframes pulse {
        0% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.08);
        }
        100% {
          transform: scale(1);
        }
      }

      .hangman-area {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        gap: 50px;
        margin-top: 35px;
        flex-wrap: wrap;
      }

      .hangman-box {
        width: 260px;
        height: 360px;
        position: relative;
      }

      .scaffold {
        position: absolute;
        inset: 0;
      }

      .line {
        position: absolute;
        background: #4ea7ff;
        border-radius: 999px;
        opacity: 0;
      }

      .line.show {
        opacity: 1;
      }

      .base {
        width: 150px;
        height: 6px;
        bottom: 0;
        left: 0;
        animation: slideBase .5s forwards;
      }

      .pole {
        width: 6px;
        height: 0;
        bottom: 0;
        left: 0;
        animation: growPole .7s forwards;
        animation-delay: .3s;
      }

      .top {
        width: 0;
        height: 6px;
        top: 0;
        left: 0;
        animation: growTop .5s forwards;
        animation-delay: 1s;
      }

      .rope {
        width: 4px;
        height: 0;
        top: 0;
        left: 146px;
        animation: growRope .4s forwards;
        animation-delay: 1.4s;
      }

      @keyframes slideBase {
        from {
          width: 0;
        }
        to {
          width: 150px;
        }
      }

      @keyframes growPole {
        from {
          height: 0;
        }
        to {
          height: 310px;
        }
      }

      @keyframes growTop {
        from {
          width: 0;
        }
        to {
          width: 150px;
        }
      }

      @keyframes growRope {
        from {
          height: 0;
        }
        to {
          height: 42px;
        }
      }

      .stickman {
        position: absolute;
        top: 42px;
        left: 122px;
      }

      .head {
        width: 42px;
        height: 42px;
        border: 5px solid white;
        border-radius: 50%;
        opacity: 0;
      }

      .torso,
      .arm-left,
      .arm-right,
      .leg-left,
      .leg-right {
        position: absolute;
        background: white;
        border-radius: 999px;
        opacity: 0;
      }

      .torso {
        width: 5px;
        height: 70px;
        left: 18px;
        top: 40px;
      }

      .arm-left {
        width: 45px;
        height: 5px;
        top: 58px;
        left: -18px;
        transform: rotate(-35deg);
      }

      .arm-right {
        width: 45px;
        height: 5px;
        top: 58px;
        left: 15px;
        transform: rotate(35deg);
      }

      .leg-left {
        width: 45px;
        height: 5px;
        top: 118px;
        left: -15px;
        transform: rotate(45deg);
      }

      .leg-right {
        width: 45px;
        height: 5px;
        top: 118px;
        left: 16px;
        transform: rotate(-45deg);
      }

      .part.show {
        opacity: 1;
        transition: opacity .3s ease;
      }

      .word-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 24px;
        flex: 1;
        min-width: 260px;
      }

      .hang-title {
        font-size: clamp(28px, 4vw, 42px);
        text-align: center;
      }

      .question {
        text-align: center;
        line-height: 1.5;
        font-size: 18px;
        opacity: .92;
      }

      .slots {
        display: flex;
        gap: 14px;
        flex-wrap: wrap;
        justify-content: center;
      }

      .slot {
        width: 54px;
        height: 64px;
        border-bottom: 4px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 34px;
        text-transform: uppercase;
        cursor: pointer;
      }

      .mobile-input {
        opacity: 0;
        position: absolute;
        pointer-events: none;
      }

      .used {
        font-size: 14px;
        opacity: .7;
        text-align: center;
        line-height: 1.6;
      }

      .victory {
        position: fixed;
        inset: 0;
        background: rgba(0,0,0,.7);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 999;
        padding: 20px;
      }

      .victory-card {
        background: #111827;
        border-radius: 28px;
        padding: 34px;
        text-align: center;
        max-width: 420px;
        width: 100%;
        border: 1px solid rgba(255,255,255,.08);
        animation: popIn .4s ease;
      }

      @keyframes popIn {
        from {
          transform: scale(.7);
          opacity: 0;
        }
        to {
          transform: scale(1);
          opacity: 1;
        }
      }

      .victory-card h2 {
        font-size: 34px;
        margin-bottom: 12px;
      }

      .victory-card p {
        opacity: .85;
        line-height: 1.6;
        margin-bottom: 20px;
      }

      .stats {
        margin-top: 34px;
        text-align: center;
        opacity: .85;
        line-height: 2;
        font-size: 15px;
      }

      @media (max-width: 768px) {
        .game-modal {
          padding: 22px 16px;
          border-radius: 24px;
        }

        .hangman-area {
          gap: 20px;
        }

        .hangman-box {
          transform: scale(.85);
        }

        .slot {
          width: 46px;
          height: 56px;
          font-size: 28px;
        }

        .play-btn {
          font-size: 18px;
          width: 100%;
          max-width: 280px;
        }

        .btn-home {
          font-size: 14px;
          padding: 10px 18px;
        }
      }
    `}</style>
  </section>
);
