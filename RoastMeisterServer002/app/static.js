var express = require('express');

module.exports = function() {
  var app = express.Router();

  app.get('/*', function(req, res){
    // var uid = req.params.uid,
        path = req.params[0] ? req.params[0] : 'index.html';
    res.sendfile(path, {root: './dist'});
});

  return app;
}
