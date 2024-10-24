import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    products: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
        providesTags: ["PRODUCT"],
      }),
    }),
    addProduct: builder.mutation({
      query: (payload) => ({
        url: `/products`,
        method: "POST",
        body: payload,
        invalidatesTags: ["PRODUCT"],
      }),
    }),
    deleteProduct: builder.mutation({
      query: (product_id) => ({
        url: `/products/${product_id}`,
        method: "DELETE",
        invalidatesTags: ["PRODUCT"],
      }),
    }),
    updateProducts: builder.mutation({
      query: (payload) => ({
        url: `/products/bulk-update`,
        method: "PUT",
        body: payload,
        invalidatesTags: ["PRODUCT"],
      }),
    }),
    generateDemandForecast: builder.query({
      query: ({ product_ids }) => ({
        url: `/products/demand-forecast?product_ids=${product_ids}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useProductsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductsMutation,
  useGenerateDemandForecastQuery,
} = productApiSlice;
