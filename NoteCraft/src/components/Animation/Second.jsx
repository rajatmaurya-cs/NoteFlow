import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToggleTheme } from '../AuthProvider';

const Second = () => {
  const { Theme } = useContext(ToggleTheme);

  return (
    <StyledWrapper $themeMode={Theme}>
      <div className="loader-container">
        <div className="loader">

          {/* SVG 1 */}
          <svg id="pegtopone" viewBox="0 0 100 100">
            <g>
              <path
                d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
                fill="currentColor"
              />
            </g>
          </svg>

          {/* SVG 2 */}
          <svg id="pegtoptwo" viewBox="0 0 100 100">
            <g>
              <path
                d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
                fill="currentColor"
              />
            </g>
          </svg>

          {/* SVG 3 */}
          <svg id="pegtopthree" viewBox="0 0 100 100">
            <g>
              <path
                d="M63,37c-6.7-4-4-27-13-27s-6.3,23-13,27-27,4-27,13,20.3,9,27,13,4,27,13,27,6.3-23,13-27,27-4,27-13-20.3-9-27-13Z"
                fill="currentColor"
              />
            </g>
          </svg>

        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 9999;
  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $themeMode }) =>
    $themeMode === "Light"
      ? "bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200"
      : ""};



  .loader-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loader {
    --fill-color: ${({ $themeMode }) =>
      $themeMode === "Light" ? "#000000" : "#ffffff"};

    position: relative;

    /* BIG PROFESSIONAL SCALE */
    transform: scale(2);

    width: 120px;
    height: 120px;
  }

  .loader svg {
    position: absolute;
  }

  .loader #pegtopone {
    animation: flowe-one 1s linear infinite;
  }

  .loader #pegtoptwo {
    opacity: 0;
    transform: scale(0) translateY(-200px) translateX(-100px);
    animation: flowe-two 1s linear infinite;
    animation-delay: 0.3s;
  }

  .loader #pegtopthree {
    opacity: 0;
    transform: scale(0) translateY(-200px) translateX(100px);
    animation: flowe-three 1s linear infinite;
    animation-delay: 0.6s;
  }

  .loader svg g path {
    fill: var(--fill-color);
  }

  /* ANIMATIONS (UNCHANGED) */
  @keyframes flowe-one {
    0% {
      transform: scale(0.5) translateY(-200px);
      opacity: 0;
    }
    50% {
      transform: scale(1) translateY(0px);
      opacity: 1;
    }
    100% {
      transform: scale(0) translateY(100px);
      opacity: 0;
    }
  }

  @keyframes flowe-two {
    0% {
      transform: scale(0.5) rotateZ(-10deg) translateY(-200px) translateX(-100px);
      opacity: 0;
    }
    50% {
      transform: scale(1) rotateZ(0deg) translateY(0px) translateX(-25px);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotateZ(10deg) translateY(100px) translateX(25px);
      opacity: 0;
    }
  }

  @keyframes flowe-three {
    0% {
      transform: scale(0.5) rotateZ(10deg) translateY(-200px) translateX(100px);
      opacity: 0;
    }
    50% {
      transform: scale(1) rotateZ(0deg) translateY(0px) translateX(25px);
      opacity: 1;
    }
    100% {
      transform: scale(0) rotateZ(-10deg) translateY(100px) translateX(-25px);
      opacity: 0;
    }
  }
`;

export default Second;

