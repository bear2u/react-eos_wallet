const Eos = require('eosjs');

const config = {
    httpEndpoint : "https://api-kylin.eosasia.one",
    chainId : "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191"
  }

export function getSignedEos(privateKey) {
  config['keyProvider'] = privateKey;
  console.log(config);
  console.log('getEos : ', privateKey);
  return Eos(config);
}  

export function getEOS() {
  console.log('getEos : ', );
   return Eos(config); 
}  