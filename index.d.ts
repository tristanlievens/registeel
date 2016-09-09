declare module 'redux-mock-store'
declare module 'leftpad'

declare module 'pathfinding' {
  export var Heap: any;
  export var Node: any;
  export var Grid: any;
  export var Util: any;
  export var DiagonalMovement: any;
  export var Heuristic: any;
  export var AStarFinder: any;
  export var BestFirstFinder: any;
  export var BreadthFirstFinder: any;
  export var DijkstraFinder: any;
  export var BiAStarFinder: any;
  export var BiBestFirstFinder: any;
  export var BiBreadthFirstFinder: any;
  export var BiDijkstraFinder: any;
  export var IDAStarFinder: any;
  export var JumpPointFinder: any;
}

declare module 'testdouble' {
  const func: (name: any) => any;
  const object: (nameOrType: any, config?: any) => any;
  const when: (__userDoesPretendInvocationHere__: any, config?: any) => {
    thenReturn: () => any;
    thenCallback: () => any;
    thenDo: () => any;
    thenThrow: () => any;
    thenResolve: () => any;
    thenReject: () => any;
  };
  const verify: (__userDoesPretendInvocationHere__: any, config?: any) => any;
  const matchers: {
    create: any;
    captor: () => {
      capture: any;
    };
    isA: any;
    anything: any;
    contains: any;
    argThat: any;
    not: any;
  };
  const replace: (target: any, stub?: any) => any;
  const explain: (testDouble: any) => any;
  const reset: () => any[];
  const config: (overrides: any) => any;
  const callback: any;
  const version: string;
}

declare module 'buffer-reader' {
  class BufferReader {
    constructor(buffer: Buffer)
    append(buffer: Buffer): this

    /**
     * Get location in buffer
     */
    tell(): number

    /**
     * Set the pointer to a specific location
     */
    seek(offset: number): this

    /**
     * Move the pointer
     */
    move(diff: number): this

    /**
     * Gets rest of the buffer. Moves the pointer to the end of the read buffer.
     */
    restAll(): Buffer

    /**
     * Get Buffer of the next specified amount of bytes.
     */
    nextBuffer(length: number): Buffer

    nextString(length: number, encoding?: string): string
    nexStringZero(encoding?: string): string

    nextInt8(): number
    nextUInt8(): number
    nextUInt16LE(): number
    nextUInt16BE(): number
    nextInt16LE(): number
    nextInt16BE(): number
    nextUInt32LE(): number
    nextUInt32BE(): number
    nextInt32LE(): number
    nextInt32BE(): number
    nextFloatLE(): number
    nextFloatBE(): number
    nextDoubleLE(): number
    nextDoubleBE(): number
  }

  export = BufferReader
}
