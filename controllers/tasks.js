const Board = require('../models/board')

module.exports ={
    index,
    createTask,
    // showTask,
    deleteTask,
    updateStatus
}

function deleteTask(req, res){
    Board.findOne({featureId: req.params.featureId})
    .then(board =>{
        const idx = board[req.params.status].items.findIndex(i => i._id === req.params.taskId)
        board[req.params.status].items.splice(idx, 1)
        board.save().then(board => res.json(board))
    })
}

function updateStatus(req, res){
    console.log(req.body)
    Board.findOne({featureId: req.params.featureId})
    .then(board =>{
        const idx = board[req.params.status].items.findIndex(i => i._id === req.body._id)
        board[req.params.status].items.splice(idx,1)
        board[req.params.destination].items.splice(idx, 0, req.body)
        board.save().then(board => res.json(board))
    })
}

// function updateTask(req, res){
//     Feature.findById(req.params.featureId)
//     .then(feature =>{
//         const idx = feature.tasks.findIndex(t => t._id.params.equals(req.params.taskId))
//         feature.tasks.splice(idx, 1, req.body)
//     })
// }

// function deleteTask(req, res){
//     Feature.findById(req.params.featureId)
//     .then(feature =>{
//         const idx = feature.tasks.findIndex(t => t._id.equals(req.params.taskId))
//         feature.tasks.splice(idx, 1)
//         feature.save().then(feature => res.status(200))
//     })
// }

// function showTask(req, res){
//    Feature.findById(req.params.featureId)
//    .then(feature =>{
//        const idx = feature.tasks.findIndex(t => t._id.equals(req.params.taskId))
//        res.json(feature.tasks[idx])
//    })
// }

function index(req, res){
    Board.findOne({featureId: req.params.featureId})
    .then(board => res.json(board))
}


function createTask(req, res){
    Board.findOne({featureId: req.params.featureId})
    .then(board => {   
        board.backlog.items.push(req.body)
        board.save().then(board =>
            res.json(board))}
        )
}

