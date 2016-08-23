'use strict'

const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const AWS = require('aws-sdk')

// Better from IAM Role or process.env.params NOT HARDCODED
const s3 = new AWS.S3({
  region: 'eu-west-1',
  endpoint: 'http://aws-fake-s3:4569',
  accessKeyId: 'fakeCredentials',
  secretAccessKey: 'fakeCredentials'
})

module.exports = {
  uploadFileToS3: uploadFileToS3,
  getUrlOfFileS3: getUrlOfFileS3,
  getListFilesInS3: getListFilesInS3
}

// //////////////

/**
 * Save a file to S3
 * @param bucketname
 * @param path
 * @param filename
 * @returns {Promise}
 */
function uploadFileToS3 (bucketname, remoteFile, localFile) {

  let params = {
    Bucket: bucketname,
    Key: remoteFile
  }

  return new Promise(function (resolve, reject) {
    fs.readFile(localFile, function (err, data) {
      if (err) { reject(err) }

      params.Body = data

      s3.putObject(params, function (err, res) {
        if (err) { reject(err) } else { resolve(res) }
      })
    })
  })
}

/**
 * Get a time-limited url to download a file from S3
 * @param bucketname
 * @param filename
 * @returns {Promise}
 */
function getUrlOfFileS3 (bucketname, filename) {

  let params = {
    Bucket: bucketname,
    Key: filename,
    Expires: 60
  }

  return new Promise(function (resolve, reject) {
    s3.getSignedUrl('getObject', params, function (err, url) {
      if (err) { reject(err) } else { resolve(url) }
    })
  })
}

/**
 * Returns the content of a file
 * @param bucketname
 * @param folder
 * @returns {Promise}
 */
function getListFilesInS3 (bucketname, folder) {

  let listFiles = []
  let params = { Bucket: bucketname }
  if (_.isUndefined(folder)) { params.Prefix = folder }

  return new Promise(function (resolve, reject) {
    s3.listObjects(params, function (err, data) {
      if (err) {
        reject(err)
      } else {
        _.each(data.Contents, function (dato) {
          if (dato.Size) {
            let obj = {
              Name: _.last(dato.Key.split('/')),
              Size: dato.Size,
              Key: dato.Key
            }

            listFiles.push(obj)
          }
        })

        resolve(listFiles)
      }
    })
  })
}
