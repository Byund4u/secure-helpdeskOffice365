export const getProgress = () => {
  return [
    `Billing`,
    `Card`,
    `Email`,
    ...(process.env.NEXT_PUBLIC_DOCS_PAGE === `ON` ? [`Document`] : []),
    `Confirmation`, // don't move this, Confirmation needs to come last
  ];
};
