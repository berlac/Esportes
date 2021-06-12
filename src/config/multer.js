const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let path = './src/public/photos';
        cb(null, path)
    },
    filename: function(req, file, cb) {
        let photo = Date.now()+'-'+file.originalname
        cb(null, photo)
    }
})

const upload = multer({storage});
module.exports = upload;