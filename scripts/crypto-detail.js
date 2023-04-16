// Toggles hamburger overlay
document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("show");
  });

  const urlParams = new URLSearchParams(window.location.search);
  const coinName = urlParams.get("coin")

  fetch(`https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&developer_data=false&sparkline=false`)
  .then((res) => res.json())
  .then((data) => {
    const coinDetailsElement = document.getElementById("coin-details")
    coinDetailsElement.innerHTML = `
   <h1>${data.name} Price</h1>
   <section class="coin-header">
   <div class="coin-current">
   <p>${data.market_data.current_price.usd}</p>
   <button><i class="fa-solid fa-star"></i></button>
   </div>
   <p>$${data.market_data.price_change_24h.toFixed(2)} (${data.market_data.price_change_percentage_24h.toFixed(2)}%)</p>
   </section>
<section class="coin-graph"></section>
<section class="coin-info">
<p>Your balance</p>
<p>$100,000<i class="fa-solid fa-greater-than"></i><p>
<div class="coin-balance">
<div class="coin-primary-balance">
<h2>${data.name}</h2>
<p>Primary balance</p>
</div>
<div class="coin-shares">
<p>$10,000</p>
<p>$-1,304</p>
</div>
</div>
<section class="about-coin">
<p>About ${data.name}</p>
<p>${data.description.en}</p>
<button>View more</button>
</section>
<section class="coin-market-stats">
<p>Popularity ${data.market_cap_rank}</p>
<p> Market cap ${data.market_data.market_cap.usd}</p>
<p>Volume ${data.market_data.total_volume.usd}</p>
<p>Circulating supply ${data.market_data.circulating_supply}</p>


</section>
</section>
    `;
  });