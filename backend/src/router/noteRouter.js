const { Router } = require('express');
const router = Router();
const noteController = require('../controllers/noteController');
const wrapAsync = require('../middlewares/erroeHandler');

router.use((req, res, next) => {
    console.log(`Request: ${req.method}, ${req.url}`);
    next();
});

router.post('/add', wrapAsync(noteController.addOneNote));
router.get('/getall', wrapAsync(noteController.getAllNotes));
router.get('/get/:id', wrapAsync(noteController.getOneNote));
router.put('/update/:id', wrapAsync(noteController.updateOneNote));
router.delete('/delete/:id', wrapAsync(noteController.deleteOneNote));

module.exports = router;