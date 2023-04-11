class Coin {
  constructor(name, symbol, img, price, price24High) {
    this.name = name;
    this.symbol = symbol;
    this.img = img;
    this.price = price;
    this.price24High = price24High;
  }

  render() {
    const coinElement = document.createElement("section");
    coinElement.classList.add("coin");
    coinElement.innerHTML = `
      <h2 class="name">${this.name}</h2>
      <p class="symbol">${this.symbol}</p>
      <img src="${this.img}" alt="">
      <p class="price">${this.price}</p>
      <p class="price-24-high">${this.price24High}</p>
    `;
    return coinElement;
  }
}

class CoinList {
  constructor() {
    this.coins = [];
    this.coinsListElement = document.querySelector(".coins-list");
  }

  addCoin(coin) {
    this.coins.push(coin);
    this.render();
  }

  render() {
    this.coinsListElement.innerHTML = "";
    for (let i = 0; i < this.coins.length; i++) {
      const coinElement = this.coins[i].render();
      this.coinsListElement.appendChild(coinElement);
    }
  }
}

const coinList = new CoinList();

window.onload = function() {
  fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
    .then(res => res.json())
    .then(data => {
      for (let i = 0; i < 15; i++) { 
        const coin = new Coin(data[i].name, data[i].symbol, data[i].image, data[i].current_price, data[i].price_change_percentage_24h);
        coinList.addCoin(coin);
      }
    });
};

// Toggles hamburger overlay
document.querySelector(".hamburger").addEventListener("click", function() {
  document.querySelector("nav").classList.toggle("show");
});
