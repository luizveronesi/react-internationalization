const capitalize = (word: string) => {
  if (!word) return '';
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const StringUtils = { capitalize };
export default StringUtils;
