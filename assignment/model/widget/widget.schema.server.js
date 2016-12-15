
module.exports = function () {

    var mongoose = require('mongoose');

    var WidgetSchema = mongoose.Schema({
        _page: {type: mongoose.Schema.Types.ObjectId, ref: 'Page'},
        widgetType: {type: String, enum:['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT', 'TEXT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        rows: {type: Number, default: 0},
        size: {type: Number, default: 0},
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "widget"});

    return WidgetSchema;
};