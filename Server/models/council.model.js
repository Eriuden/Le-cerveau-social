//Lui va être plus complexe
//Il faut en plus de l'id générée auto, un nom, un thème, et un président
//Il faut pouvoir y englober des users et des posts, tout en rendant l'accés privé


const mongoose = require('mongoose');

const CouncilSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        } ,
        theme:{
            type: String,
            required: true
        },
        presidentId:{
            type: String,
            required: true
        },

        posts: {
            type: [
                {
                    posterId: String,
                    posterName: String,
                    text: String,
                    video:String,
                    comments: {
                        type: [
                            {
                            commenterId: String,
                            commenterName: String,
                            text: String,
                            video: String,
                            timeStamp: Number
                            }
                        ],
                        required: true, 
                    },
                    timestamp: Number,
                }
            ],
            required: true,
        },
        member: {
            type: [
                {
                    memberId: String,
                    memberName: String,
                }
            ]
        }
    },

    
    {
        timestamps: true,
    }
)

const councilModel = mongoose.model('council',CouncilSchema)
module.exports = councilModel