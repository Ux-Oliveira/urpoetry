import { useState } from "react";

const poems = [
  { id: 13, img: "/poems/poem13.png", audio: "/audios/poem13.mp3" },
  { id: 14, img: "/poems/poem14.png", audio: "/audios/poem14.mp3" },
  { id: 15, img: "/poems/poem15.png", audio: "/audios/poem15.mp3" },
  { id: 16, img: "/poems/poem16.png", audio: "/audios/poem16.mp3" },
  { id: 17, img: "/poems/poem17.png", audio: "/audios/poem17.mp3" },
  { id: 18, img: "/poems/poem18.png", audio: "/audios/poem18.mp3" },
  { id: 19, img: "/poems/poem19.png", audio: "/audios/poem19(2).mp3" },
  { id: 20, img: "/poems/poem20.png", audio: "/audios/poem20.mp3" },
  { id: 21, img: "/poems/poem21.png", audio: "/audios/poem21.mp3" },
  { id: 22, img: "/poems/poem22.png", audio: "/audios/poem22.mp3" },
  { id: 23, img: "/poems/poem23.png", audio: "/audios/poem23.mp3" },
  { id: 24, img: "/poems/poem24.png", audio: "/audios/poem24.mp3" },
  { id: 25, img: "/poems/poem25.png", audio: "/audios/poem25.mp3" },
  { id: 25, img: "/poems/poem26.png", audio: "/audios/poem26.mp3" },
  { id: 25, img: "/poems/poem27.png", audio: "/audios/poem27.mp3" },
  { id: 25, img: "/poems/poem28.png", audio: "/audios/poem28.mp3" }
];

export default function PoetryGallery() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  const current = poems[index];

  const playAudio = (audioSrc, id) => {
    if (currentAudio && playing === id && !currentAudio.paused) {
      currentAudio.pause();
      setPlaying(null);
      return;
    }

    if (currentAudio && playing === id && currentAudio.paused) {
      currentAudio.currentTime = 0;
      currentAudio.play();
      setPlaying(id);
      return;
    }

    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    const audio = new Audio(audioSrc);
    setCurrentAudio(audio);
    setPlaying(id);

    audio.play();

    audio.onended = () => {
      setPlaying(null);
    };
  };

  const downloadImage = (src) => {
    const a = document.createElement("a");
    a.href = src;
    a.download = src.split("/").pop();
    a.click();
  };

  return (
    <div style={{ textAlign: "center" }}>
      
      {/* Slider */}
      <div className="slider">
        
        {/* LEFT */}
        <button
          onClick={() => setIndex(i => Math.max(0, i - 1))}
          className="arrow"
          style={{ visibility: index === 0 ? "hidden" : "visible" }}
        >
          ◀
        </button>

        {/* IMAGE FRAME */}
        <div className="frame">
          <img
            key={current.img}
            src={current.img}
            onClick={() => downloadImage(current.img)}
            className="poem-img"
          />
        </div>

        {/* RIGHT */}
        <button
          onClick={() => setIndex(i => Math.min(poems.length - 1, i + 1))}
          className="arrow"
          style={{ visibility: index === poems.length - 1 ? "hidden" : "visible" }}
        >
          ▶
        </button>
      </div>

      {/* AUDIO BUTTON */}
      <div style={{ marginTop: "16px" }}>
        <button
          onClick={() => playAudio(current.audio, current.id)}
          className={`play-btn ${playing === current.id ? "playing" : ""}`}
        >
          Listen
        </button>
      </div>

      {/* STYLES */}
     <style>{`
  .slider {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .arrow {
    width: 40px;
    height: 40px;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #111;
    opacity: 0.6;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .arrow:hover {
    opacity: 1;
    transform: scale(1.1);
  }

  .frame {
    width: min(90vw, 320px); 
    aspect-ratio: 446 / 678;

    border-radius: 18px;
    overflow: hidden;

    background: #262626;

    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .poem-img {
    width: 100%;
    height: 100%;

    object-fit: contain;
    object-position: center;

    transform: scale(1.35);
    transform-origin: center;

    cursor: pointer;
  }

  .play-btn {
    padding: 12px 26px;
    border-radius: 999px;
    border: none;

    background: linear-gradient(90deg, #fa0292, #f06161);

    color: var(--text);
    font-family: "Shrikhand", cursive;
    font-size: 18px;

    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    box-shadow: 0 6px 20px #ff6a0036;
  }

  .play-btn:hover {
    transform: scale(1.08);
  }

  .play-btn.playing {
    animation: pulse 1s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
  }
`}</style>
    </div>
  );
}
