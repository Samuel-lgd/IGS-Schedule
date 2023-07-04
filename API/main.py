from flask_cors import CORS
from flask import Flask, request, jsonify
from controllers import scheduleController


app = Flask(__name__)
CORS(app, origins={"*"}, methods=['GET', 'POST'])

API = "/api"


@app.route("/")
def index():
    return "Hello world"


app.register_blueprint(
    scheduleController.scheduleController, url_prefix=API + "/schedule")


if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0', port=5000)
