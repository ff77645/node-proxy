import fetch from 'node-fetch';
import http from 'http'
import {
  PORT,
  PROXYS
} from './config.js'
import {getBody} from './util.js'
import {exec} from 'child_process'
import path from 'path'

let times = 0
const COUNT = PROXYS.length
let lastRequestTime = Date.now()

const server = http.createServer(async function (req, res) {
  let proxy = PROXYS[0]
  if(Date.now() - lastRequestTime < 1000){
    proxy = PROXYS[times++ % COUNT]
  }
  lastRequestTime = Date.now()
  const url = proxy + req.url
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

exec(path.resolve(process.cwd(),'./exe/deeplx.exe'),(err,stdout,stderr)=>{
  if(err) throw err
  console.log(stdout);
})

server.listen(PORT,()=>{
  console.log("listening on port " + PORT)
});



