import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { insertUserSchema } from '@shared/schema';
import { Form } from '@/components/ui/form';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
  margin-bottom: 1rem;
  text-align: center;
`;

const AccountButton = styled(motion.button)`
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, rgba(255, 77, 77, 0.8), rgba(255, 26, 26, 0.8));
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 77, 77, 1), rgba(255, 26, 26, 1));
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-top: 0.5rem;
`;

interface AccountSelectorProps {
  onSelect: (accountType: string) => void;
  selectedAccount?: string;
}

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  onSelect,
  selectedAccount
}) => {
  const form = useForm({
    resolver: zodResolver(insertUserSchema),
    defaultValues: {
      accountType: selectedAccount || ''
    }
  });

  const handleAccountSelect = (accountType: string) => {
    form.setValue('accountType', accountType);
    onSelect(accountType);
  };

  return (
    <Container
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Title>Select Account Type</Title>
      
      <Form {...form}>
        <form className="space-y-4">
          <AccountButton
            type="button"
            onClick={() => handleAccountSelect('dummy')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedAccount === 'dummy'}
          >
            Dummy Account
          </AccountButton>
          
          <AccountButton
            type="button"
            onClick={() => handleAccountSelect('real')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={selectedAccount === 'real'}
          >
            Real Account
          </AccountButton>
        </form>
      </Form>

      <InfoText>
        {selectedAccount === 'dummy' 
          ? 'Practice with virtual funds'
          : selectedAccount === 'real'
            ? 'Trade with real money'
            : 'Choose an account type to begin'}
      </InfoText>
    </Container>
  );
};

export default AccountSelector;
