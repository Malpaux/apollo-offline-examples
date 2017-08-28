/** Merge prototype and actual data set */
export const mergePrototype = (prototype: { [key: string]: any }, data: { [key: string]: any }) => {
  const result = { ...prototype };

  Object.keys(data).forEach((key) => {
    const value = data[key];
    if (value !== null && value !== undefined) result[key] = value;
  });

  return result;
};
