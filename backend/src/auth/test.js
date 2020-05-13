const fs = require('fs');
const jwt = require('jsonwebtoken');

async function getPrivateKey() {
  return fs.readFileSync('./.private.key', 'utf8');
}

async function getPublicKey() {
  return fs.readFileSync('./.public.key', 'utf8');
}
const i = 'koa_blog'; // Issuer
const s = 'koa_blog_admin@user.com'; // Subject
const a = 'http://koa.blog'; // Audience
// SIGNING OPTIONS
const signOptions = {
  issuer: i,
  subject: s,
  audience: a,
  expiresIn: '2h',
  algorithm: 'RS256',
};

const payload = {
  data1: 'Data 1',
  data2: 'Data 2',
  data3: 'Data 3',
  data4: 'Data 4',
};
const privateKEY = fs.readFileSync('./.private.key', 'utf8');
const publicKey = fs.readFileSync('./.public.key', 'utf8');
console.log('privateKEY: ', privateKEY);

const token = jwt.sign(payload, privateKEY, signOptions);

console.log(`Token - ${token}`);

const legit = jwt.verify(token, publicKey, signOptions);
console.log(`\nJWT verification result: ${JSON.stringify(legit)}`);


// module.exports = getPrivateKey;
// module.exports = getPublicKey;

// async function auth() {
//
// }
//
// module.exports = {
//     auth: async function (target, key, descriptor) {
//         console.log("start ---------------------------------------------");
//         console.log('target: ', target);
//         console.log('key: ', key);
//         console.log('descriptor: ', descriptor);
//         console.log('end ---------------------------------------------');
//         return descriptor;
//     },
//     login: async function() {},
//     signup: async function() {},
// };
