import { useEffect, useRef, useState } from "react";
import { detect, init } from "../utils/utils";
import "./FaceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Detecting...");

  useEffect(() => {
    init({ landmarkerRef, videoRef, streamRef });
    const landmarker = landmarkerRef.current;
    const video = videoRef.current;

    return () => {
      if (landmarker) {
        landmarker.close();
      }

      if (video?.srcObject) {
        video.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  async function handleClick() {
    const nextExpression = detect({ landmarkerRef, videoRef, setExpression });
    onClick(nextExpression);
  }

  return (
    <section className="expression-card">
      <div className="expression-card__head">
        <div>
          <span className="expression-card__eyebrow">Face scanner</span>
          <h2>Capture the mood that is actually showing up right now.</h2>
        </div>
        <div className="expression-card__status">
          <span>Live status</span>
          <strong>{expression}</strong>
        </div>
      </div>

      <div className="expression-card__viewport">
        <video ref={videoRef} playsInline autoPlay muted />
        <div className="expression-card__scanline" />
      </div>

      <div className="expression-card__footer">
        <p>
          The camera feed stays tucked into a glass panel while the expression
          result drives the next track.
        </p>
        <button className="button" onClick={handleClick} type="button">
          Detect expression
        </button>
      </div>
    </section>
  );
}
