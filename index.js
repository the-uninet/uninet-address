const crypto = require('crypto')

async function createAsync(bits = 4096) {
  const {privateKey, publicKey} = await new Promise((resolve, reject)=>
    crypto.generateKeyPair('rsa',
      {modulusLength:bits,
        publicKeyEncoding:{type:'pkcs1',format:'pem'},
        privateKeyEncoding:{type:'pkcs1',format:'pem'}},
      (err,publicKey,privateKey)=>
        err==null?resolve({privateKey:privateKey,publicKey:publicKey}):reject(err)))
  const address = publicKey
  const key = privateKey
  return [address, key]
}

function createSync(bits = 4096) {
  const {privateKey, publicKey} =
    crypto.generateKeyPairSync('rsa',
      {modulusLength:bits,
        publicKeyEncoding:{type:'pkcs1',format:'pem'},
        privateKeyEncoding:{type:'pkcs1',format:'pem'}})
  const address = publicKey
  const key = privateKey
  return [address, key]
}

function send(address, message) {
  return Uint8Array.from(crypto.publicEncrypt(address, message))
}

function receive(key, message) {
  return Uint8Array.from(crypto.privateDecrypt(key, message))
}

function signature(key, message) {
  return Uint8Array.from(crypto.privateEncrypt(key, message))
}

function un_signature(address, message) {
  return Uint8Array.from(crypto.publicDecrypt(address, message))
}

module.exports = {
  create: createSync,
  createAsync: createAsync,
  send: send,
  receive: receive,
  signature: signature,
  un_signature: un_signature,
}
