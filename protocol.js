var input = Buffer.from([]);

module.exports = (handleMessage) => {

  process.stdin.on('readable', () => {
    var chunks = [input];
    var chunk;
    while (chunk = process.stdin.read()) {
      chunks.push(chunk)
    }
    input = Buffer.concat(chunks)
    while (input.length >= 4) {
      var msgLen = input.readUInt32LE(0)
      var dataLen = msgLen + 4

      if (input.length >= dataLen) {
        var content = input.slice(4, dataLen)
        var json = JSON.parse(content.toString())
        handleMessage(json)
        input = input.slice(dataLen);
      } else {
        break;
      }
    }
  })

  function sendMessage (msg) {
    var buffer = Buffer.from(JSON.stringify(msg))

    var header = Buffer.alloc(4)
    header.writeUInt32LE(buffer.length, 0)

    var data = Buffer.concat([header, buffer])
    process.stdout.write(data)
  }

  process.on('uncaughtException', (err) => {
    sendMessage({error: err.toString()})
  })

  return sendMessage

}
