interface Cap {
  open(device: string, filter: string, bufSize: number, buffer: Buffer): string
  setMinBytes(amount: number): void
  on(eventType: string, handler: { (nbytes: any, trunc:any): void }): void
}

interface CapFactory {
  new(): Cap;
  findDevice(ip: string): string
}

interface Decoders {
  PROTOCOL: {
    ETHERNET: {
      IPV4: string
    }
    IP: {
      TCP: string
    }
  }
  Ethernet(buffer: Buffer): {
    info: { type: string }
    offset: number
  }
  IPV4(buffer: Buffer, offset: number): {
    info: {
      srcaddr: string
      dstaddr: string
      protocol: string
      totallen: number
    }
    hdrlen: number
    offset: number
  }
  TCP(buffer: Buffer, offset: number): {
    hdrlen: number
    offset: number
  }
}

interface CapLibrary {
  decoders: Decoders
  Cap: CapFactory
}

declare var cap: CapLibrary

declare module 'cap' {
  export = cap
}
