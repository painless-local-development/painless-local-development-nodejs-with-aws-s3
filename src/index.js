/***
 *                  _      __               __              __       __             __                         __ 
 *       ___  ___ _(_)__  / /__ ___ _______/ /__  _______ _/ /______/ /__ _  _____ / /__  ___  __ _  ___ ___  / /_
 *      / _ \/ _ `/ / _ \/ / -_|_-<(_-<___/ / _ \/ __/ _ `/ /___/ _  / -_) |/ / -_) / _ \/ _ \/  ' \/ -_) _ \/ __/
 *     / .__/\_,_/_/_//_/_/\__/___/___/  /_/\___/\__/\_,_/_/    \_,_/\__/|___/\__/_/\___/ .__/_/_/_/\__/_//_/\__/ 
 *    /_/                                                                              /_/                        
 */

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

