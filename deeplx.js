import fetch from 'node-fetch';
import http from 'http'
import {
  PORT,
  PROXYS
} from './config.js'
import {getBody} from './util.js'

let times = 0
const COUNT = PROXYS.length
let lastRequestTime = Date.now()

const server = http.createServer(async function (req, res) {
  let proxy = PROXYS[0]
  if(Date.now() - lastRequestTime < 1000){
    proxy = PROXYS[times++ % COUNT]
  }
  req.pipe()
  lastRequestTime = Date.now()
  const url = proxy + req.url
  console.log(`| ${resp.status} | ${times} | ${resp.statusText} | ${url} `);
  const body = await getBody(req)
  const resp = await fetch(url,{
    method:'post',
    body:body,
    headers:{
      'content-type':'application/json',
    }
  })
  res.setHeader('Content-Type', 'application/json');
  res.statusCode = 200
  res.end(await resp.text())
})


server.listen(PORT,()=>{
  console.log("listening on port " + PORT)
});



