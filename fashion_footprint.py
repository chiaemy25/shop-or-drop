from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

# Resolve absolute path to brands.json relative to this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BRANDS_PATH = os.path.join(BASE_DIR, 'brands.json')
# Load and parse data globally once at startup
try:
    with open(BRANDS_PATH, 'r', encoding='utf-8') as f:
        brands_data = json.load(f)
    # Pre-build lookup dictionary for instant search
    BRANDS_MAP = {brand['brand'].strip().lower(): brand for brand in brands_data}
except Exception as e:
    print(f"Error loading brands.json at startup: {e}")
    BRANDS_MAP = {}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/search', methods=['POST'])
def search():
    try:
        search_query = request.json.get('brandName', '').strip().lower()
        brand = BRANDS_MAP.get(search_query)
        if brand:
            return jsonify(brand)
        return jsonify({
            "error": "Brand not found",
             "message": "It seems we don't have this brand yet, try typing it again exactly as it's spelled or suggesting it to get it added to our database!"
             }), 404
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({"error": "server_error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)