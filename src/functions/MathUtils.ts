const calculatePercent = (value: number, total: number) => {
  return total === 0 ? `${0}%` : ((value / total) * 100).toFixed(2) + '%';
};

const MathUtils = { calculatePercent };
export default MathUtils;
