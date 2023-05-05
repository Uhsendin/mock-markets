// Retrieve the value of "selectedCryptos" from localStorage
const selectedCryptos = localStorage.getItem('selectedCryptos');
const watchListContainer = document.querySelector(".watchlist-container")
const watchList = []
// Check if the value is null or not a valid JSON string
if (selectedCryptos === null) {
  console.log("selectedCryptos does not exist in localStorage");
} else {
  try {
    //try to parse the value as JSON
    const parsedCryptos = JSON.parse(selectedCryptos);
    // Push Crypto id to array
    parsedCryptos.forEach(crypto => {
      watchList.push(crypto)
      
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}


//Render coin details from api
watchList.forEach(async (coin) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?localization=false&tickers=false&developer_data=false&sparkline=false`);
      const data = await response.json();
      
      const coinContainer = document.createElement('section');
      coinContainer.classList.add('coin');
      coinContainer.innerHTML = `
     <div class="coin-info">
     <img src="${data.image.small}">
   <h2>${data.name}</h2>
   <span>${data.symbol}</span>
     </div>
     <div class="coin-prices">
        <span>${data.market_data.current_price.usd}</span>
        <span>${data.market_data.price_change_percentage_24h}</span>
     </div>
      `;
      
      watchListContainer.appendChild(coinContainer);
      // Handle the error as needed
    } catch (error) {
      console.error('Error fetching coin data:', error);
    }
  });



