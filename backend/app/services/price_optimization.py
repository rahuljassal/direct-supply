def optimize_product_price(product):
    """Optimize price for a product."""
    margin = product.selling_price - product.cost_price
    optimal_markup = margin * 1.1  # 10% increase in margin
    optimized_price = product.cost_price + optimal_markup

    # Estimated demand at optimized price
    demand_factor = max(
        0, 1 - (optimized_price - product.selling_price) / product.selling_price
    )
    expected_demand = int(product.units_sold * demand_factor)
    return {
        "expected_demand": expected_demand,
        "optimized_price": round(optimized_price, 2),
    }
