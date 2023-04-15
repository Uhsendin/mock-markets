// Toggles hamburger overlay
document.querySelector(".hamburger").addEventListener("click", function () {
    document.querySelector("nav").classList.toggle("show");
  });

  const urlParams = new URLSearchParams(window.location.search);
  const coinName = urlParams.get("coin")

  fetch(`https://api.coingecko.com/api/v3/coins/${coinName.toLowerCase()}?localization=false&tickers=false&developer_data=false&sparkline=false`)
  .then((res) => res.json())
  .then((data) => {
    const coinDetailsElement = document.getElementById("coin-details")
    coinDetailsElement.innerHTML = `
      <h2>${data.name} (${data.symbol.toUpperCase()})</h2>
      <img src="${data.image.small}" alt="${data.name}">
      <p>Current price: $${data.market_data.current_price.usd.toFixed(2)}</p>
      <p>Price change in the last 24 hours: ${data.market_data.price_change_percentage_24h.toFixed(2)}%</p>
      <p>Market cap: $${data.market_data.market_cap.usd.toLocaleString()}</p>
      <p>Total volume: $${data.market_data.total_volume.usd.toLocaleString()}</p>
      <p>Website: <a href="${data.links.homepage[0]}" target="_blank">${data.links.homepage[0]}</a></p>
    `;
  });