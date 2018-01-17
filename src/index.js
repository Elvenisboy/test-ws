'use strict'

const domReady = require('detect-dom-ready')
const createNode = require('./create-node')



createNode((err, node) => {
  if (err) {
    return console.log('Could not create the Node, check if your browser has WebRTC Support', err)
  }

  node.on('peer:discovery', (peerInfo) => {
    console.log('Discovered a peer')
    const idStr = peerInfo.id.toB58String()
    console.log('Discovered: ' + idStr)

    node.dial(peerInfo, (err, conn) => {
      if (err) { return console.log('Failed to dial:', idStr) }
    })
  })

  node.on('peer:connect', (peerInfo) => {
    const idStr = peerInfo.id.toB58String()
    console.log('Got connection to: ' + idStr)
  })

  node.on('peer:disconnect', (peerInfo) => {
    const idStr = peerInfo.id.toB58String()
    console.log('Lost connection to: ' + idStr)
  })

  node.start((err) => {
    if (err) {
      // return console.log('WebRTC not supported')
      console.log(err)
    }

    const idStr = node.peerInfo.id.toB58String()

    console.log('Node is ready. ID: ' + idStr)
    console.log('Node is listening o/')
    node.peerInfo.multiaddrs.forEach((ma) => console.log(ma.toString()))


    // NOTE: to stop the node
    // node.stop((err) => {})
  })
})
// })
