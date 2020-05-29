const db = require("../models");
const Tutorial = db.tutorials;
//Create and sace a tutorial
exports.create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty" });
        return;
    }
    //create a tutorial
    const tutorial = new Tutorial({
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    });
    //Save tutorial to database
    tutorial
        .save(tutorial)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the tutorial."
            });
        });
}
//Show all tutorials from the database
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Tutorial.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occured while creating the tutorial."
            });
        });
}
//Find a single tutorial with an id
exports.findOne = function (req, res) {
    const id = req.params.id;
    Tutorial.findById(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Not found tutorial with id " + id
                });
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error retrieving tutorial with id= " + id
            });
        });
}
//Update a tutorial by the id
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty"
        });
    }
    const id = req.params.id;
    Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: "Cannot update tutorial with id=${id}. Maybe tutorial was not found"
                });
            }
            else {
                res.send({ message: "Tutorial was updated successfully" });
            }

        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating tutorial with id=" + id
            });
        });
};
//Delete a tutorial with the id
exports.delete=(req, res)=>{
    const id=req.params.id;
    Tutorial.findByIdAndRemove(id, {useFindAndModify: false})
    .then(data=>{
        if(!data){
            res.status(404).send({message:"Cannot delete tutorial with id=${id}. Maybe tutorial was not found"})
        }
        else{
            res.send({
                message: "Tutorial was deleted successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message: "Error delete tutorial with id=" + id
        })
    })
};
//Delete a tutorials from the database
exports.deleteAll=(req, res)=>{
    Tutorial.deleteMany({})
    .then(data=>{
        res.send({
            message: '${data.deletedCount} tutorialls were deleted successfully'
        })
    })
    .catch(err=>{
        res.status(500).send({
            message: "Some error occurred when delete all tutorial"
        })
    })
};
//Find all published tutorials
exports.findAllPublished=(req, res)=>{
    Tutorial.find({published: true})
    .then(data=>{
        res.send(data);
    })
    .catch(err=>{
        res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorial"
        });
    });
};


