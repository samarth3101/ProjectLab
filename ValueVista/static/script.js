document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pricePredictionForm');
    const resultModal = document.getElementById('resultModal');
    const predictionResult = document.getElementById('predictionResult');
    const additionalInfo = document.getElementById('additionalInfo');
    const closeModal = document.getElementById('closeModal');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form from submitting normally

        // Collect form data
        const location = document.getElementById('location').value;
        const area = parseInt(document.getElementById('area').value); // Convert area to an integer
        const bedrooms = parseInt(document.getElementById('bedrooms').value); // Convert bedrooms to an integer

        // Call the function to get the price prediction
        getPricePrediction(location, area, bedrooms);
    });

    // Close modal when user clicks on <span> (x)
    closeModal.onclick = function () {
        resultModal.style.display = "none";
    }

    // Close modal when user clicks anywhere outside of the modal
    window.onclick = function (event) {
        if (event.target == resultModal) {
            resultModal.style.display = "none";
        }
    }
});

// Function to get price prediction from the Flask server
async function getPricePrediction(location, area, bedrooms) {
    const data = { location, area, bedrooms };

    try {
        const response = await fetch('/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        // Display the result in the modal
        predictionResult.innerText = `Predicted Price: ₹${result.predicted_price}`;
        additionalInfo.innerText = `Location: ${location}, Area: ${area} sqft, Bedrooms: ${bedrooms}`;
        resultModal.style.display = "block"; // Show the modal
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('predictedPrice').innerText = 'An error occurred. Please try again.';
    }
}


//learn more 
function showInsightDetails(insightType) {
    const insightDetails = document.getElementById('insightDetails');
    const learnMoreModal = document.getElementById('learnMoreModal');

    if (insightType === 'housingMarketTrends') {
        insightDetails.innerText = "Stay updated with the latest housing trends and data analytics to make informed decisions.";
    } else if (insightType === 'investmentOpportunities') {
        insightDetails.innerText = "Discover the top areas for real estate investment with AI-driven insights.";
    }

    learnMoreModal.style.display = 'block'; // Show the modal
}

// Close the learn more modal when clicking the close button
document.getElementById('closeInsight').onclick = function() {
    document.getElementById('learnMoreModal').style.display = 'none';
}

// Close the modal when the user clicks anywhere outside of the modal content
window.onclick = function(event) {
    const learnMoreModal = document.getElementById('learnMoreModal');
    if (event.target == learnMoreModal) {
        learnMoreModal.style.display = 'none';
    }
}