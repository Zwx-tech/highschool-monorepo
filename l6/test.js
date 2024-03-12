const Datastore = require("nedb");

const coll1 = new Datastore({
  filename: "collection.db",
  autoload: true,
});

const doc = {
  a: "a",
  b: "b",
};

// handle insert to db
coll1.insert(doc, function (err, newDoc) {
  console.log(
    `dodano dokument (obiekt): \n ${JSON.stringify(newDoc, null, 5)}`
  );
  console.log(`New doc id: ${newDoc._id}`);
});

// ex 1 - create db mock up
console.log("PRZED FOR: " + new Date().getMilliseconds());
for (let i = 0; i < 3; i++) {
  let doc = {
    a: "a" + i,
    b: "b" + i,
  };
  coll1.insert(doc, function (err, newDoc) {
    console.log(
      "id dokumentu: " + newDoc._id,
      "DODANO: " + new Date().getMilliseconds()
    );
  });
}
console.log("PO FOR: " + new Date().getMilliseconds());

//* find
coll1.findOne({_id: 'PcubIFkk55eVDAtx'}, function (err, doc) {
    console.log(`FIND: `)
    console.log(JSON.stringify(doc, null, 5));
});


//* find all 
coll1.find({}, function (err, docs) {
    console.log("FIND ALL: ");
    console.log(JSON.stringify(docs, null, 5));
});

//* count
coll1.count({}, function (err, count) {
    console.log("COUNT: ",count);
});

//* count if
coll1.count({ a: 'a1'}, function (err, count) {
    console.log("COUNT IF: ",count);
});

//! remove only first occurence of specific element
coll1.remove({ a:"a2" }, {}, function (err, numRemoved) {
    console.log("REMOVED: ",numRemoved);
});

//! remove only all element that meet condition
coll1.remove({ a:"a2" }, {multi: true}, function (err, numRemoved) {
    console.log("REMOVED: ",numRemoved);
});


//! remove ALL
coll1.remove({}, { multi: true }, function (err, numRemoved) {
   console.log("REMOVED ALL: ",numRemoved);
});