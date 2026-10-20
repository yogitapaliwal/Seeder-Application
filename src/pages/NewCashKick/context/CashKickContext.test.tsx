import { useContext, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CashKickContext } from '@/pages/NewCashKick/context/CashKickContext';
import { MyContract } from '@/api/contracts/contracts.types';

const contract: MyContract = {
  id: 'c1',
  name: 'Acme Corp',
  status: 'Available',
  type: 'Monthly',
  perPayment: 100,
  totalFinanced: null,
  totalAvailable: 1000,
  termLengthMonths: 12,
  feePercentage: 5,
  paymentAmount: 100,
};

const Consumer = () => {
  const { selectedContracts, setSelectedContracts } = useContext(CashKickContext);

  return (
    <div>
      <span>Count: {selectedContracts.length}</span>
      <button type="button" onClick={() => setSelectedContracts([contract])}>
        Select
      </button>
    </div>
  );
};

describe('CashKickContext', () => {
  it('defaults to an empty selectedContracts array and a no-op setter', () => {
    render(<Consumer />);
    expect(screen.getByText('Count: 0')).toBeInTheDocument();
  });

  it('exposes the value provided by a Provider', () => {
    const ProviderWrapper = () => {
      const [selectedContracts, setSelectedContracts] = useState<MyContract[]>([]);

      return (
        <CashKickContext.Provider value={{ selectedContracts, setSelectedContracts }}>
          <Consumer />
        </CashKickContext.Provider>
      );
    };

    render(<ProviderWrapper />);

    expect(screen.getByText('Count: 0')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Select' }));
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
