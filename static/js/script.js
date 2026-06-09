async function searchBrand() {
    const brandInput = document.getElementById('brand-name').value.trim();
    const resultsContainer = document.querySelector('.results-grid');
    const descContainer = document.querySelector('.results-description');
    const errorBanner = document.getElementById('error-message');
    const searchBtn = document.getElementById('search-btn');

    // Clear previous errors
    errorBanner.style.display = 'none';
    errorBanner.textContent = '';

    if (!brandInput) {
        errorBanner.textContent = 'Please enter a brand name first!';
        errorBanner.style.display = 'block';
        return;
    }

    // Enable loading state
    const originalText = searchBtn.textContent;
    searchBtn.textContent = 'Searching...';
    searchBtn.disabled = true;
    searchBtn.style.opacity = '0.6';
    searchBtn.style.cursor = 'not-allowed';

    try {
        const response = await fetch('/search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ brandName: brandInput })
        });

        const data = await response.json();

        if (response.status === 404 || data.error) {
            // Hide previous results
            resultsContainer.classList.remove('visible');
            descContainer.classList.remove('visible');

            errorBanner.textContent = data.message || "Brand not found.";
            errorBanner.style.display = 'block';
            return;
        }

        // Update DOM with data
        document.querySelector('.brand-card').innerHTML = `
            <span style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.7rem; opacity: 0.6;">Featured Brand</span>
            <h1 style="font-family: 'Playfair Display', serif; color: #fdf0d5; -webkit-text-stroke: 0.1px #F49AC2;
             font-size: 4rem; text-align: center; margin: 0.5rem;">${data.brand}</h1>
            <p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Price Range: ${data.priceRange}</p>
            <p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Carbon Footprint: ${data.carbonFootprint}</p>
        `;

        const verdict = data.shopordrop || (data.sustainabilityScore >= 3 ? "Shop!" : "Drop!");
        const verdictCard = document.querySelector('.verdict-card');

        if (verdict === "Shop!") {
            verdictCard.style.backgroundColor = "#fdf0d5";
            verdictCard.style.color = "#FF3456";
        } else {
            verdictCard.style.backgroundColor = "#FF3456";
            verdictCard.style.color = "#fdf0d5";
        }

        verdictCard.innerHTML = `
            <h2 style="font-family: Pinyon Script, cursive; text-align: center; font-size: 3.5rem;">${verdict}</h2>
        `;

        document.querySelector('.score-card').innerHTML = `
            <h1 style="color: #fdf0d5; font-size: 2rem;">Sustainability<br>Score: ${data.sustainabilityScore.toFixed(1)}/5</h1>
            <p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Environmental Score: ${data.environmental}</p>
            <p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Labor Score: ${data.labor}</p>
            <p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Animal Welfare Score: ${data.animalWelfare}</p>
        `;

        descContainer.innerHTML = `
            <h1 style="font-size: 2.5rem; text-align: left;">Learn More!</h1>
            <p style="margin-top: 8px;"><strong>Alternatives:</strong> ${data.alternatives}</p>
            <p>${data.description || "No detailed description available."}</p>
            <p>All information for this site comes from the resource Good On You. Click this link to learn how they fully evaluated this brand:
            <a href="${data.link}" target="_blank" style="color: #FF3456; text-decoration: underline;">
                ${data.link}
            </a>
            </p>
        `;

        // Render visible with transitions
        resultsContainer.classList.add('visible');
        descContainer.classList.add('visible');

    } catch (error) {
        console.error("Fetch error:", error);
        resultsContainer.classList.remove('visible');
        descContainer.classList.remove('visible');
        errorBanner.textContent = "We encountered a network error. Please check your connection and try again!";
        errorBanner.style.display = 'block';
    } finally {
        // Reset loading state
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
        searchBtn.style.opacity = '1';
        searchBtn.style.cursor = 'pointer';
    }
}

document.getElementById('search-btn').addEventListener('click', searchBrand);
// Allow searching by pressing Enter key inside input field
document.getElementById('brand-name').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        searchBrand();
    }
});