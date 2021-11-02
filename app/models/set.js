import {Schema, model} from 'mongoose';

const set = new Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    exercises: {
        type: Array,
    },
},
    {collection: 'set'},
)

const setModel = model('set', set);

export default setModel;