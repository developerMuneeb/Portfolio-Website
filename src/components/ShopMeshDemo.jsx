import { useState } from "react";

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="m10 8 6 4-6 4V8Z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="m14 7 5 5-5 5" />
    </svg>
  );
}

export default function ShopMeshDemo({ demo }) {
  const [videoRequested, setVideoRequested] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const showPoster = !videoRequested || videoFailed;

  return (
    <div className="master-demo">
      <div className="master-demo-stage">
        <div className="master-demo-brand">
          <div className="master-demo-identity">
            <img src={demo.logo} alt="" width="48" height="48" />
            <span>
              <strong>{demo.brandName}</strong>
              <small>{demo.brandTagline}</small>
            </span>
          </div>
          <span className="master-demo-status"><i aria-hidden="true"></i>Anonymized demo <b>{demo.duration}</b></span>
        </div>

        <div className="master-demo-device">
          <div className="master-demo-screen">
            {showPoster ? (
              <>
                <img
                  src={demo.poster}
                  alt="ShopMesh AI demo showing the chatbot beside a synchronized WooCommerce cart."
                  loading="lazy"
                  decoding="async"
                  width="1280"
                  height="720"
                />
                <div className="master-demo-play">
                  <button
                    type="button"
                    onClick={() => {
                      setVideoFailed(false);
                      setVideoRequested(true);
                    }}
                  >
                    <PlayIcon />
                    <span>{videoFailed ? "Retry demo" : `Watch ${demo.durationLabel} demo`}</span>
                  </button>
                  {videoFailed ? <p role="status">The video could not load. The project flow remains available below.</p> : null}
                </div>
              </>
            ) : (
              <video
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster={demo.poster}
                aria-label="Anonymized ShopMesh AI demonstration with live chatbot and cart updates"
                onError={() => setVideoFailed(true)}
              >
                <source src={demo.webm} type="video/webm" />
                <source src={demo.mp4} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
            )}
          </div>
        </div>

        <div className="master-demo-copy">
          <div>
            <span className="master-demo-kicker">Real product interaction</span>
            <h4>Watch the conversation update a verified cart.</h4>
            <p>{demo.summary}</p>
          </div>
          <div className="master-demo-proof" aria-label="Demo details">
            <span>Real chatbot + cart</span>
            <span>Client anonymized</span>
            <span>HD 16:9 playback</span>
          </div>
        </div>
      </div>

      <ol className="master-demo-steps" aria-label="How the shopping assistant works">
        {demo.steps.map((step, index) => (
          <li key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <strong>{step.title}</strong>
              <p>{step.note}</p>
            </div>
          </li>
        ))}
      </ol>

      <details className="master-demo-details">
        <summary>
          <span>View technical architecture</span>
          <ArrowIcon />
        </summary>
        <div className="master-demo-architecture">
          <div className="master-demo-route" aria-label={demo.technicalFlow.join(" to ")}>
            {demo.technicalFlow.map((node, index) => (
              <div className="master-demo-route-part" key={node}>
                <span>{node}</span>
                {index < demo.technicalFlow.length - 1 ? <ArrowIcon /> : null}
              </div>
            ))}
          </div>
          <ul>
            {demo.callouts.map((callout) => <li key={callout}>{callout}</li>)}
          </ul>
        </div>
      </details>

      <details className="master-demo-details master-demo-transcript">
        <summary>
          <span>Read demo transcript</span>
          <ArrowIcon />
        </summary>
        <ol>
          {demo.transcript.map((line) => <li key={line}>{line}</li>)}
        </ol>
      </details>
    </div>
  );
}
