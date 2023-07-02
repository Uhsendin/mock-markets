import { formatNumber, formatNumberWithDecimal } from './utilities.js';

class Coin {
  constructor(name, symbol, img, price, price24Change, id, marketCap, rank, volume, curSupply, ath) {
    this.name = name;
    this.symbol = symbol;
    this.img = img;
    this.price = price;
    this.price24Change = price24Change;
    this.id = id;
    this.marketCap = marketCap;
    this.rank = rank;
    this.volume = volume;
    this.curSupply = curSupply;
    this.ath = ath;
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
          </div>
        </td>
        <td class="align">$${formatNumberWithDecimal(this.price)}</td>
        <td class="align">${formatNumber(this.marketCap)}</td>
        <td class="align">${formatNumber(this.curSupply)}</td>
        <td class="align">${formatNumber(this.volume)}</td>
        <td class="align">${formatNumber(this.price24Change)}</td>
      </tr>`;
    coinElement.addEventListener('click', () => {
      window.location.href = `/pages/crypto-details.html?coin=${this.id}`;
    });
    return coinElement;
  }
}

class CoinList {
  constructor() {
    this.coins = [];
    this.coinListElement = document.querySelector('.coins-list');
  }

  addcoin(coin) {
    this.coins.push(coin);
    this.render();
  }

  render() {
    this.coinListElement.innerHTML = `
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
      this.coinListElement.appendChild(coinElement);
    }
  }
}

const tableContainer = document.querySelector('.table-container');
const trashIcon = document.getElementById('trash-icon');
const watchList = [];

function emptyList() {
  trashIcon.style.display = 'none';
  const newDiv = document.createElement('div');
  newDiv.className = 'empty-watchlist';
  newDiv.innerHTML = `
    <p>Oops looks like your watchlist is empty. Click <a href="/">here</a> to add cryptos to your list!</p>`;
  tableContainer.insertAdjacentElement('beforeend', newDiv);
}

let parsedCryptos = [];
let selectedCryptos = localStorage.getItem('selectedCryptos');

// Check if the value is null or not a valid JSON string
if (selectedCryptos === null) {
  emptyList();
} else {
  parsedCryptos = JSON.parse(selectedCryptos);
  parsedCryptos.forEach((crypto) => {
    watchList.push(crypto);
  });
}

if (watchList.length > 0) {
  const coinIds = watchList.map((coin) => coin.id);
  const coinList = new CoinList();
  
  window.onload = async function () {
    const coinsList = [];
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds.join(
      ','
    )}&localization=true&tickers=true&developer_data=true&sparkline=false`;
  
    try {
      const response = await fetch(url);
      const coinData = await response.json();
  
      coinData.forEach((info) => {
        const coin = new Coin(
          info.name,
          info.symbol,
          info.image,
          info.current_price,
          info.price_change_24h,
          info.id,
          info.market_cap,
          info.market_cap_rank,
          info.total_volume,
          info.circulating_supply,
          info.ath
        );
        coinsList.push(coin);
      });
  
      for (let i = 0; i < coinsList.length; i++) {
        coinList.addcoin(coinsList[i]);
      }
    } catch (error) {
      console.error(error);
    }
  };
} else {
  tableContainer.style.overflowX = 'hidden'
}

