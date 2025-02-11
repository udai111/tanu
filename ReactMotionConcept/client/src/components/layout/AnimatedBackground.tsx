import React from 'react';
import styled, { keyframes } from 'styled-components';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    -45deg,
    #2c2c54,
    #474787,
    #3c40c6,
    #0fbcf9
  );
  background-size: 400% 400%;
  animation: ${gradientAnimation} 15s ease infinite;
  opacity: 0.2;
  z-index: 0;
`;

export const AnimatedBackground = () => <Background />;
