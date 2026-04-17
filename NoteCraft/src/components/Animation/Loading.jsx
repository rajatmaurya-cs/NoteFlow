import React from "react";
import styled from "styled-components";

const Loading = () => {
  return (
    <Wrapper>
      <div className="loader">
        <span>loading</span>

        <div className="words">
          <div className="word">
            <img
              src="https://img.icons8.com/3d-fluent/100/chatgpt-2.png"
              alt="OpenAI"
            />
          </div>

          <div className="word">
            <img
              src="https://img.icons8.com/3d-fluency/94/gemini-ai.png"
              alt="Gemini"
            />
          </div>

          <div className="word">
            <img
              src="https://img.icons8.com/fluency/48/microsoft-copilot.png"
              alt="Microsoft Copilot"
            />
          </div>

          <div className="word">
            <img
              src="https://img.icons8.com/3d-fluency/94/deepseek.png"
              alt="Deepseek"
            />
          </div>

          <div className="word">
            <img
              src="https://img.icons8.com/3d-fluency/94/3d-claude-ai-logo.png"
              alt="Claude"
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .loader {
    color: rgb(124, 124, 124);
    font-family: "Poppins", sans-serif;
    font-weight: 600;
    font-size: 42px;   /* Increased loading text size */
    height: 80px;
    display: flex;
    align-items: center;
    gap: 18px;
  }

  .words {
    overflow: hidden;
    position: relative;
    height: 80px; /* Increased container height */
  }

  .word {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    animation: spin 5s infinite;
  }

  .word img {
    width: 65px;   /* Increased icon size */
    height: 65px;
    object-fit: contain;
  }

  @keyframes spin {
    10% {
      transform: translateY(-100%);
    }
    25% {
      transform: translateY(-100%);
    }

    35% {
      transform: translateY(-200%);
    }
    50% {
      transform: translateY(-200%);
    }

    60% {
      transform: translateY(-300%);
    }
    75% {
      transform: translateY(-300%);
    }

    85% {
      transform: translateY(-400%);
    }
    100% {
      transform: translateY(-400%);
    }
  }
`;

export default Loading;