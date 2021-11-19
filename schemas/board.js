const mongoose = require("mongoose");

const {Schema} = mongoose;
const boardSchema = new Schema({
    boardId:{
        type : Number,
        required : true,
        unique : true
    },
    title : {
        type: String, 
    },
    content : {
        type: String
    },
    writer :{
        type: String,
    },
    passwd : {
        type: String,
    },
    date : {
        type: Date
    }
// }
// ,{collection: 'board'
})

module.exports = mongoose.model("board", boardSchema)