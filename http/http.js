let http = require('http');
let url = 'http://www.imooc.com/video/7965';

/**
 * 创建promise实例
 * @param  {[param]}  [usr]
 * @return {[Promiswe]}     [description]
 */
let getPageAsync = (url) => new Promise((resolve, reject) => {
  http
    .get(url, (res) => {
      let html = '';
      res
        .on('data', (data) => {
          html += data;
        })
        .on('end', () => resolve(html))
    })
    .on('error', () => reject('获取课程失败!'))
})
getPageAsync(url)
  .then((value) => console.log(value))
