# REST API (KASIR), KELOMPOK 5

### NAMA ANGGOTA KELOMPOK :
 535250061 Lulu Lydia Andrean

535250066 Meisa Putri Nadira

535250074 Stesa Aurel Titania

535250088 Aurelian Alfreda

535250091 Dimas Pradana Siddharta Halim

## PENJELASAN END POINT

### A. Keamanan & User (/api/auth & /api/users) - Meisa 0066
 
Auth:
- POST /api/auth/register: Pendaftaran kasir baru.

- POST /api/auth/login: Autentikasi dan mendapatkan Token JWT. 

Users: 
- GET /api/users/profile: Mengambil data profil user yang sedang login.

- PUT /api/users/update-password: Mengganti password user untuk keamanan.

- GET /api/cashier : Mengambil semua users yang merupakan 
kasir
 

### B. Inventori & Produk (/api/products) - Stesa 
Manajemen Produk: 
● GET /api/products: Menampilkan semua produk (dengan filter kategori/nama). 
● POST /api/products: Menambahkan produk baru ke sistem. 
Update & Kontrol: 
● PUT /api/products/:id: Memperbarui detail produk, harga, atau stok. 
● DELETE /api/products/:id: Menghapus produk dari daftar aktif. 

### C.Master Data & Supplier (/api/categories & /api/suppliers) - Lulu 
Kategori: 
● GET /api/categories: Melihat daftar kategori (Makanan, Minuman, dll). 
● POST /api/categories: Menambah kategori baru. 
Supplier: 
● GET /api/suppliers: Melihat daftar partner supplier. 
● POST /api/suppliers: Menambah data supplier baru. 
 
### D. Transaksi (/api/transactions)  - Dimas  
Operasional Kasir: 
● POST /api/transactions/checkout: Memproses pembayaran dan mengurangi stok otomatis. 
● GET /api/transactions/history: Melihat riwayat seluruh transaksi yang pernah dilakukan. 
Detail & Bukti: 
● GET /api/transactions/:id: Melihat detail item dalam satu transaksi tertentu (untuk cetak struk). 
● DELETE /api/transactions/:id: Membatalkan transaksi (void) jika ada kesalahan input. 

### E. Analitik & Pelanggan (/api/reports & /api/customers) - Aurelian 
Laporan (Analytics): 
● GET /api/reports/daily: Rekap total pendapatan dan jumlah transaksi hari ini. 
● GET /api/reports/low-stock: Daftar produk yang stoknya di bawah ambang batas (alert). 
Manajemen Pelanggan: 
● GET /api/customers: Melihat daftar member/pelanggan tetap. 
● POST /api/customers: Registrasi member baru untuk program loyalitas/diskon.