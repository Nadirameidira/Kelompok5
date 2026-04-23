module.exports = (db) =>
  db.model(
    'Categories',
    db.Schema({
      name: String,
      description: String,
    })
  );
