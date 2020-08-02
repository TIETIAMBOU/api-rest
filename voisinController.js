// Import voisin model
Voisin = require('./voisinModel');
// Handle index actions
exports.index = function (req, res) {
    Voisin.get(function (err, voisins) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "voisins recuperer avec succes",
            data: voisins
        });
    });
};
// Handle create voisin actions
exports.new = function (req, res) {
    var voisin = new Voisin();
    voisin.name = req.body.name ? req.body.name : voisin.name;
    voisin.phoneNumber = req.body.phoneNumber;
    voisin.address = req.body.address;
    voisin.aboutMe = req.body.aboutMe;
    voisin.name = voisin.name.toLowerCase();
// save the voisin and check for errors
    voisin.save(function (err) {
        // if (err)
        //     res.json(err);
res.json({
            message: 'Nouveau voisin crée avec succes!',
            data: voisin
        });
    });
};
// Handle view voisin info
exports.view = function (req, res) {
    Voisin.findById(req.params.voisin_id, function (err, voisin) {
        if (err)
            res.send(err);
        res.json({
            message: 'voisin details loading..',
            data: voisin
        });
    });
};
// favorie
exports.getById = function (req, res) {
    Voisin.findById(req.params.voisin_id, function (err, voisin) {
        if (err)
            res.send(err);
        res.json({
            message: 'voisin favorie',
            data: voisin
        });
    });
};
exports.getFavorie = function (req, res) {
    Voisin.findById(req.params.voisin_id, function (err, voisin) {
        if (err)
            res.send(err);
        res.json({
            message: 'voisin favorie',
            data: voisin.favorie ? voisin.favorie : []
        });
    });
};
// recupere le voisin par le nom
exports.getByName = function (req, res) {
    Voisin.find({name: req.params.name.toLowerCase()  }, function (err, voisin) {
        if (err)
            res.send(err);
        res.json({
            message: 'Details du voisin',
            data: voisin
        });
    });
};
// Handle update voisin info
exports.update = function (req, res) {
    Voisin.findById(req.params.voisin_id, function (err, voisin) {
        if (err)
            res.send(err);
        voisin.name = req.body.name ? req.body.name : voisin.name;
        voisin.address = req.body.address ? req.body.address : voisin.address;
        voisin.aboutMe = req.body.aboutMe ? req.body.aboutMe : voisin.aboutMe;
        voisin.phoneNumber = req.body.phoneNumber ? req.body.phoneNumber : voisin.phoneNumber;
// save the voisin and check for errors
        voisin.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Information du voisin modifié',
                data: voisin
            });
        });
    });
};


// ajouter au favorie
exports.addToFavorie = function (req, res) {
    Voisin.update(
        { _id: req.params.voisin_id }, 
        { $push: { favorie: req.body.friend } },
        function (err, voisin) {
            if (err)
                res.send(err);
    res.json({
                status: "success",
                message: voisin
            });
        });
};
// Handle delete voisin
exports.delete = function (req, res) {
    Voisin.remove({
        _id: req.params.voisin_id
    }, function (err, voisin) {
        if (err)
            res.send(err);
res.json({
            status: "success",
            message: 'voisin supprimé avec succes'
        });
    });
};