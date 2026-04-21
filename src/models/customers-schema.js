module.exports = (db) =>
  db.model(
    'Customers',
    db.Schema({
      name: { 
        type: String, 
        required: true 
      },
      email: { 
        type: String, 
        unique: true, 
        required: true 
      },
      phone: { 
        type: String, 
        required: true 
      },
      point: { 
        type: Number, 
        default: 0 
      },
      registered_at: { 
        type: Date, 
        default: Date.now 
      },
    })
  );