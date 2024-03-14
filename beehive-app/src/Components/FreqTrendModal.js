import React, { useState, useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'
import { getFrequency } from '../Service';
import './freqtrendpagestyle.css';


const FrequncyTrendModal = ({onClose, hiveName}) => {
  const [frequencyData, setFrequencyData] = useState([]);
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
  

  // get frequency when hive name changes
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const data = await getFrequency(hiveName);
      console.log(data);
      const formattedData = data.map(item => ({ ...item, Timestamp: formatDate(item.Timestamp) }));
      setFrequencyData(formattedData);
    };
    fetchData();
  }, [hiveName]); 


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
            borderColor: "rgba(0,0,255,1.0)",
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
    <div className="container" ref={modalRef} onClick={closeModal}>
      <div className="modal">
        <div className="modal-content">
          <h2 className="modal-title">Frequency Trends</h2>
          <canvas ref={chartRef} id="freqChart" width="800" height="400"></canvas>
          <div className="modal-buttons">
            <button type="button" onClick={onClose} className="close-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  )

}

export default FrequncyTrendModal;
