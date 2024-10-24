import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Line,
} from "recharts";
import { getSelectedProducts } from "../../redux/slices/selectionsSlice";
import { useSelector } from "react-redux";
import { useGenerateDemandForecastQuery } from "../../services/productsApiSlice";

const PriceDemandChart = () => {
  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#ff0000"];
  const selectedProducts = useSelector(getSelectedProducts);
  const { data, isLoading, isError, isFetching } =
    useGenerateDemandForecastQuery({
      product_ids: selectedProducts,
    });
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded shadow-lg">
          <p className="font-medium text-gray-900">{point.productName}</p>
          <p className="text-gray-600">Demand: {point.demand} units</p>
          <p className="text-gray-600">Price: ${point.price}</p>
        </div>
      );
    }
    return null;
  };
  let chartData = [];

  // Prepare data for the chart
  if (!(isLoading || isError || isFetching)) {
    chartData = Object.values(data).map((product, index) => ({
      name: product.product_name,
      data: product.forecast_points.map((point) => ({
        ...point,
        productName: product.product_name,
      })),
      color: colors[index % colors.length],
    }));
  }

  return (
    <Box height={"100%"}>
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{
            top: 20,
            right: 30,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            type="number"
            dataKey="demand"
            name="Demand"
            domain={[70, 100]}
            label={{ value: "Demand (Units)", position: "top" }}
          />
          <YAxis
            type="number"
            dataKey="price"
            name="Price"
            label={{ value: "Price ($)", angle: -90, position: "left" }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          {chartData.map((product, index) => (
            <Scatter
              key={product.name}
              name={product.name}
              data={product.data}
              fill={product.color}
              line
              lineType="fitting"
              shape="circle"
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PriceDemandChart;
