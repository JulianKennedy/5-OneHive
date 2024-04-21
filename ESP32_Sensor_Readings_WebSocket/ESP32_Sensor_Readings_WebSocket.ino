#include <Arduino.h>
#include <WiFi.h>
#include <Wire.h>
#include <Arduino_JSON.h>
#include <ArduinoWebsockets.h>
#include <SparkFun_PHT_MS8607_Arduino_Library.h>
#include <arduinoFFT.h>
#include <ESP32_FastPWM.h>

#define LED 26
#define LoadCellOnePin 35
#define LoadCellTwoPin 32
#define AudioPinIn 34
#define PWM_CHANNEL 0  
#define PWM_PIN 15

//FFT Constants
#define SAMPLES         1024          // Must be a power of 2
#define SAMPLING_FREQ   10000         // Hz, must be 40000 or less due to ADC conversion time. Determines maximum frequency that can be analysed by the FFT Fmax=sampleF/2.
#define AMPLITUDE       1000          // Depending on your audio source level, you may need to alter this value. Can be used as a 'sensitivity' control.
//#define NUM_BANDS       16            // To change this, you will need to change the bunch of if statements describing the mapping from bins to bands
#define FILTER          100           // Used as a crude noise filter, values below this are ignored
#define CLIP_FREQ       1500

//PWM Constants
#define _PWM_LOGLEVEL_ 4 //for PWM debug messages 

// Max resolution is 20-bit
// Resolution 65536 (16-bit) for lower frequencies, OK @ 1K
// Resolution  4096 (12-bit) for lower frequencies, OK @ 10K
// Resolution  1024 (10-bit) for higher frequencies, OK @ 50K
// Resolution  256  ( 8-bit)for higher frequencies, OK @ 100K, 200K
// Resolution  128  ( 7-bit) for higher frequencies, OK @ 500K
int PWM_resolution       = 12;

float frequency = 1000.0f;
float dutyCycle = 0.0f; 
uint8_t channel = 0;

//creates pwm instance
ESP32_FAST_PWM* PWM_Instance;


using namespace websockets;
WebsocketsClient socket; 

//enter the ssid and password of the network where the websocket server is connected
const char* ssid = "Local_Test_Network"; 
const char* password = "Interneto42";

const char* WebSocketServer= "ws://128.189.232.54:443/"; //Enter server adress
boolean connected = false; //bool to store the state of the connection

// Json Variable to Hold Sensor Readings
JSONVar sensor_readings;

//Sensor Class
MS8607 barometricSensor;

// Sampling and FFT variables
unsigned int sampling_period_us;
byte peak[] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};              // The length of these arrays must be >= NUM_BANDS
int oldBarHeights[] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
int bandValues[] = {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
double vReal[SAMPLES];
double vImag[SAMPLES];
unsigned long newTime;
ArduinoFFT<double> FFT = ArduinoFFT<double>(vReal, vImag, SAMPLES, SAMPLING_FREQ);

void setup()
{
  
  //Setup Serial Communication
  Wire.begin(); 
  Serial.begin(115200);
  
  //Setup the Sensor 
  SetupTemperatureSensor();

  //Setup LoadCell Pins
  //pinMode(LoadCellOnePin, INPUT); 
  //pinMode(LoadCellTwoPin, INPUT);

  
  //Setup Wifi Connection
  connectWiFi();
    
  //connect to WebSocket and run callback when messages are received 
  connectToWebSocket();
  socket.onMessage(handleMessage);
  socket.onEvent(handleEvent);
  
  //Setup PWM pin
  //assigns PWM frequency of 1.0 KHz and a duty cycle of 0%, channel 0, 12-bit resolution
  //Serial.println("Setting up PWM...");
  //PWM_Instance = new ESP32_FAST_PWM(PWM_PIN, frequency, dutyCycle, channel, PWM_resolution);
  //Serial.println("PWM Successful");

  sampling_period_us = round(1000000 * (1.0 / SAMPLING_FREQ));

  //Flash LED
  //pinMode(LED, OUTPUT);
}


void loop()
{
  if(!connected) { 
    Serial.println("Connecting to WebSocket server");
    connectToWebSocket();
  }
  socket.poll(); 

  String JSON_data = getSensorReadings(); 
  socket.send(JSON_data); 
 
  delay(5000); 
  
}

void handleMessage(WebsocketsMessage message) { 
  Serial.println(message.data());
}

void handleEvent(WebsocketsEvent event, WSInterfaceString data) { 
  switch (event) {
    case WebsocketsEvent::ConnectionOpened:
      Serial.println("WebSocket connection established");
      //socket.send("Hello, server!");
      connected = true;
      break;
    case WebsocketsEvent::ConnectionClosed:
      Serial.println("WebSocket connection closed");
      connected = false;
      break;
    case WebsocketsEvent::GotPing:
      Serial.println("Received ping");
      break;
    case WebsocketsEvent::GotPong:
      Serial.println("Received pong");
      break;
    default:
      break;
  }
}

void connectWiFi() {
  WiFi.mode(WIFI_OFF);
  delay(1000);
  //This line hides the viewing of ESP as wifi hotspot
  WiFi.mode(WIFI_STA);
  
  WiFi.begin(ssid, password);
  Serial.println("Connecting to WiFi");
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print("...");
  }
    
  Serial.print("\nConnected to : "); Serial.println(ssid);
  Serial.print("IP address: "); Serial.println(WiFi.localIP());
}

void connectToWebSocket() { 
  connected = socket.connect(WebSocketServer);
  if (connected) { 
    Serial.println("Connected");
  }
  else { 
    Serial.println("Connection failed.");
  }
}

// Get Sensor Readings and return JSON object
String getSensorReadings(void){
  sensor_readings["Temperature"] = String(barometricSensor.getTemperature());
  sensor_readings["Humidity"] =  String(barometricSensor.getHumidity());
  sensor_readings["Weight"] = String(random(-600,700)/1000.0 + 30);
  sensor_readings["Frequency"] = String(getPeakFrequency());
  String jsonString = JSON.stringify(sensor_readings);
  Serial.println(jsonString); 
  return jsonString;
}

void SetupTemperatureSensor(void){
  Serial.println("Starting MS8607 setup...");
  if (barometricSensor.begin() == false)
  {
    Serial.println("MS8607 sensor did not respond. Trying again...");
    if (barometricSensor.begin() == false)
    {
      Serial.println("MS8607 sensor did not respond. Please check wiring.");
      while (1);
    }
  }

  // Example: set the humidity resolution
  //int err = barometricSensor.set_humidity_resolution(MS8607_humidity_resolution_8b); // 8 bits
  int err = barometricSensor.set_humidity_resolution(MS8607_humidity_resolution_12b); // 12 bits
  if (err != MS8607_status_ok)
  {
    Serial.print("Problem setting the MS8607 sensor humidity resolution. Error code = ");
    Serial.println(err);
    Serial.println("Freezing.");
    while (1);
  }

  // Turn the humidity sensor heater OFF
  // The TE examples say that get_compensated_humidity and get_dew_point will only work if the heater is OFF
  err = barometricSensor.disable_heater();
  if (err != MS8607_status_ok)
  {
    Serial.print("Problem disabling the MS8607 humidity sensor heater. Error code = ");
    Serial.println(err);
    Serial.println("Freezing.");
    while (1);
  }
  Serial.println("MS8607 setup done!");
}

long readWeight(void)
{ 
  float weight1 = 0; 
  float weight2 = 0; 

  //read voltages from the pins
  weight1 = analogRead(LoadCellOnePin)*(50/3.3); //read LC1
  Serial.print("LC1:");   Serial.println(weight1);
  weight2 = analogRead(LoadCellTwoPin)*(50/3.3); //read LC2
  Serial.print("LC1:");   Serial.println(weight2);
  Serial.print("Total:"); Serial.println(weight1 + weight2);

  return (weight1 + weight2);
}

double getPeakFrequency(void)
{
  double max_abscissa = 0; 
  float maxData = 0; 
  double abscissa = 0;

  // Sample the audio pin
  for (int i = 0; i < SAMPLES; i++) {
    newTime = micros();
    vReal[i] = analogRead(AudioPinIn); // A conversion takes about 9.7uS on an ESP32
    vImag[i] = 0;
    while ((micros() - newTime) < sampling_period_us) { /* chill */ }
  }

  // Compute FFT
  FFT.dcRemoval();
  FFT.windowing(FFT_WIN_TYP_HAMMING, FFT_FORWARD);
  FFT.compute(FFT_FORWARD);
  FFT.complexToMagnitude();

  for (uint16_t i = 0; i < SAMPLES/2; i++){
    abscissa = ((i * 1.0 * SAMPLING_FREQ) / SAMPLES);
    if(abscissa > FILTER){
      if(vReal[i] >= maxData){
        max_abscissa = abscissa; 
        maxData = vReal[i];
      }
    }
  }

  if(max_abscissa > CLIP_FREQ)
    abscissa = CLIP_FREQ; 
  else 
    abscissa = max_abscissa; 
  return abscissa;
}
