//NAME: KAVYU THABITHA. REG NO: P15/81759/2017

const crypto = require('crypto'),
            assert = require('assert'),
            algorithm = 'aes-256-cbc',
            IV_LENGTH = 16,
             DH_LENGTH = 256;
             
const alice = crypto.createDiffieHellman(DH_LENGTH);
const aliceKey = alice.generateKeys();

const bob = crypto.createDiffieHellman(alice.getPrime(), alice.getGenerator());
const bobKey = bob.generateKeys();

const aliceSecret = alice.computeSecret(bobKey);
const bobSecret = bob.computeSecret(aliceKey); // this should be the same as aliceSecret



const password = aliceSecret;
const iv = crypto.randomBytes(IV_LENGTH).toString('hex').slice(0, IV_LENGTH);

function encrypt(text){
  const cipher = crypto.createCipheriv(algorithm, password, iv)
  const crypted = `${cipher.update(text,'utf8','hex')}${cipher.final('hex')}`
  return crypted;
}


function decrypt(text){
  const decipher = crypto.createDecipheriv(algorithm, password, iv)
  const dec = `${decipher.update(text,'hex','utf8')}${decipher.final('utf8')}`
  return dec;
}

const message =  encrypt('Hello World');

const decryptedMsg = decrypt(message)

console.log(message, decryptedMsg);





