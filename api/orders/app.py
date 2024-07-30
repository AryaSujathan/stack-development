from flask import Flask
from flask_cors import CORS

from api.blueprints.orders import orders_blueprint
from api.models import db

_URL_PREFIX = '/api'
ORDERS_URL = f"{_URL_PREFIX}/orders"

app = Flask(__name__)
CORS(app)


@app.before_request
def before_request():
    db.connect()


@app.after_request
def after_request(response):
    db.close()
    return response


app.register_blueprint(orders_blueprint, url_prefix=ORDERS_URL)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5001)
