let fs = require('fs');

fs.readFile('logo.png', (err, origin_buff) => {
  console.log(Buffer.isBuffer(origin_buff));
  fs.writeFile('log_buffer.png', origin_buff,  (err) => {

  })

  let base64Image = origin_buff.toString('base64');
  console.log(base64Image);
  let decodedImage = new Buffer(base64Image, 'base64');
  console.log('\n' + Buffer.compare(origin_buff, decodedImage) + '\n')

  fs.writeFile('logo_decoded.png', decodedImage, (err) => {
    if(err) console.log(err)
  })
})
