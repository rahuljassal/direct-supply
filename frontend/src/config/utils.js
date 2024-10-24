export const validateProductForm = (formData) => {
  const errors = {};

  // Required fields validation
  const requiredFields = {
    category_name: "Category name",
    name: "Product name",
    description: "Description",
    cost_price: "Cost price",
    selling_price: "Selling price",
    stock_available: "Stock available",
    units_sold: "Units sold",
  };

  // Check for missing or empty values
  Object.entries(requiredFields).forEach(([field, label]) => {
    if (!formData[field] && formData[field] !== 0) {
      errors[field] = `${label} is required`;
    }
  });

  // Additional validations
  if (formData.cost_price && formData.cost_price <= 0) {
    errors.cost_price = "Cost price must be greater than 0";
  }

  if (formData.selling_price && formData.selling_price <= 0) {
    errors.selling_price = "Selling price must be greater than 0";
  }

  if (formData.stock_available && formData.stock_available < 0) {
    errors.stock_available = "Stock cannot be negative";
  }

  if (formData.units_sold && formData.units_sold < 0) {
    errors.units_sold = "Units sold cannot be negative";
  }

  // Optional: Validate cost price is less than selling price
  //   if (
  //     formData.cost_price &&
  //     formData.selling_price &&
  //     formData.cost_price >= formData.selling_price
  //   ) {
  //     errors.selling_price = "Selling price must be greater than cost price";
  //   }
  //   if (
  //     formData.stock_available &&
  //     formData.units_sold &&
  //     formData.units_sold > formData.stock_available
  //   ) {
  //     errors.units_sold = "Units sold cannot be greater than Stock";
  //   }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
export const filterColumns = (columns, col, showDemandForecast) => {
  return columns.filter((column) =>
    showDemandForecast
      ? col.includes(column.id)
      : col.includes(column.id) && column.id !== "expected_demand"
  );
};
