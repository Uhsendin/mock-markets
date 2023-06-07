const coinDetails = localStorage.getItem("tempCoinInfo");
const coinDetailsParsed = JSON.parse(coinDetails);
const coinShareSymbol = document.querySelector(".coin-share span");
const image = document.querySelector(".upper img");
const coinName = document.querySelector(".coin-name");
let shareNumAmount = 0;
const numValue = document.querySelector(".amount input");
numValue.style.width = "33px"

coinShareSymbol.textContent = `${shareNumAmount} ${coinDetailsParsed.symbol.toUpperCase()}`;
image.src = coinDetailsParsed.image;
coinName.textContent = coinDetailsParsed.name;
if (coinDetailsParsed.buy) {
  document.getElementById("buy").classList.add("active-pill");
} else {
  document.getElementById("sell").classList.add("active-pill");
}

numValue.addEventListener("input", () => {
    const valueLength = numValue.value.length;
    const minWidth = 33; // Minimum width of the input
    
    if (valueLength === 1) {
      numValue.style.width = "33px";
    } else {
      numValue.style.width = `${minWidth * valueLength}px`;
    }
  });
  

document.querySelector(".order-header a").addEventListener("click", () => {
  window.location.href = `/pages/crypto-details.html?coin=${coinDetailsParsed.id}`;
});
