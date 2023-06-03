module.exports = (handleMessage) => {

  var msgLen = 0,
    dataLen = 0,
    input = []

  function sendMessage(msg) {
    var buffer = Buffer.from(JSON.stringify(msg))

    var header = Buffer.alloc(4)
    header.writeUInt32LE(buffer.length, 0)

    var data = Buffer.concat([header, buffer])
    process.stdout.write(data)
  }

  process.stdin.on('readable', () => {
    var chunk
    while (chunk = process.stdin.read()) {
      // Set message value length once
      if (msgLen === 0 && dataLen === 0) {
        msgLen = chunk.readUInt32LE(0)
        chunk = chunk.subarray(4)
      }
      // Store accrued message length read 
      dataLen += chunk.length
      input.push(chunk)
      if (dataLen === msgLen) {
        // Send accrued message from client back to client
        handleMessage(JSON.parse(Buffer.concat(input).toString()))
        // Reset dynamic variables after sending accrued read message to client
        msgLen = 0,
        dataLen = 0,
        input = []
      }
    }
  })

  process.on('uncaughtException', (err) => {
    sendMessage({
      error: err.toString()
    })
  })

  return sendMessage
  
}
