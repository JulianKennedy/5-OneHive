import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { GetHumidityTime, getHumidity } from '../Service';
import './humidtrendpagestyle.css';
import { duration, formatMs } from '@material-ui/core';
import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';


const HumidTrendModal = ( hiveName, time ) => {
  const [humidityData, setHumidityData] = useState([]);
  const chartRef = useRef(null); 
  const modalRef = useRef();


  // change date hiveName.time format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  

  // get humidity when hive name changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      console.log(hiveName)
      if(hiveName.time.includes('ALL')) {
        const data1 = await getHumidity(hiveName.hiveName);
        //format the date in the data again
        data1.forEach(item => item.Timestamp = formatDate(item.Timestamp));
        setHumidityData(data1);
        return;
      }
      else {
        const data = await GetHumidityTime(hiveName.hiveName, hiveName.time);
      if (data.length === 0) {
        // No data to display so return start date and end date with no data to still have the chart displayed
        // time is a string with the number of days and the word days
        const startDate = new Date();
        //parse until the space to get the number of days
        const days = parseInt(hiveName.time.substring(0, hiveName.time.indexOf(' ')));
        const endDate = new Date();
        //determine if it is days or years
        if (hiveName.time.includes('DAY')) {
          endDate.setDate(startDate.getDate() - days);
        }
        else if (hiveName.time.includes('YEAR')) {
          endDate.setFullYear(startDate.getFullYear() - days);
        }
        const formattedData = [{ Timestamp: formatDate(endDate) }, { Timestamp: formatDate(startDate) }];
        setHumidityData(formattedData);
      }
      else {
        const startDate = new Date();
        //parse until the space to get the number of days
        const days = parseInt(hiveName.time.substring(0, hiveName.time.indexOf(' ')));
        const endDate = new Date();
        //determine if it is days or years
        if (hiveName.time.includes('DAY')) {
          endDate.setDate(startDate.getDate() - days);
        }
        else if (hiveName.time.includes('YEAR')) {
          endDate.setFullYear(startDate.getFullYear() - days);
        }
                //format the date in the data again
                data.forEach(item => item.Timestamp = formatDate(item.Timestamp));

        //only include data between the start and end date
        const formattedData = data.filter(item => new Date(item.Timestamp) <= startDate);
        const formattedData2 = formattedData.filter(item => new Date(item.Timestamp) >= endDate);

        // add the start and end date to the data if they are not already in the data
        if (!formattedData2.some(item => item.Timestamp === formatDate(startDate))) {
          formattedData2.push({ Timestamp: formatDate(startDate) });
        }
        if (!formattedData2.some(item => item.Timestamp === formatDate(endDate))) {
          formattedData2.push({ Timestamp: formatDate(endDate) });
        }
        //sort the data by date again
        formattedData2.sort((a, b) => new Date(a.Timestamp) - new Date(b.Timestamp));


        setHumidityData(formattedData2);

        const intervalId = setInterval(fetchData, 0.5 * 60 * 1000); // 5 minutes interval

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
      }
    }
    };
    fetchData();
  }, [hiveName.hiveName, hiveName.time]);



  // update chart when humidity changes
  useEffect(() => {
      const timestamps = humidityData.map(data => data.Timestamp);
      const hums = humidityData.map(data => data.Humidity);

      const humChart = new Chart("humChart", {
        type: 'line',
        data: {
          labels: timestamps, 
          datasets: [{
            backgroundColor: "rgba(0,0,255,0.1)", 
            borderColor: "rgba(0,255,0,1.0)",
            data: hums,
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
                text: 'Humidity (%)'
              }
            }
          }
        }
      });

      return () => humChart.destroy();

  }, [humidityData]);


  return (
    
        <div className="modal-cont">
          <h2 className="modal-title">Humidity Trends</h2>
          <canvas ref={chartRef} id="humChart" width="800" height="400"></canvas>
        </div>

  )

}

export default HumidTrendModal;
