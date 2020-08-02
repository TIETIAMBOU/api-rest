// Initialize express router
let router = require('express').Router();
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 200,
        message: 'voisin api ok',
    });
});
// Import voisin controller
var voisinController = require('./voisinController');
// voisin routes
router.route('/voisins')
    .get(voisinController.index)
    .post(voisinController.new);
router.route('/voisins/favorie/:voisin_id')
    .get(voisinController.getFavorie)
    .post(voisinController.addToFavorie);
router.route('/voisins/name/:name')
    .get(voisinController.getByName)
router.route('/voisins/:voisin_id')
    .get(voisinController.getById)
    .patch(voisinController.update)
    .put(voisinController.update)
    .delete(voisinController.delete);
// Export API routes
module.exports = router;