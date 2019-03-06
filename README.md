# BBC micro:bit MakeCode editor extension for DHT11 and DHT22 humidity/temperature sensors (BETA)

[DHT11](https://www.mouser.com/ds/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf) and [DHT22](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf) are two popular sensors among microcontroller users; especially DHT11, which is pretty cheap, although also more inaccurate. DHT22 cost more but have better data precision.

![img_0001](https://user-images.githubusercontent.com/44191076/53887169-aae7d600-405c-11e9-9fd4-688eacbf0721.JPG)

![img_0002](https://user-images.githubusercontent.com/44191076/53887223-cf43b280-405c-11e9-97a0-495904cf6cae.JPG)

The extension is appliable to DHT11 and DHT22. Use the first block to read data (it is recommended to wait between queries; 1 second for DHT11 and 2 seconds for DHT22), then use the second one to read humidity level (%) or temperature (Celsius).

![1](https://user-images.githubusercontent.com/44191076/53888212-dd92ce00-405e-11e9-9947-6cbb0caf10a0.jpg)

You can also output data to serial port:

```
DHT22 query completed in 24703 microseconds                   
Humidity: 69.500000000000001 %
Temperature: 23.1 'C          
------------------------------
DHT22 query completed in 26162 microseconds                   
Humidity: 71.500000000000003 %
Temperature: 23.3 'C          
------------------------------
DHT22 query completed in 26047 microseconds                   
Humidity: 69.400000000000003 %
Temperature: 23.3 'C          
------------------------------
DHT22 query completed in 26162 microseconds                   
Humidity: 68.700000000000001 %
Temperature: 23.3 'C          
------------------------------
DHT22 query completed in 26019 microseconds                   
Humidity: 68.099999999999996 %
Temperature: 23.3 'C          
------------------------------
DHT22 query completed in 26047 microseconds                   
Humidity: 67.599999999999997 %
Temperature: 23.3 'C          
------------------------------
```

The sensors have two types, one without PCB board and have 4 pins; another have PCB board, built-in pull up resistor and only 3 pins.

For the 3-pin version it's easy: Vcc (+) to 3.3V or 5V (both works, although 5V might work a bit better), GND (-) to GND, Data (out) to any GPIO pins you like.

![dht11-pinout-for-three-pin-and-four-pin-types-2](https://user-images.githubusercontent.com/44191076/53887826-0ebece80-405e-11e9-997b-a9f1b5e67a41.jpg)

If you are using the 4 pin version, you'll need to add a resistor (about 5-10 KΩ) between Vcc and Data to pull up the latter pin. Or you can simply use the pull up option in the block. (The micro:bit has a internal resistor about 12-13 KΩ.) The third pin from the left is not used.

![untitled sketch_bb](https://user-images.githubusercontent.com/44191076/53887940-40379a00-405e-11e9-9129-5bdb6262e8a3.png)



## BETA testing

Since DHT11s are notoriously inaccurate, and I only have limited sensor samples, the extension needs furthur testing to be sure if it's working like it should.

So far my both PCB version sensors worked and gave pretty consistent readings (the humidity level is a bit lower from my BME280 sensor). I have two 4-pin DHT11s (found in my office) as well, but only one of them gave more or less currect reading sometimes. I cannot be sure if they are already damaged or not.

I'd be appreciated if you can help me testing this extension and give me any feedbacks. If all goes well, I'll apply approval from the MakeCode team.



## License

MIT


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

