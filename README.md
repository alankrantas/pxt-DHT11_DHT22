# BBC micro:bit MakeCode editor extension for DHT11 and DHT22 humidity/temperature sensors (BETA)

[DHT11](https://www.mouser.com/ds/2/758/DHT11-Technical-Data-Sheet-Translated-Version-1143054.pdf) and [DHT22](https://www.sparkfun.com/datasheets/Sensors/Temperature/DHT22.pdf) are two popular sensors among microcontroller users; especially DHT11, which is pretty cheap. DHT22 cost more and gave better data precision.

Add this extension by go to Advanced -> +extension and copy/paste [https://github.com/alankrantas/pxt-DHT11_DHT22](https://github.com/alankrantas/pxt-DHT11_DHT22) into the search box. Press enter and click the extension to download it.

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

There are two types of DHT11/DHT22s, one without PCB board and have 4 pins; another have PCB board, built-in pull up resistor and only 3 pins.

For the PCB version it's easy: Vcc (+) to 3.3V or 5V (both works, although 5V might work a bit better), GND (-) to GND, Data (out) to any GPIO pins you like.

![dht11-pinout-for-three-pin-and-four-pin-types-2](https://user-images.githubusercontent.com/44191076/53887826-0ebece80-405e-11e9-997b-a9f1b5e67a41.jpg)

Be noted that some PCB version sensors have slightly different order of pins.

If you are using the 4 pin version, you'll need to add a resistor (in my test 220 Ω - 10 KΩ works under 3.3V; above that the sensor won't response) between Vcc and Data to pull up the data pin. Or you can simply use the pull up option in the query block - the micro:bit has a internal resistor about 12-13 KΩ.

The third pin from the left is not used.

![untitled sketch_bb](https://user-images.githubusercontent.com/44191076/53887940-40379a00-405e-11e9-9129-5bdb6262e8a3.png)

If a hardware pull-up resistor already exists, set the internal pull up resistor dosen't seems to affect the results.



## In BETA testing

Since some DHT11s are known to be notoriously - I repeat, notoriously - inaccurate, especially the humidity part, and I only have limited sensor samples, the extension needs furthur testing to be absolutly sure if it's working like it should.

My code are based on [MonadnockSystems/pxt-dht11](https://github.com/MonadnockSystems/pxt-dht11) but improved the pin pull-up time calculating method. 

So far my both PCB version sensors worked well and gave consistent readings. I found two 4-pin DHT11s in my office as well, but their humidity reading are much lower than it should (probably already damaged), regardess what pull-up resistor I used. I would recommend buying PCB versions for your own usage.

I also gave up using the checksum data because my DHT22 always gave wrong checksums even though the humidity/temperature data looks legit. My DHT11s always gave correct checksums.



## License

MIT


## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)

