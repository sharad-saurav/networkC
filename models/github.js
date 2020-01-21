'use strict';
const mongoose = require('mongoose');

var gitSchema = mongoose.Schema({
    "id": Number,
    "name": String,
    "html_url": String,
    "description": String,
    "open_issues": Number,
    "watchers": Number,
    owner: {
        "id": Number,
        "avatar_url": String,
        "html_url": String,
        "type": String,
        "site_admin": Boolean
    }
},{ typeKey: '$type' });

gitSchema.plugin(require('mongoose-timestamp'));
gitSchema.plugin(require('mongoose-delete'), {
    overrideMethods: true,
    deletedAt: true
});

module.exports = mongoose.model('Github', gitSchema);