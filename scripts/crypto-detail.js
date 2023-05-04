// Toggles hamburger overlay
document.querySelector(".hamburger").addEventListener("click", function () {
  document.querySelector("nav").classList.toggle("show");
});

function fetchDataAndRender() {
  // Get coin name from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const coinName = urlParams.get("coin");

  // Fetch data from API
  fetch(
    `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&developer_data=false&sparkline=false`
  )
    .then((res) => res.json())
    .then((data) => {
      // Render coin details on the page
      const coinDetailsElement = document.getElementById("coin-details");
      coinDetailsElement.innerHTML = `
      <h1>${data.name} Price</h1>
      <section class="coin-header">
        <div class="coin-current">
          <p>$${data.market_data.current_price.usd.toLocaleString()}</p>
          <button class="wishlist-btn"><i class="fa-solid fa-plus"></i></button>
        </div>
        <p class="${
          data.market_data.price_change_24h >= 0 ? "positive" : "negative"
        }">$${data.market_data.price_change_24h.toFixed(
        2
      )} (${data.market_data.price_change_percentage_24h.toFixed(2)}%)</p>
      </section>
      <section class="coin-graph"></section>
      <section class="coin-info">
        <div class="your-balance">
          <p class="balance-title">Your balance</p>
          <p class="balance">$100,000</p>
          <div class="coin-balance">
            <div class="coin-primary-balance">
              <img src="${data.image.small}" alt="${data.name}">
              <div class="coin-text">
                <h2>${data.name}</h2>
                <p>Primary balance</p>
              </div>
            </div>
            <div class="coin-shares">
              <p>$10,000</p>
              <p>$-1,304</p>
            </div>
          </div>
        </div>
        <section class="about-coin">
          <p>About ${data.name}</p>
          <p class="coin-des">${data.description.en}</p>
          <button class="view-more">View more</button>
        </section>
        <section class="coin-market-stats">
          <h2>Market stats</h2>
          <p>Popularity ${data.market_cap_rank}</p>
          <p>Market cap ${data.market_data.market_cap.usd.toLocaleString()}</p>
          <p>Volume ${data.market_data.total_volume.usd.toLocaleString()}</p>
          <p>Circulating supply ${data.market_data.circulating_supply.toLocaleString()}</p>
        </section>
      </section>
      `;

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
        localStorage.setItem("selectedCoin", data.name);
      });
      attachEventListeners();
    });
}

document.addEventListener("DOMContentLoaded", fetchDataAndRender);
