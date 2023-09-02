const Note = require('../models/noteModel');
const wrapAsync = require('../middlewares/erroeHandler');

class NoteController {

    async addOneNote(req, res) {
        const [title, text] = req.body;
        const newNote = new Note({ title, text });
        const saveQuery = await newNote.save();
        res.status(201).json(saveQuery);
    }

    async getAllNotes(req, res) {
        const queryAll = await Note.find();
        res.send(queryAll);
    }

    async getOneNote(req, res) {
        const queryOne = await Note.find({ _id: req.params.id });
        res.send(queryOne);
    }

    async updateOneNote(req, res) {
        const [title, text] = req.body;
        const queryUpdate = await Note.findOneAndUpdate({ _id: req.params.id }, { title, text });
        res.send(queryUpdate);
    }

    async deleteOneNote(req, res) {
        const queryDelete = await Note.findOneAndDelete({ _id: req.params.id });
        res.send(queryDelete);
    }
}

module.exports = new NoteController();