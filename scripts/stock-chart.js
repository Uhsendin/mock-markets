import { getCurrentUnixTime, getYesterdayUnixTime } from "./watchlist.js";

const selectedCryptos = localStorage.getItem("selectedCryptos");
const parsedCryptos = JSON.parse(selectedCryptos);
// let currentUnixTime = getCurrentUnixTime();


function generateRandomNumbers(min, max, count) {
  const randomNumbers = [];
  for (let i = 0; i < count; i++) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1) + min);
    randomNumbers.push(randomNumber);
  }
  return randomNumbers;
}

const min = 27490;
const max = 27573;
const count = 10;
const randomNumbers = generateRandomNumbers(min, max, count);
console.log(randomNumbers);






const labels = ["January", "February", "March", "April", "May", "June", "July"];
const data = {
  labels: labels,
  datasets: [
    {
      label: "",
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: "green",
      tension: 0.1,
      pointRadius: 0,
    },
  ],
};

const config = {
  type: "line",
  data: data,
  options: {
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  },
};

export { config };
