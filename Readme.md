# SuckStream

This is a simple utility, that takes a Readable Stream and sucks it into a Buffer.

     var suck = require('suckstream');
     suck(stream, function(err, buffer) {
       // I now have a Buffer
     });

This works for both Old-Style (Node < 0.9) and New-Style (Node 0.9+) streams.
