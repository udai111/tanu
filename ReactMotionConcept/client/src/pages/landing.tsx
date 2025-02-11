import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TradingViewWidget from '@/components/trading/TradingViewWidget';
import { InteractiveBackground } from '@/components/layout/InteractiveBackground';

const shimmer = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { text-shadow: 0 0 10px rgba(147, 197, 253, 0.4), 0 0 20px rgba(147, 197, 253, 0.2); }
  50% { text-shadow: 0 0 20px rgba(147, 197, 253, 0.6), 0 0 40px rgba(147, 197, 253, 0.4); }
  100% { text-shadow: 0 0 10px rgba(147, 197, 253, 0.4), 0 0 20px rgba(147, 197, 253, 0.2); }
`;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: rgb(13, 17, 23);
  color: white;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(13, 17, 23, 0.7),
    rgba(23, 27, 33, 0.65)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

const BrandText = styled(motion.h1)`
  font-size: 5rem;
  font-weight: 800;
  margin-bottom: 3rem;
  color: rgba(255, 255, 255, 0.98);
  text-shadow: 
    0 0 20px rgba(147, 197, 253, 0.4),
    0 0 40px rgba(147, 197, 253, 0.2);
  font-family: "Inter", sans-serif;
  letter-spacing: -0.02em;
  text-align: center;
  position: relative;
  animation: ${glow} 3s ease-in-out infinite;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(147, 197, 253, 0.5),
      transparent
    );
  }

  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 2000px 100%;
  -webkit-background-clip: text;
  animation: ${shimmer} 8s infinite linear;
`;

const SubTitle = styled(motion.span)`
  font-size: 1.75rem;
  font-weight: 500;
  opacity: 0.9;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-top: 1rem;
  background: linear-gradient(90deg, rgba(255,255,255,0.8), rgba(147,197,253,0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${float} 6s ease-in-out infinite;
`;

const EnterButton = styled(motion.button)`
  padding: 1.25rem 3.5rem;
  font-size: 1.25rem;
  color: #fff;
  background: linear-gradient(135deg, 
    rgba(147, 197, 253, 0.15),
    rgba(147, 197, 253, 0.05)
  );
  border: 1px solid rgba(147, 197, 253, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 3px;
  backdrop-filter: blur(10px);
  font-weight: 600;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(147, 197, 253, 0.2),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover {
    background: linear-gradient(135deg,
      rgba(147, 197, 253, 0.25),
      rgba(147, 197, 253, 0.15)
    );
    border-color: rgba(147, 197, 253, 0.3);
    transform: translateY(-2px);
    box-shadow: 
      0 0 20px rgba(147, 197, 253, 0.2),
      0 0 40px rgba(147, 197, 253, 0.1);
  }

  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.1) 0%,
      transparent 50%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    transform: rotate(45deg);
  }

  &:hover::after {
    opacity: 1;
  }
`;

const ParticlesContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 5;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(147, 197, 253, 0.5);
  border-radius: 50%;
`;

export default function Landing() {
  const [, navigate] = useLocation();

  // Generate random floating elements
  const floatingElements = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    scale: Math.random() * 2 + 1,
  }));

  return (
    <Container>
      <InteractiveBackground />
      <TradingViewWidget />
      <ParticlesContainer>
        {floatingElements.map((el) => (
          <FloatingElement
            key={el.id}
            initial={{ x: el.x, y: el.y, scale: el.scale, opacity: 0 }}
            animate={{
              y: [el.y - 100, el.y + 100],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              y: {
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                repeatType: "reverse",
              },
              opacity: {
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </ParticlesContainer>
      <Overlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AnimatePresence>
          <BrandText
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            Gangwar the Market
            <SubTitle>
              by TRG.Fin
            </SubTitle>
          </BrandText>
          <EnterButton
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/login')}
          >
            Enter Platform
          </EnterButton>
        </AnimatePresence>
      </Overlay>
    </Container>
  );
}