def generate_demand_forecast(product):
    """Generate demand forecast for a product."""
    price_range = range(
        int(product.cost_price),
        int(product.selling_price * 1.5),
        max(1, int((product.selling_price - product.cost_price) / 10)),
    )

    return {
        "product_id": product.id,
        "product_name": product.name,
        "forecast_points": [
            {
                "price": price,
                "demand": max(
                    0,
                    int(
                        100
                        - (price - product.cost_price)
                        * 0.5
                        * (100 / product.selling_price)
                    ),
                ),
            }
            for price in price_range[0:10]
        ],
    }
