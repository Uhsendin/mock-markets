// Loads top 15 coins using api on load
window.onload = function() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < 15; i++) { 
      renderCoinList(data[i].name,data[i].symbol,data[i].image,data[i].current_price,data[i].price_change_percentage_24h)

    }


  })
  
}
// Renders a list of the top 15 coins
function renderCoinList(name,symbol,img,price,price24High) {
const coinsList = document.querySelector(".coins-list")

  const coin = document.createElement("section")
  coin.classList.add("coin")
  coin.innerHTML = `
  <h2 class="name">${name}</h2>
    <p class="symbol">${symbol}</p>
    <img src="${img}" alt="">
    <p class="price">${price}</p>
    <p class="price-24-high">${price24High}</p>
  `
  coinsList.appendChild(coin)

}

// Toggles hamburger overlay
document.querySelector(".hamburger").addEventListener("click", function() {
  document.querySelector("nav").classList.toggle("show");
});


