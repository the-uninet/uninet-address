const NodeRSA = require('node-rsa')

function create(bits = 1024) {
  const key = new NodeRSA({b: bits})
  const private = key.exportKey('pkcs8-private-der')
  const public = key.exportKey('pkcs8-public-der')
  return [public, private]
}

function send(pub, message) {
  const public = new NodeRSA(pub, 'pkcs8-public-der')
  return public.encrypt(message)
}

function receive(pri, message) {
  const private = new NodeRSA(pri, 'pkcs8-private-der')
  return private.decrypt(message)
}

function signature(pri, message) {
  const private = new NodeRSA(pri, 'pkcs8-private-der')
  return private.encryptPrivate(message)
}

function un_signature(pub, message) {
  const public = new NodeRSA(pub, 'pkcs8-public-der')
  return public.decryptPublic(message)
}

module.exports = {
  create: create,
  send: send,
  receive: receive,
  signature: signature,
  un_signature: un_signature,
}
