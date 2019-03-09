/**
 * MakeCode editor extension for DHT11 and DHT22 humidity/temperature sensors (BETA)
 * by Alan Wang
 */
//% block="DHT11/DHT22" weight=100 color=#ff8f3f icon="\uf043"
namespace DHT11_DHT22 {

    let _temperature: number = 0.0
    let _humidity: number = 0.0
    let _checksum: number = 0
    let _readSuccessful: boolean = false

    /**
    * Query data from DHT11/DHT22 sensor. If you are using 4 pins/no PCB board versions, you'll need to pull up the data pin. 
    * It is also recommended to wait 1 (DHT11) or 2 (DHT22) seconds between each query.
    */
    //% block="Query $DHT|Data pin $dataPin|Pin pull up $pullUp|Serial output $serialOtput|Wait 2 sec after query $wait"
    //% pullUp.defl=true
    //% serialOtput.defl=false
    //% wait.defl=true
    //% blockExternalInputs=true
    export function queryData(DHT: DHTtype, dataPin: DigitalPin, pullUp: boolean, serialOtput: boolean, wait: boolean) {

        //initialize
        let startTime: number = 0
        let endTime: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index = 0; index < 5; index++) resultArray.push(0)
        _humidity = -999.0
        _temperature = -999.0
        _checksum = 0

        startTime = input.runningTimeMicros()

        //request data
        pins.digitalWritePin(dataPin, 0) //begin protocol
        basic.pause(18)
        if (pullUp) pins.setPull(dataPin, PinPullMode.PullUp) //pull up data pin if needed
        pins.digitalReadPin(dataPin)
        while (pins.digitalReadPin(dataPin) == 1);
        while (pins.digitalReadPin(dataPin) == 0); //sensor response
        while (pins.digitalReadPin(dataPin) == 1); //sensor response

        //read data (5 bytes)
        for (let index = 0; index < 40; index++) {
            while (pins.digitalReadPin(dataPin) == 1);
            while (pins.digitalReadPin(dataPin) == 0);
            control.waitMicros(28)
            //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
            if (pins.digitalReadPin(dataPin) == 1) dataArray[index] = true
        }

        endTime = input.runningTimeMicros()

        //convert byte number array to integer
        for (let index = 0; index < 5; index++) {
            for (let index2 = 0; index2 < 8; index2++) {
                if (dataArray[8 * index + index2]) resultArray[index] += 2 ** (7 - index2)
            }
        }

        //verify checksum
        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        _checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        if (_checksum == checksumTmp) _readSuccessful = true

        //read data if checksum ok
        if (_readSuccessful) {
            if (DHT == DHTtype.DHT11) {
                //DHT11
                _humidity = resultArray[0] + resultArray[1] / 100
                _temperature = resultArray[2] + resultArray[3] / 100
            } else if (DHT == DHTtype.DHT22) {
                //DHT22
                let DHT22_dataArray: number[] = [0, 0]
                let tmpData: number = 1
                for (let index = 0; index <= 1; index++) {
                    for (let index2 = 0; index2 < 16; index2++) {
                        if (dataArray[16 * index + index2]) {
                            if (index == 1 && index2 == 0) {
                                tmpData = -1 //positive or negative temperature indicator
                            } else {
                                DHT22_dataArray[index] += 2 ** (15 - index2)
                            }
                        }
                    }
                }
                _humidity = DHT22_dataArray[0] / 10
                _temperature = DHT22_dataArray[1] / 10 * tmpData
            }
        }

        //serial output
        if (serialOtput) {
            let DHTstr: string = ""
            if (DHT == DHTtype.DHT11) {
                DHTstr = "DHT11"
            } else if (DHT == DHTtype.DHT22) {
                DHTstr = "DHT22"
            }
            serial.writeLine(DHTstr + " query completed in " + (endTime - startTime) + " microseconds")
            if (_readSuccessful) {
                serial.writeLine("Checksum ok")
                serial.writeLine("Humidity: " + _humidity + " %")
                serial.writeLine("Temperature: " + _temperature + " *C")
            } else {
                serial.writeLine("Checksum error")
            }

            serial.writeLine("----------------------------------------")
        }

        //wait 2 sec after query if needed
        if (wait) basic.pause(2000)

    }

    /**
    * Read humidity/temperature data from lastest query of DHT11/DHT22
    */
    //% block="Read $data"
    export function readData(data: dataType): number {
        let returnData: number = -999.0
        if (_readSuccessful) {
            switch (data) {
                case dataType.humidity:
                    returnData = _humidity
                    break
                case dataType.temperature:
                    returnData = _temperature
            }
        }
        return returnData
    }

    /**
    * Determind if last query is successful (checksum ok)
    */
    //% block="Last query successful?"
    export function readDataSuccessful(): boolean {
        return _readSuccessful
    }

}

enum DHTtype {
    //% block="DHT11"
    DHT11,
    //% block="DHT22"
    DHT22,
}

enum dataType {
    //% block="humidity"
    humidity,
    //% block="temperature"
    temperature,
}
