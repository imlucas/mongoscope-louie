var debug = require('debug')('louie'),
  async = require('async'),
  d3 = require('d3');

module.exports = function(opts){
  var dbs = [],
    colls = {},
    namespaces = {},
    rands = {},
    client = require('mongoscope-client')(opts);

  client.databases(function(err, names){
    dbs = names;
    async.parallel(names.map(function(name){
      return function(cb){
        client.getCollectionNames(name, function(err, cs){
          if(cs.indexOf('system') > -1) return;
          colls[name] = cs;
          cs.map(function(coll){
            rands[name + '.' + coll] = d3.random.logNormal(1, 10);
            namespaces[name + '.' + coll] = {db: name, collection: coll};
          });
          cb(err);
        });
      };
    }), function(err){
      if(err) throw err;

      async.parallel(
      Object.keys(rands).map(function(ns){
        return function(){
          var attack = function(){
            console.log('ATTACK');
            var start = Date.now();

            client.find(namespaces[ns].db, namespaces[ns].collection, {}, function(){
              console.log(' - took ' +  (Date.now() - start) + 'ms', arguments);
              schedule();
            });
          };

          var schedule = function(){
            var wait = Math.round(rands[ns]());
            if(wait <= 0){
              console.log('will check again in ' + (Math.max(wait, 3) * 1000) +
                'ms if we should attack ' + ns);
              return setTimeout(schedule, Math.max(wait, 1) * 1000);
            }
            attack();
          };

          schedule();
        };
      }));
    });
  });

};

