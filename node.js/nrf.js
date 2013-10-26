var noble = require('noble');

noble.on('stateChange', function(state) {
  if (state === 'poweredOn') {
    noble.startScanning([], true);
  } else {
    noble.stopScanning();
  }
});

noble.on('discover', function(peripheral) {
  if (peripheral.advertisement.localName !== 'nRF LE') {
    return;
  }

  console.log('peripheral discovered:');
  console.log('\thello my local name is:');
  console.log('\t\t' + peripheral.advertisement.localName);
  console.log('\there is my manufacturer data:');
  var manufacturerData = peripheral.advertisement.manufacturerData; 
  var humidity = manufacturerData.readFloatLE(0);
  var temperature = manufacturerData.readFloatLE(4);
  console.log('\t\t' + manufacturerData.toString('hex'));
  console.log('\t\thumidity = ' + humidity.toFixed(1) + '%');
  console.log('\t\ttemperature = ' + temperature.toFixed(1) + ' C');
  console.log();
});

