async function searchBrand() {
    const brandInput = document.getElementById('brand-name').value;
    const resultsContainer = document.querySelector('.results-grid');
    
    const response = await fetch ('/search', {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({brandName: brandInput})
});

const data = await response.json();

if (data.error) {
        alert(data.message);
        return;
    }

    

const verdictCard = document.querySelector('.verdict-card');

document.querySelector('.brand-card').innerHTML = `
<span style="text-transform: uppercase; letter-spacing: 2px; font-size: 0.7rem; opacity: 0.6;">Featured Brand</span>
<h1 style="font-family: 'Playfair Display', serif; color: #fdf0d5; -webkit-text-stroke: 0.1px #F49AC2;
 font-size: 4rem; text-align: center; margin: 0.5rem;">${data.brand}</h1>
<p style="color: #fdf0d5; font-size: 1rem;; font-weight: bold;">Price Range: ${data.priceRange}</p>
<p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Carbon Footprint: ${data.carbonFootprint}</p>
`;


const verdict = data.shopordrop || (data.sustainabilityScore >= 3 ? "Shop!" : "Drop!");
if (verdict === "Shop!") {
    verdictCard.style.backgroundColor = "#fdf0d5"; 
    verdictCard.style.color = "#FF3456";           
} else {
    verdictCard.style.backgroundColor = "#FF3456"; 
    verdictCard.style.color = "#fdf0d5";          
}

document.querySelector('.verdict-card').innerHTML = `
<h2 style="font-family: Pinyon Script, cursive; text-align: center; font-size: 3.5rem;">${data.shopordrop}</h2>
`;

document.querySelector('.score-card').innerHTML = `
<h1 style="color: #fdf0d5; font-size: 2rem;">Sustainability<br>Score: ${data.sustainabilityScore.toFixed(1)}/5</h1>
<p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Environmental Score: ${data.environmental}</p>
<p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Labor Score: ${data.labor}</p>
<p style="color: #fdf0d5; font-size: 1rem; font-weight: bold;">Animal Welfare Score: ${data.animalWelfare}</p>
`;

document.querySelector('.results-description').innerHTML = `
    <h1 style="font-size: 2.5rem; text-align: left;">Learn More!</h1>
    <p style="margin-top: 8px;"><strong>Alternatives:</strong> ${data.alternatives}</p>
    <p>${data["description "] || "No detailed description available."}</p>
    <p>All information for this site comes from the resource Good On You. Click this link to learn how they fully evaluated this brand:
    <a href="${data.link}" target="_blank" style="color: #FF3456; text-decoration: underline;">
        ${data.link}
        </a> 
    </p>
`;


}

document.getElementById('search-btn').addEventListener('click', searchBrand);