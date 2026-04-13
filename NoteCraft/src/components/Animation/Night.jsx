import React, { useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';

const twinkle1 = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.15; transform: scale(0.5); }
`;
const twinkle2 = keyframes`
  0%, 100% { opacity: 0.8; transform: scale(1); }
  33%      { opacity: 0.1; transform: scale(0.5); }
  66%      { opacity: 0.9; }
`;
const twinkle3 = keyframes`
  0%, 100% { opacity: 0.6; }
  25%      { opacity: 1; transform: scale(1.4); }
  75%      { opacity: 0.2; }
`;
const moonFloat = keyframes`
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
`;
const moonPulse = keyframes`
  0%, 100% {
    filter: drop-shadow(0 0 18px #fdfbd3) drop-shadow(0 0 40px rgba(253,251,200,0.25));
  }
  50% {
    filter: drop-shadow(0 0 32px #fdfbd3) drop-shadow(0 0 80px rgba(253,251,200,0.55));
  }
`;
const aurora1 = keyframes`
  0%, 100% { opacity: 0.07; transform: scaleX(1) skewX(0deg); }
  50%      { opacity: 0.20; transform: scaleX(1.15) skewX(6deg); }
`;
const aurora2 = keyframes`
  0%, 100% { opacity: 0.05; transform: scaleX(1) skewX(0deg); }
  40%      { opacity: 0.15; transform: scaleX(0.9) skewX(-8deg); }
`;
const shoot = keyframes`
  0%   { transform: translateX(0) translateY(0) rotate(-35deg); opacity: 0; }
  3%   { opacity: 1; }
  18%  { transform: translateX(-1700px) translateY(950px) rotate(-35deg); opacity: 0; }
  100% { transform: translateX(-1700px) translateY(950px) rotate(-35deg); opacity: 0; }
`;
const nebulaPulse = keyframes`
  0%, 100% { opacity: 0.06; transform: scale(1); }
  50%      { opacity: 0.14; transform: scale(1.06); }
`;

/* ─── styled components ─── */

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: radial-gradient(
    ellipse at 50% 0%,
    #0a0520 0%,
    #030210 40%,
    #000005 100%
  );
  z-index: -10;
`;

const Aurora = styled.div`
  position: absolute;
  top: 0;
  border-radius: 0 0 60% 60%;
`;

const Aurora1 = styled(Aurora)`
  left: -10%;
  width: 120%;
  height: 45%;
  background: linear-gradient(180deg, rgba(60,20,120,0.22) 0%, transparent 100%);
  animation: ${aurora1} 9s ease-in-out infinite;
`;

const Aurora2 = styled(Aurora)`
  left: -5%;
  width: 110%;
  height: 35%;
  border-radius: 0 0 70% 40%;
  background: linear-gradient(180deg, rgba(20,80,100,0.15) 0%, transparent 100%);
  animation: ${aurora2} 13s ease-in-out infinite 2s;
`;

const Nebula = styled.div`
  position: absolute;
  border-radius: 50%;
  animation: ${nebulaPulse} ${({ dur }) => dur || '11s'} ease-in-out infinite
    ${({ delay }) => delay || '0s'};
`;

const MoonWrap = styled.div`
  position: absolute;
  top: 10%;
  right: 12%;
  animation:
    ${moonFloat} 7s ease-in-out infinite,
    ${moonPulse}  4s ease-in-out infinite;
`;

const MoonShape = styled.div`
  width: 76px;
  height: 76px;
  border-radius: 50%;
  background: transparent;
  box-shadow: 16px 16px 0 0 #fdfbd3;
`;

const MoonSheen = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 65% 35%, rgba(253,251,211,0.08), transparent 60%);
`;

const StarLayer = styled.div`
  position: absolute;
  inset: 0;
`;

/* individual star uses CSS variables injected via style prop */
const Star = styled.div`
  position: absolute;
  border-radius: 50%;
  animation-name: ${({ anim }) =>
    anim === 1 ? twinkle1 : anim === 2 ? twinkle2 : twinkle3};
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  animation-duration: var(--dur);
  animation-delay: var(--del);
`;

const Meteor = styled.div`
  position: absolute;
  width: 2px;
  height: 2px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 6px 2px rgba(255,255,255,0.6);
  opacity: 0;
  pointer-events: none;
  animation: ${shoot} var(--speed) linear infinite var(--delay);

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 130px;
    height: 1px;
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.9),
      rgba(200,220,255,0.3),
      transparent
    );
  }
`;

/* ─── meteor config ─── */
const METEORS = [
  { top: '4%',  left: '105%', speed: '7s',   delay: '0s'   },
  { top: '14%', left: '108%', speed: '10s',  delay: '1.5s' },
  { top: '27%', left: '106%', speed: '8s',   delay: '3s'   },
  { top: '39%', left: '110%', speed: '13s',  delay: '0.5s' },
  { top: '54%', left: '107%', speed: '9s',   delay: '5s'   },
  { top: '7%',  left: '103%', speed: '11s',  delay: '2s'   },
  { top: '32%', left: '105%', speed: '6.5s', delay: '7s'   },
  { top: '61%', left: '109%', speed: '14s',  delay: '4s'   },
  { top: '19%', left: '112%', speed: '8.5s', delay: '6s'   },
  { top: '47%', left: '104%', speed: '12s',  delay: '8.5s' },
];

/* ─── star generation ─── */
const STAR_COLORS = ['#ffffff','#ccd8ff','#ffeedd','#ddf0ff','#ffeecc'];
const STAR_CONFIGS = [
  { count: 100, minS: 1,   maxS: 1.5, minDur: 2.5, maxDur: 4.5, minDel: 0, maxDel: 5, anim: 1 },
  { count: 65,  minS: 1.5, maxS: 2.2, minDur: 4,   maxDur: 7,   minDel: 0, maxDel: 6, anim: 2 },
  { count: 40,  minS: 2.2, maxS: 3.2, minDur: 6,   maxDur: 10,  minDel: 0, maxDel: 8, anim: 3 },
];

function generateStars() {
  const stars = [];
  STAR_CONFIGS.forEach(cfg => {
    for (let i = 0; i < cfg.count; i++) {
      const x   = (Math.random() * 99).toFixed(1);
      const y   = (Math.random() * 90).toFixed(1);
      const s   = (cfg.minS + Math.random() * (cfg.maxS - cfg.minS)).toFixed(1);
      const dur = (cfg.minDur + Math.random() * (cfg.maxDur - cfg.minDur)).toFixed(2);
      const del = (cfg.minDel + Math.random() * (cfg.maxDel - cfg.minDel)).toFixed(2);
      const col = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
      stars.push({ x, y, s, dur, del, col, anim: cfg.anim, id: `${cfg.anim}-${i}` });
    }
  });
  return stars;
}

/* ─── component ─── */
const Night = () => {
  const starsRef = useRef(generateStars());

  return (
    <Wrapper>
      {/* Aurora */}
      <Aurora1 />
      <Aurora2 />

      {/* Nebulae */}
      <Nebula
        style={{
          top: '8%', left: '5%', width: '240px', height: '90px',
          background: 'radial-gradient(ellipse, rgba(80,40,160,0.18), transparent 70%)',
        }}
        dur="11s"
        delay="0s"
      />
      <Nebula
        style={{
          top: '22%', right: '18%', width: '190px', height: '65px',
          background: 'radial-gradient(ellipse, rgba(20,80,130,0.14), transparent 70%)',
        }}
        dur="8s"
        delay="3s"
      />
      <Nebula
        style={{
          top: '57%', left: '38%', width: '270px', height: '75px',
          background: 'radial-gradient(ellipse, rgba(60,20,100,0.10), transparent 70%)',
        }}
        dur="15s"
        delay="1s"
      />
      <Nebula
        style={{
          top: '70%', left: '10%', width: '200px', height: '60px',
          background: 'radial-gradient(ellipse, rgba(30,60,120,0.10), transparent 70%)',
        }}
        dur="12s"
        delay="5s"
      />

      {/* Moon */}
      <MoonWrap>
        <MoonShape />
        <MoonSheen />
      </MoonWrap>

      {/* Stars */}
      <StarLayer>
        {starsRef.current.map(star => (
          <Star
            key={star.id}
            anim={star.anim}
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.s}px`,
              height: `${star.s}px`,
              background: star.col,
              '--dur': `${star.dur}s`,
              '--del': `${star.del}s`,
            }}
          />
        ))}
      </StarLayer>

      {/* Meteors */}
      {METEORS.map((m, i) => (
        <Meteor
          key={i}
          style={{
            top: m.top,
            left: m.left,
            '--speed': m.speed,
            '--delay': m.delay,
          }}
        />
      ))}
    </Wrapper>
  );
};

export default Night;