const Stream = require('../models/Streams')


createStream = (req, res) => {
    const body=req.body
    console.log(req.body);
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a stream',
        })
    }

    const stream = new Stream(req.body)
    console.log(stream)
    if (!stream) {
        return res.status(400).json({ success: false, error: err })
    }

    stream
        .save()
        .then(() => {
         //   console.log(stream)
            return res.status(201).json({
                success: true,
                id: stream._id,
                message: 'Stream created!',
                title:stream.title,
                description:stream.description,
                userId:stream.userId
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Stream not created!',
            })
        })
}

editStream = async (req, res) => {
    const body = req.body
    console.log("controller edit",body)
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Stream.findOne({ _id: req.params.id }, (err, stream) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Stream not found!',
            })
        }
        stream.title = body.title
        stream.description=body.description
        stream
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: stream._id,
                    message: 'Stream updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Stream not updated!',
                })
            })
    })
}

deleteStream = async (req, res) => {
    console.log(req.params.id)
    await Stream.findOneAndDelete({ _id: req.params.id }, (err, stream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!stream) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: stream })
    }).catch(err => console.log(err))
}

getStreamById = async (req, res) => {
    await Stream.findOne({ _id: req.params.id }, (err, stream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!stream) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: stream})
    }).catch(err => console.log(err))
}

streamList = async (req, res) => {
    await Stream.find({}, (err, stream) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!stream.length) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }
        return res.status(200).json({ success: true, data: stream })
    }).catch(err => console.log(err))
}

module.exports = {
    createStream,
    editStream,
    getStreamById,
    deleteStream,
    streamList
}