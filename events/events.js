let eventEmitter = require('events').EventEmitter;

let hehe = new eventEmitter();

hehe.setMaxListeners(11)

hehe.on('hehe', (aa) => console.log(aa + 1))
hehe.on('hehe', (aa) => console.log(aa + 2))
hehe.on('hehe', (aa) => console.log(aa + 3))
hehe.on('hehe', (aa) => console.log(aa + 4))
hehe.on('hehe', (aa) => console.log(aa + 5))
hehe.on('hehe', (aa) => console.log(aa + 6))
hehe.on('hehe', (aa) => console.log(aa + 7))
hehe.on('hehe', (aa) => console.log(aa + 8))
hehe.on('hehe', (aa) => console.log(aa + 9))
hehe.on('hehe', (aa) => console.log(aa + 10))
hehe.on('hehe', (aa) => console.log(aa + 11))
hehe.on('jj', (aa) => console.log(aa + 11))
hehe.on('jj', (aa) => console.log(aa + 11))
hehe.emit('hehe', '汉子')
hehe.emit('jj', 'ooo')
hehe.removeAllListeners('hehe')
console.log(eventEmitter.listenerCount(hehe, 'hehe'))
console.log(hehe.listeners('jj').length)
console.log(hehe.listeners('hehe').length)
