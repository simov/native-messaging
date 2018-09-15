
var port = chrome.runtime.connectNative('native.messaging.example')

port.onMessage.addListener((req) => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message)
  }
  handleMessage(req)
})

port.onDisconnect.addListener(() => {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError.message)
  }
  console.log('Disconnected')
})

port.postMessage({message: 'ping', body: 'hello from browser extension'})

function handleMessage (req) {
  if (req.message === 'pong') {
    console.log(req)
  }
}
