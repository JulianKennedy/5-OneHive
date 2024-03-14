import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { getWeight } from '../Service';
import './weighttrendpagestyle.css';


const WeightTrendModal = ({onClose, hiveName}) => {
  const [weightData, setWeightData] = useState([]);
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
  

  // get weight when hive name changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const data = await getWeight(hiveName);
      console.log(data);
      const formattedData = data.map(item => ({ ...item, Timestamp: formatDate(item.Timestamp) }));
      setWeightData(formattedData);
    };
    fetchData();
  }, [hiveName]); 


  // update chart when weight changes
  useEffect(() => {
      const timestamps = weightData.map(data => data.Timestamp);
      const weigh = weightData.map(data => data.Weight);

      const weighChart = new Chart("weighChart", {
        type: 'line',
        data: {
          labels: timestamps, 
          datasets: [{
            backgroundColor: "rgba(0,0,255,0.1)", 
            borderColor: "rgba(0,0,255,1.0)",
            data: weigh,
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
                text: 'Weight (kg)'
              }
            }
          }
        }
      });

      return () => weighChart.destroy();

  }, [weightData]);


  return (
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Weight Trends</h2>
          <canvas ref={chartRef} id="weighChart" width="800" height="400"></canvas>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="close-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default WeightTrendModal;
