/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

// [START app]
const express = require('express');
const Compute = require('@google-cloud/compute');

// Creates a client
const compute = new Compute({
  keyFilename: 'credentials.json'
});

const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Proxy API.').end();
});

app.post('/createInstance', function(req, res, next) {
  let data = req.body
  let product = data.line_items[0].variant_title.split('/')
  let instanceZone = product[0].trim() === 'US' ? 'us-east1-b' : 
                     product[0].trim() === 'EU' ? 'europe-west1-b' : 'asia-east1-b'

  const zone = compute.zone(instanceZone);
  
  const name = `proxy-${testJson.checkout_token}`

  zone.createVM(name, {os: 'ubuntu'}, data => {
    console.log(data)

  }).then(() => {
    res.send("Success!")
  }).catch(err => {
    console.error('ERROR:', err);
  });
})

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END app]
