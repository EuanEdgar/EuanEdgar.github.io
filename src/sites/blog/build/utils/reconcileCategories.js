const reconcileCategories = ({
  categoryData,
  categoryNames,
}) => (
  categoryNames.map((name) => {
    const associatedData = categoryData.find(({ name: cName }) => name === cName);

    if (associatedData) {
      return associatedData;
    }
    return {
      name,
    };
  })
);

module.exports = reconcileCategories;
