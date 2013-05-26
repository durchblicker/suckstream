/*
** © 2013 by Philipp Dunkel <p.dunkel@me.com>. Licensed under MIT License.
*/

module.exports = suckstream;

function suckstream(stream, callback) {
  (('function' === typeof stream.read) ? suckstream2 : suckstream1)(stream, callback);
}

function suckstream1(stream, callback) {
  var dat = [],
    len = 0;
  stream.on('data', function(chunk) {
    dat.push(chunk);
    len += chunk.length;
  });
  stream.on('end', function() {
    dat = Buffer.concat(dat, len);
    callback(null, dat);
  });
  stream.once('error', callback);
  stream.resume();
}

function suckstream2(stream, callback) {
  var dat = [],
    len = 0;
  stream.on('readable', function() {
    var chunk = stream.read();
    dat.push(chunk);
    len += chunk.length;
  });
  stream.on('end', function() {
    dat = Buffer.concat(dat, len);
    callback(null, dat);
  });
  stream.once('error', callback);
  stream.read(0);
}
