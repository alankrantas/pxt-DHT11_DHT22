# BBC micro:bit MakeCode editor extension for DHT11 and DHT22 humidity/temperature sensors

[DHT11](https://www.mouser.com/ds/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf) and [DHT22](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf) are two popular sensors among microcontroller users, especially the cheap DHT11s. DHT22s cost more but give better data resolution.

My codes are based on [MonadnockSystems/pxt-dht11](https://github.com/MonadnockSystems/pxt-dht11) but improved the pin pull-up time calculating method (based on some Arduino examples) with additional features.

Add this extension by go to Advanced -> +extension and copy/paste [https://github.com/alankrantas/pxt-DHT11_DHT22](https://github.com/alankrantas/pxt-DHT11_DHT22) into the search box. Press enter and click the extension to download it.

![img_0001](https://user-images.githubusercontent.com/44191076/53887169-aae7d600-405c-11e9-9fd4-688eacbf0721.JPG)

![img_0002](https://user-images.githubusercontent.com/44191076/53887223-cf43b280-405c-11e9-97a0-495904cf6cae.JPG)

## Blocks

The extension can be used for either DHT11 or DHT22 sensors. Use the first block to read data (it is recommended to wait between queries; 1 second for DHT11 and 2 seconds for DHT22), then use the second one to read humidity level (%) or temperature (celsius).

This extension also verifies checksum from sensors. If checksum is wrong, you'll get -999 for both temperature and humidity readings.

![1](https://user-images.githubusercontent.com/44191076/53888212-dd92ce00-405e-11e9-9947-6cbb0caf10a0.jpg)

![microbit-screenshot](https://user-images.githubusercontent.com/44191076/53931035-7f053880-40ce-11e9-9509-dff5edd7da0e.png)

You can also choose to output data via serial port:

```
DHT11 query completed in 25848 microseconds                   
Checksum ok                   
Humidity: 77 %                
Temperature: 22.01 *C         
----------------------------------------
DHT11 query completed in 25849 microseconds                   
Checksum ok                   
Humidity: 77 %                
Temperature: 22.01 *C         
----------------------------------------
DHT11 query completed in 25838 microseconds                   
Checksum ok                   
Humidity: 77 %                
Temperature: 22 *C            
----------------------------------------
DHT11 query completed in 25861 microseconds                   
Checksum ok                   
Humidity: 77 %                
Temperature: 22 *C            
----------------------------------------
```

```
DHT22 query completed in 26162 microseconds                   
Checksum ok                   
Humidity: 74.500000000000001 %
Temperature: 21.899999999999999 *C                            
----------------------------------------
DHT22 query completed in 26162 microseconds                   
Checksum ok                   
Humidity: 74.299999999999997 %
Temperature: 21.899999999999999 *C                            
----------------------------------------
DHT22 query completed in 26120 microseconds                   
Checksum ok                   
Humidity: 74.099999999999992 %
Temperature: 21.899999999999999 *C                            
----------------------------------------
DHT22 query completed in 26048 microseconds                   
Checksum ok                   
Humidity: 74 %                
Temperature: 21.899999999999999 *C                            
----------------------------------------
```

## Sensor versions and wiring

There are two types of DHT11/DHT22s, one without PCB boards and have 4 pins; another have PCB boards, built-in pull up resistors and only 3 pins. Personally I would recommend you to use PCB versions.

For the PCB version it's easy: Vcc (+) to 3.3V or 5V (both works), GND (-) to GND, Data (out) to any GPIO pins you like.

![dht11-pinout-for-three-pin-and-four-pin-types-2](https://user-images.githubusercontent.com/44191076/53887826-0ebece80-405e-11e9-997b-a9f1b5e67a41.jpg)

Be noted that some PCB version sensors may have different order of pins.

If you are using the 4-pin version, you'll need to add a resistor (in my test 220 Ω - 10 KΩ works under 3.3V; above that the sensor won't response) between Vcc and Data to pull up the voltage of the data pin. Or you can simply use the pull up option in the query block - the micro:bit has internal resistors about 12-13 KΩ.

The third pin on the 4-pin sensor from the left is not used.

![untitled sketch_bb](https://user-images.githubusercontent.com/44191076/53887940-40379a00-405e-11e9-9129-5bdb6262e8a3.png)

If a hardware pull-up resistor already exists, use the internal pull up resistor dosen't seems to affect results.

## License

MIT

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

