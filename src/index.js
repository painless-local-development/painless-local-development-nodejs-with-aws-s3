'use strict';

const service = require('./storage.service')
const AWS = require('aws-sdk')

let bucketName = 'FakeS3'
let remoteFile = 'data.txt' || process.env.path;
let localFile = 'data/data.txt' || process.env.filename;

service.uploadFileToS3(bucketName, remoteFile, localFile)
  .then((data) => { console.log('OK1: ', data) })
  .catch((err) => { console.log('KO1: ', err) })

setTimeout(()=>{

  service.getListFilesInS3(bucketName)
    .then((data) => { console.log('OK2: ', data) })
    .catch((err) => { console.log('KO2: ', err) })

  service.getUrlOfFileS3(bucketName, remoteFile)
    .then((data) => { console.log('OK3: ', data) })
    .catch((err) => { console.log('KO3: ', err) })

}, 5000)

