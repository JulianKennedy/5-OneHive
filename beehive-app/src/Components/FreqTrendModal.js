import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { GetFrequencyTime, getFrequency } from '../Service';
import './freqtrendpagestyle.css';


const FrequncyTrendModal = (hiveName, time) => {
  const [frequencyData, setFrequencyData] = useState([]);
  const chartRef = useRef(null);
  const modalRef = useRef();


  // change date time format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };


  // get frequency when hive name changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      console.log(hiveName)
      console.log(time)
      if (hiveName.time.includes('ALL')) {
        const data1 = await getFrequency(hiveName.hiveName);
        //format the date in the data again
        data1.forEach(item => item.Timestamp = formatDate(item.Timestamp));
        setFrequencyData(data1);
        return;
      }
      else {
        const data = await GetFrequencyTime(hiveName.hiveName, hiveName.time);

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
          setFrequencyData(formattedData);
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
          if (data.length > 0) {
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

          setFrequencyData(formattedData2);
        }
        }
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 0.5 * 10 * 1000); // 5 minutes interval

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, [hiveName.hiveName, hiveName.time]);



  // update chart when frequency changes
  useEffect(() => {
    const timestamps = frequencyData.map(data => data.Timestamp);
    const freq = frequencyData.map(data => data.Frequency);

    const freqChart = new Chart("freqChart", {
      type: 'line',
      data: {
        labels: timestamps,
        datasets: [{
          backgroundColor: "rgba(0,0,255,0.1)",
          borderColor: "rgba(255,0,0,1.0)",
          data: freq,
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
              text: 'Frequency (Hz)'
            }
          }
        }
      }
    });

    return () => freqChart.destroy();

  }, [frequencyData]);


  return (
    <div className="modal-cont">
      <h2 className="modal-title">Frequency Trends</h2>
      <canvas ref={chartRef} id="freqChart" width="800" height="400"></canvas>
    </div>
  )

}

export default FrequncyTrendModal;
