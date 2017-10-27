const resemble = require('node-resemble-js');
const Nightmare = require('nightmare');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const http = require('http');
const request = require('request').defaults({ encoding: null });
const rp = require('request-promise').defaults({ encoding: null });
//const SavedJobs = require('../models/SavedJobs.js');

const uploadImagetoCloudinary = (dataURI) => {
  cloudinary.config(process.env.CLOUDINARY_URL);
  return cloudinary.v2.uploader.upload(dataURI, (err, result) => {
    if (err) {
      console.error('errror',err);
      return
    }
    return result;
  });
};

const takePicture = async (url, save, jobId) => {
  const nightmare = Nightmare();
  const datauri = new Datauri();
  let screenShotUrl = ''
  try {
    const dimensions = await nightmare
      .goto(url)
      .wait(5000)
      .wait('body')
      .evaluate(function() {
          var body = document.querySelector('body');
          return {
              height: body.scrollHeight,
              width:body.scrollWidth
          }
      });

    const picture = await nightmare
      .viewport(dimensions.width, dimensions.height)
      .goto(url)
      .wait(5000)
      .screenshot()
      .end();

    if (save) {
      datauri.format('.png', picture);
      let imageUrl = await uploadImagetoCloudinary(datauri.content);
      screenShotUrl = imageUrl.url;
      SavedJobs.update({
        screenShotUrl,
      }, {
        where: {
          jobId
        },
      })
    }
    return picture
  } catch (e) {
    console.error(e);
  }
}

const comparePictures = async (jobId) => {
  try {
    let livePictureBuffer = await takePicture('https://jobs.lever.co/gospotcheck/59414d83-9e23-4a5e-94a1-8573e23073c7')
    let dbPictureData = await rp.get('http://res.cloudinary.com/dxcydtwom/image/upload/v1509134202/upuxkadljixsovtjt1e.png')
    console.log(dbPictureData)
    var diff = resemble(dbPictureData).compareTo(livePictureBuffer).ignoreColors().onComplete(function(data){
      console.log(data.misMatchPercentage);
      /*
      {
      misMatchPercentage : 100, // %
      isSameDimensions: true, // or false
      getImageDataUrl: function(){} // returns base64-encoded image
      pngStream: function(){} // returns stream with image data
      getBuffer: function(cb){} // calls callback with image buffer
    }
    */
    });
  } catch (e) {
    if (e.statusCode === 404) {
      console.log('job no longer available')
    }
    console.error(e.statusCode);
  }
}

comparePictures()

//takePicture('https://careers.google.com/jobs#!t=jo&jid=/google/software-engineer-345-spear-st-san-francisco-ca-usa-2683110138&f=true&', 'https://jobs.lever.co/gospotcheck/59414d83-9e23-4a5e-94a1-8573e23073c7');
exports.takePicture = takePicture;
