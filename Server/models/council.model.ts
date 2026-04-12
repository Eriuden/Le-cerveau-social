//Lui va être plus complexe
//Il faut en plus de l'id générée auto, un nom, un thème, et un président
//Il faut pouvoir y englober des users et des posts, tout en rendant l'accés privé

import { Schema, Document, model } from "mongoose";

export interface ICouncil extends Document {
    name : String,
    banner : String,
    theme : String,
    presidentId : String,
    posts : [
        posterId: String,
                    posterName: String,
                    text: String,
                    video:String,
                    comments:                        
                        [
                            commenterId: String,
                            commenterName: String,
                            text: String,
                            video: String,
                            timeStamp: Number
                        ]
                        ,
    ],
    member : [
        memberId : String,
        memberName: String
    ]
}

const CouncilSchema = new Schema<ICouncil>(
    {
        name:{            
            required: true
        } ,
        banner:{            
            required:true
        }, 
        theme:{
            required: true
        },
        presidentId:{
            required: true
        },

        posts: {
            required: true,
        },
        member: {
        }
    },

    
    {
        timestamps: true,
    }
)

export const councilModel = model<ICouncil>('council',CouncilSchema)