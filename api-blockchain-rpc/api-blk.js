var request = require("request");

require('dotenv').config()

const config = {
  rpchost: process.env.rpchost, // to put in the .env
  rpcport: process.env.rpcport, // to put in the .env
  rpcuser:  process.env.rpcuser, // to put in the .env
  rpcpassword:  process.env.rpcpassword, // to put in the .env
};

// Headers
const headers = {
  "content-type": "text/plain;",
};

class RequestRPC {
  constructor(query) {
    this.command = query;
    this.config = config;
  }

  requestRPC() {
    let cb;
    return new Promise((resolve, reject) => {
      const { rpcuser, rpcpassword, rpcport  } = config
      var dataString = `{"jsonrpc":"1.0","id":"curltext","method":"${this.command}","params":[]}`;
      var options = {
        url: `http://${rpcuser}:${rpcpassword}@127.0.0.1:${rpcport}/`,
        method: "POST",
        headers: headers,
        body: dataString,
      };

      cb = (error, response, body) => {
        if (error) console.log('error', error)
        if (!error && response.statusCode == 200) {
          console.log('fdgdrfgdgdg')
          const data = JSON.parse(body);
          console.log("ttt", data);
          resolve(data);
        }
      };

      request(options, cb);
    });
  }

  getBlockCount() {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestRPC().then((data) => data);
      console.log("tesstt", data);
      resolve(data);
    });
  }

  getBalance() {
    return new Promise(async (resolve, reject) => {
      const data = await this.requestRPC().then((data) => data);
      console.log("tesstt", data);
      resolve(data);
    });
  }
}

module.exports = RequestRPC;


