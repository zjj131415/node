// 慕课网  爬虫

let http = require('http');
let cheerio = require('cheerio');
let url = 'http://www.imooc.com/learn/348';

let courseData = [];
let filterChapters = (html) => {
  let $ = cheerio.load(html);
  let chapters = $('.chapter');

  // 遍历章节数组
  chapters.each(function(){
    let chapter = $(this);
    let chapterTitle = chapter.find('strong').text();
    let videos = chapter.find('.video').children('li');
    let chapterData = {
      chapterTitle: chapterTitle,
      videos: []
    }

    // 遍历章节数组
    videos.each(function(){
      let video = $(this).find('.J-media-item');
      let videoTitle =  video.text()
      // 获取id 替换id前面的字符窜  两种方法替换
      // let videoId = video.attr('href').replace('/video/', '');
      let videoId = video.attr('href').split('/video/')[1];
      chapterData.videos.push({
        title: videoTitle,
        id: videoId
      })
    })
    courseData.push(chapterData)
  })
  return courseData;
}

// 输出课程函数
let printCourseInfo = (courseData) => {
  // let courseData = courseData;
  courseData.forEach((item) => {
    let chapterTitle = item.chapterTitle;
    console.log(chapterTitle + '\n')
    item.videos.forEach((vido) => {
      console.log(' 【' + vido.id + '】' + vido.title + '\n')
    })
  })
}

// node http模块
http
  .get(url, (res) => {
    let html = '';
    res.on('data', (data) => {
      html += data;
    })
    res.on('end', () => {
      let courseData = filterChapters(html);
      printCourseInfo(courseData)
    })
  })
  .on('error', (e) => console.log(e))
