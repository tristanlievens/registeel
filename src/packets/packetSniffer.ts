import packetHandler from './packetHandler'

import { Cap, decoders } from 'cap'
import * as _ from 'lodash'
const PROTOCOL = decoders.PROTOCOL

const packetSniffer = (store) => {
  let c = new Cap()
  let device = Cap.findDevice(process.env.HOME_IP)
  let filter = 'port 800 and tcp'

  let bufSize = 10 * 1024 * 1024
  let buffer = new Buffer(65535)

  let linkType = c.open(device, filter, bufSize, buffer)

  c.setMinBytes && c.setMinBytes(0)
  console.log("Listening for packets.")
  c.on('packet', (nbytes, trunc) => {
    if (linkType !== 'ETHERNET') return console.log('Unsupported linktype: ' + linkType)
    let ethernetRet = decoders.Ethernet(buffer)

    if (ethernetRet.info.type !== PROTOCOL.ETHERNET.IPV4) return console.log('Unsupported Ethertype: ' + PROTOCOL.ETHERNET[ethernetRet.info.type])

    let ipv4Ret = decoders.IPV4(buffer, ethernetRet.offset)
    let src = ipv4Ret.info.srcaddr
    let dest = ipv4Ret.info.dstaddr

    if (ipv4Ret.info.protocol !== PROTOCOL.IP.TCP) return console.log('Unexpected IPv4 protocol: ' + PROTOCOL.IP[ipv4Ret.info.protocol])
    let datalen = ipv4Ret.info.totallen - ipv4Ret.hdrlen

    let tcpRet = decoders.TCP(buffer,ipv4Ret.offset)
    datalen -= tcpRet.hdrlen

    let message = buffer.toString('binary', tcpRet.offset, tcpRet.offset + datalen)
    if (message.length === 0) return // eg. TCP ACK response

    let decryptedMessage = _.map(message, (c, i) => String.fromCharCode(c.charCodeAt(0) ^ 1)) // XOR cipher by 1
                            .join('')

    let actions = decryptedMessage.split('.\\\r\n')
    actions.pop()
    actions.forEach((action) => packetHandler(action, store, process.env.HOME_IP === ipv4Ret.info.dstaddr))
  })
}

export default packetSniffer
