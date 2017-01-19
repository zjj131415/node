let http = require('http');
let url = 'http://www.imooc.com/video/7965';

http.get(url, (res) =>{
  let html = '';
  res.on('data', (data) =>{
    html += data;
  })

  res.on('end', () => {
    console.log(html)
  })
}).on('error', () => console.log('获取课程失败!'))
