import React from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import styled, { keyframes } from 'styled-components';
import { AnimatedBackground } from '@/components/layout/AnimatedBackground';
import { InteractiveBackground } from '@/components/layout/InteractiveBackground';
import TradingViewWidget from '@/components/trading/TradingViewWidget';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertUserSchema } from '@shared/schema';
import { loginUser } from '@/lib/auth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

const breatheAnimation = keyframes`
  0% { box-shadow: 0 0 20px rgba(147, 197, 253, 0.2); }
  50% { box-shadow: 0 0 40px rgba(147, 197, 253, 0.4); }
  100% { box-shadow: 0 0 20px rgba(147, 197, 253, 0.2); }
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: rgba(30, 41, 59, 0.7);
  overflow: hidden;
`;

const LoginForm = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 1rem;
  width: 100%;
  max-width: 450px;
  z-index: 2;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.2),
    0 2px 4px -1px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  opacity: 0.3; 
  transition: all 0.3s ease;
  animation: ${breatheAnimation} 4s infinite ease-in-out;

  &:hover {
    opacity: 0.7; 
    transform: translateY(-5px);
  }

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, 
      rgba(147, 197, 253, 0.2),
      rgba(255, 255, 255, 0.2),
      rgba(147, 197, 253, 0.2)
    );
    border-radius: inherit;
    z-index: -1;
    transition: opacity 0.3s ease;
    opacity: 0;
  }

  &:hover::before {
    opacity: 1;
  }
`;

const WidgetWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0.9;
  pointer-events: none;
`;

const NeonTitle = styled(motion.h1)`
  font-size: 2.5rem;
  background: linear-gradient(to right, #fff, #93c5fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 2rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  position: relative;
  animation: ${floatAnimation} 6s infinite ease-in-out;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(147, 197, 253, 0.5), transparent);
  }
`;

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
`;

const StyledInput = styled(Input)`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  height: 3rem;
  padding: 0 1rem;
  width: 100%;
  transition: all 0.3s ease;

  &:focus {
    border-color: rgba(147, 197, 253, 0.5);
    box-shadow: 0 0 0 2px rgba(147, 197, 253, 0.2);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const LoginButton = styled(Button)`
  width: 100%;
  height: 3rem;
  background: linear-gradient(135deg, rgba(147, 197, 253, 0.8), rgba(147, 197, 253, 0.6));
  color: white;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 20px rgba(147, 197, 253, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2), transparent 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover::before {
    opacity: 1;
  }
`;

export default function Login() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      username: '',
      accountType: 'dummy'
    }
  });

  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = async (data: { username: string, accountType: string }) => {
    setIsLoading(true);
    try {
      await loginUser(data.username, data.accountType);
      toast({
        title: "Success!",
        description: "Welcome to the trading platform.",
        duration: 3000,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <Container>
        <AnimatedBackground />
        <InteractiveBackground />
        <WidgetWrapper>
          <TradingViewWidget />
        </WidgetWrapper>
        <LoginForm
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.3, y: 0 }}
          whileHover={{ opacity: 0.7 }}
          transition={{ duration: 0.8 }}
        >
          <NeonTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Trading Login
          </NeonTitle>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <InputWrapper>
                <StyledInput
                  placeholder="Enter username"
                  {...form.register('username')}
                  disabled={isLoading}
                />
              </InputWrapper>
              <LoginButton 
                type="submit" 
                disabled={isLoading}
                className="relative"
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : 'Enter Trading Platform'}
              </LoginButton>
            </form>
          </Form>
        </LoginForm>
      </Container>
    </AnimatePresence>
  );
}