export const getNextPage = (pageIndex: number, totalPages: number) => {
  const value = pageIndex + 1;
  return value <= totalPages ? value : null;
};

export const getPrevPage = (pageIndex: number, minPage: number) => {
  const value = pageIndex - minPage;
  return value >= minPage ? value : null;
};
