import React, { useEffect } from 'react';
import { MemberHeader } from './MemberHeader';
import './dashboardstyle.css';
import { getHives, getAllHivesOfUser, getUserHivesOrGetHiveData } from '../Service';
import Header from './Header';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AddHive from './AddHive';
import EditHive from './EditHive';
import { Link } from "react-router-dom";
import TempTrendModal from './TempTrendModal';
import HumidTrendModal from './HumidTrendModal';
import FrequncyTrendModal from './FreqTrendModal';
import WeightTrendModal from './WeightTrendModal';
import { useNavigate } from "react-router-dom";


let currHive = {};

const Dashboard = () => {
  const [hive_name, setHiveName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [hives, setHives] = useState([]);
  const [addHiveModal, setAddHiveModal] = useState(false);
  const [editHiveModal, setEditHiveModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tempTrendModal, setTempTrendModal] = useState(false);
  const [humTrendModal, setHumTrendModal] = useState(false);
  const [freqTrendModal, setFreqTrendModal] = useState(false);
  const [weighTrendModal, setWeighTrendModal] = useState(false);
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    // user must be authenticated to view page!
    if (!localStorage.getItem('token')) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      const userHivesData = await getUserHivesOrGetHiveData("getUserHives", "");
      setHives(userHivesData);
      if (userHivesData.length > 0) {
        setHiveName(userHivesData[userHivesData.length - 1].Hive_Name);
        await fetchHiveData(userHivesData[userHivesData.length - 1].Hive_Name);
      }
      const usernameData = await getUserHivesOrGetHiveData("getUsername", "");
      setFirstName(usernameData[0].FirstName);
      setLastName(usernameData[0].LastName);
    };

    fetchData();
  }, [navigate]);

  const handleSubmit = async (name) => {
    setHiveName(name);
    await fetchHiveData(name);
  };

  const fetchHiveData = async (name) => {
    const data = await getUserHivesOrGetHiveData("getHiveData", name);
    if (data.length > 0) {
      console.log(data);
      setTemperature(data[data.length - 1].Temperature);
      setHumidity(data[data.length - 1].Humidity);
      setWeight(data[data.length - 1].Weight);
      setFrequency(data[data.length - 1].Frequency);
      //setDate(convertDate(new Date()).split("T")[0] + " " + convertDate(new Date()).split("T")[1].split(".")[0]);
      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
      const formattedDate = new Date().toLocaleString('en-US', dateOptions);
      setDate(formattedDate);

      document.documentElement.style.setProperty(`--temp`, `'${data[data.length - 1].Temperature}'`)
      document.documentElement.style.setProperty(`--hum`, `'${data[data.length - 1].Humidity}'`)
      document.documentElement.style.setProperty(`--tempnum`, `${data[data.length - 1].Temperature}%`)
      document.documentElement.style.setProperty(`--humnum`, `${data[data.length - 1].Humidity}%`)

      // weight and frequency! temp display and can be changed
      document.documentElement.style.setProperty(`--weight`, `'${data[data.length - 1].Weight}'`);
      document.documentElement.style.setProperty(`--freq`, `'${data[data.length - 1].Frequency}'`);
      document.documentElement.style.setProperty(`--weightnum`, `${data[data.length - 1].Weight}%`);
      document.documentElement.style.setProperty(`--freqnum`, `${data[data.length - 1].Frequency}%`);

    }
    else {
      setTemperature(0);
      setHumidity(0);
      setWeight(0);
      setFrequency(0);
      setDate("Never");
      document.documentElement.style.setProperty(`--temp`, `'0'`)
      document.documentElement.style.setProperty(`--hum`, `'0'`)
      document.documentElement.style.setProperty(`--tempnum`, `0%`)
      document.documentElement.style.setProperty(`--humnum`, `0%`)

      // also temporary?? not sure how this should look.
      document.documentElement.style.setProperty(`--weight`, `'0'`)
      document.documentElement.style.setProperty(`--freq`, `'0'`)
      document.documentElement.style.setProperty(`--weightnum`, `0%`)
      document.documentElement.style.setProperty(`--freqnum`, `0%`)
    }
  };

  const addHiveClick = () => {
    setAddHiveModal(true);
  };

  // const convertDate = (d) => {
  //   const z = n => ('0' + n).slice(-2);
  //   let off = d.getTimezoneOffset();
  //   const sign = off < 0 ? '+' : '-';
  //   off = Math.abs(off);
  //   return new Date(d.getTime() - (d.getTimezoneOffset() * 60000)).toISOString().slice(0, -1) + sign + z(off / 60 | 0) + ':' + z(off % 60);
  // };

  const editHive = () => {
    setEditHiveModal(true);
  }

  const tempTrendClick = () => {
    setTempTrendModal(true);
  }

  const humTrendClick = () => {
    setHumTrendModal(true);
  }

  const freqTrendClick = () => {
    setFreqTrendModal(true);
  }

  const weighTrendClick = () => {
    setWeighTrendModal(true);
  }

  // const navigateWithParameter = (url, parameter) => {
  //   window.location.href =  url + "?" +(parameter)
  // }


  console.log(hives);

  return (
    <div className="MemberDashboardPage" id="dash" style={{ width: 1440, height: 3200, position: 'relative', background: 'white' }}>
      <div className="login-button" style={{
        width: 600,
        height: 131,
        left: 75,
        top: 216,
        position: 'absolute',
        textAlign: 'center',
        color: 'black',
        fontSize: 64,
        border: '5px solid black',
      }}>{firstName} {lastName}'s Beehives</div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start', gap: '20px', paddingLeft: '75px', paddingTop: '420px' }}>
        {hives.map((hive, index) => (
          <div key={index} style={{ width: '240px', height: '190px', position: 'relative' }}>
            <button
              className="login-button"
              style={{
                width: '100%',
                height: '100%',
                padding: '10px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
                //border: '5px solid light grey',
                color: 'black',
                textDecoration: 'none',
              }}
              onClick={() => handleSubmit(hive.Hive_Name)}
            >
              <img
                src={require('./img/beehive_animated.png')}
                alt="Beehive"
                style={{
                  width: '120x',
                  height: '120px',
                  marginBottom: 'auto',
                }}
              />
              {hive.Hive_Name}
            </button>
            <input
              type="image"
              src={require('./img/edit.png')}
              alt="Edit"
              className="edit-button"
              style={{
                width: '20px',
                height: '20px',
                position: 'absolute',
                right: '9px',
                top: '9px',
                backgroundColor: 'white',
                padding: '3px',
                border: '2px solid black',
              }}

              onClick={() => editHive(currHive = hive)}
            />
          </div>
        ))}
      </div>
      <button
        className="button-plus"
        style={{
          left: `${334 * hives.length - 200}px`,
          top: '475px',
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
      <div className="Time" style={{ width: 'auto', height: 2, left: 75, top: 675, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>
        {hive_name} updated: {date}
      </div>
      <MemberHeader className="header-instance"></MemberHeader>
      <a className="temp-trend-button" onClick={() => tempTrendClick()} >
        <div className="progress-bar">
        </div>
        <div className="Temperature">
          Temperature
          {temperature < 34.5 || temperature > 35.5 ? (
            date !== "Never" && (
              <div className="danger-alert">
                {temperature < 34.5 ? 'Low Temperature!' : 'High Temperature!'}
              </div>
            )
          ) : null}
        </div>
      </a>
      <a className="hum-trend-button" onClick={() => humTrendClick()} >
        <div className="progress-bar2">
        </div>
        <div className="Humidity">
          Humidity
          {humidity < 50 || humidity > 60 ? (
            date !== "Never" && (
              <div className="danger-alert">
                {humidity < 50 ? 'Low Humidity!' : 'High Humidity!'}
              </div>
            )
          ) : null}
        </div>
      </a>
      <a className="weigh-trend-button" onClick={() => weighTrendClick()} >
        <div className="progress-bar3">
        </div>
        <div className="Weight">
          Weight
          {weight < 5 || weight > 40 ? (
            date !== "Never" && (
              <div className="danger-alert">
                {weight < 5 ? 'Low Weight!' : 'High Weight!'}
              </div>
            )
          ) : null}
        </div>
      </a>
      <a className="freq-trend-button" onClick={() => freqTrendClick()} >
        <div className="progress-bar4">
        </div>
        <div className="Frequency">
          Frequency
          {frequency < 190 || frequency > 250 ? (
            date !== "Never" && (
              <div className="danger-alert">
                {frequency < 190 ? 'Low Frequency!' : 'High Frequency!'}
              </div>
            )
          ) : null}
        </div>
      </a>
      {/* <a className="freq-trend-button" onClick={() => freqTrendClick()} >
        <div className="Frequency150Hz" style={{ width: 166, height: 170, left: 1006, top: 1326, position: 'absolute', textAlign: 'center' }}>Frequency<br />{frequency} Hz</div>
        <img className="Image3" style={{ width: 208, height: 170, left: 1199, top: 1326, position: 'absolute' }} src="https://via.placeholder.com/208x170" />
      </a>
      <a className="weigh-trend-button" onClick={() => weighTrendClick()} >
        <div className="Weight221kg" style={{ width: 166, height: 170, left: 1006, top: 1043, position: 'absolute', textAlign: 'center' }}>Weight<br />{weight}kg<br /></div>
        <img className="Image2" style={{ width: 217, height: 238, left: 1190, top: 981, position: 'absolute' }} src="https://pnghq.com/wp-content/uploads/bee-hive-png-free-images-with-transparent-background-70545.png" />
      </a> */}

      {addHiveModal && <AddHive onClose={async () => {
        setAddHiveModal(false);
        const data = await getUserHivesOrGetHiveData("getUserHives", "");
        console.log(data);
        setHives(data);
        if (data.length > 0) {
          await fetchHiveData(data[data.length - 1].Hive_Name);
        }
      }} />}

      {editHiveModal && <EditHive onClose={async () => {
        setEditHiveModal(false);
        const data = await getUserHivesOrGetHiveData("getUserHives", "");
        console.log(data);
        setHives(data);
        if (data.length > 0) {
          await fetchHiveData(data[data.length - 1].Hive_Name);
        }
      }} oldHive={currHive} />}

      {tempTrendModal && <TempTrendModal onClose={async () => {
        setTempTrendModal(false);
      }
      } hiveName={hive_name} />}

      {humTrendModal && <HumidTrendModal onClose={async () => {
        setHumTrendModal(false);
      }
      } hiveName={hive_name} />}

      {freqTrendModal && <FrequncyTrendModal onClose={async () => {
        setFreqTrendModal(false);
      }
      } hiveName={hive_name} />}

      {weighTrendModal && <WeightTrendModal onClose={async () => {
        setWeighTrendModal(false);
      }
      } hiveName={hive_name} />}

    {freqTrendModal && <FrequncyTrendModal onClose={async () => {
      setFreqTrendModal(false);
    }
    } hiveName={hive_name} />}

    {weighTrendModal && <WeightTrendModal onClose={async () => {
      setWeighTrendModal(false);
    }
    } hiveName={hive_name} />}

    <Link to="/map" className="map-button" style={{ left: 1000, top: 1000, position: 'absolute', backgroundColor: 'white', border: 'none', display: 'flex', color: 'black', textDecoration: 'none', fontSize: '50px' }}>
      Map
      </Link>

    </div>
  );
};

export default Dashboard;
