//Déjà, se pose la question de comment je vais
//limiter la plupart des options au président (du conseil, calme toi Manu)

const councilModel = require("../models/council.model")
const ObjectId = require("mongoose").Types.ObjectId

module.exports.getAllCouncils = async (res) => {
    const councils = await councilModel.find()
    res.status(200).json(councils)
}

module.exports.getACouncil = async (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue" + req.params.id)

    councilModel.findById(req.params.id , (err,docs) => {
        if(!err) res.send(docs)
        else console.log("Id inconnue" + err)
    })
}

module.exports.createCouncil = async (req, res) => {

    const newCouncil = new councilModel({
        picture: req.file.name,
        theme: req.file.theme,
        presidentId: req.file.presidentId
    })

    try {
        const council = newCouncil.save()
        return res.Status(201).json(council)
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.updateCouncil = async (req,res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue" + req.params.id)

    try {
        await councilModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set : {
                    name: req.body.name,

                }
            },
            { new: true, upsert: false, setDefaultsOnInsert: true},
            (err,docs) => {
                if (!err) return res.send(docs)
                if (err) return res.status(500).send({message : err})
            }
        )
    } catch (error) {
        return res.status(500).json({message: err})
    }
}

module.exports.deleteCouncil = async (req, res) => {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send("Id inconnue" + req.params.id)

    try {
        await councilModel.findByIdAndDelete({_id: req.params.id})
        res.status(200).json({message: "Le conseil a tranché"})
    } catch (error) {
        return res.status(500).json({message: error})
    }
}