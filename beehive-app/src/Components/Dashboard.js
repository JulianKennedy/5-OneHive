import React, { useEffect } from 'react';
import { MemberHeader } from './MemberHeader';
import './dashboardstyle.css';
import { getHives, getAllHivesOfUser } from '../Service';
export const Dashboard = () => {

const [hive_name, setHiveName] = React.useState("Hive4");
const [temperature, setTemperature] = React.useState(0);
const [humidity, setHumidity] = React.useState(0);
const [weight, setWeight] = React.useState(0);
const [frequency, setFrequency] = React.useState(0);
const [hiveData, setHiveData] = React.useState([]);

useEffect(() => {
  const fetchData = async () => {
    const data = await getAllHivesOfUser();
    setHiveData(data);
    if (data.length > 0) {
      await updateHiveData(data[0].Hive_Name);
    }
  };

  fetchData();
}, []);

const handleSubmit = async (name) => {
  setHiveName(name);
  await updateHiveData(name);
};

const updateHiveData = async (name) => {
  const data = await getHives(name);
  if (data.length > 0) {
    const lastRow = data[data.length - 1];
    setTemperature(lastRow.Temperature);
    setHumidity(lastRow.Humidity);
    setWeight(lastRow.Weight);
    setFrequency(lastRow.Frequency);
  }
};

console.log(hiveData);
  
  document.documentElement.style.setProperty(`--temp`,`'${temperature}'`)
  document.documentElement.style.setProperty(`--hum`,`'${humidity}'`)
  document.documentElement.style.setProperty(`--tempnum`,`${temperature}%`)
  document.documentElement.style.setProperty(`--humnum`,`${humidity}%`)

  return (
    <div className="MemberDashboardPage" style={{ width: 1440, height: 3200, position: 'relative', background: 'white' }}>
      <div className="Rectangle2" style={{ width: 1440, height: 222, left: 0, top: 2978, position: 'absolute', background: '#D9D9D9' }} />
      <div className="JohnSBeehive" style={{ width: 473, height: 131, left: 75, top: 216, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 64, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word' }}>John’s Beehive</div>

      {hiveData.map((hive, index) => (
        <button key={index}
          className="login-button"
          style={{
            left: `${75 + 334 * index}px`,
            top: '420px',
            width: '220px',
              height: '72px',
              padding: '10px',
              borderRadius: '4px',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '10px',
              display: 'flex',
              border: '5px solid #FF0000',
              backgroundColor: '#e5bcff',
              color: 'black',
              textDecoration: 'none',
              position: 'absolute'
            }}
            onClick={() => handleSubmit(hive.Hive_Name)}>
            {hive.Hive_Name}
          </button>
        ))}

      <div style={{ width: 141, height: 72, left: 983, top: 420, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 48, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>+</div> 
      <div className="Temperature" style={{ width: 279, height: 77, left: 122, top: 1419, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>Temperature</div>
      <div className="Weight221kg" style={{ width: 166, height: 170, left: 1006, top: 1043, position: 'absolute', textAlign: 'center' }}>Weight<br/>{weight}kg<br/></div>
      <div className="Frequency150Hz" style={{ width: 166, height: 170, left: 1006, top: 1326, position: 'absolute', textAlign: 'center' }}>Frequency<br/>{frequency} Hz</div>
      <img className="Image2" style={{ width: 217, height: 238, left: 1190, top: 981, position: 'absolute' }} src="https://via.placeholder.com/217x238" />
      <img className="Image3" style={{ width: 208, height: 170, left: 1199, top: 1326, position: 'absolute' }} src="https://via.placeholder.com/208x170" />
      <MemberHeader className="header-instance"></MemberHeader>
      <div className="progress-bar" style={{ width: 349, height: 340, left: 81, top: 1012, position: 'absolute', borderRadius: 9999 }}>
        <progress value="5" min="0" max="100" style={{ visibility: "hidden", height: "0px", width: "0px" }}>5℃</progress>
      </div>
      <div className="progress-bar2" style={{ width: 349, height: 340, left: 570, top: 1021, position: 'absolute', borderRadius: 9999 }}>
        <progress className="progress2" value="75" min="0" max="100" style={{ visibility: "hidden", height: "0px", width: "0px" }}>75℃</progress>
      </div>
      <div className="Humidity" style={{ width: 279, height: 77, left: 592, top: 1428, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>Humidity</div>
    </div>
  );
};

export default Dashboard;



/*

// const getAllHives = async () => {
//   const hives = await getAllHivesOfUser();
//   console.log(hives);
//   return hives;
// }

  const handleSubmit = async (event) => {
    console.log("Something");
    event.preventDefault();
    setHiveName(event.target.value);
    console.log('Hive Name: ' + hive_name);
    const hiveData = await getHives(hive_name);
    console.log(hiveData); 
    const hiveDataLength = hiveData.length;
    const lastRow = hiveData[hiveDataLength-1];
    console.log(lastRow);
    setTemperature(lastRow.Temperature);
    setHumidity(lastRow.Humidity);
    setWeight(lastRow.Weight);
    setFrequency(lastRow.Frequency);

  };

  const handleStart = async () => {
  console.log("Something");
  console.log('Hive Name: ' + hive_name);
  const hiveData = await getHives(hive_name);
  console.log(hiveData); 
  const hiveDataLength = hiveData.length;
  const lastRow = hiveData[hiveDataLength-1];
  console.log(lastRow);
  setTemperature(lastRow.Temperature);
  setHumidity(lastRow.Humidity);
  setWeight(lastRow.Weight);
  setFrequency(lastRow.Frequency);
};

window.onload = async () => {
  const hiveData = await getAllHivesOfUser();
  console.log(hiveData);
  setHiveData(hiveData);

  const hiveDataLength = hiveData.length;

  //create buttons for each of the hives in the database

  //create a button for each of the hives in the database using html code
  //for each hive in the database, create a button with the name of the hive
  //when the button is clicked, the data of the hive is displayed

  for(let i = 0; i < hiveData.length; i++){
    const hive = hiveData[i];
    var x = 75 + 334*i;
    var y = 420 - 102*i;
    console.log(hive);
    //create the following html element:<a href="dashboard" className="login-button" type="button" color="#e5bcff" textDecoration="none" onClick={handleSubmit} style={{left: 75, top: 420, width: 220, height: 72, padding: 10, borderRadius: 4, justifyContent: 'center', alignItems: 'center', gap: 10, display: 'flex', border: '5px #FF0000 solid'}}>Hive1</a>);
    //the button is created using the hive name
    //when the button is clicked, the data of the hive is displayed
    const button = document.createElement("a");
    button.href = "dashboard";
    button.className = "login-button";
    button.type = "button";
    button.color = "#e5bcff";
    button.textDecoration = "none";
    button.onClick = {handleSubmit};
    button.style.left = x + "px";
    button.style.top = y + "px";
    button.style.width = "220px";
    button.style.height = "72px";
    button.style.padding = "10px";
    button.style.borderRadius = "4px";
    button.style.justifyContent = 'center';
    button.style.alignItems = 'center';
    button.style.gap = "10px";
    button.style.display = 'flex';
    button.style.border = '5px #FF0000 solid';
    button.innerHTML = hive.Hive_Name;
    //append the buttom to the MemberDashboardPage div
    document.getElementsByClassName("MemberDashboardPage")[0].appendChild(button);
  }

    handleStart();
  // }
}

*/