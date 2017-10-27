const resemble = require('node-resemble-js');
const Nightmare = require('nightmare');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const SavedJobs = require('../models/SavedJobs.js');

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
      return
    }
    return
  } catch (e) {
    console.error(e);
  }
}

//takePicture('https://jobs.lever.co/gospotcheck/59414d83-9e23-4a5e-94a1-8573e23073c7');
exports.takePicture = takePicture;
