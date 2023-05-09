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
}

const myChart = new Chart(document.getElementById("myChart"), config);