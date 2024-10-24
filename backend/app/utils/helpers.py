# app/utils/helpers.py
def validate_product_data(data):
    """Validate product data."""
    required_fields = ['name', 'cost_price', 'selling_price', 'category_id']
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")
    
    if data['cost_price'] <= 0:
        raise ValueError("Cost price must be greater than 0")
    
    if data['selling_price'] <= data['cost_price']:
        raise ValueError("Selling price must be greater than cost price")
    
    return True