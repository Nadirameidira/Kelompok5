module.exports = (db) =>
  db.model(
    'Products',
    db.Schema({
      name: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      stock: {
        type: Number,
        required: true,
        min: 0,
      },
      category: {
        type: String,
        default: 'Uncategorized',
      },
      description: {
        type: String,
        default: '',
      },
    },)
  );