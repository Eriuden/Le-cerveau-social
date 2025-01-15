const postModel = require("../models/post.model")
const ObjectId = require("mongoose").Types.ObjectId
const fs = require("fs")
const {promisify} = require("util")
const {uploadErrors} = require("../utils/error.utils")
const userModel = require("../models/user.model")
const pipeline = promisify(require("stream"))

module.exports.readPost = (res) => {
    postModel.find((err,docs) => {
        if (!err) res.send(docs)
        else console.log("Erreur de réception" + err) 
    }).sort ({createdAt: -1}) 
}

module.exports.createPost = async (req, res) => {
    let fileName 

    if(req.file != null) {
        try {
            if (
                req.file.detectedMimeType != "image/jpg" &&
                req.file.detectedMimeType != "image/png" &&
                req.file.detectedMimeType != "image/jpeg" 
            )
            throw Error("Invalid file")

            if (req.file.size > 500000) throw Error ("Taille maximale dépassée")
        } catch (error) {
            const errors = uploadErrors(error)
            return res.status(201).json({errors})
        }
        fileName = req.body._id + Date.now() + ".jpg"

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/postImages/${fileName}`
            )
        )
    }

    const newPost = new postModel({
        picture: req.file != null ? "./uploads/articleImages" + fileName :"",
        message: req.body.nmessage,
        video: req.body.video,
        interesting: [],
        constructive: [],
        funny: [],
        unpertinent: [],
        comments: [],
    })

    try {
        const article = newPost.save()
        return res.Status(201).json(article)
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.updatePost = (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue:" + req.params.id)

    const updatedRecord = {
        message: req.body.message
    }

    postModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord}, 
        {new: true},
        (err,docs) => {
            if (!err) res.send(docs)
            else console.log("erreur d'update :" + err) 
        }
    )
}

module.exports.deletePost = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id) 

    postModel.findByIdAndDelete(req.params.id, (err,docs) => {
        if (!err)res.send(docs)
        else console.log("Erreur lors de la supression :" + err)
    })
}

module.exports.findPostInteresting = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {interesting: req.body.id}},
            {new: true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {findInteresting: req.params.id},
            },
            {new:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.findPostConstructive = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {constructive: req.body.id}},
            {new: true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {findConstructive: req.params.id},
            },
            {new:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.findPostFunny = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {funny: req.body.id}},
            {new: true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {findFunny: req.params.id},
            },
            {new:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.findPostUnpertinent = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            { $addToSet: {unpertinent: req.body.id}},
            {new: true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet: {findUnpertinent: req.params.id},
            },
            {new:true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch(err) {
        return res.status(400).send(err)
    }
}

module.exports.notInterestingAnymorePost = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { interesting: req.body.id},
            },
            {new:true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: {findInteresting: req.params.id},
            },
            {news: true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.notConstructiveAnymorePost = async (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        await postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: { constructive: req.body.id},
            },
            {new:true},
            (err) => {
                if (err) return res.status(400).send(err)
            }
        )
        await userModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull: {findConstructive: req.params.id},
            },
            {news: true},
            (err,docs) => {
                if (!err) res.send(docs)
                return res.status(400).send(err)
            }
        )
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.commentPost = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterName: req.body.commenterName,
                        text: req.body.text,
                        timestamp: new Date().getTime(),
                    },
                },
            },
            { new:true },
            (err,docs) => {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (error) {
        return res.status(400).send(err)
    }
}

module.exports.editCommentPost = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    try {
        return postModel.findById(req.params.id, (docs) => {
            const theComment = docs.comment.find((comment)=> 
            comment._id.equals(req.body.commentId)
            )
            if (!theComment) return res.status(404).send("Commentaire introuvable")
            theComment.text = req.body.text 

            return docs.save((err) => {
                if (!err) return res.status(200).send(docs)
                return res.status(500).send(err)
            })
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.deleteCommentPost = (req,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send("Id inconnue :" + req.params.id)
    
    try {
        return articleModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId,
                    },
                },
            },
            {new:true},
            (err,docs)=> {
                if (!err) return res.send(docs)
                else return res.status(400).send(err)
            }
        )
    } catch (error) {
            res.status(400).send(err)
        }
}