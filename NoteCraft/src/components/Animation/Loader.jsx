import React, { useContext } from 'react';
import styled from 'styled-components';
import { ToggleTheme } from '../AuthProvider';

const Loader = ({ size = 16 }) => {
  const { Theme } = useContext(ToggleTheme);
  const isLight = Theme === 'Light';

  return (
    <StyledWrapper $isLight={isLight} $size={size}>
      <div className="cell">
        <div className="card">
          <span className="flower-loader">Loading…</span>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* Pass props as CSS variables */
  --loader-color: ${({ $isLight }) => ($isLight ? '#000' : '#fff')};
  --loader-glow: ${({ $isLight }) => ($isLight ? '#000' : '#fff')};
  --loader-size: ${({ $size }) => $size}px;

  .flower-loader {
    overflow: hidden;
    position: relative;
    text-indent: -9999px;
    display: inline-block;
    margin-left: 30px;
    font-size: var(--loader-size); /* this controls overall scale */
    
    width: 1em; /* 1em = var(--loader-size) */
    height: 1em;
    background: #e96;
    border-radius: 100%;
    
    /* Use em so it scales with font-size. 0.75em = 12px when size is 16px */
    box-shadow: var(--loader-glow) 0 0 0.9375em 0, 
                var(--loader-color) -0.75em -0.75em 0 0.25em,
                var(--loader-color) 0.75em -0.75em 0 0.25em, 
                var(--loader-color) 0.75em 0.75em 0 0.25em, 
                var(--loader-color) -0.75em 0.75em 0 0.25em;
                
    animation: flower-loader 5s infinite ease-in-out;
    transform-origin: 50% 50%;
  }

  @keyframes flower-loader {
    0% {
      transform: rotate(0deg);
      box-shadow: var(--loader-glow) 0 0 0.9375em 0, 
                  var(--loader-color) -0.75em -0.75em 0 0.25em,
                  var(--loader-color) 0.75em -0.75em 0 0.25em, 
                  var(--loader-color) 0.75em 0.75em 0 0.25em, 
                  var(--loader-color) -0.75em 0.75em 0 0.25em;
    }
    50% {
      transform: rotate(1080deg);
      box-shadow: var(--loader-glow) 0 0 0.9375em 0, 
                  var(--loader-color) 0.75em 0.75em 0 0.25em,
                  var(--loader-color) -0.75em 0.75em 0 0.25em, 
                  var(--loader-color) -0.75em -0.75em 0 0.25em, 
                  var(--loader-color) 0.75em -0.75em 0 0.25em;
    }
  }
`;

export default Loader;