import db from '../db/connection.js'
import fs from 'fs'
import path from 'path'

export async function uploadImage(req, res) {
    try {
        const { filename, path: filepath } = req.file
        await db.execute("INSERT INTO images (filename, filepath) VALUES (?, ?)", [filename, filepath])
        res.status(201).json({ message: "Imagem enviada com sucesso!", filename })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getImages(req, res) {
    try {
        const [rows] = await db.execute("SELECT * FROM images")
        res.status(200).json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function updateImage(req, res) {
    try {
        const { id } = req.params
        const { filename, path: newPath } = req.file

        const [old] = await db.execute("SELECT * FROM images WHERE id = ?", [id])
        if (old.length === 0) return res.status(404).json({ error: "Imagem não encontrada" })

        const oldPath = old[0].filepath

        await db.execute("UPDATE images SET filename = ?, filepath = ? WHERE id = ?", [filename, newPath, id])

        fs.unlink(oldPath, (err) => {
            if (err) console.warn("Erro ao remover imagem antiga:", err)
        })

        res.json({ message: "Imagem atualizada com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function deleteImage(req, res) {
    try {
        const { id } = req.params
        const [rows] = await db.execute("SELECT * FROM images WHERE id = ?", [id])
        if (rows.length === 0) return res.status(404).json({ error: "Imagem não encontrada" })

        const filePath = rows[0].filepath
        await db.execute("DELETE FROM images WHERE id = ?", [id])

        fs.unlink(filePath, (err) => {
            if (err) console.warn("Erro ao remover imagem do disco:", err)
        })

        res.json({ message: "Imagem excluída com sucesso!" })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}