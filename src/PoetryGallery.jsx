import { useState, useRef } from "react";

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
  { id: 26, img: "/poems/poem26.png", audio: "/audios/poem26.mp3" },
  { id: 27, img: "/poems/poem27.png", audio: "/audios/poem27.mp3" },
  { id: 28, img: "/poems/poem28.png", audio: "/audios/poem28.mp3" },
  { id: 29, img: "/poems/poem29.png", audio: "/audios/poem29.mp3" },
  { id: 30, img: "/poems/poem30.png", audio: "/audios/poem30.mp3" },
  { id: 1, img: "/poems/poem01.png", audio: "/audios/poem01.mp3" },
  { id: 2, img: "/poems/poem2-5.png", audio: "/audios/poem2-5.mp3" },
  { id: 3, img: "/poems/poem3-5.png", audio: "/audios/poem3-5.mp3" },
  { id: 4, img: "/poems/poem4-5.png", audio: "/audios/poem4-5.mp3" },
  { id: 5, img: "/poems/poem5-5.png", audio: "/audios/poem5-5.mp3" },
  { id: 6, img: "/poems/poem6-5.png", audio: "/audios/poem6-5.mp3" },
  { id: 7, img: "/poems/poem7-5.png", audio: "/audios/poem7-5.mp3" },
  { id: 8, img: "/poems/poem8-5.png", audio: "/audios/poem8-5.mp3" },
  { id: 9, img: "/poems/poem9-5.png", audio: "/audios/poem9-5.mp3" },
  { id: 10, img: "/poems/poem10-5.png", audio: "/audios/poem10-5.mp3" },
  { id: 11, img: "/poems/poem11-5.png", audio: "/audios/poem11-5.mp3" },
  { id: 12, img: "/poems/poem12-5.png", audio: "/audios/poem12-5.mp3" },
  { id: 13-05, img: "/poems/poem13-5.png", audio: "/audios/poem13-5.mp3" },
  { id: 14-05, img: "/poems/poem14-5.png", audio: "/audios/poem14-5.mp3" },
  { id: 15-05, img: "/poems/poem15-5.png", audio: "/audios/poem15-5.mp3" },
  { id: 16-05, img: "/poems/poem16-5.png", audio: "/audios/poem16-5.mp3" },
  { id: 17-05, img: "/poems/poem17-5.png", audio: "/audios/poem17-5.mp3" },
  { id: 18-05, img: "/poems/poem18-5.png", audio: "/audios/poem18-5.mp3" },
  { id: 19-05, img: "/poems/poem19-5.png", audio: "/audios/poem19-5.mp3" },
  { id: 20-05, img: "/poems/poem20-5.png", audio: "/audios/poem20-5.mp3" },
  { id: 21-05, img: "/poems/poem21-5.png", audio: "/audios/poem21-5.mp3" },
  { id: 22-05, img: "/poems/poem22-5.png", audio: "/audios/poem22-5.mp3" },
  { id: 23-05, img: "/poems/poem23-5.png", audio: "/audios/poem23-5.mp3" },
  { id: 24-05, img: "/poems/poem24-5.png", audio: "/audios/poem24-5.mp3" },
{ id: 25-05, img: "/poems/poem25-5.png", audio: "/audios/poem25-5.mp3" },
{ id: 26-05, img: "/poems/poem26-5.png", audio: "/audios/poem26-5.mp3" },
{ id: 27-05, img: "/poems/poem27-5.png", audio: "/audios/poem27-5.mp3" },
{ id: 28-05, img: "/poems/poem28-5.png", audio: "/audios/poem28-5.mp3" },
{ id: 29-05, img: "/poems/poem29-5.png", audio: "/audios/poem29-5.mp3" },
{ id: 30-05, img: "/poems/poem30-5.png", audio: "/audios/poem30-5(2).mp3" },
{ id: 31-05, img: "/poems/poem31-5.png", audio: "/audios/poem31-5.mp3" },

{ id: 01-06, img: "/poems/poem1-6.png", audio: "/audios/poem1-6.mp3" },
{ id: 02-06, img: "/poems/poem2-6.png", audio: "/audios/poem2-6.mp3" },
{ id: 03-06, img: "/poems/poem3-6.png", audio: "/audios/poem3-6.mp3" },
{ id: 04-06, img: "/poems/poem4-6.png", audio: "/audios/poem4-6.mp3" },
{ id: 05-06, img: "/poems/poem5-6.png", audio: "/audios/poem5-6.mp3" },
{ id: 06-06, img: "/poems/poem6-6.png", audio: "/audios/poem6-6.mp3" },
{ id: 07-06, img: "/poems/poem7-6.png", audio: "/audios/poem7-6.mp3" },
{ id: 08-06, img: "/poems/poem8-6.png", audio: "/audios/poem8-6.mp3" },
{ id: 09-06, img: "/poems/poem9-6.png", audio: "/audios/poem9-6.mp3" },
{ id: 10-06, img: "/poems/poem10-6.png", audio: "/audios/poem10-6.mp3" },
{ id: 11-06, img: "/poems/poem11-6.png", audio: "/audios/poem11-6.mp3" },
{ id: 12-06, img: "/poems/poem12-6.png", audio: "/audios/poem12-6.mp3" },
{ id: 13-06, img: "/poems/poem13-6.png", audio: "/audios/poem13-6.mp3" },
{ id: 14-06, img: "/poems/poem14-6.png", audio: "/audios/poem14-6.mp3" },
{ id: 15-06, img: "/poems/poem15-6.png", audio: "/audios/poem15-6.mp3" },
{ id: 16-06, img: "/poems/poem16-6.png", audio: "/audios/poem16-6.mp3" },
{ id: 17-06, img: "/poems/poem17-6.png", audio: "/audios/poem17-6.mp3" },
{ id: 18-06, img: "/poems/poem18-6.png", audio: "/audios/poem18-6.mp3" },
{ id: 19-06, img: "/poems/poem19-6.png", audio: "/audios/poem19-6.mp3" },
{ id: 20-06, img: "/poems/poem20-6.png", audio: "/audios/poem20-6.mp3" },
{ id: 21-06, img: "/poems/poem21-6.png", audio: "/audios/poem21-6.mp3" },
{ id: 22-06, img: "/poems/poem22-6.png", audio: "/audios/poem22-6.mp3" },
{ id: 23-06, img: "/poems/poem23-6.png", audio: "/audios/poem23-6.mp3" },
{ id: 24-06, img: "/poems/poem24-6.png", audio: "/audios/poem24-6.mp3" },
{ id: 25-06, img: "/poems/poem25-6.png", audio: "/audios/poem25-6.mp3" },
{ id: 26-06, img: "/poems/poem26-6.png", audio: "/audios/poem26-6.mp3" },
{ id: 27-06, img: "/poems/poem27-6.png", audio: "/audios/poem27-6.mp3" },
{ id: 28-06, img: "/poems/poem28-6.png", audio: "/audios/poem28-6.mp3" },
{ id: 29-06, img: "/poems/poem29-6.png", audio: "/audios/poem29-6.mp3" },
{ id: 30-06, img: "/poems/poem30-6.png", audio: "/audios/poem30-6.mp3" },
{ id: 1-07, img: "/poems/poem1-7.png", audio: "/audios/poem1-7.mp3" },
{ id: 2-07, img: "/poems/poem2-7.png", audio: "/audios/poem2-7.mp3" },
{ id: 3-07, img: "/poems/poem3-7.png", audio: "/audios/poem3-7.mp3" },
{ id: 4-07, img: "/poems/poem4-7.png", audio: "/audios/poem4-7.mp3" },
{ id: 5-07, img: "/poems/poem5-7.png", audio: "/audios/poem5-7.mp3" },
{ id: 6-07, img: "/poems/poem6-7.png", audio: "/audios/poem6-7.mp3" },
{ id: 7-07, img: "/poems/poem7-7.png", audio: "/audios/poem7-7.mp3" },
{ id: 8-07, img: "/poems/poem8-7.png", audio: "/audios/poem8-7.mp3" },
{ id: 9-07, img: "/poems/poem9-7.png", audio: "/audios/poem9-7.mp3" },
{ id: 10-7, img: "/poems/poem10-7.png", audio: "/audios/poem10-7.mp3" },
{ id: 11-7, img: "/poems/poem11-7.png", audio: "/audios/poem11-7.mp3" },
{ id: 12-7, img: "/poems/poem12-7.png", audio: "/audios/poem12-7.mp3" },
{ id: 13-7, img: "/poems/poem13-7.png", audio: "/audios/poem13-7.mp3" },
{ id: 14-7, img: "/poems/poem14-7.png", audio: "/audios/poem14-7.mp3" },
{ id: 15-7, img: "/poems/poem15-7.png", audio: "/audios/poem15-7.mp3" },
{ id: 16-7, img: "/poems/poem16-7.png", audio: "/audios/poem16-7.mp3" },
{ id: 17-7, img: "/poems/poem17-7.png", audio: "/audios/poem17-7.mp3" },
{ id: 18-7, img: "/poems/poem18-7.png", audio: "/audios/poem18-7.mp3" },
{ id: 19-7, img: "/poems/poem19-7.png", audio: "/audios/poem19-7.mp3" },
{ id: 20-7, img: "/poems/poem20-7.png", audio: "/audios/poem20-7.mp3" },
{ id: "21-7", img: "/poems/poem21-7.png", audio: "/audios/poem21-7.mp3" },
{ id: "22-7", img: "/poems/poem22-7.png", audio: "/audios/poem22-7.mp3" },
{ id: "23-7", img: "/poems/poem23-7.png", audio: "/audios/poem23-7.mp3" },
{ id: "24-7", img: "/poems/poem24-7.png", audio: "/audios/poem24-7.mp3" },
{ id: "25-7", img: "/poems/poem25-7.png", audio: "/audios/poem25-7.mp3" },
{ id: "26-7", img: "/poems/poem26-7.png", audio: "/audios/poem26-7.mp3" },
/*{ id: "27-7", img: "/poems/poem27-7.png", audio: "/audios/poem27-7.mp3" },*/
/*{ id: "28-7", img: "/poems/poem28-7.png", audio: "/audios/poem28-7.mp3" },*/
/*{ id: "29-7", img: "/poems/poem29-7.png", audio: "/audios/poem29-7.mp3" },*/
/*{ id: "30-7", img: "/poems/poem30-7.png", audio: "/audios/poem30-7.mp3" },*/
/*{ id: "31-7", img: "/poems/poem31-7.png", audio: "/audios/poem31-7.mp3" },*/

/*{ id: "1-8", img: "/poems/poem1-8.png", audio: "/audios/poem1-8.mp3" },*/
/*{ id: "2-8", img: "/poems/poem2-8.png", audio: "/audios/poem2-8.mp3" },*/
/*{ id: "3-8", img: "/poems/poem3-8.png", audio: "/audios/poem3-8.mp3" },*/
/*{ id: "4-8", img: "/poems/poem4-8.png", audio: "/audios/poem4-8.mp3" },*/
/*{ id: "5-8", img: "/poems/poem5-8.png", audio: "/audios/poem5-8.mp3" },*/
/*{ id: "6-8", img: "/poems/poem6-8.png", audio: "/audios/poem6-8.mp3" },*/
/*{ id: "7-8", img: "/poems/poem7-8.png", audio: "/audios/poem7-8.mp3" },*/
/*{ id: "8-8", img: "/poems/poem8-8.png", audio: "/audios/poem8-8.mp3" },*/
/*{ id: "9-8", img: "/poems/poem9-8.png", audio: "/audios/poem9-8.mp3" },*/
/*{ id: "10-8", img: "/poems/poem10-8.png", audio: "/audios/poem10-8.mp3" },*/
  
];

export default function PoetryGallery() {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(null);
  const [currentAudio, setCurrentAudio] = useState(null);

  const startX = useRef(0);
  const endX = useRef(0);

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

  const goToNewest = () => {
    setIndex(poems.length - 1);
  };

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    endX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = startX.current - endX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && index < poems.length - 1) {
        setIndex((i) => i + 1);
      } else if (diff < 0 && index > 0) {
        setIndex((i) => i - 1);
      }

      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        setPlaying(null);
      }
    }
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
        <div
          className="frame"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
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
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "center", gap: "12px" }}>
        <button
          onClick={() => playAudio(current.audio, current.id)}
          className={`play-btn ${playing === current.id ? "playing" : ""}`}
        >
          Listen
        </button>

        <button
          onClick={goToNewest}
          className="play-btn"
        >
          Newest
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
