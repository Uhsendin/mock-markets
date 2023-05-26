import { data, config } from "./stock-chart.js";

let deleteBtnStatus = false;

const fetchData = async () => {
  // Retrieve the value of "selectedCryptos" from localStorage
  const selectedCryptos = localStorage.getItem("selectedCryptos");
  const watchListContainer = document.querySelector(".watchlist-container");
  const watchList = [];
  // Check if the value is null or not a valid JSON string
  if (selectedCryptos === null) {
    const newDiv = document.createElement("div");
    newDiv.className = "empty-watchlist";
    newDiv.innerHTML = `
    <p>Oops looks like your watchlist is empty. Click <a href="/">here</a> to add cryptos to your list!</p>`;
    document
      .querySelector(".watchlist")
      .insertAdjacentElement("afterend", newDiv);
  } else {
    try {
      // Try to parse the value as JSON
      const parsedCryptos = JSON.parse(selectedCryptos);
      // Push Crypto id to array
      parsedCryptos.forEach((crypto) => {
        watchList.push(crypto);
      });

      const coinIds = watchList.map((coin) => coin.id);

      // Construct the URL for the batch request
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(
        ","
      )}&localization=false&tickers=false&developer_data=false&sparkline=true`;

      const response = await fetch(url);
      const coinData = await response.json();

      coinData.forEach((info) => {
        const coinPriceString = info.current_price.toLocaleString(undefined, {
          maximumFractionDigits: 3,
          minimumFractionDigits: 3,
        });
        const coin24High = info.price_change_percentage_24h;
        const sparklineList = info.sparkline_in_7d.price;
        const sparkLineCurrentDay = sparklineList.slice(-24);

        const coinContainer = document.createElement("section");
        coinContainer.classList.add("coin");
        coinContainer.innerHTML = `
          <div class="coin-info">
            <div class="coin-img">
              <img src="${info.image}">
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
          <div class="price-container">
          <span class="current-price">$${coinPriceString}</span>
          <span class="price-24-high ${
            coin24High >= 0 ? "positive" : "negative"
          }">
            <i class="fas ${
              coin24High >= 0
                ? "fa-solid fa-arrow-trend-up positive"
                : "fa-solid fa-arrow-trend-down negative"
            }"></i> ${coin24High.toFixed(3)}%
            </span>
          </div>
          <button class="remove" id="remove">
          <i class="fa-solid fa-circle-minus"></i>
          </button>
              
              </div>
        `;

        coinContainer.addEventListener("click", () => {
          if (!deleteBtnStatus) {
            window.location.href = `/pages/crypto-details.html?coin=${info.id}`;
          }
        });

        watchListContainer.appendChild(coinContainer);

        coinContainer.querySelectorAll(".stock-chart").forEach((canvas) => {
          if (canvas) {
            data.datasets[0].data = sparkLineCurrentDay;
            data.datasets[0].borderColor = coin24High < 0 ? "red" : "green";

            const ctx = canvas.getContext("2d");
            const existingChart = Chart.getChart(ctx);
            if (existingChart) {
              existingChart.destroy();
            }
            new Chart(ctx, config);
          }
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }
};

const deleteBtn = document.querySelector(".delete");
const trashIcon = document.getElementById("trash-icon");

deleteBtn.addEventListener("click", (_) => {
  if (!deleteBtnStatus) {
    deleteBtnStatus = true;
    trashIcon.style.display = "none";
    document.querySelector(".delete p").style.display = "block";
    document.querySelectorAll(".remove").forEach((btn) => {
      btn.style.display = "block";
    });

    document.querySelectorAll(".canvas-container").forEach((canvas) => {
      canvas.style.display = "none";
    });
  } else {
    deleteBtnStatus = false;
    trashIcon.style.display = "inline-block";
    document.querySelector(".delete p").style.display = "none";

    document.querySelectorAll(".remove").forEach((btn) => {
      btn.style.display = "none";
    });

    document.querySelectorAll(".canvas-container").forEach((canvas) => {
      canvas.style.display = "block";
    });
  }
});

fetchData();
