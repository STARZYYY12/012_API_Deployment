const express = require('express');
const router = express.Router();
const genreController = require('../controller/genreController');

router.get('/', genreController.getAllGenre);
router.get('/:id', genreController.getGenreById);
router.post('/', genreController.createGenre);
router.put('/:id', genreController.updateGenre);
router.delete('/:id', genreController.deleteGenre);

module.exports = router;