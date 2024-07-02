const attachCloseToEscape = (handleClose?: () => void) => {
  const closeOnEscape = (e: any) => {
    if (e.keyCode === 27 && handleClose) handleClose();
  };

  window.addEventListener('keydown', closeOnEscape);
  return () => window.removeEventListener('keydown', closeOnEscape);
};

const UsabilityUtils = {
  attachCloseToEscape,
};

export default UsabilityUtils;
