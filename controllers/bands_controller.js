const bands = require('express').Router()
const db = require('../models')
const {Band} = db

// FIND BANDS
bands.get('/', async (req, res) => {
    try {
        const foundBands = await Band.findAll() //excluding the default ID that sequelize attempts to look for, because we don't have it.
        res.status(200).json(foundBands)
    } catch (error) {
        res.status(500).json(error)
    }
})

// FIND CERTAIN BAND
bands.get('/:id', async (req, res)=>{
    try {
        const foundBand = await Band.findOne({where:{id: req.params.id}})
        res.status(200).json(foundBand)
    } catch(err) {
        res.status(500).json(err)
    }
})

//CREATE A BAND
bands.post('/', async (req, res)=> {
    try{
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully added band!',
            data: newBand
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE A BAND
bands.put('/:id', async (req, res)=> {
    try{
        const updatedBands = await Band.update(req.body,{
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err){
        res.status(500).json(err)
    }
})

// DELETE A BAND
bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})




module.exports = bands
