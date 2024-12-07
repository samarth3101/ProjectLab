from flask import Flask, request, jsonify, render_template

app = Flask(__name__)




# Base prices for different locations (in lakhs)
base_prices = {
    'Ambegaon Budruk': 60,
    'Aundh': 100,
    'Baner': 90,
    'Bavdhan Khurd': 70,
    'Bavdhan Budruk': 75,
    'Balewadi': 85,
    'Shivajinagar': 110,
    'Bibvewadi': 65,
    'Bhugaon': 55,
    'Bhukum': 50,
    'Dhankawadi': 50,
    'Dhanori': 60,
    'Dhayari': 55,
    'Erandwane': 95,
    'Fursungi': 45,
    'Ghorpadi': 80,
    'Hadapsar': 90,
    'Hingne Khurd': 65,
    'Karve Nagar': 85,
    'Kalas': 50,
    'Katraj': 55,
    'Khadki': 70,
    'Kharadi': 80,
    'Kondhwa': 75,
    'Koregaon Park': 110,
    'Kothrud': 95,
    'Lohagaon': 50,
    'Manjri': 50,
    'Markal': 40,
    'Mohammed Wadi': 70,
    'Mundhwa': 80,
    'Nanded': 50,
    'Parvati (Parvati Hill)': 90,
    'Panmala': 45,
    'Pashan': 85,
    'Pirangut': 60,
    'Shivane': 55,
    'Sus': 65,
    'Undri': 70,
    'Vishrantwadi': 75,
    'Vitthalwadi': 55,
    'Vadgaon Khurd': 50,
    'Vadgaon Budruk': 50,
    'Vadgaon Sheri': 55,
    'Wagholi': 60,
    'Wanwadi': 70,
    'Warje': 70,
    'Yerwada': 75,
    'Akurdi': 60,
    'Bhosari': 50,
    'Chakan': 45,
    'Charholi Budruk': 40,
    'Chikhli': 50,
    'Chimbali': 45,
    'Chinchwad': 60,
    'Dapodi': 50,
    'Dehu Road': 40,
    'Dighi': 50,
    'Dudulgaon': 40,
    'Hinjawadi': 80,
    'Kalewadi': 60,
    'Kasarwadi': 50,
    'Maan': 45,
    'Moshi': 40,
    'Phugewadi': 50,
    'Pimple Gurav': 55,
    'Pimple Nilakh': 60,
    'Pimple Saudagar': 65,
    'Pimpri': 55,
    'Punawale': 50,
    'Ravet': 55,
    'Rahatani': 50,
    'Sangvi': 60,
    'Talawade': 45,
    'Tathawade': 50,
    'Thergaon': 60,
    'Wakad': 70,
}

@app.route('/')
def home():
    return render_template('index.html')  # Serve the index.html file for the home page

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()

        # Extract data with default values
        location = data.get('location')
        area = data.get('area', 0)
        bedrooms = data.get('bedrooms', 0)

        # Validate input
        if location not in base_prices:
            return jsonify({'error': 'Location not found. Please check the available locations.'}), 400
        
        if not (isinstance(area, int) and area > 0):
            return jsonify({'error': 'Invalid area value. It must be a positive integer.'}), 400

        if not (isinstance(bedrooms, int) and bedrooms >= 0):  # Bedrooms can be 0 or more
            return jsonify({'error': 'Invalid bedrooms value. It must be a non-negative integer.'}), 400

        # Get base price for the location (in lakhs)
        base_price = base_prices[location]

        # Calculate predicted price based on area and bedrooms
        price_per_sqft = 1500  # Example price per sqft
        price_per_bedroom = 50000  # Example price per bedroom
        price = (base_price * 1e5) + (area * price_per_sqft) + (bedrooms * price_per_bedroom)

        # Convert price to lakhs and crores
        if price >= 1e7:  # 1 crore = 1e7
            price_in_crores = price / 1e7  # Convert to crores
            price_output = f"{price_in_crores:.1f} cr"  # Format to 1 decimal place
        else:
            price_in_lakhs = price / 1e5  # Convert to lakhs
            price_output = f"{price_in_lakhs:.1f} lakhs"  # Format to 1 decimal place

        return jsonify({'predicted_price': price_output})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=8080)