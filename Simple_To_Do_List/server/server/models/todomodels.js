import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
//A todo object has id, title, description, createdDate, & lastModifiedDate properties.
    title: {
        type: String
    },
    description: {
        type: String
    },
    dueDate: {
        type: Date
    },
    time: {
        type: String
    },
    completed:{
        type: Boolean,
        default: false
    }
}, {
    versionKey: false
});

TodoSchema.virtual('id').get(function() {
    //Convert id to HexaDecimal
    return this._id.toHexString();
});
// Set the the values to JSON
TodoSchema.set('toJSON', { virtuals: true });

const model = mongoose.model('todo', TodoSchema);

export default model;