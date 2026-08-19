const { Genre } = require('../models');

// 1. Ambil semua data genre (Get All)
exports.getAllGenre = async (req, res) => {
  try {
    const genres = await Genre.findAll();

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil semua data genre',
      total: genres.length,
      data: genres
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil data genre',
      error: error.message
    });
  }
};

// 2. Ambil satu data genre berdasarkan ID (Get By ID)
exports.getGenreById = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID genre harus berupa angka'
      });
    }

    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: `Genre dengan ID ${id} tidak ditemukan`
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Berhasil mengambil detail genre',
      data: genre
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal mengambil detail genre',
      error: error.message
    });
  }
};

// 3. Tambah genre baru (Create)
exports.createGenre = async (req, res) => {
  try {
    const { nama, deskripsi } = req.body;

    if (!nama || nama.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Nama genre tidak boleh kosong'
      });
    }

    const existingGenre = await Genre.findOne({ where: { nama: nama.trim() } });
    if (existingGenre) {
      return res.status(409).json({
        success: false,
        message: 'Nama genre tersebut sudah terdaftar'
      });
    }

    const newGenre = await Genre.create({
      nama: nama.trim(),
      deskripsi: deskripsi ? deskripsi.trim() : null
    });

    return res.status(201).json({
      success: true,
      message: 'Genre berhasil ditambahkan',
      data: newGenre
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menambahkan genre baru',
      error: error.message
    });
  }
};

// 4. Update data genre berdasarkan ID (Update)
exports.updateGenre = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama, deskripsi } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID genre harus berupa angka'
      });
    }

    if (!nama || nama.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Nama genre tidak boleh kosong'
      });
    }

    const existingGenre = await Genre.findByPk(id);

    if (!existingGenre) {
      return res.status(404).json({
        success: false,
        message: `Genre dengan ID ${id} tidak ditemukan`
      });
    }

    const duplicateGenre = await Genre.findOne({ where: { nama: nama.trim() } });
    if (duplicateGenre && duplicateGenre.id !== parseInt(id)) {
      return res.status(409).json({
        success: false,
        message: 'Nama genre tersebut sudah digunakan oleh ID lain'
      });
    }

    await existingGenre.update({
      nama: nama.trim(),
      deskripsi: deskripsi ? deskripsi.trim() : existingGenre.deskripsi
    });

    return res.status(200).json({
      success: true,
      message: 'Genre berhasil diperbarui',
      data: existingGenre
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal memperbarui data genre',
      error: error.message
    });
  }
};

// 5. Hapus genre berdasarkan ID (Delete)
exports.deleteGenre = async (req, res) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'ID genre harus berupa angka'
      });
    }

    const genre = await Genre.findByPk(id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: `Genre dengan ID ${id} tidak ditemukan`
      });
    }

    await genre.destroy();

    return res.status(200).json({
      success: true,
      message: `Genre dengan ID ${id} berhasil dihapus`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Gagal menghapus genre',
      error: error.message
    });
  }
};