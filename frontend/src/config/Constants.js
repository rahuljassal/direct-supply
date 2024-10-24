import priceOptimisation from "../assets/images/priceOptimisation.svg";
import createAndManage from "../assets/images/createAndManage.svg";
export const columns = [
  { id: "", name: "" },
  { id: "name", label: "Product Name", align: "left" },
  { id: "category_name", label: "Category Name", align: "left" },
  {
    id: "cost_price",
    label: "Cost Price",

    format: (value) => `$${value}`,
    align: "left",
  },
  {
    id: "selling_price",
    label: "Selling Price",

    format: (value) => `$${value}`,
    align: "left",
  },
  {
    id: "description",
    label: "Description",
    align: "left",
  },
  {
    id: "stock_available",
    label: "Available Stock",
    align: "left",
  },
  {
    id: "units_sold",
    label: "Units Sold",
    align: "left",
  },
  {
    id: "expected_demand",
    label: "Demand Forecast",
    align: "left",
  },
  {
    id: "optimized_price",
    label: "Optimised Price",
    align: "left",
    format: (value) => `$${value}`,
  },
  {
    id: "action",
    label: "Action",
  },
];
export const constants = {
  productManagerArr: [
    "",
    "name",
    "category_name",
    "description",
    "cost_price",
    "selling_price",
    "stock_available",
    "units_sold",
    "expected_demand",
    "action",
  ],
  priceOptimiserArr: [
    "name",
    "category_name",
    "description",
    "cost_price",
    "selling_price",
    "optimized_price",
  ],
  demandForcastArr: [
    "name",
    "category_name",
    "cost_price",
    "selling_price",
    "stock_available",
    "units_sold",
    "expected_demand",
  ],
};

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "secondary.main",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};
export const cardArr = [
  {
    title: "Create and Manage Product",
    subTitle: `add new products, update existing ones, and organize them into
    categories for better management.`,
    path: "/productmanager",
    img: createAndManage,
  },
  {
    title: "Pricing Optimization",
    subTitle: `Utilize advanced algorithms to determine optimal pricing strategies that maximize revenue and profitability.`,
    path: "/priceoptimiser",
    img: priceOptimisation,
  },
];
