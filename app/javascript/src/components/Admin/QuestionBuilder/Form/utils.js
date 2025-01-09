export const getFormattedData = (formData, answerId) => {
  const formattedOptions = formData.options.map((option, index) => ({
    id: index + 1,
    option,
  }));

  return {
    ...formData,
    answerId,
    options: { entries: formattedOptions },
  };
};
