import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto';
import { GetTemperaturesTime, GetTemperatures } from '../Service';
import './temptrendpagestyle.css';

const TempTrendModal = ({ hiveName, time }) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const chartRef = useRef(null);
  const modalRef = useRef();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      console.log(hiveName)
      console.log(time)
      if (time.includes('ALL')) {
        const data1 = await GetTemperatures(hiveName);
        //format the date in the data again
        data1.forEach(item => item.Timestamp = formatDate(item.Timestamp));
        setTemperatureData(data1);
        return;
      }
      else {
        const data = await GetTemperaturesTime(hiveName, time);

        console.log(data);
        if (data.length === 0) {
          // No data to display so return start date and end date with no data to still have the chart displayed
          // time is a string with the number of days and the word days
          const startDate = new Date();
          //parse until the space to get the number of days
          const days = parseInt(time.substring(0, time.indexOf(' ')));
          const endDate = new Date();
          //determine if it is days or years
          if (time.includes('DAY')) {
            endDate.setDate(startDate.getDate() - days);
          }
          else if (time.includes('YEAR')) {
            endDate.setFullYear(startDate.getFullYear() - days);
          }
          const formattedData = [{ Timestamp: formatDate(endDate) }, { Timestamp: formatDate(startDate) }];
          setTemperatureData(formattedData);
        }
        else {
          const startDate = new Date();
          //parse until the space to get the number of days
          const days = parseInt(time.substring(0, time.indexOf(' ')));
          const endDate = new Date();
          //determine if it is days or years
          if (time.includes('DAY')) {
            endDate.setDate(startDate.getDate() - days);
          }
          else if (time.includes('YEAR')) {
            endDate.setFullYear(startDate.getFullYear() - days);
          }
          if (data.length > 0) {
            //format the date in the data again
            data.forEach(item => item.Timestamp = formatDate(item.Timestamp));
          
          // add the start and end date to the data if they are not already in the data
          if (!data.some(item => item.Timestamp === formatDate(startDate))) {
            data.push({ Timestamp: formatDate(startDate) });
          }
          if (!data.some(item => item.Timestamp === formatDate(endDate))) {
            data.push({ Timestamp: formatDate(endDate) });
          }
          //sort the data by date again
          data.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));
          //removes dates from data that are after today
          const today = new Date();
          const formattedData = data.filter(item => new Date(item.Timestamp) <= today);

          setTemperatureData(formattedData);
        }
        }
      }
    };
    fetchData();

    const intervalId = setInterval(fetchData, 0.5 * 10 * 1000); // 5 minutes interval

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [hiveName, time]);

  useEffect(() => {
    const timestamps = temperatureData.map(data => data.Timestamp);
    const temperatures = temperatureData.map(data => data.Temperature);

    const tempChart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          backgroundColor: "rgba(0,0,255,0.1)",
          borderColor: "rgba(0,0,255,1.0)",
          data: temperatures,
        }]
      },
      options: {
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date'
            },
            ticks: {
              autoSkip: true,
            }
          },
          y: {
            title: {
              display: true,
              text: 'Temperature (°C)'
            }
          }
        }
      }
    });

    return () => tempChart.destroy();

  }, [temperatureData]);

  return (
    <div className="modal-cont">
      <h2 className="modal-title">Temperature Trends</h2>
      <canvas ref={chartRef} id="tempChart" width="800" height="400"></canvas>
    </div>
  );
}

export default TempTrendModal;
