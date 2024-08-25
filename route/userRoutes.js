let express = require('express');

const { userRegistration, userSigninController, userLogoutController, resetPassword } = require('../Controller/Userauth');

const licenseController = require('../Controller/LicenceKey');
const UploadImage = require('../MulterConfig');
// const changePassword = require('../Controller/Resetpassowrd');
// const authMiddleware = require('../Controller/esetPasswordMiddleware');

let router=express.Router()




// router.post('/register', UploadImage.single('image'), userRegistration);
// router.post('/login', userSigninController);
router.get('/logout', userLogoutController);


// ----------------------------------------------licence----------------
router.post('/superadmin', licenseController.licensekey);

router.post('/register', UploadImage.single('image'), (req, res, next) => {
  console.log('Register route hit');
  next();
}, userRegistration);

router.post('/login', (req, res, next) => {
  console.log('Login route hit');
  next();
}, userSigninController);





// Route for resetting password
router.post('/reset-password', resetPassword);


module.exports = router;














// router.post('/register',userRegistration )
// router.post('/', upload.single('image'), userRegistration);
// router.post('/login',userSigninController )

  // router.post('/login',loginUser )
  // router.get('/findallproduct',  findallproduct)




// register
// ----------------------------LicenceKey_User----------------------
// const { signup, login, logout } = require('../Controller/LicenceLeyBasedUser');
// const { protect } = require('../Controller/LicenceLeyBasedUser');
// const { checkLicense } = require('../Controller/LicenceLeyBasedUser');

// // const router = express.Router();

// router.post('/signup  ', signup);
// router.post('/login', login);
// router.post('/logout', protect, logout);
// router.get('/profile', protect,checkLicense);

// signup,
// checkLicense,
// protect

// router.get('/profile', protect, checkLicense, (req, res) => {
//     res.json(req.user);
// });

module.exports = router;

