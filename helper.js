import http from 'http'
import {getBody} from './util.js'


const server = http.createServer(async (req,res)=>{
  console.log(`${req.method} ${req.url} ${req.httpVersion}`);
  console.log('headers',req.headers)
  const data = await getBody(req)
  console.log({data});
  res.statusCode = 200
  res.end('8100 ok')
})


server.listen(8100,()=>{
  console.log('listening on port 8100.');
})