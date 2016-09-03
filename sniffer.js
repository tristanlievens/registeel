"use strict";
var cap_1 = require('cap');
var _ = require('lodash');
var PROTOCOL = cap_1.decoders.PROTOCOL;
var packetSniffer = function () {
    var c = new cap_1.Cap();
    var device = 'en0';
    var filter = 'port 800 and tcp';
    var bufSize = 10 * 1024 * 1024;
    var buffer = new Buffer(65535);
    var linkType = c.open(device, filter, bufSize, buffer);
    c.setMinBytes && c.setMinBytes(0);
    console.log("Listening for packets.");
    c.on('packet', function (nbytes, trunc) {
        if (linkType !== 'ETHERNET')
            return console.log('Unsupported linktype: ' + linkType);
        var ethernetRet = cap_1.decoders.Ethernet(buffer);
        if (ethernetRet.info.type !== PROTOCOL.ETHERNET.IPV4)
            return console.log('Unsupported Ethertype: ' + PROTOCOL.ETHERNET[ethernetRet.info.type]);
        var ipv4Ret = cap_1.decoders.IPV4(buffer, ethernetRet.offset);
        var src = ipv4Ret.info.srcaddr;
        var dest = ipv4Ret.info.dstaddr;
        if (ipv4Ret.info.protocol !== PROTOCOL.IP.TCP)
            return console.log('Unexpected IPv4 protocol: ' + PROTOCOL.IP[ipv4Ret.info.protocol]);
        var datalen = ipv4Ret.info.totallen - ipv4Ret.hdrlen;
        var tcpRet = cap_1.decoders.TCP(buffer, ipv4Ret.offset);
        datalen -= tcpRet.hdrlen;
        var message = buffer.toString('binary', tcpRet.offset, tcpRet.offset + datalen);
        if (message.length === 0)
            return; // eg. TCP ACK response
        var decryptedMessage = _.map(message, function (c, i) { return String.fromCharCode(c.charCodeAt(0) ^ 1); }) // XOR cipher by 1
            .join('');
        console.log(ipv4Ret.info.dstaddr === '46.28.203.224' ? 'Sending' : 'Receiving', decryptedMessage);

        // let actions = decryptedMessage.split('.\\\r\n')
        // actions.pop()
    });
};

packetSniffer()
