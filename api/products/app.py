from flask import Flask, jsonify
from flask_cors import CORS

from api.blueprints.product import products_blueprint
from api.models import db

_URL_PREFIX = '/api'
PRODUCTS_URL = f"{_URL_PREFIX}/products"

app = Flask(__name__)
CORS(app)


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    db.close()
    return response


app.register_blueprint(products_blueprint, url_prefix=PRODUCTS_URL)


@app.errorhandler(404)
def not_found(error):
    return jsonify({'data': [], 'message': 'Not Found'}), 404


if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5002)
