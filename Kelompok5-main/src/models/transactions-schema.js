module.exports = (db) =>
db.model(
    'Transactions',
    db.Schema({
   //ini adalah skema untuk transaksi,yang berisi informasi tentang buku yang dibeli, total harga, tanggal transaksi, dan status transaksi.
        items: [
        {
        book_id: { type: String, required: true },
        title: String,
        quantity: Number,
        price: Number,
        },
],
      //Total harga yang harus dibayar
        total_price: {
        type: Number,
        required: true,
    },
      //Mencatat waktu transaksi untuk fitur "History"
        transaction_date: {
        type: Date,
        default: Date.now,
        },
      //Status transaksi
        status: {
        type: String,
        default: 'success',
        },
    })
);