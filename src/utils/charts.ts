export const chartDataInit = {
  labels: ["January", "February", "March", "April", "May"],
  datasets: [
    {
      label: "Revenue",
      data: [-50, 70, -40, 60, 80],
      backgroundColor: [-50, 70, -40, 60, 80].map((n) => {
        if (n < 0) return "rgba(255, 99, 132, 0.5)";
        else return "rgba(54, 162, 235, 0.5)";
      }), // Violet color
      borderColor: "rgba(153, 102, 255, 0.5)",
    },
  ],
};

export const options = {
  plugins: {
    legend: {
      labels: {
        boxWidth: 0,
      },
    },
  },
  scales: {
    y: {
      // beginAtZero: true,
      grid: {
        color: "#80808040",
      },
    },
    x: {
      grid: {
        color: "#80808040",
      },
    },
  },
};

export const pieOptions = {
  scales: {
    y: {
      // beginAtZero: true,
      grid: {
        color: "#80808040",
      },
    },
    x: {
      grid: {
        color: "#80808040",
      },
    },
  },
};
