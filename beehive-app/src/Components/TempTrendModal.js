import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { GetTemperatures } from '../Service';
import './temptrendpagestyle.css';


const TempTrendModal = ({onClose, hiveName}) => {
  const [temperatureData, setTemperatureData] = useState([]);
  const chartRef = useRef(null); 
  const modalRef = useRef();


  // close modal on click outside
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };


  // change date time format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  

  // get temperature when hive name changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const data = await GetTemperatures(hiveName);
      console.log(data);
      const formattedData = data.map(item => ({ ...item, Timestamp: formatDate(item.Timestamp) }));
      setTemperatureData(formattedData);
    };
    fetchData();
  }, [hiveName]); 


  // update chart when temperature changes
  useEffect(() => {
      const timestamps = temperatureData.map(data => data.Timestamp);
      const temperatures = temperatureData.map(data => data.Temperature);

      const tempChart = new Chart("tempChart", {
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
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Temperature Trends</h2>
          <canvas ref={chartRef} id="tempChart" width="800" height="400"></canvas>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="close-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default TempTrendModal;
