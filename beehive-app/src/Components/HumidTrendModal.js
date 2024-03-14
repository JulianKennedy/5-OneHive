import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { getHumidity } from '../Service';
import './humidtrendpagestyle.css';


const HumidTrendModal = ({onClose, hiveName}) => {
  const [humidityData, setHumidityData] = useState([]);
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
  

  // get humidity when hive name changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const data = await getHumidity(hiveName);
      console.log(data);
      const formattedData = data.map(item => ({ ...item, Timestamp: formatDate(item.Timestamp) }));
      setHumidityData(formattedData);
    };
    fetchData();
  }, [hiveName]); 


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
            borderColor: "rgba(0,0,255,1.0)",
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
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Humidity Trends</h2>
          <canvas ref={chartRef} id="humChart" width="800" height="400"></canvas>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="close-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default HumidTrendModal;
