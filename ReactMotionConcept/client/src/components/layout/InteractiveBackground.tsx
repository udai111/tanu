import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import styled from 'styled-components';

const BackgroundContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;

const GlowingOrb = styled(motion.div)`
  position: absolute;
  width: 800px;
  height: 800px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(147, 197, 253, 0.15) 0%,
    rgba(147, 197, 253, 0.05) 40%,
    transparent 70%
  );
  pointer-events: none;
  mix-blend-mode: screen;
`;

const ParticleEffect = styled(motion.div)`
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(147, 197, 253, 0.3);
  border-radius: 50%;
`;

export const InteractiveBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const controls = useAnimation();

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    }));
    setParticles(initialParticles);

    // Animate background gradient
    controls.start({
      background: [
        'radial-gradient(circle at 30% 30%, rgba(147, 197, 253, 0.05), transparent 60%)',
        'radial-gradient(circle at 70% 70%, rgba(147, 197, 253, 0.05), transparent 60%)',
        'radial-gradient(circle at 30% 70%, rgba(147, 197, 253, 0.05), transparent 60%)',
        'radial-gradient(circle at 70% 30%, rgba(147, 197, 253, 0.05), transparent 60%)',
      ],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      },
    });
  }, [controls]);

  const handleMouseMove = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX - 400, // Center the orb on cursor
      y: event.clientY - 400,
    });
  };

  return (
    <BackgroundContainer 
      onMouseMove={handleMouseMove}
      animate={controls}
    >
      <GlowingOrb
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          x: {
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: 0.5,
          },
          y: {
            type: "spring",
            stiffness: 50,
            damping: 30,
            mass: 0.5,
          },
          scale: {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
          },
          opacity: {
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
          },
        }}
      />
      {particles.map((particle) => (
        <ParticleEffect
          key={particle.id}
          initial={{ x: particle.x, y: particle.y, opacity: 0 }}
          animate={{
            y: [particle.y, particle.y - 200],
            opacity: [0, 1, 0],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </BackgroundContainer>
  );
};