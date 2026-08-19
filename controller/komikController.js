const db = require('../models');

async function getAllKomik(req, res) {
    try {
        const komik = await db.Komik.findAll();
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik:', err.message);
        res.status(500).json({ error: 'Failed to fetch komik' });
    }
}

async function getKomikById(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        res.status(200).json(komik);
    } catch (err) {
        console.error('Error fetching komik by ID:', err.message);
        res.status(500).json({ error: 'Failed to fetch komik by ID' });
    }
}

async function createKomik(req, res) {
    const { judul, sinopsis, tahun_terbit, penulis_id } = req.body;

    try {
        const newKomik = await db.Komik.create({
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id
        });

        res.status(201).json(newKomik);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
}
async function updateKomik(req, res) {
    const { id } = req.params;
    const { judul, sinopsis, tahun_terbit, penulis_id } = req.body;

    try {
        const komik = await db.Komik.findByPk(id);

        if (!komik) {
            return res.status(404).json({
                error: "Komik not found"
            });
        }

        await komik.update({
            judul,
            sinopsis,
            tahun_terbit,
            penulis_id
        });

        res.status(200).json(komik);

    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
}

async function deleteKomik(req, res) {
    const { id } = req.params;
    try {
        const komik = await db.Komik.findByPk(id);
        if (!komik) {
            return res.status(404).json({ error: 'Komik not found' });
        }
        await komik.destroy();
        res.status(200).json({ message: 'Komik deleted successfully' });
    } catch (err) {
        console.error('Error deleting komik:', err.message);
        res.status(500).json({ error: 'Failed to delete komik' });
    }
}

module.exports = {
    getAllKomik,
    getKomikById,
    createKomik,
    updateKomik,
    deleteKomik
};