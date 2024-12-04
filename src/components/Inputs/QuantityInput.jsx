import React, { useState ,useEffect } from 'react';
import { CircleMinus, PlusCircle } from 'lucide-react'; // Assuming you're using lucide-react
import { InputNumber } from 'antd';

const IngredientQuantity = ({key, name, pricePerMinAmount, minAmount, onQuantityChange }) => {
  const [value, setValue] = useState(0); // initial value (grams)

  const increaseQuantity = () => {
    const newValue = value + minAmount;
    setValue(newValue);
    onQuantityChange(name, newValue); // Notify the parent of the new value
  };

  const decreaseQuantity = () => {
    const newValue = value - minAmount >= 0 ? value - minAmount : 0;
    setValue(newValue);
    onQuantityChange(name, newValue); // Notify the parent of the new value
  };

  return (
    <div className='flex items-center justify-center gap-2'>
      {/* Decrease button */}
      <button onClick={decreaseQuantity}>
        <CircleMinus style={{ fontSize: '24px', color: '#ff1d16' }} />
      </button>

      {/* Customized InputNumber */}
      <InputNumber
        min={0}
        max={1000}
        value={value+' g'}
        readOnly
        style={{
          width: '40%',
          textAlign: 'center',
        }}
      />

      {/* Increase button */}
      <button onClick={increaseQuantity} style={{ border: 'none', background: 'none' }}>
        <PlusCircle style={{ fontSize: '24px', color: '#22c55e' }} />
      </button>
    </div>

  );
};

export default IngredientQuantity;
