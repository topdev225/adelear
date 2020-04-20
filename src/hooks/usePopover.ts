import { useState } from 'react';

function usePopover() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const openPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  return {
    openPopover,
    closePopover,
    open: Boolean(anchorEl),
    anchorEl
  };
}

export default usePopover;
