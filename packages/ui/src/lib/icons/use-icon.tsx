import { useContext } from 'react';

import { IconContext } from './icon-provider';

const useIcon = () => {
  const context = useContext(IconContext);
  if (context === undefined) {
    throw new Error('useIcon must be used within a IconProvider');
  }
  return context;
};

export { useIcon };
