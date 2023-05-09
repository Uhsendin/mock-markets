import { config } from "./stock-chart.js";

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
      `https://api.coingecko.com/api/v3/coins/${coin.toLowerCase()}?localization=false&tickers=false&developer_data=false&sparkline=false`
    );
    const data = await response.json();

    const coinPrice = data.market_data.current_price.usd.toLocaleString(
      "en-US",
      { style: "currency", currency: "USD" }
    );
    const coin24High = data.market_data.price_change_percentage_24h;

    const coinContainer = document.createElement("section");
    coinContainer.classList.add("coin");
    coinContainer.innerHTML = `
        <div class="coin-info">
        <div class="coin-img">
        <img src="${data.image.small}">
        </div>
        <div class="coin-name">
        <h2>${data.name}</h2>
        <span>${data.symbol}</span>
        </div>
        </div>
        <div class="canvas-container">
        <canvas class="stock-chart"></canvas>
        </div>
        <div class="coin-prices">
        <span class="current-price">${coinPrice}</span>
        <span class="price-24-high ${
          coin24High >= 0 ? "positive" : "negative"
        }"> <i class="fas ${
      coin24High >= 0
        ? "fa-solid fa-arrow-trend-up positive"
        : "fa-solid fa-arrow-trend-down negative"
    }"></i> ${coin24High.toFixed(2)}%</span>
        </div>
        `;

    watchListContainer.appendChild(coinContainer);

    // Render stock chart
    const canvas = coinContainer.querySelector(".stock-chart");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
      new Chart(ctx, config);
    }

    // Handle the error as needed
  } catch (error) {
    console.error("Error fetching coin data:", error);
  }
});

// Grabs current time in unix format
function getCurrentUnixTime() {
  return Math.floor(Date.now() / 1000);
}

let currentUnixTime = getCurrentUnixTime();

function getYesterdayUnixTime(currentTime) {
  const oneDayInSeconds = 86400;
  return currentTime - oneDayInSeconds;
}
