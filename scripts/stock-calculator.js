const coinDetails = localStorage.getItem("tempCoinInfo");
const coinDetailsParsed = JSON.parse(coinDetails);
const coinShareSymbol = document.querySelector(".coin-share span");
const image = document.querySelector(".upper img");
const coinName = document.querySelector(".coin-name");
let shareNumAmount = 0;
const numValue = document.querySelector(".amount input");
let isbuy = coinDetailsParsed.buy;

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
  const value = numValue.value;
  const minWidth = 33; // Minimum width of the input

  if (valueLength === 1) {
    numValue.style.width = "33px";
    coinShareSymbol.textContent = `${(shareNumAmount =
      getShareConversion(value))} ${coinDetailsParsed.symbol.toUpperCase()}`;
  } else {
    numValue.style.width = `${minWidth * valueLength}px`;
    coinShareSymbol.textContent = `${(shareNumAmount =
      getShareConversion(value))} ${coinDetailsParsed.symbol.toUpperCase()}`;
    if (valueLength > 1) {
      document.querySelector(".order-btn").style.display = "block";
    } else {
      document.querySelector(".order-btn").style.display = "none";
    }
  }
});

function getShareConversion(inputNum) {
  const amount = parseFloat(inputNum);
  if (isNaN(amount) || amount <= 0) {
    return 0; // Return 0 if the input is not a valid positive number
  }
  const shareValue = amount / coinDetailsParsed.price;
  return parseFloat(shareValue.toFixed(4)); // Round the share value to 4 decimal places
}

document.querySelector(".order-header a").addEventListener("click", () => {
  window.location.href = `/pages/crypto-details.html?coin=${coinDetailsParsed.id}`;
});

document.querySelector(".pill").addEventListener("click", (e) => {
  if (e.target.id === "buy") {
    document.getElementById("buy").classList.add("active-pill");
    document.getElementById("sell").classList.remove("active-pill");
    isbuy = true;
  } else if (e.target.id === "sell") {
    document.getElementById("sell").classList.add("active-pill");
    document.getElementById("buy").classList.remove("active-pill");
    isbuy = false;
  }
});

numValue.addEventListener("focus", (_) => {
  document
    .querySelector(".pill")
    .scrollIntoView({ block: "start", behavior: "smooth" });
});
