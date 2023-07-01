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
    <td>
      <div>
        <img src="${this.img}">
      </div>
    </td>
    <td>
      <div>
        <span>${this.name}</span>
        <span>${this.symbol}</span>
      </div>
    </td>
    <td>
      <div>
        <span>${this.price}</span>
        <span>${this.price24Change}</span>
      </div>
    </td>
   
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
