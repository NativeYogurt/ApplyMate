const cloudconvert = new (require('cloudconvert'))(process.env.CLOUD_CONVERT_API);
const rp = require('request-promise');
const cloudinary = require('cloudinary');

const uploadPDFtoCloudinary = (dataURI) => {
  cloudinary.config(process.env.CLOUDINARY_URL);
  return cloudinary.v2.uploader.upload(dataURI, (err, result) => {
    if (err) {
      return err;
    }
    return result.url;
  });
};

const convertPDFtoText = (pdfURL) => {
  return new Promise((resolve, reject) => {
    cloudconvert.createProcess({
      inputformat: 'pdf',
      outputformat: 'txt',
    }, (err, process) => {
      if (err) {
        reject(err);
        return;
      }
      process.start({
        wait: true,
        input: 'download',
        file: pdfURL,
        outputformat: 'txt',
        save: true,
      }, (fail, response) => {
        if (fail) {
          reject(fail);
        }
        resolve(response.data.output.url);
      });
    });
  });
};

const retrieveText = (url) => {
  let textURL = url;
  textURL = `http:${textURL}?inline`;
  return rp(textURL);
};

exports.uploadHandler = async (req, res) => {
  //const textURL = '//host123d1qw.cloudconvert.com/download/~qeog7zKafisKFqZDqJtI0VoWsUc';
  try {
    const { body: { result } } = req;
    let pdfURL = await uploadPDFtoCloudinary(result);
    pdfURL = pdfURL.url;
    const textURL = await convertPDFtoText(pdfURL);
    const text = await retrieveText(textURL);
    console.log(text);
  } catch (e) {
    console.error(e);
  }
};
