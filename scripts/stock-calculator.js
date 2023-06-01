const coinDetails = localStorage.getItem("tempCoinInfo")
const coinDetailsParsed = JSON.parse(coinDetails)
const coinShareSymbol = document.querySelector(".coin-share span")
const image = document.querySelector(".upper img")
const coinName = document.querySelector(".coin-name")
let shareNumAmount = 0

coinShareSymbol.textContent = `${shareNumAmount} ${coinDetailsParsed.symbol.toUpperCase()}`
image.src = coinDetailsParsed.image
coinName.textContent = coinDetailsParsed.name
if (coinDetailsParsed.buy) {
    document.getElementById("buy").classList.add("active-pill")
} else {
    document.getElementById("sell").classList.add("active-pill")
}



