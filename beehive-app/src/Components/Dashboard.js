import React, { useEffect } from 'react';
import { MemberHeader } from './MemberHeader';
import './dashboardstyle.css';
import { getHives, getAllHivesOfUser, getUserHivesOrGetHiveData } from '../Service';
import Header from './Header';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddHive from './AddHive';
import EditHive from './EditHive';

let currHive = {};

const Dashboard = () => {

const [hive_name, setHiveName] = React.useState("");
const [temperature, setTemperature] = React.useState(0);
const [humidity, setHumidity] = React.useState(0);
const [weight, setWeight] = React.useState(0);
const [frequency, setFrequency] = React.useState(0);
const [hives, setHives] = React.useState([]);
const [addHiveModal, setAddHiveModal] = React.useState(false);
const [date, setDate] = React.useState("");
const [editHiveModal, setEditHiveModal] = React.useState(false);
const [username, setUsername] = React.useState("");

useEffect(() => {
  const fetchData = async () => {
    const data = await getUserHivesOrGetHiveData("getUserHives", "");
    console.log(data);
    setHives(data);
    if (data.length > 0) {
      console.log(data[0].Hive_Name);
      await fetchHiveData(data[0].Hive_Name);
    }
    const data2 = await getUserHivesOrGetHiveData("getUsername", "");
    console.log(data2);
    setUsername(data2[0].User_Name);
  };

  fetchData();
}, []);

const handleSubmit = async (name) => {
  setHiveName(name);
  await fetchHiveData(name);
};

const fetchHiveData = async (name) => {
  const data = await getUserHivesOrGetHiveData("getHiveData",name);
  if (data.length > 0) {
    console.log(data);
    setTemperature(data[0].Temperature);
    setHumidity(data[0].Humidity);
    setWeight(data[0].Weight);
    setFrequency(data[0].Frequency);
    setDate(convertDate(data[0].Timestamp));
    document.documentElement.style.setProperty(`--temp`,`'${data[0].Temperature}'`)
    document.documentElement.style.setProperty(`--hum`,`'${data[0].Humidity}'`)
    document.documentElement.style.setProperty(`--tempnum`,`${data[0].Temperature}%`)
    document.documentElement.style.setProperty(`--humnum`,`${data[0].Humidity}%`)
  }
  else{
    setTemperature(0);
    setHumidity(0);
    setWeight(0);
    setFrequency(0);
    setDate("Never");
    document.documentElement.style.setProperty(`--temp`,`'0'`)
    document.documentElement.style.setProperty(`--hum`,`'0'`)
    document.documentElement.style.setProperty(`--tempnum`,`0%`)
    document.documentElement.style.setProperty(`--humnum`,`0%`)
  }
};

const addHiveClick = () => {
  setAddHiveModal(true);
};

const convertDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const editHive = () => {
  setEditHiveModal(true);
}

console.log(hives);
  
  return (
    <div className="MemberDashboardPage" id="dash" style={{ width: 1440, height: 3200, position: 'relative', background: 'white' }}>
      <div className="Rectangle2" style={{ width: 1440, height: 222, left: 0, top: 2978, position: 'absolute', background: '#D9D9D9' }} />
      <div className="JohnSBeehive" style={{ width: 600, height: 131, left: 75, top: 216, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 64, fontFamily: 'Newsreader', fontWeight: '600', wordWrap: 'break-word' }}>{username}'s Beehive</div>

      {hives.map((hive, index) => (
        <div>
        <button key={index}
          className="login-button"
          style={{
            left: `${75 + 334 * index}px`,
            top: '420px',
            width: '240px',
            height: '72px',
            padding: '10px',
            borderRadius: '4px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            display: 'flex',
            border: '5px solid #FF0000',
            color: 'black',
            textDecoration: 'none',
            position: 'absolute'
          }}
          onClick={() => handleSubmit(hive.Hive_Name)}>
          {hive.Hive_Name}
        </button>       
         <input type="image" className="edit-button" src={require('./img/edit.png')} style={{width: '20px', height:'20px', position: 'absolute', left: `${250 + 334 * index}px`, top: '442px', backgroundColor: 'white', padding: '2px', border: '2px solid black' }} onClick={() => editHive(currHive=hive)}/>
         </div>
      ))}
      <button
        className="button-plus"
        style={{
          left: `${75 + 334 * hives.length}px`,
          top: '425px',
          backgroundColor: 'white',
          border: 'none',
          display: 'flex',
          color: 'black',
          textDecoration: 'none',
          position: 'absolute',
          fontSize: '50px'
        }}
        onClick={() => addHiveClick()}>
        +
      </button>
      <div className="Time" style={{ width: 500, height: 2, left: 75, top: 800, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>Updated: {date}</div>
      <div className="Temperature" style={{ width: 279, height: 77, left: 122, top: 1419, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>Temperature</div>
      <div className="Weight221kg" style={{ width: 166, height: 170, left: 1006, top: 1043, position: 'absolute', textAlign: 'center' }}>Weight<br />{weight}kg<br /></div>
      <div className="Frequency150Hz" style={{ width: 166, height: 170, left: 1006, top: 1326, position: 'absolute', textAlign: 'center' }}>Frequency<br />{frequency} Hz</div>
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

      {addHiveModal && <AddHive onClose={async () => {
      setAddHiveModal(false);
      const data = await getUserHivesOrGetHiveData("getUserHives", "");
      console.log(data);
      setHives(data);
      if (data.length > 0) {
        await fetchHiveData(data[0].Hive_Name);
      }
    }} />}

    {editHiveModal && <EditHive onClose={async () => {
      setEditHiveModal(false);
      const data = await getUserHivesOrGetHiveData("getUserHives", "");
      console.log(data);
      setHives(data);
      if (data.length > 0) {
        await fetchHiveData(data[0].Hive_Name);
      }
    }} oldHive={currHive} />}
    </div>
  );
};

export default Dashboard;
