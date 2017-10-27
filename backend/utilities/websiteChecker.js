const resemble = require('node-resemble-js');
const Nightmare = require('nightmare');
const cloudinary = require('cloudinary');
const Datauri = require('datauri');

const uploadImagetoCloudinary = (dataURI) => {
  cloudinary.config(process.env.CLOUDINARY_URL);
  return cloudinary.v2.uploader.upload(dataURI, (err, result) => {
        console.log(result.url)
    if (err) {
      console.error('errror',err);
    }
    return result.url;
  });
};

const takePicture = async (url, save) => {
  const nightmare = Nightmare();
  const datauri = new Datauri();
  try {
    const picture = await nightmare
      .goto(url)
      .wait(5000)
      .screenshot()

    if (save) {
      datauri.format('.png', picture);
      let imageUrl = await uploadImagetoCloudinary(datauri.content);
      console.log(imageUrl);
      return

    }
  } catch (e) {
    console.error(e);
  }

  // var diff = resemble(picture).compareTo(picture2).ignoreColors().onComplete(function(data){
  //   console.log(typeof data);
  //     /*
  //     {
  //       misMatchPercentage : 100, // %
  //       isSameDimensions: true, // or false
  //       dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
  //       getImageDataUrl: function(){}
  //     }
  //     */
  // });
}




takePicture('https://jobs.lever.co/gospotcheck/59414d83-9e23-4a5e-94a1-8573e23073c7', true);
