// import React, { useEffect, useRef, useState } from "react";
// import { Chart } from "chart.js/auto";

// const API = "https://mcuconnect.com/dashboard-api/machines";

// export default function DoughnutChart() {
//   const [fetchAllMachines, setFetchAllMachines] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);  // Loading state
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     fetchMachines(API);
//   }, []);

//   const fetchMachines = async (url) => {
//     try {
//       const res = await fetch(url);
//       const machines = await res.json();
//       setFetchAllMachines(machines);
//       setIsLoading(false);  // Set loading to false once data is fetched
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Function to get the count of machines with different stock statuses
//   const getLowStockCount = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status?.trim().toLowerCase() === 'low'
//     ).length;
//   };

// // Function to get the count of machines with "Empty" stock status
// const getEmptyStockMachines = () => {
//   return fetchAllMachines.filter(
//       (machine) => machine.stock_status?.trim().toLowerCase() === 'empty'
//   ).length;
// };


//   const getOKStockMachines = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status?.trim().toLowerCase() === 'ok'
//     ).length;
//   };

//   const getERRORStockMachines = () => {
//     return fetchAllMachines.filter(
//       (machine) => machine.stock_status?.trim().toLowerCase() === 'error'
//     ).length;
//   };

//   useEffect(() => {
//     // Wait until fetchAllMachines is available and then create the chart
//     if (!isLoading && fetchAllMachines.length > 0) {
//       if (chartInstance.current) chartInstance.current.destroy();

//       const myChartRef = chartRef.current.getContext("2d");

//       chartInstance.current = new Chart(myChartRef, {
//         type: "doughnut",
//         data: {
//           labels: ["Ok", "Low", "Empty", "Error"],
//           datasets: [
//             {
//               data: [
//                 getOKStockMachines(),
//                 getLowStockCount(),
//                 getEmptyStockMachines(),
//                 getERRORStockMachines(),
//               ],
//               backgroundColor: [
//                 "rgb(56, 255, 159)",
//                 "rgb(255, 215, 64)",
//                 "rgb(255, 82, 82)",
//                 "#4b42f5",
//               ],
//             },
//           ],
//         },
//         options: {
//           responsive: true,
//           maintainAspectRatio: true,
//           plugins: {
//             legend: {
//               position: 'bottom',
//             },
//           },
//         },
//       });
//     }

//     // Clean up the chart instance on unmount
//     return () => chartInstance.current && chartInstance.current.destroy();
//   }, [fetchAllMachines, isLoading]); // Update chart when data changes

//   if (isLoading) {
//     return <div>Loading...</div>;  // Display a loading message
//   }

//   return (
//     <div style={{ width: "100%", height: "auto" }}>
//       <canvas ref={chartRef} />
//     </div>
//   );
// }



import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const API = "https://mcuconnect.com/dashboard-api/machines";

export default function DoughnutChart() {
  const [fetchAllMachines, setFetchAllMachines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // Loading state
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchMachines(API);
  }, []);

  const fetchMachines = async (url) => {
    try {
      const res = await fetch(url);
      const machines = await res.json();
      setFetchAllMachines(machines);
      setIsLoading(false);  // Set loading to false once data is fetched
    } catch (error) {
      console.error(error);
    }
  };

  // Function to get the count of idle machines
  const getIdleMachinesCount = () => {
    return fetchAllMachines.filter(
      (machine) => machine.burning_status?.trim().toLowerCase() === 'idle'
    ).length;
  };

  // Function to get the count of burning machines
  const getBurningMachinesCount = () => {
    return fetchAllMachines.filter(
      (machine) => machine.burning_status?.trim().toLowerCase() === 'burning'
    ).length;
  };

  useEffect(() => {
    // Wait until fetchAllMachines is available and then create the chart
    if (!isLoading && fetchAllMachines.length > 0) {
      if (chartInstance.current) chartInstance.current.destroy();

      const myChartRef = chartRef.current.getContext("2d");

      chartInstance.current = new Chart(myChartRef, {
        type: "doughnut",
        data: {
          labels: ["Idle", "Burning"],
          datasets: [
            {
              data: [
                getIdleMachinesCount(),
                getBurningMachinesCount(),
              ],
              backgroundColor: [
                "rgb(56, 255, 159)",  // Green for idle
                "rgb(255, 82, 82)",    // Red for burning
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: {
              position: 'bottom',
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  const label = context.label || '';
                  const value = context.raw || 0;
                  const total = context.dataset.data.reduce((a, b) => a + b, 0);
                  const percentage = Math.round((value / total) * 100);
                  return `${label}: ${value} (${percentage}%)`;
                }
              }
            }
          },
        },
      });
    }

    // Clean up the chart instance on unmount
    return () => chartInstance.current && chartInstance.current.destroy();
  }, [fetchAllMachines, isLoading]); // Update chart when data changes

  if (isLoading) {
    return <div>Loading...</div>;  // Display a loading message
  }

  return (
    <div style={{ width: "100%", height: "auto" }}>
      <canvas ref={chartRef} />
    </div>
  );
}