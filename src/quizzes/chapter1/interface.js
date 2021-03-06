/*
 *  Inserts "doc" into the collection "movies".
 */
exports.insert = function(db, doc, callback) {
  // TODO: implement
  db.collection('movies').insert(doc, function(error, result, callback) {
      if(error) {
          console.log(error);
          process.exit(1);
      }

  });
    callback(null);
};

/*
 *  Finds all documents in the "movies" collection
 *  whose "director" field equals the given director,
 *  ordered by the movie's "title" field. See
 *  http://mongodb.github.io/node-mongodb-native/2.0/api/Cursor.html#sort
 */
exports.byDirector = function(db, director, callback) {
  // TODO: implement
    query = { $query: {'director': director}, $orderby: {'title':1} };
    db.collection('movies').find(query).toArray(function(error, docs) {
        if(error) {
            console.log(error);
            callback(error)
        }

        //sconsole.log('Found Docs:');
        docs.forEach(function(doc) {
            //console.log(JSON.stringify(docs));
        });
        callback(null, docs);
    });
};
