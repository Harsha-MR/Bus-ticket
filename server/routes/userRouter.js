import express from 'express'
import itemModel from '../models/userModel.js';

const router = express.Router();

// router.get('/', async (req, res) => {
//     try {
//         const items = await itemModel.find()
//         if (items.length === 0)
//             res.status(404).json({ message: 'Items not Found' })

//         res.json({ data: items })
//     } catch (error) {
//         res.status(500).json({ message: 'server error' })
//     }
// })


router.post('/login', async (req, res) => {
    const { name, email, phone, password, referalCode } = req.body
    try {
        const item = new itemModel({
            name, email, phone, password, referalCode
        })
        await item.save()
        if (!item)
            res.status(404).json({ message: 'Unable to Sign up' })
        res.status(201).json({ message: 'New User added', data: item })
    } catch (error) {
        res.status(500).json({ message: 'server error' })
    }
})




// router.get('/:id', async (req, res) => {
//     try {
//         const item = await itemModel.findById(req.params.id)
//         if (!item)
//             res.status(404).json({ message: 'unable to find item' })
//         res.status(200).json({ data: item })
//     } catch (error) {
//         res.status(500).json({ message: 'server error' })
//     }
// })




// router.put('/:id', async (req, res) => {
//     try {
//         const item = await itemModel.findByIdAndUpdate(req.params.id, req.body, { new: true })
//         if (!item)
//             res.status(404).json({ message: 'unable to find item' })
//         res.status(200).json({ message: 'Updated successfully...', data: item })
//     } catch (error) {
//         res.status(500).json({ message: 'server error' })
//     }
// })


// router.delete('/:id', async (req, res) => {
//     try {
//         const item = await itemModel.findByIdAndDelete(req.params.id)
//         if (!item)
//             res.status(404).json({ message: 'unable to find item' })
//         res.status(200).json({ message: 'Deleted successfully...', data: item })
//     } catch (error) {
//         res.status(500).json({ message: 'server error' })
//     }
// })
