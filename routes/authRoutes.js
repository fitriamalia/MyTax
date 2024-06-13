const express = require('express');
const router = express.Router();
const db = require('../config/firebase'); // Pastikan ini mengarah ke file konfigurasi Firebase Anda

// POST untuk membuat profil user baru
router.post('/profile-user', async (req, res) => {
  try {
    const { email, nama, npwp, nomor_hp, nama_direksi, alamat } = req.body;
    await db.collection('ProfileUser').doc(email).set({
      nama,
      npwp,
      nomor_hp,
      nama_direksi,
      alamat
    });
    res.status(201).send('Profil user berhasil dibuat');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET untuk mengambil semua profil user
router.get('/profile-user', async (req, res) => {
  try {
    const snapshot = await db.collection('ProfileUser').get();
    const profileUsers = snapshot.docs.map(doc => doc.data());
    res.status(200).json(profileUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT untuk memperbarui profil user berdasarkan email
router.put('/profile-user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { nama, npwp, nomor_hp, nama_direksi, alamat } = req.body;
    await db.collection('ProfileUser').doc(email).update({
      nama,
      npwp,
      nomor_hp,
      nama_direksi,
      alamat
    });
    res.send('Profil user berhasil diperbarui');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE untuk menghapus profil user berdasarkan email
router.delete('/profile-user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    await db.collection('ProfileUser').doc(email).delete();
    res.send('Profil user berhasil dihapus');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// POST untuk membuat usaha baru
router.post('/usaha', async (req, res) => {
  try {
    const { nama_usaha, jenis_usaha, kategori_usaha, omset_per_tahun, email } = req.body;
    await db.collection('Usaha').doc(nama_usaha).set({
      jenis_usaha,
      kategori_usaha,
      omset_per_tahun,
      email // Kunci asing ke ProfileUser
    });
    res.status(201).send('Usaha berhasil dibuat');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET untuk mengambil semua usaha
router.get('/usaha', async (req, res) => {
  try {
    const snapshot = await db.collection('Usaha').get();
    const usahas = snapshot.docs.map(doc => doc.data());
    res.status(200).json(usahas);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT untuk memperbarui usaha berdasarkan nama usaha
router.put('/usaha/:nama_usaha', async (req, res) => {
  try {
    const { nama_usaha } = req.params;
    const { jenis_usaha, kategori_usaha, omset_per_tahun, email } = req.body;
    await db.collection('Usaha').doc(nama_usaha).update({
      jenis_usaha,
      kategori_usaha,
      omset_per_tahun,
      email // Kunci asing ke ProfileUser
    });
    res.send('Usaha berhasil diperbarui');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE untuk menghapus usaha berdasarkan nama usaha
router.delete('/usaha/:nama_usaha', async (req, res) => {
  try {
    const { nama_usaha } = req.params;
    await db.collection('Usaha').doc(nama_usaha).delete();
    res.send('Usaha berhasil dihapus');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// POST untuk membuat penjualan baru
router.post('/penjualan', async (req, res) => {
  try {
    const { kode_faktur, penjual, nama_pembeli, tgl_penjualan, total_penjualan, npwp_pembeli, jenis_penjualan, dpp, jenis_dpp, ppn_keluaran, ppn_penjualan, email } = req.body;
    await db.collection('Penjualan').doc(kode_faktur).set({
      penjual,
      nama_pembeli,
      tgl_penjualan,
      total_penjualan,
      npwp_pembeli,
      jenis_penjualan,
      dpp,
      jenis_dpp,
      ppn_keluaran,
      ppn_penjualan,
      email // Kunci asing ke ProfileUser
    });
    res.status(201).send('Penjualan berhasil dibuat');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET untuk mengambil semua penjualan
router.get('/penjualan', async (req, res) => {
  try {
    const snapshot = await db.collection('Penjualan').get();
    const penjualans = snapshot.docs.map(doc => doc.data());
    res.status(200).json(penjualans);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT untuk memperbarui penjualan berdasarkan kode faktur
router.put('/penjualan/:kode_faktur', async (req, res) => {
  try {
    const { kode_faktur } = req.params;
    const { penjual, nama_pembeli, tgl_penjualan, total_penjualan, npwp_pembeli, jenis_penjualan, dpp, jenis_dpp, ppn_keluaran, ppn_penjualan, email } = req.body;
    await db.collection('Penjualan').doc(kode_faktur).update({
      penjual,
      nama_pembeli,
      tgl_penjualan,
      total_penjualan,
      npwp_pembeli,
      jenis_penjualan,
      dpp,
      jenis_dpp,
      ppn_keluaran,
      ppn_penjualan,
      email // Kunci asing ke ProfileUser
    });
    res.send('Penjualan berhasil diperbarui');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// DELETE untuk menghapus penjualan berdasarkan kode faktur
router.delete('/penjualan/:kode_faktur', async (req, res) => {
  try {
    const { kode_faktur } = req.params;
    await db.collection('Penjualan').doc(kode_faktur).delete();
    res.send('Penjualan berhasil dihapus');
  } catch (error) {
    res.status(500).send(error.message);
  }
});


// POST untuk membuat pembelian baru
router.post('/pembelian', async (req, res) => {
  try {
    const { kode_faktur_pembelian, penjual, nama_pembeli, tgl_pembelian, total_pembelian, npwp_penjual, jenis_pembelian, dpp, jenis_dpp, ppn_masukan, ppn_pembelian, email } = req.body;
    await db.collection('Pembelian').doc(kode_faktur_pembelian).set({
      penjual,
      nama_pembeli,
      tgl_pembelian,
      total_pembelian,
      npwp_penjual,
      jenis_pembelian,
      dpp,
      jenis_dpp,
      ppn_masukan,
      ppn_pembelian,
      email // Kunci asing ke ProfileUser
    });
    res.status(201).send('Pembelian berhasil dibuat');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// GET untuk mengambil semua pembelian
router.get('/pembelian', async (req, res) => {
  try {
    const snapshot = await db.collection('Pembelian').get();
    const pembelians = snapshot.docs.map(doc => doc.data());
    res.status(200).json(pembelians);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// PUT untuk memperbarui pembelian berdasarkan kode faktur pembelian
router.put('/pembelian/:kode_faktur_pembelian', async (req, res) => {
  try {
    const { kode_faktur_pembelian } = req.params;
    const { penjual, nama_pembeli, tgl_pembelian, total_pembelian, npwp_penjual, jenis_pembelian, dpp, jenis_dpp, ppn_masukan, ppn_pembelian, email } = req.body;
    await db.collection('Pembelian').doc(kode_faktur_pembelian).update({
        penjual,
        nama_pembeli,
        tgl_pembelian,
        total_pembelian,
        npwp_penjual,
        jenis_pembelian,
        dpp,
        jenis_dpp,
        ppn_masukan,
        ppn_pembelian,
        email // Kunci asing ke ProfileUser
      });
      res.send('Pembelian berhasil diperbarui');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // DELETE untuk menghapus pembelian berdasarkan kode faktur pembelian
  router.delete('/pembelian/:kode_faktur_pembelian', async (req, res) => {
    try {
      const { kode_faktur_pembelian } = req.params;
      await db.collection('Pembelian').doc(kode_faktur_pembelian).delete();
      res.send('Pembelian berhasil dihapus');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  
  // POST untuk membuat PPN baru
  router.post('/ppn', async (req, res) => {
    try {
      const { kode_faktur, total_ppn_keluaran, total_ppn_masukan, email } = req.body;
      await db.collection('PPN').doc(kode_faktur).set({
        total_ppn_keluaran,
        total_ppn_masukan,
        email // Kunci asing ke ProfileUser
      });
      res.status(201).send('PPN berhasil dibuat');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // GET untuk mengambil semua PPN
  router.get('/ppn', async (req, res) => {
    try {
      const snapshot = await db.collection('PPN').get();
      const ppns = snapshot.docs.map(doc => doc.data());
      res.status(200).json(ppns);
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // PUT untuk memperbarui PPN berdasarkan kode faktur
  router.put('/ppn/:kode_faktur', async (req, res) => {
    try {
      const { kode_faktur } = req.params;
      const { total_ppn_keluaran, total_ppn_masukan, email } = req.body;
      await db.collection('PPN').doc(kode_faktur).update({
        total_ppn_keluaran,
        total_ppn_masukan,
        email // Kunci asing ke ProfileUser
      });
      res.send('PPN berhasil diperbarui');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  // DELETE untuk menghapus PPN berdasarkan kode faktur
  router.delete('/ppn/:kode_faktur', async (req, res) => {
    try {
      const { kode_faktur } = req.params;
      await db.collection('PPN').doc(kode_faktur).delete();
      res.send('PPN berhasil dihapus');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });
  
  module.exports = router;
  