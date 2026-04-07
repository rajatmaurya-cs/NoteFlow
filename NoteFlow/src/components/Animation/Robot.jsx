import React from 'react';
import styled from 'styled-components';

const Robot = () => {
  return (
    <StyledWrapper>
      <div className="loader">
        <div className="modelViewPort">
          <div className="eva">
            <div className="head">
              <div className="eyeChamber">
                <div className="eye" />
                <div className="eye" />
              </div>
            </div>
            <div className="body">
              <div className="hand" />
              <div className="hand" />
              <div className="scannerThing" />
              <div className="scannerOrigin" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: inline-block; /* Only takes space of robot */
  
  .modelViewPort {
    width: 22rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: linear-gradient(145deg, #0c0c0c, #111);
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.25), inset 0 0 20px #0ff;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .eva {
    --EVA-ROTATION-DURATION: 4s;
    transform-style: preserve-3d;
    animation: rotateRight var(--EVA-ROTATION-DURATION) ease-in-out infinite alternate;
  }

  /* --- Head, eyes, body, hands, scanner same as previous version --- */
  .head {
    position: relative;
    width: 6.5rem;
    height: 4.2rem;
    border-radius: 48% 52% 45% 55% / 78% 79% 22% 23%;
    background: linear-gradient(145deg, #f0f0f0 20%, #888 80%);
    box-shadow: 0 4px 15px rgba(0, 255, 255, 0.3), inset 0 0 10px #0ff;
  }

  .eyeChamber {
    width: 4.8rem;
    height: 2.8rem;
    position: relative;
    left: 50%;
    top: 55%;
    border-radius: 45% 53% 45% 48% / 62% 59% 35% 34%;
    background-color: #001f3f;
    box-shadow: 0 0 3px 2px cyan, inset 0 0 5px #0ff;
    transform: translate(-50%, -50%);
    animation: moveRight var(--EVA-ROTATION-DURATION) ease-in-out infinite alternate;
  }

  .eye {
    width: 1.3rem;
    height: 1.5rem;
    position: absolute;
    border-radius: 50%;
    box-shadow: 0 0 15px #0ff, inset 0 0 5px cyan;
  }

  .eye:first-child {
    left: 12px;
    top: 50%;
    background: repeating-linear-gradient(65deg, #0ff 0px, #0ff 1px, #fff 2px);
    transform: translate(0, -50%) rotate(-65deg);
  }

  .eye:nth-child(2) {
    right: 12px;
    top: 50%;
    background: repeating-linear-gradient(-65deg, #0ff 0px, #0ff 1px, #fff 2px);
    transform: translate(0, -50%) rotate(65deg);
  }

  .body {
    width: 6.5rem;
    height: 8rem;
    margin-top: 0.3rem;
    border-radius: 47% 53% 45% 55% / 12% 9% 90% 88%;
    background: linear-gradient(145deg, #222, #000);
    box-shadow: 0 0 20px #0ff, inset 0 0 10px cyan;
    position: relative;
  }

  .hand {
    position: absolute;
    width: 2rem;
    height: 5.5rem;
    border-radius: 40%;
    background: linear-gradient(to bottom, #0ff, #00bcd4);
    box-shadow: 0 0 10px cyan, 0 5px 20px rgba(0, 255, 255, 0.5);
  }

  .hand:first-child {
    left: -1.5rem;
    top: 0.75rem;
    transform: rotateY(55deg) rotateZ(10deg);
    animation: compensateRotation var(--EVA-ROTATION-DURATION) ease-in-out infinite alternate;
  }

  .hand:nth-child(2) {
    left: 92%;
    top: 0.75rem;
    transform: rotateY(55deg) rotateZ(-10deg);
    animation: compensateRotationRight var(--EVA-ROTATION-DURATION) ease-in-out infinite alternate;
  }

  .scannerThing {
    width: 0;
    height: 0;
    position: absolute;
    left: 60%;
    top: 10%;
    border-top: 180px solid #0ff;
    border-left: 250px solid transparent;
    border-right: 250px solid transparent;
    transform-origin: top left;
    mask: linear-gradient(to right, white, transparent 35%);
    animation: glow 2s cubic-bezier(0.86, 0, 0.07, 1) infinite;
  }

  .scannerOrigin {
    position: absolute;
    width: 10px;
    aspect-ratio: 1;
    border-radius: 50%;
    left: 60%;
    top: 10%;
    background: #0ff;
    box-shadow: 0 0 15px cyan, inset 0 0 5px #0ff;
    animation: moveRight var(--EVA-ROTATION-DURATION) ease-in-out infinite;
  }

  /* --- Keyframes remain the same --- */
  @keyframes rotateRight {
    0% { transform: rotateY(0deg); }
    100% { transform: rotateY(25deg); }
  }
  @keyframes moveRight {
    0% { transform: translate(-50%, -50%); }
    100% { transform: translate(-40%, -50%); }
  }
  @keyframes compensateRotation {
    0% { transform: rotateY(55deg) rotateZ(10deg); }
    100% { transform: rotateY(30deg) rotateZ(10deg); }
  }
  @keyframes compensateRotationRight {
    0% { transform: rotateY(55deg) rotateZ(-10deg); }
    100% { transform: rotateY(70deg) rotateZ(-10deg); }
  }
  @keyframes glow {
    0% { opacity: 0; }
    20% { opacity: 1; transform: rotate(0deg); }
    45% { transform: rotate(-25deg); }
    75% { transform: rotate(5deg); }
    100% { opacity: 0; }
  }
`;

export default Robot;