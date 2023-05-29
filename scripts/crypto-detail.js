import { data, config, labels } from "./stock-chart.js";

function fetchDataAndRender() {
  // Get coin name from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const coinName = urlParams.get("coin");

  // Fetch data from API
  fetch(
    `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&developer_data=false&sparkline=true`
  )
    .then((res) => res.json())
    .then((info) => {
      // Render coin details on the page
      const coinDetailsElement = document.getElementById("coin-details");
      const coin24High = info.market_data.price_change_percentage_24h;
      const sparklineList = info.market_data.sparkline_7d.price;
      const sparkLineCurrentDay = sparklineList.slice(-24);
      const currentPrice = info.market_data.current_price.usd;
      const PriceChange24h = info.market_data.price_change_24h;
      const coinImg = info.image.small;
      const coinTitle = info.name;
      const coinDes = info.description.en;
      const coinRank = info.market_cap_rank;
      const marketCap = info.market_data.market_cap.usd;
      const volume = info.market_data.total_volume.usd;
      const coinSupply = info.market_data.circulating_supply;
    
      coinDetailsElement.innerHTML = `
      <h1>${info.name} Price</h1>
      <section class="coin-header">
        <div class="coin-current">
          <p>$${currentPrice.toLocaleString()}</p>
          <button class="wishlist-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <p class="${
          PriceChange24h >= 0 ? "positive" : "negative"
        }">$${PriceChange24h.toFixed(2)} (${coin24High.toFixed(2)}%)</p>
      </section>
      <section class="coin-graph">
      <canvas class="canvas-graph"></canvas>
      </section>
      <section class="coin-info">
        <div class="your-balance">
          <p class="balance-title">Your balance</p>
          <p class="balance">$${localStorage.getItem("accountBalance")}</p>
          <div class="coin-balance">
            <div class="coin-primary-balance">
              <img src="${coinImg}" alt="${coinTitle}">
              <div class="coin-text">
                <h2>${coinTitle}</h2>
                <p>Primary balance</p>
              </div>
            </div>
            <div class="coin-shares">
              <p>$10,000</p>
              <p>$-1,304</p>
              </div>
              </div>
              <button class="trade" id="trade">Trade</button>
        </div>
        <section class="about-coin">
          <p>About ${coinTitle}</p>
          <p class="coin-des">${coinDes}</p>
          <button class="view-more">View more</button>
        </section>
        <section class="coin-market-stats">
          <h2>Market stats</h2>
          <p>Popularity ${coinRank}</p>
          <p>Market cap ${marketCap.toLocaleString()}</p>
          <p>Volume ${volume.toLocaleString()}</p>
          <p>Circulating supply ${coinSupply.toLocaleString()}</p>
        </section>
      </section>
      `;

        document.querySelector(".span-header.buy").textContent = `Buy ${info.symbol.toUpperCase()}`
        document.querySelector(".span-subtext.buy").textContent = `Buy ${info.symbol.toUpperCase()} with cash`
        document.querySelector(".span-header.sell").textContent = `Sell ${info.symbol.toUpperCase()}`
        document.querySelector(".span-subtext.sell").textContent = `Sell ${info.symbol.toUpperCase()} for cash`





      const cryptoGraph = () => {
        const canvas = document.querySelector(".canvas-graph");
        console.log();
        if (canvas) {
          data.labels = labels;
          data.datasets[0].data = sparkLineCurrentDay;
          data.datasets[0].pointRadius = 1;
          data.datasets[0].borderColor = coin24High < 0 ? "red" : "green";
          config.options.plugins.tooltip.enabled = true;
          config.options.plugins.tooltip.mode = "index";
          config.options.plugins.tooltip.intersect = false;
          config.options.scales.x.display = true;
          config.options.scales.y.display = true;

          const ctx = canvas.getContext("2d");
          new Chart(ctx, config);
        }
      };
      cryptoGraph();

      const openModalBtn = document.getElementById("trade");
      const modal = document.getElementById("modal");
      const closeModal = document.getElementsByClassName("close")[0];
     
      openModalBtn.addEventListener("click", function () {
        modal.style.display = "block";
        document.body.classList.add("modal-open")
      });

      closeModal.addEventListener("click", function () {
        modal.style.display = "none";
        document.body.classList.remove("modal-open")
      });

      // Attach event listeners
      const attachEventListeners = () => {
        // Event listener for "View more" button
        const btnViewMore = document.querySelector(".view-more");
        btnViewMore.addEventListener("click", function () {
          const paragraph = document.querySelector(".coin-des");
          paragraph.classList.toggle("expand");

          if (btnViewMore.textContent === "View more") {
            btnViewMore.textContent = "View less";
          } else {
            btnViewMore.textContent = "View more";
          }
        });
      };

      // Make all links within .coin-des open in new tabs
      const coinDesLinks = document.querySelectorAll(".coin-des a");
      coinDesLinks.forEach((link) => {
        link.setAttribute("target", "_blank");
      });

      const wishlistBtn = document.querySelector(".wishlist-btn");

      wishlistBtn.addEventListener("click", function () {
        let selectedCryptos = localStorage.getItem("selectedCryptos");
        selectedCryptos = selectedCryptos ? JSON.parse(selectedCryptos) : [];

        const crypto = { id: info.id };

        if (!selectedCryptos.some((c) => c.id === crypto.id)) {
          selectedCryptos.push(crypto);
          localStorage.setItem(
            "selectedCryptos",
            JSON.stringify(selectedCryptos)
          );
        }
      });
      attachEventListeners();
    });
}

document.addEventListener("DOMContentLoaded", fetchDataAndRender);
