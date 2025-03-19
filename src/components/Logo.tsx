
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="h-8 w-8 bg-malva-500 rounded-lg flex items-center justify-center shadow-md">
        <span className="text-white font-semibold text-xl">M</span>
      </div>
      <span className="font-display font-semibold text-xl tracking-tight">malva</span>
    </div>
  );
};

export default Logo;
