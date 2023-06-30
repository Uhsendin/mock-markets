class Coin {
  constructor(name, symbol, img, price, price24High, id) {
    this.name = name;
    this.symbol = symbol;
    this.img = img;
    this.price = price;
    this.price24High = price24High;
    this.id = id;
  }

  renderThisCoin() {
    const coinRender = document.querySelector('.coin-render');
    coinRender.innerHTML = `
    <h1>Test<h1>`;
  }

  render() {
    const coinElement = document.createElement('section');
    coinElement.classList.add('coin');
    coinElement.innerHTML = `
    <section class="coin-name">
    <div class="coin-img">
    <img src="${this.img}" alt="${this.name}">
    </div>
    <div class="coin-info">
      <h2 class="name">${this.name}</h2>
      <p class="symbol">${this.symbol}</p>
      <div>
      </section>
      <section class="coin-price">
      <p class="price">$${this.price.toLocaleString(undefined, {
        maximumFractionDigits: 3,
        minimumFractionDigits: 3,
      })}</p>
      <p class="price-24-high ${
        this.price24High >= 0 ? 'positive' : 'negative'
      }"> <i class="fas ${
      this.price24High >= 0
        ? 'fa-solid fa-arrow-trend-up positive'
        : 'fa-solid fa-arrow-trend-down negative'
    }"></i>${this.price24High.toFixed(3)}%</p>
      </section>
    `;
    coinElement.addEventListener('click', () => {
      window.location.href = `/pages/crypto-details.html?coin=${this.id}`;
    });
    return coinElement;
  }
}

class CoinList {
  constructor() {
    this.coins = [];
    this.coinsListElement = document.querySelector('.coins-list');
  }

  addCoin(coin) {
    this.coins.push(coin);
    this.render();
  }

  render() {
    this.coinsListElement.innerHTML = `<h2 class="prices">Today's Crypto Prices</h2>`;
    for (let i = 0; i < this.coins.length; i++) {
      const coinElement = this.coins[i].render();
      this.coinsListElement.appendChild(coinElement);
    }
  }
}

const coinList = new CoinList();

window.onload = function () {
  fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd')
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < 25; i++) {
        const coin = new Coin(
          data[i].name,
          data[i].symbol,
          data[i].image,
          data[i].current_price,
          data[i].price_change_percentage_24h,
          data[i].id
        );
        coinList.addCoin(coin);
      }
    });
};

if (!localStorage.getItem('accountBalance')) {
  localStorage.setItem('accountBalance', 0);
}
