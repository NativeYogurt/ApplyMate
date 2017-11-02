const resemble = require('node-resemble-js');
const Nightmare = require('nightmare');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');
const http = require('http');
const sequelize = require('../db/db');
const request = require('request').defaults({ encoding: null });
const rp = require('request-promise').defaults({ encoding: null });
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

const disableJobPost = (jobId) => {
  SavedJobs.update({
    activeJobPosting: false,
  }, {
    where: {
      jobId
    },
  })
};

const takePicture = async (url, save, jobId) => {
  const nightmare = Nightmare();
  const datauri = new Datauri();
  let screenShotUrl = ''
  try {
    const dimensions = await nightmare
      .goto(url)
      .wait(3000)
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
      .wait(3000)
      .screenshot()
      .end();

    if (save) {
      datauri.format('.png', picture);
      let imageUrl = await uploadImagetoCloudinary(datauri.content);
      screenShotUrl = imageUrl.url;
      SavedJobs.update({
        screenShotUrl,
        activeJobPosting : true,
      }, {
        where: {
          jobId
        },
      })
    }
    return picture
  } catch (e) {
    if (e.code === -300) {
      disableJobPost(jobId);
      return;
    }
    console.error(e);
  }
}

const comparePictures = async (jobId, jobUrl, screenShotUrl) => {
  try {
    let livePictureBuffer = await takePicture(jobUrl, null, jobId)
    let dbPictureData = await rp.get(screenShotUrl)
    var diff = resemble(dbPictureData).compareTo(livePictureBuffer).ignoreColors().onComplete(function(data){
      if (data.misMatchPercentage > 30.0) {
        console.log(data.misMatchPercentage)
        disableJobPost(jobId);
      }
    });
  } catch (e) {
    if (e.statusCode === 404) {
      disableJobPost(jobId);
      return
    }
    console.error(e);
  }
}

const checkActivePosts = async () => {
  const jobIds = await SavedJobs.findAll({
    attributes: ['jobId', 'url', 'screenShotUrl'],
    where: {
      activeJobPosting: true,
    }
  })
  let index = 0;
  const loopThroughJobs = (index) => {
    let job = jobIds[index]
    if (job.screenShotUrl) {
      comparePictures(job.jobId, job.url, job.screenShotUrl)
    }
  }

  let interval = setInterval(() => {
    loopThroughJobs(index)
    index++;
    if (index === jobIds.length) {
      clearInterval(interval);
    }
  }, 20000)

}


exports.takePicture = takePicture;
exports.checkActivePosts = checkActivePosts;
