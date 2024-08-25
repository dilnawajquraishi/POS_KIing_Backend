let multer = require('multer')
let path = require('path')

const storage = multer.diskStorage({
    destination: './UploadImage',
    filename: (req, file, cb) => {
        cb(null,file.fieldname  + '-' + Date.now() + path.extname(file.originalname) );
    }
});

const UploadImage = multer({ storage: storage })

module.exports = UploadImage;





// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: './uploads',
//     filename: (req, file, cb)=>{
//         cb(null, file.fieldname + '-' +  Date.now() + path.extname(file.originalname))
//     }
// })

// const upload = multer({storage: storage})

// module.exports = upload

// let multer = require('multer');
// let path = require('path');

// // Set up Multer storage
// const storage = multer.diskStorage({
//     destination: './UploadImage/', // Folder to store the images
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Initialize the upload middleware
// const UploadImage = multer({ storage: storage });

// module.exports = UploadImage;
