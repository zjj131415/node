let http = require('http');
let querystring = require('querystring');
let postData = querystring.stringify({
  qzreferrer:'http://qzs.qq.com/qzone/msgboard/msgbcanvas.html#page=1',
  content:'这是nodejs评论',
  hostUin:2658227892,
  uin:2471810637,
  format:'fs',
  inCharset:'utf-8',
  outCharset:'utf-8',
  iNotice:1,
  ref:'qzone',
  json:1,
  g_tk:939259345
})

let options = {
  hostname: 'h5.qzone.qq.com',
  path: '/proxy/domain/m.qzone.qq.com/cgi-bin/new/add_msgb?g_tk=939259345',
  method: 'POST',
  headers: {
    'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Encoding':'gzip, deflate',
    'Accept-Language':'zh-CN,zh;q=0.8',
    'Cache-Control':'max-age=0',
    'Connection':'keep-alive',
    'Content-Length': postData.length,
    'Content-Type':'application/x-www-form-urlencoded',
    'Cookie':'pac_uid=0_586894a6ed1b8; eas_sid=O1g4a8m352q4H93299Y9x9f2P5; _ga=GA1.2.1395326144.1483284176; __Q_w_s_hat_seed=1; tvfe_boss_uuid=2a3f6bbb46abae22; __Q_w_s__QZN_TodoMsgCnt=1; LOL_a20170106magic_467627364=1; o_cookie=467627364; pgv_pvid=4376417542; p_skey=XBTdjEn2JF3atKDhZy*wEyYmKUlunPNN0MtgD1WtYHs_; p_uin=o0467627364; pt4_token=T4JtU**i9a2CDT41fggai*uIV**v9BQ2M5OVSt-zOWo_; pgv_info=ssid=s4836603263; pgv_pvi=3051473920; pgv_si=s1834787840; RK=RdfOwaNef4; pt2gguin=o0467627364; uin=o0467627364; skey=@evFuMH0jo; ptisp=ctc; ptcz=507f4ed01e1e4d049c9097d5c49a161738dd99c4e9648b534c7c99664d86dabb; Loading=Yes; qqmusic_uin=; qqmusic_key=; qqmusic_fromtag=; qzmusicplayer=qzone_player_467627364_1484753520220; QZ_FE_WEBP_SUPPORT=1; cpu_performance_v8=2; rv2=8074D1094FF5B23F9EC8840458B385B8ADADAFA8F7D7CA98A7; property20=092D0FAA479F6E79CCEBF321CD18CE54D2F1C147850C29085A5905784938BBB67037E4D463B64AD6; qzspeedup=sdch',
    'Host':'h5.qzone.qq.com',
    'Origin':'http://qzs.qq.com',
    'Referer':'http://qzs.qq.com/qzone/msgboard/msgbcanvas.html',
    'Upgrade-Insecure-Requests':'1',
    'User-Agent':'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36',
  }
}
let req =  http.request(options, (res) => {
  console.log(res.statusCode)
  console.log(JSON.stringify(res.headers))

  res.on('data', (chunk) => {
    console.log(typeof chunk);
  } )
  res.on('end', () => {
    console.log('评论完毕')
  })
})


req.on('error', (e) => {
  console.log('评论失败' + e.message)
})

req.write(postData);
req.end();
