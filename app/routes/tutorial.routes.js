module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    var router = require("express").Router();
    //create a new Tutorial
    router.post("/", tutorials.create);
    //Show all tutorials
    router.get("/", tutorials.findAll);
    //Show all publish tutorial
    router.get("/published", tutorials.findAllPublished);
    //Show a single tutorial with id
    router.get("/:id", tutorials.findOne);
    //Update a tutorial with id
    router.put("/:id", tutorials.update);
    //Delete tutorial with id
    router.delete("/:id", tutorials.delete);
    //Delete all tutorial
    router.delete("/", tutorials.deleteAll);
    app.use("/api/tutorials", router);
}