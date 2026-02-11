import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg text-right text-3xl font-mono overflow-hidden">
      {value || '0'}
    </div>
  );
};

export default Display;