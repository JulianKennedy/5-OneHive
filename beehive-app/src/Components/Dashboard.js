import React, { useEffect } from 'react';
import { MemberHeader } from './MemberHeader';
import './dashboardstyle.css';
import { getHives, getAllHivesOfUser, getUserHivesOrGetHiveData } from '../Service';
import Header from './Header';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import AddHive from './AddHive';
import EditHive from './EditHive';
import { Link } from "react-router-dom";
import TempTrendModal from './TempTrendModal';
import HumidTrendModal from './HumidTrendModal';
import FrequncyTrendModal from './FreqTrendModal';
import WeightTrendModal from './WeightTrendModal';
import { useNavigate } from "react-router-dom";
import { Footer } from './Footer';
import { Grid, Card, CardContent, Button } from '@mui/material';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


let currHive = {};

const Dashboard = () => {
  const [hive_name, setHiveName] = useState("");
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [weight, setWeight] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [hives, setHives] = useState([]);
  const [hiveInfo, setHiveInfo] = useState([]);
  const [addHiveModal, setAddHiveModal] = useState(false);
  const [editHiveModal, setEditHiveModal] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [tempTrendModal, setTempTrendModal] = useState(false);
  const [humTrendModal, setHumTrendModal] = useState(false);
  const [freqTrendModal, setFreqTrendModal] = useState(false);
  const [weighTrendModal, setWeighTrendModal] = useState(false);
  const [date, setDate] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("7 DAY"); // Default time constraint
  const navigate = useNavigate();

  const timeRanges = [
    { label: 'Day', value: '1 DAY'},
    { label: 'Week', value: '7 DAY' },
    { label: 'Month', value: '30 DAY' },
    { label: 'Year', value: '1 YEAR' },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const userHivesData = await getUserHivesOrGetHiveData("getUserHives", "");
      setHives(userHivesData);

      const updatedHiveInfo = [];
      for (let i = 0; i < userHivesData.length; i++) {
        const data = await getUserHivesOrGetHiveData("getHiveData", userHivesData[i].Hive_Name);
        if (data.length > 0) {
          updatedHiveInfo.push({
            Hive_Name: userHivesData[i].Hive_Name,
            temperature: data[0].Temperature,
            humidity: data[0].Humidity,
            weight: data[0].Weight,
            frequency: data[0].Frequency,
          });
        }
        else {
          updatedHiveInfo.push({
            Hive_Name: userHivesData[i].Hive_Name,
            temperature: 0,
            humidity: 0,
            weight: 0,
            frequency: 0,
          });

        }
      }
      setHiveInfo(updatedHiveInfo);

      if (userHivesData.length > 0 && hive_name === "") {
        setHiveName(userHivesData[0].Hive_Name);
        await fetchHiveData(userHivesData[0].Hive_Name);
      }

      const usernameData = await getUserHivesOrGetHiveData("getUsername", "");
      setFirstName(usernameData[0].FirstName);
      setLastName(usernameData[0].LastName);
    };

    fetchData();
  }, [navigate, selectedTimeRange]);

  const handleSubmit = async (name) => {
    setHiveName(name);
    await fetchHiveData(name);
  };

  const handleTimeRangeChange = (e) => {
    setSelectedTimeRange(e.target.value);
  };


  const fetchHiveData = async (name) => {
    const data = await getUserHivesOrGetHiveData("getHiveData", name);
    if (data.length > 0) {
      setTemperature(data[0].Temperature);
      setHumidity(data[0].Humidity);
      setWeight(data[0].Weight);
      setFrequency(data[0].Frequency);

      const dateOptions = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
      const formattedDate = new Date().toLocaleString('en-US', dateOptions);
      setDate(formattedDate);

      document.documentElement.style.setProperty(`--temp`, `'${data[0].Temperature}'`)
      document.documentElement.style.setProperty(`--hum`, `'${data[0].Humidity}'`)
      document.documentElement.style.setProperty(`--tempnum`, `${data[0].Temperature}%`)
      document.documentElement.style.setProperty(`--humnum`, `${data[0].Humidity}%`)
      document.documentElement.style.setProperty(`--weight`, `'${data[0].Weight}'`);
      document.documentElement.style.setProperty(`--freq`, `'${data[0].Frequency}'`);
      document.documentElement.style.setProperty(`--weightnum`, `${data[0].Weight}%`);
      document.documentElement.style.setProperty(`--freqnum`, `${data[0].Frequency}%`);

    } else {
      setTemperature(0);
      setHumidity(0);
      setWeight(0);
      setFrequency(0);
      setDate("Never");
      document.documentElement.style.setProperty(`--temp`, `'0'`)
      document.documentElement.style.setProperty(`--hum`, `'0'`)
      document.documentElement.style.setProperty(`--tempnum`, `0%`)
      document.documentElement.style.setProperty(`--humnum`, `0%`)
      document.documentElement.style.setProperty(`--weight`, `'0'`)
      document.documentElement.style.setProperty(`--freq`, `'0'`)
      document.documentElement.style.setProperty(`--weightnum`, `0%`)
      document.documentElement.style.setProperty(`--freqnum`, `0%`)
    }
  };

  const addHiveClick = () => {
    setAddHiveModal(true);
  };

  const handleSelectHive = (name) => {
    setHiveName(name);
  };

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

  return (
    <div className="MemberDashboardPage" id="dash" style={{ width: '100%', height: '100%', background: 'white' }}>
      <MemberHeader className="header-instance"></MemberHeader>
      <div className="name" style={{ width: 600, height: 131, left: 75, top: 216, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 64, border: '5px solid black' }}>
        {firstName}'s Beehives
      </div>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: '450px' }}>
        {hives.map((hive, index) => (
          <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
            <div onClick={() => handleSelectHive(hive.Hive_Name)} style={{ cursor: 'pointer' }}>
              <Card
                variant={hive.Hive_Name === hive_name ? "outlined" : "elevation"}
                sx={{
                  maxWidth: 240,
                  borderRadius: 10,
                  margin: 'auto',
                  marginBottom: '30px',
                  textAlign: 'center',
                  backgroundColor: hive.Hive_Name === hive_name ? '#ffccff' : '#e5bcff',
                  position: 'relative'
                }}
              >
                {/* Add icon or badge for errors */}
                <div style={{
                  position: 'absolute',
                  top: 30, // Adjust the top position as needed
                  right: 10, // Adjust the right position as needed
                  transform: 'translate(-50%, -50%)', // Center the indicator
                  backgroundColor: (hiveInfo[index]?.temperature < 34.5 || hiveInfo[index]?.temperature > 35.5 ||
                    hiveInfo[index]?.humidity < 50 || hiveInfo[index]?.humidity > 60 ||
                    hiveInfo[index]?.weight < 5 || hiveInfo[index]?.weight > 40 ||
                    hiveInfo[index]?.frequency < 190 || hiveInfo[index]?.frequency > 250) ?
                    'red' : 'transparent',
                  color: 'white',
                  borderRadius: '50%',
                  width: 25,
                  height: 25,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  {(hiveInfo[index]?.temperature < 34.5 || hiveInfo[index]?.temperature > 35.5 ||
                    hiveInfo[index]?.humidity < 50 || hiveInfo[index]?.humidity > 60 ||
                    hiveInfo[index]?.weight < 5 || hiveInfo[index]?.weight > 40 ||
                    hiveInfo[index]?.frequency < 190 || hiveInfo[index]?.frequency > 250) && (
                      <span>!</span>
                    )}
                </div>
                <CardContent>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>{hive.Hive_Name}</div>
                    <div style={{ marginBottom: '10px' }}>
                      <img src={require('./img/beehive_animated.png')} alt="Beehive" style={{ width: '100px', height: '100px', objectFit: 'contain' }} />
                    </div>
                  </div>
                  <div className="hive-info-container" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className="info-column">
                      <div>Temperature:</div>
                      <div>{hiveInfo[index]?.temperature}℃</div>
                      <div>Humidity:</div>
                      <div>{hiveInfo[index]?.humidity}%</div>
                    </div>
                    <div className="info-column">
                      <div>Weight:</div>
                      <div>{hiveInfo[index]?.weight} kg</div>
                      <div>Frequency:</div>
                      <div>{hiveInfo[index]?.frequency} Hz</div>
                    </div>
                  </div>
                  <Button
                    variant="outlined"
                    onClick={() => editHive(currHive = hive)}
                    sx={{
                      mt: 2,
                      color: '#6c3483', // Text color
                      borderColor: '#6c3483', // Border color
                      '&:hover': {
                        backgroundColor: '#6c3483', // Hover background color
                        color: '#fff', // Hover text color
                      },
                    }}
                  >
                    Edit Hive
                  </Button>

                </CardContent>
              </Card>




            </div>
          </Grid>
        ))}
      </Grid>
      <Button
        variant="contained"
        color="primary"
        onClick={addHiveClick}
        sx={{
          mt: 2,
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          marginBottom: '30px',
          marginTop: '30px',
          backgroundColor: '#6c3483', // Background color
          color: '#fff', // Text color
          '&:hover': {
            backgroundColor: '#4a235a', // Hover background color
          }
        }}
      >
        Add Hive
      </Button>
      <div className="Time" style={{ width: 'auto', height: 2, left: 75, position: 'absolute', textAlign: 'center', color: 'black', fontSize: 36, fontFamily: 'Newsreader', fontWeight: '700', wordWrap: 'break-word' }}>
        {hive_name} updated: {date}
      </div>
      <div className="time-dropdown" style={{ position: 'relative', marginTop: '100px'}}>
        <FormControl style={{width: '20%', left: '75%', right: '5%'}}>
          <InputLabel id="time-constraint-label">Time Constraint</InputLabel>
          <Select
            labelId="time-constraint-label"
            id="time-constraint"
            value={selectedTimeRange}
            onChange={handleTimeRangeChange}
          >
            {timeRanges.map((range) => (
              <MenuItem key={range.value} value={range.value}>{range.label}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Grid container spacing={3} justifyContent="center" alignItems="center" style={{ marginTop: '60px' }}>
        {/* Grid of Charts */}
        <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <h3>Temperature Trend</h3>
              <TempTrendModal showModal={tempTrendModal} setShowModal={setTempTrendModal} time={selectedTimeRange} hiveName={hive_name}/>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <h3>Humidity Trend</h3>
              <HumidTrendModal showModal={humTrendModal} setShowModal={setHumTrendModal} time={selectedTimeRange} hiveName={hive_name} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <h3>Frequency Trend</h3>
              <FrequncyTrendModal showModal={freqTrendModal} setShowModal={setFreqTrendModal} time={selectedTimeRange} hiveName={hive_name} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={6} lg={6}>
        <Card sx={{ boxShadow: 3 }}>
            <CardContent>
              <h3>Weight Trend</h3>
              <WeightTrendModal showModal={weighTrendModal} setShowModal={setWeighTrendModal} time={selectedTimeRange} hiveName={hive_name} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>


      {addHiveModal && <AddHive onClose={async () => {
        setAddHiveModal(false);
        const userHivesData = await getUserHivesOrGetHiveData("getUserHives", "");
        setHives(userHivesData);

        const updatedHiveInfo = [];
        for (let i = 0; i < userHivesData.length; i++) {
          const data = await getUserHivesOrGetHiveData("getHiveData", userHivesData[i].Hive_Name);
          if (data.length > 0) {
            updatedHiveInfo.push({
              Hive_Name: userHivesData[i].Hive_Name,
              temperature: data[0].Temperature,
              humidity: data[0].Humidity,
              weight: data[0].Weight,
              frequency: data[0].Frequency,
            });
          }
          else {
            updatedHiveInfo.push({
              Hive_Name: userHivesData[i].Hive_Name,
              temperature: 0,
              humidity: 0,
              weight: 0,
              frequency: 0,
            });

          }
        }
        setHiveInfo(updatedHiveInfo);

        if (userHivesData.length > 0) {
          setHiveName(userHivesData[0].Hive_Name);
          await fetchHiveData(userHivesData[0].Hive_Name);
        }
      }} style={{zIndex: 99999}}/>}
      <div className="f" style={{ marginTop: '100px' }}>
        <Footer />
      </div>
      {editHiveModal && <EditHive onClose={async () => {
        setEditHiveModal(false);
        const data = await getUserHivesOrGetHiveData("getUserHives", "");
        console.log(data);
        setHives(data);
        if (data.length > 0) {
          setHiveName(data[0].Hive_Name);
          await fetchHiveData(data[0].Hive_Name);
        }
      }} oldHive={currHive} style={{zIndex: 99999}}/>}
    </div>
  );
};

export default Dashboard;
