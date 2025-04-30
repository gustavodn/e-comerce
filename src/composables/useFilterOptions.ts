export function useFilterOptions() {
  const fetchCategories = async () => {
    // Simulate fetching categories from an API
    return [
      { uuid: '1', name: 'Electronics' },
      { uuid: '2', name: 'Clothing' },
      { uuid: '3', name: 'Home Appliances' },
    ];
  };

  const fetchBrands = async () => {
    // Simulate fetching brands from an API
    return [
      { uuid: '1', name: 'Brand A' },
      { uuid: '2', name: 'Brand B' },
      { uuid: '3', name: 'Brand C' },
    ];
  };

  const fetchColors = async () => {
    // Simulate fetching colors from an API
    return [
      { uuid: '1', name: 'Red' },
      { uuid: '2', name: 'Blue' },
      { uuid: '3', name: 'Green' },
    ];
  };

  return {
    fetchCategories,
    fetchBrands,
    fetchColors,
  };
}