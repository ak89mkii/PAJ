const Feature = require('../models/feature')

module.exports = {
    index,
    createFeature,
    showFeature,
    deleteFeature,
    updateFeature
}



function updateFeature(req, res){
    Feature.findByIdAndUpdate(req.params.featureId, req.body, {new: true})
    .populate('lead')
    .then(feature => res.json(feature))
}

function deleteFeature(req, res){
    Feature.findByIdAndDelete(req.params.featureId)
    .then((feature)=> res.status(200).json(feature))
}

function showFeature(req, res){
   Feature.findById(req.params.featureId)
   .then(feature => res.json(feature))
}

function index(req,res){
    Feature.find({project: req.params.projectId})
    .populate('lead')
    .then(features => res.json(features))
}

async function createFeature(req, res){
    req.body.project = req.params.projectId
    let feature = await Feature.create(req.body)
    feature = await feature.populate('lead').execPopulate().then(feature => feature)
    res.json(feature)
}


