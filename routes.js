JavaScript

'use strict';
let mongoose = require('mongoose');
let Entry = mongoose.model('Entry');
module.exports = app => {
  app.route('/entries')
    .get((req, res, next) => {
      Entry.find(req.query, (err, entries) => {
        if (err) { return next(err); }
        res.json(entries);
      });
    })
    .post((req, res, next) => {
      let e = new Entry(req.body);
      e.save((err, entry) => {
        if (err) { return next(err); }
        res.json(entry);
      })
    });

  app.route('/entries/:entryId')
    .get((req, res, next) => {
      Entry.findById(req.params.entryId, (err, entry) => {
        if (err) { return next(err); }
        res.json(entry);
      });
    })
    .post((req, res, next) => {
      Entry.findOneAndUpdate(req.params.entryId, req.body, {new: true}, (err, entry) => {
        if (err) { return next(err); }
        res.json(entry);
      });
    })
    .delete((req, res, next) => {
      Entry.findOneAndRemove({ _id: req.params.entryId }, (err, entry) => {
        if (err) { return next(err); }
        res.json(entry);
      });
    });
    timestamps: true,
    minimize: false
};
