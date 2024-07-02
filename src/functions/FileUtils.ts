const readContent = (file: File, onReturn: (content: string) => void) => {
  if (!file) return {};
  const reader = new FileReader();

  reader.onload = (e: any) => {
    try {
      onReturn(e.target.result);
    } catch (error) {
      console.error('Error parsing JSON file:', error);
    }
  };
  reader.readAsText(file);
};

const FileUtils = {
  readContent,
};

export default FileUtils;
