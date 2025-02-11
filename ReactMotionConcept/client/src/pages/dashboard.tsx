import React from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import TradingViewWidget from '@/components/trading/TradingViewWidget';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { getStoredUsername } from '@/lib/auth';
import { Button } from '@/components/ui/button';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  position: relative;
`;

const LeftPanel = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 270px;
  height: 100vh;
  background: linear-gradient(155deg, #1e1e1e, #333333);
  padding: 20px;
  box-shadow: 4px 0 6px rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1001;
`;

const MainContent = styled.div`
  flex: 1;
  margin-left: 270px;
  height: 100vh;
  position: relative;
  z-index: 1;
`;

const PanelTitle = styled.h2`
  font-size: 1.5rem;
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  text-transform: uppercase;
  text-shadow: 2px 2px 4px rgba(255, 255, 255, 0.2);
`;

const AccountOption = styled(motion.button)`
  width: 100%;
  padding: 12px 24px;
  margin: 10px 0;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #e60000;
  }
`;

export default function Dashboard() {
  const [, navigate] = useLocation();
  const username = getStoredUsername();

  if (!username) {
    navigate('/');
    return null;
  }

  return (
    <Container>
      <AnimatedBackground />
      <LeftPanel
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 60 }}
      >
        <PanelTitle>Welcome, {username}</PanelTitle>
        <AccountOption
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Dummy Account
        </AccountOption>
        <AccountOption
          as={motion.button}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Real Account
        </AccountOption>
      </LeftPanel>
      <MainContent>
        <TradingViewWidget />
      </MainContent>
    </Container>
  );
}