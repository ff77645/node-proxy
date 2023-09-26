import http from 'http'
import httpProxy from 'http-proxy'
import {getBody} from './util.js'

// 创建代理服务器实例
const proxy = httpProxy.createProxyServer();
// 创建 HTTP 服务器
const server = http.createServer(async (req, res) => {
  console.log(`${req.method} ${req.url}`);
  // console.log('headers',JSON.stringify(req.headers))
  let url_old = req.url.slice(9)
  url_old = url_old.startsWith('http') ? url_old : 'https://' + url_old
  const url = new URL(url_old)
  const target = url.protocol+'//'+url.host
  console.log('target',target);
  console.log('req.url',url.pathname + url.search);
  // 代理请求到目标服务器
  req.url = url.pathname + url.search
  proxy.web(req, res, { target });
});

// 监听服务器端口
server.listen(3300, () => {
  console.log('代理服务已启动，监听端口 3300');
});

// const data = await getBody(req)
  // console.log('data',data);