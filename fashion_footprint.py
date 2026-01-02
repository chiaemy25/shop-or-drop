from flask import Flask, render_template, request, jsonify
import json
import os

app = Flask(__name__)

def load_data():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    json_path = os.path.join(base_dir, 'brands.json')

    with open(json_path, 'r') as f:
        return json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/search', methods=['POST'])
def search():
    try:
        data = load_data()
        search_query = request.json.get('brandName', '').strip().lower()
        for brand in data:
            if  brand['brand'].strip().lower() == search_query:
                return jsonify(brand)
        return jsonify({
            "error": "Brand not found",
            "message": "It seems we dont have this brand yet, try typing it again exactly as it's spelled or suggesting it to get it added our database!"
    }), 404
    except Exception as e:
        print(f"Server Error: {e}")
        return jsonify({"error": "server_error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)