import React from 'react';

export const PageHeader = ({ title }) => {
  return (
    <h1 className="w-full pt-3 md:pt-4 lg:pt-6 pb-4 md:pb-6 lg:pb-8 font-display uppercase text-3xl md:text-6xl lg:text-9xl border-t-1 border-b-1 border-black flex align-center">
      {title}
    </h1>
  );
};
