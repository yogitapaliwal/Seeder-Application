const getFormattedDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  });
};

export { getFormattedDate };
