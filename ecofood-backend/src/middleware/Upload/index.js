const multer = require('multer');

//image
const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/uploads/image');
    },
    filename: function (req, file1, cb) {
      cb(null, Date.now() + "--" + file1.originalname)
    }
  })


  //type file 
  const multerFilter = (req, file, cb) => {
    if ((file.mimetype).includes('jpeg') || (file.mimetype).includes('png') || (file.mimetype).includes('pdf')) {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF File!!"), false);
    }
  };

//image
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});


const uploadimage = upload.single('images')

module.exports = {
  uploadimage
}

 
