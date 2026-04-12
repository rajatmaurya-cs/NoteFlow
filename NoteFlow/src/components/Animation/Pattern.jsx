import React from 'react';
import styled from 'styled-components';

const Pattern = () => {
  return (
    <StyledWrapper>
      <div className="main">
        <div className="up">
          <div className="loaders">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="loader" />
            ))}
          </div>

          <div className="loadersB">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="loaderA">
                <div className={`ball${i}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: absolute;   /* 🔥 make it background */
  inset: 0;             /* full screen */
  width: 100%;
  height: 100%;
  z-index: -10;
  pointer-events: none; /* 🔥 allow clicks through */

  .main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .up {
    position: relative; /* 🔥 anchor for absolute children */
  }

  .loaders,
  .loadersB {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    position: absolute;
    width: 1.15em;
    height: 13em;
    border-radius: 50px;
    background: #e0e0e0;
  }

  .loader:after,
  .loader::before {
    content: "";
    position: absolute;
    width: 1.15em;
    border-radius: 50px;
    background: #e0e0e0;
    border: 1px solid #e2e2e2;
  }

  .loader:after {
    top: 0;
    height: 5em;
  }

  .loader::before {
    bottom: 0;
    height: 4.5em;
  }

  .loaderA {
    position: absolute;
    width: 1.15em;
    height: 13em;
  }

  .ball0, .ball1, .ball2, .ball3, .ball4,
  .ball5, .ball6, .ball7, .ball8 {
    width: 1.15em;
    height: 1.15em;
    border-radius: 50%;
    background: #e8e8e8;
    animation: move 3.63s ease-in-out infinite;
  }

  /* rotation */
  ${[...Array(9)].map((_, i) => `
    .loader:nth-child(${i + 1}),
    .loaderA:nth-child(${i + 1}) {
      transform: rotate(${i * 20}deg);
    }
  `).join('')}

  /* delays */
  ${[...Array(9)].map((_, i) => `
    .ball${i} {
      animation-delay: ${i * 0.2}s;
    }
  `).join('')}

  @keyframes move {
    0% { transform: translateY(0); }
    50% { transform: translateY(12em); }
    100% { transform: translateY(0); }
  }
`;

export default Pattern;