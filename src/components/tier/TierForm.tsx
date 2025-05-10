import { useState } from 'react';
import { Card, Button, Input, Spacer } from '@nextui-org/react';

interface TierFormProps {
  onSubmit: (data: { name: string; price: string }) => void;
  loading: boolean;
}

export default function TierForm({ onSubmit, loading }: TierFormProps) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [nameError, setNameError] = useState('');
  const [priceError, setPriceError] = useState('');

  const validateForm = () => {
    let isValid = true;
    
    if (!name.trim()) {
      setNameError('Tier name is required');
      isValid = false;
    } else {
      setNameError('');
    }
    
    if (!price.trim()) {
      setPriceError('Price is required');
      isValid = false;
    } else if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      setPriceError('Price must be a positive number');
      isValid = false;
    } else {
      setPriceError('');
    }
    
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({ name, price });
    }
  };

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <Input
          label="Tier Name"
          placeholder="e.g. Basic, Premium, VIP"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isRequired
          isInvalid={!!nameError}
          errorMessage={nameError}
        />
        
        <Input
          label="Price (USD per month)"
          placeholder="e.g. 5.99"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          startContent={<div className="pointer-events-none flex items-center">$</div>}
          type="number"
          min="0"
          step="0.01"
          isRequired
          isInvalid={!!priceError}
          errorMessage={priceError}
        />
        
        <Spacer y={2} />
        
        <Button
          color="primary"
          size="lg"
          onClick={handleSubmit}
          isLoading={loading}
          className="w-full"
        >
          Create Subscription Tier
        </Button>
      </div>
    </Card>
  );
}
