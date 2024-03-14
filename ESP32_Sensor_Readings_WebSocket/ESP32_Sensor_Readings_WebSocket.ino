#include <WiFi.h>
#include <Wire.h>
#include <Arduino_JSON.h>
#include <ArduinoWebsockets.h>
#include <SparkFun_PHT_MS8607_Arduino_Library.h>

#define LED 26
#define LoadCellPositivePin 7 
#define LoadCellNegativePin 8



using namespace websockets;
WebsocketsClient socket; 

//enter the ssid and password of the network where the websocket server is connected
const char* ssid = "Local_Test_Network"; 
const char* password = "Interneto42";

const char* WebSocketServer= "ws://128.189.233.188:443/"; //Enter server adress
boolean connected = false; //bool to store the state of the connection

// Json Variable to Hold Sensor Readings
JSONVar sensor_readings;

//Sensor Class
MS8607 barometricSensor;

void setup()
{
  
  //Setup Serial Communication
  Wire.begin(); 
  Serial.begin(115200);
  
  //Setup Wifi Connection
  connectWiFi();

  //Setup the Sensor 
  SetupTemperatureSensor();

  //Setup LoadCell Pins
  pinMode(LoadCellPositivePin, INPUT); 
  pinMode(LoadCellNegativePin, INPUT);
    
  //connect to WebSocket and run callback when messages are received 
  connectToWebSocket();
  socket.onMessage(handleMessage);
  socket.onEvent(handleEvent);

  //Flash LED
  pinMode(LED, OUTPUT);
}


void loop()
{
  digitalWrite(LED, HIGH);

  if(!connected) { 
    Serial.println("Connecting to WebSocket server");
    connectToWebSocket();
  }
  socket.poll(); 

  //socket.send("Attempting to send JSON:");
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
String getSensorReadings(){
  sensor_readings["Temperature"] = String(barometricSensor.getTemperature());
  sensor_readings["Humidity"] =  String(barometricSensor.getHumidity());
  sensor_readings["Pressure"] = String(-3/100.0F);
  sensor_readings["Weight"] = String(readWeight());
  sensor_readings["Frequency"] = String(-5);
  String jsonString = JSON.stringify(sensor_readings);
  Serial.println(jsonString); 
  return jsonString;
}

void SetupTemperatureSensor(){
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

long readWeight()
{ 
  float voltage_out = 0; 
  float weight = 0; 

  //read voltages from the pins
  //take the differential output and 
  voltage_out = (analogRead(LoadCellPositivePin)-analogRead(LoadCellNegativePin))*(3.3/1023);

  //
  weight = voltage_out*(50/3.3); 

  return weight;
}