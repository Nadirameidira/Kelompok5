module.exports = (db) =>
  db.model(
    'Supplier',
    db.Schema({
      name: String,
      contactPerson: String,
      phone: String,
      email: String,
      address: String,
    })
  );
