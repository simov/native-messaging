
# native-messaging

[![npm-version]][npm]

> Native Messaging Host Protocol for Browser Extensions ([Chrome][native-messaging], [Firefox][native-messaging-ff])

# API

```js
#!/home/s/.nvm/versions/node/v8.11.2/bin/node

// Might be good to use an explicit path to node on the shebang line
// in case it isn't in PATH when launched by Chrome/Firefox

var sendMessage = require('native-messaging')(handleMessage)

function handleMessage (req) {
  if (req.message === 'ping') {
    sendMessage({message: 'pong', body: 'hello from nodejs app'})
  }
}
```

# Tips

- `chrome.runtime.connectNative` returns a `Port` that can be used to establish persistent connection between the browser and the native app
- the Port's `disconnect` method can be used to disconnect from the native app
- the native app can use the OS's machinery to kill its own process at any time
- `chrome.runtime.sendNativeMessage` can be used to send single message to the native app, useful with _non persistent background pages_
- single native app can communicate with multiple browser extensions
- single browser extension can communicate with multiple native apps

# Things to look for

1. Add `nativeMessaging` permission to the `manifest.json` file of your extension
2. Load the extension to get its ID generated
3. Put the `native.messaging.example.json` in `~/.config/google-chrome/NativeMessagingHosts/` or `~/.mozilla/native-messaging-hosts/`
  - The name of the file should be identical to the `name` field specified in that file
  - Dots `.` and underscores `_` are allowed as delimiters in the file name
  - The `path` key should be absolute path to your nodejs script `example.js`
  - Chrome - the `allowed_origins` key should contain the extension's ID loaded in step 2
  - Firefox - the `allowed_extensions` key should contain the extension's ID specified in its `manifest.json` file
4. Make sure that `example.js` is executable `chmod 755`
5. Make sure nodejs is reachable from the shebang line in `example.js`
6. Use the `name` specified in `native.messaging.example.json` to connect to the native app from the extension's background page `background.js`

> Note that the install location for the `native.messaging.example.json` differs for each OS and browser. In case you plan to support multiple platforms, it's best to use install script. Here is an example of [such script][install].

# References

Topic                            | Chrome                      | Firefox
:--                              | :---                        | :---
Native Messaging Host Protocol   | [link][native-messaging]    | [link][native-messaging-ff]
chrome.runtime.connectNative     | [link][connect-native]      | [link][connect-native-ff]
Port                             | [link][port]                | [link][port-ff]
chrome.runtime.sendNativeMessage | [link][send-native-message] | [link][send-native-message-ff]
host.json location               | [link][host-location]       | [link][host-location-ff]
official example                 | [link][example]             | [link][example-ff]


  [npm-version]: https://img.shields.io/npm/v/native-messaging.svg?style=flat-square (NPM Package Version)
  [npm]: https://www.npmjs.com/package/native-messaging

  [native-messaging]: https://developer.chrome.com/extensions/nativeMessaging
  [connect-native]: https://developer.chrome.com/extensions/runtime#method-connectNative
  [port]: https://developer.chrome.com/extensions/runtime#type-Port
  [send-native-message]: https://developer.chrome.com/extensions/runtime#method-sendNativeMessage
  [host-location]: https://developer.chrome.com/extensions/nativeMessaging#native-messaging-host-location
  [example]: https://chromium.googlesource.com/chromium/src/+/master/chrome/common/extensions/docs/examples/api/nativeMessaging

  [native-messaging-ff]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_messaging
  [connect-native-ff]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/connectNative
  [port-ff]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/Port
  [send-native-message-ff]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/sendNativeMessage
  [host-location-ff]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Native_manifests#Manifest_location
  [example-ff]: https://github.com/mdn/webextensions-examples/tree/master/native-messaging

  [background-pages]: https://developers.chrome.com/extensions/background_pages

  [install]: https://github.com/browserpass/browserpass/blob/master/install.sh

  [example-1]: https://github.com/flashlizi/node-chrome-bridge
  [example-2]: https://github.com/jdiamond/chrome-native-messaging
