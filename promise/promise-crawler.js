let http = require('http');
let cheerio = require('cheerio');

let baseUrl = 'http://www.imooc.com/learn/';
let videosIds = [728, 637, 348, 259];

// 获取学习人数
// let getNumber = (id) => new Promise((resolve, reject) => {
//   let nuber = 0;
//   http
//     .get('http://www.imooc.com/course/AjaxCourseMembers?ids=' + id, (res) =>{
//       res.on('data', (data) => {
//         nuber = JSON.parse(data.toString('utf-8')).data[0].numbers;
//       })
//       res.on('end', () => {
//         return nuber;
//       })
//     })
//     .on('error', () => {
//       console.log('获取学习人数失败');
//     })
//   return nuber;
// })

// 处理hrtml函数
let filterChapters = (html) => {
  let $ = cheerio.load(html);
  let mainTitle = $('.course-infos .path span').text();
  let number = 0;
  let chapters = $('.chapter');
  let courseData = {
    mainTitle: mainTitle,
    number: number,
    chapterArray: [

    ]
  }
  chapters.each(function(item){
    let chapter = $(this);
    $('.icon-info').remove();
    $('.moco-btn-red').remove();
    let chapterTitle = chapter.find('strong').text();
    let videos = chapter.find('.video').children('li');
    courseData.chapterArray.push({
      chapterTitle: chapterTitle,
      videos: []
    })
    videos.each(function(item){
      let videoTitle = $(this).text().trim().replace(/\(.*?\)/g, "");
      let videoId =  $(this).attr('data-media-id');
      courseData.chapterArray.forEach((item) => {
        item.videos.push({
          id: videoId,
          title: videoTitle
        })
      })
    })
  })
  return courseData;
}

// 创建promise实例
let getPageAsync = (url) => new Promise((resolve, reject) => {
  // 建立服务
  http
    .get(url, (res) => {
      console.log('正在获取!')
      let html = '';
      res.on('data', (data) => {
        html += data;
      })

      res.on('end', () => {
        resolve(html)
      })
    })
    .on('error', (e) => {
      console.log(e)
      reject(e)
    })
})

// 获取Promise数组;
let fetchCourseArray = [];
videosIds.forEach((id) => {
  fetchCourseArray.push(getPageAsync(baseUrl + id));
})

let printCourseInfo = (courseData) => {
  courseData.forEach((item) => {
    console.log(item.number + '人学习过 ' + item.mainTitle)
  })
  courseData.forEach((item) => {
    console.log(item.mainTitle)
    item.chapterArray.forEach((item) => {
      console.log(item.chapterTitle)
      item.videos.forEach((item) => console.log('【' + item.id  + '】' + item.title) )
    })
  })
}
// promis
Promise
  .all(fetchCourseArray)
  .then((pages) => {
    let courseDataArray = [];
    pages.forEach((html) => {
      let courseData = filterChapters(html);
      courseDataArray.push(courseData);
    })
    courseDataArray.sort(function(a, b){
      return a.nuber < b.nuber
    })
    printCourseInfo(courseDataArray);
  },(e) => {
    console.log(e)
  })
