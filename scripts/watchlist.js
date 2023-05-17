import { data, config} from "./stock-chart.js";

// Retrieve the value of "selectedCryptos" from localStorage
const selectedCryptos = localStorage.getItem("selectedCryptos");
const watchListContainer = document.querySelector(".watchlist-container");
const watchList = [];
// Check if the value is null or not a valid JSON string
if (selectedCryptos === null) {
  console.log("selectedCryptos does not exist in localStorage");
} else {
  try {
    //try to parse the value as JSON
    const parsedCryptos = JSON.parse(selectedCryptos);
    // Push Crypto id to array
    parsedCryptos.forEach((crypto) => {
      watchList.push(crypto);
    });
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}


//Render coin details from api
watchList.forEach(async (coin) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${coin.id.toLowerCase()}?localization=false&tickers=false&developer_data=false&sparkline=true`
    );
    const info = await response.json();

    const coinPriceString = info.market_data.current_price.usd.toLocaleString(undefined, {maximumFractionDigits:3, minimumFractionDigits:3});
    const coin24High = info.market_data.price_change_percentage_24h;
    const priceChange24Low = info.market_data.low_24h.usd
    const priceChange24High = info.market_data.high_24h.usd
    const curPrice = info.market_data.current_price.usd
    const sparklineList = info.market_data.sparkline_7d.price
    const sparkLineCurrentDay = sparklineList.slice(-24)
        
    
    

    const coinContainer = document.createElement("section");
    coinContainer.classList.add("coin");
    coinContainer.innerHTML = `
        <div class="coin-info">
        <div class="coin-img">
        <img src="${info.image.small}">
        </div>
        <div class="coin-name">
        <h2>${info.name}</h2>
        <span>${info.symbol}</span>
        </div>
        </div>
        <div class="canvas-container">
        <canvas class="stock-chart"></canvas>
        </div>
        <div class="coin-prices">
        <span class="current-price">$${coinPriceString}</span>
        <span class="price-24-high ${
          coin24High >= 0 ? "positive" : "negative"
        }"> <i class="fas ${
      coin24High >= 0
        ? "fa-solid fa-arrow-trend-up positive"
        : "fa-solid fa-arrow-trend-down negative"
    }"></i> ${coin24High.toFixed(3)}%</span>
        </div>
        `;
        coinContainer.addEventListener("click", () => {
          window.location.href = `/pages/crypto-details.html?coin=${info.id}`;
        });

    watchListContainer.appendChild(coinContainer);
    
  
    coinContainer.querySelectorAll(".stock-chart").forEach(canvas => {
      if (canvas) {
        data.datasets[0].data = sparkLineCurrentDay
        data.datasets[0].borderColor = coin24High < 0 ? "red" : "green"
        
        const ctx = canvas.getContext("2d")
        const existingChart = Chart.getChart(ctx)
        if (existingChart) {
          existingChart.destory()
        }
        new Chart(ctx, config)

      }
    })

    // Handle the error as needed
  } catch (error) {
    console.error("Error fetching coin info:", error);
  }
});


