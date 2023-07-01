import { formatNumber, formatNumberWithDecimal } from "./utilities.js";
class Coin {
  constructor(name, symbol, img, price, price24Change, id, marketCap, rank, volume, curSupply, ath) {
    this.name = name;
    this.symbol = symbol;
    this.img = img;
    this.price = price;
    this.price24Change = price24Change;
    this.id = id;
    this.marketCap = marketCap
    this.rank = rank
    this.volume = volume
    this.curSupply = curSupply
    this.ath = ath
  }

  render() {
    const coinElement = document.createElement('tr');
    coinElement.classList.add('coin');
    coinElement.innerHTML = `
    <tr>
    <td>${this.rank}</td>
    <td>
      <div class="wrapper">
        <div>
          <img src="${this.img}" alt="${this.name} logo" />
        </div>
        <div class="name">
          <span>${this.name}</span>
          <span>${this.symbol}</span>
        </div>
    </td>
    </div>
    <td class="align">$${formatNumberWithDecimal(this.price)}</td>
    <td class="align">${formatNumber(this.marketCap)}</td>
    <td class="align">${formatNumber(this.curSupply)}</td>
    <td class="align">${formatNumber(this.volume)}</td>
    <td class="align">${formatNumber(this.price24Change)}</td>
  </tr>
   
  
   
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
    this.coinsListElement.innerHTML = `
    <thead>
    <tr>
      <th class="align-left">#</th>
      <th class="align-left">Name</th>
      <th>Price</th>
      <th>Market Price</th>
      <th>Circulating Supply</th>
      <th>Volume</th>
      <th>% 24h</th>
    </tr>
  </thead>
    `;
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
          data[i].id,
          data[i].market_cap,
          data[i].market_cap_rank,
          data[i].total_volume,
          data[i].circulating_supply,
          data[i].ath
        );
        coinList.addCoin(coin);
      }
    });
};

if (!localStorage.getItem('accountBalance')) {
  localStorage.setItem('accountBalance', 0);
}

