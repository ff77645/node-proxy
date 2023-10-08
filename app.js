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

const server = http.createServer(async (req, res) => {
  let target = PROXYS[0]
  if(Date.now() - lastRequestTime < 1000){
    target = PROXYS[times++ % COUNT]
  }
  console.log('req.url',req.url,target);
  lastRequestTime = Date.now()
  proxy.web(req, res, {
    target,
    changeOrigin: true,
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}.`);
});
