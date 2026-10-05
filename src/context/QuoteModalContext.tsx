import React, { createContext, useContext, useState, type ReactNode } from 'react';

export type PlanType = 'starter' | 'standard' | 'custom';

interface QuoteModalContextType {
  isOpen: boolean;
  selectedPlan: PlanType;
  openModal: (plan?: PlanType) => void;
  closeModal: () => void;
  setSelectedPlan: (plan: PlanType) => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export const QuoteModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('standard');

  const openModal = (plan?: PlanType) => {
    if (plan) {
      setSelectedPlan(plan);
    }
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <QuoteModalContext.Provider
      value={{
        isOpen,
        selectedPlan,
        openModal,
        closeModal,
        setSelectedPlan,
      }}
    >
      {children}
    </QuoteModalContext.Provider>
  );
};

export const useQuoteModal = (): QuoteModalContextType => {
  const context = useContext(QuoteModalContext);
  if (!context) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return context;
};
