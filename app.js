import http from 'http'
import httpProxy from 'http-proxy'
import {exec} from 'child_process'
import path from 'path'
import {
  PORT,
  PROXYS
} from './config.js'

let times = 0
let lastRequestTime = Date.now()
const COUNT = PROXYS.length


const proxy = httpProxy.createProxyServer();
// 创建 HTTP 服务器

exec(path.resolve('./main'),(err,stdout,stderr)=>{
  if(err) throw err
  console.log(stdout);
})

proxy.on('error',(err,req,res)=>{
  console.log(`error: ${err.toString()} |  ${req.target}`);
  proxy.web(req, res, {
    target:PROXYS[0],
    changeOrigin: true,
  });
})

proxy.on('proxyRes',(proxyRes,req,res)=>{
  console.log(`${new Date().toLocaleString()} | ${proxyRes.statusCode} | ${req.target}`);
})

const server = http.createServer((req, res) => {
  let target = PROXYS[0]
  if(times++ % 4 === 3){
    target = PROXYS[1]
  }
  req.target = target
  proxy.web(req, res, {
    target,
    changeOrigin: true,
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});
