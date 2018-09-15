#!/home/s/.nvm/versions/node/v8.11.2/bin/node

// Might be good to use an explicit path to node on the shebang line
// in case it isn't in PATH when launched by Chrome

var sendMessage = require('../protocol')(handleMessage)

function handleMessage (req) {
  if (req.message === 'ping') {
    sendMessage({message: 'pong', body: 'hello from nodejs app'})
  }
}
