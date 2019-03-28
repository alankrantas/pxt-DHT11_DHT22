DHT11_DHT22.queryData(
DHTtype.DHT11,
DigitalPin.P0,
true,
true,
true
)
if (DHT11_DHT22.readDataSuccessful()) {
    basic.showString("T: " + ("" + DHT11_DHT22.readData(dataType.temperature)).substr(0, 2))
    basic.showString("H: " + ("" + DHT11_DHT22.readData(dataType.humidity)).substr(0, 2))
}
