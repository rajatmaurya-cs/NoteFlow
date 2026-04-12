import React from 'react';
import styled from 'styled-components';

const Night = () => {
  return (
    <StyledWrapper>
      <div className="uiverse-midnight-sky">
        <div className="sky-canvas">
          <div className="stars stars-1" />
          <div className="stars stars-2" />
          <div className="stars stars-3" />
          <div className="meteor m1" />
          <div className="meteor m2" />
          <div className="meteor m3" />
          <div className="moon" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`

  /* 🌙 FULL SCREEN BACKGROUND */
  .uiverse-midnight-sky {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #050505;
    z-index: -10;
  }

  /* Sky layer */
  .sky-canvas {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }

  /* Stars */
  .stars {
    position: absolute;
    inset: 0;
    background-repeat: repeat;
    pointer-events: none;
  }

  .stars-1 {
    background-image:
      radial-gradient(1px 1px at 10% 10%, #fff, transparent),
      radial-gradient(1px 1px at 30% 20%, #fff, transparent),
      radial-gradient(1px 1px at 50% 50%, #fff, transparent),
      radial-gradient(1px 1px at 70% 30%, #fff, transparent),
      radial-gradient(1px 1px at 90% 10%, #fff, transparent);
    background-size: 200px 200px;
    animation: twinkle 3s ease-in-out infinite;
  }

  .stars-2 {
    background-image:
      radial-gradient(1.5px 1.5px at 20% 40%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 60% 85%, #fff, transparent),
      radial-gradient(1.5px 1.5px at 85% 65%, #fff, transparent);
    background-size: 300px 300px;
    animation: twinkle 5s ease-in-out infinite 1s;
  }

  .stars-3 {
    background-image:
      radial-gradient(2px 2px at 40% 70%, #fff, transparent),
      radial-gradient(2px 2px at 10% 80%, #fff, transparent),
      radial-gradient(2px 2px at 80% 40%, #fff, transparent);
    background-size: 400px 400px;
    animation: twinkle 7s ease-in-out infinite 2s;
  }

  /* Meteors */
  .meteor {
    position: absolute;
    width: 2px;
    height: 2px;
    background: #fff;
    border-radius: 50%;
    box-shadow: 0 0 10px 2px rgba(255, 255, 255, 0.5);
    opacity: 0;
    pointer-events: none;
  }

  .meteor::after {
    content: "";
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 1px;
    background: linear-gradient(90deg, #fff, transparent);
  }

  .m1 {
    top: 10%;
    left: 110%;
    animation: shoot 8s linear infinite;
  }

  .m2 {
    top: 30%;
    left: 110%;
    animation: shoot 12s linear infinite 4s;
  }

  .m3 {
    top: 50%;
    left: 110%;
    animation: shoot 10s linear infinite 2s;
  }

  /* Moon */
  .moon {
    position: absolute;
    top: 15%;
    right: 15%;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    box-shadow: 15px 15px 0 0 #fdfbd3;
    filter: drop-shadow(0 0 15px rgba(253, 251, 211, 0.4));
  }

  /* Animations */
  @keyframes twinkle {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  @keyframes shoot {
    0% {
      transform: translateX(0) translateY(0) rotate(-35deg);
      opacity: 0;
    }
    5% {
      opacity: 1;
    }
    15% {
      transform: translateX(-1500px) translateY(1000px) rotate(-35deg);
      opacity: 0;
    }
    100% {
      transform: translateX(-1500px) translateY(1000px) rotate(-35deg);
      opacity: 0;
    }
  }
`;

export default Night;