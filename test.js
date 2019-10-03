const test = require('tape')

const mod = require('./index.js')

function gen(f, c=8){
  const r=[]
  for(let i=0;i<c;i++){
    r.push(f())
  }
  return r
}
function curried_gen(f){
  return function (c=8) { return gen(f,c) }
}

const randomstring = require("randomstring")
const gen_str = curried_gen(()=>randomstring.generate())

test('send/receive', t => {
  t.plan(5*100)
  gen(()=>mod.create(), 5).map(([address, key]) => {
    gen_str(100).map(msg => {
      t.equal(mod.receive(key, mod.send(address, Buffer.from(msg))).toString(), msg)
    })
  })
})

test('signature/un_signature', t => {
  t.plan(5*100)
  gen(()=>mod.create(), 5).map(([address, key]) => {
    gen_str(100).map(msg => {
      t.equal(mod.un_signature(address, mod.signature(key, Buffer.from(msg))).toString(), msg)
    })
  })
})
