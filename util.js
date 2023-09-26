

export async function getBody(req){
  return new Promise((rs)=>{
    let data = ''
    req.on('data',chunk=>{
      data+= chunk
    })
    req.on('end',()=>{
      rs(data)
    })
  })
}