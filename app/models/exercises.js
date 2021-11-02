import {Schema, model} from 'mongoose';

const exercise = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    instructions: {
        type: Array,
    },
},
    {collection: 'exercises'},
)

const exerciseModel = model('exercises', exercise);

export default exerciseModel;