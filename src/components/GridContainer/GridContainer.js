import React from 'react';

export const GridContainer = ({
  children,
  classes,
  gapx = 'gap-x-2.5',
  gapxmd = 'md:gap-x-5',
}) => {
  return (
    <div
      className={`w-full h-full grid grid-cols-6 md:grid-cols-12 ${gapx} ${gapxmd} ${classes}`}
    >
      {children}
    </div>
  );
};
