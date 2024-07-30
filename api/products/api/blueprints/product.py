from api.models import Product
from api.schemas import ProductSchema
from flask import Blueprint

products_blueprint = Blueprint('products_blueprint', __name__)


@products_blueprint.route('/', methods=['GET'])
def get_active_products():
    product_schema = ProductSchema(many=True)
    try:
        products = Product.select().where(
            (Product.ProductStatus == 'Active')
        ).dicts()
        products_serialized = product_schema.dump(products)
    except Exception as err:
        return {'data': [], 'message': str(err)}, 500
    return {'data': products_serialized, 'message': ''}, 200
