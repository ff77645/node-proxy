import fetch from 'node-fetch';
import http from 'http'
import {
  PORT,
  PROXYS
} from './config.js'
import {getBody} from './util'

let times = 0
const COUNT = PROXYS.length

const server = http.createServer(async function (req, res) {
  const url = PROXYS[times++ % COUNT] + req.url
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
  console.log(`| ${resp.status} | ${resp.statusText} | ${url} `);
})


server.listen(PORT,()=>{
  console.log("listening on port " + PORT)
});



