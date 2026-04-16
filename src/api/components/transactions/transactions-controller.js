const transactionsService = require('./transactions-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

//ini buat api 1. Melihat riwayat transaksi (History)
async function getTransactions(request, response, next) {
    try {
    const transactions = await transactionsService.getTransactions();
    return response.status(200).json(transactions);
    } catch (error) {
    return next(error);
    }
}
//ini buat api 2. Proses checkout transaksi baru dan mengurangi stok
async function createTransactions(request, response, next) {
    try {
    const { items, total_price } = request.body;

//ini buat validasi sederhana, pastikan ada item yang dibeli
    if (!items || items.length === 0) {
        throw errorResponder
        (errorTypes.VALIDATION_ERROR, 
        'Minimal harus ada satu item untuk checkout');
    }
//ini buat memproses checkout transaksi baru dan mengurangi stok
    const transaction = await transactionsService.createTransaction(request.body);
    return response.status(201).json(transaction);
    } catch (error) {
    return next(error);
    }
}

//ini buat api 3. Melihat detail item dalam satu transaksi tertentu (Detail & Cetak Struk)
async function getTransactionById(request, response, next) {
    try {
    const { id } = request.params;
    const transaction = await transactionsService.getTransactionById(id);

    if (!transaction) {
    throw errorResponder(errorTypes.NOT_FOUND, 'Transaksi tidak ditemukan');
    }

    return response.status(200).json(transaction);
    } catch (error) {
    return next(error);
    }
}

//ini buat api 4. Membatalkan transaksi (Void)
async function voidTransaction(request, response, next) {
try {
    const { id } = request.params;
    await transactionsService.deleteTransaction(id);

    return response.status(200).json({
        status: 'success',
        message: 'Transaksi berhasil dibatalkan (void)'
    });
    } catch (error) {
    return next(error);
    }
}

module.exports = {
    getTransactions,
    createTransactions,
    getTransactionById,
    voidTransaction,
};