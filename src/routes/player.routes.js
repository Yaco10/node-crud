import express from 'express'
import { Player } from '../models/player.model.js'

const router = express.Router()

//middleware
const getPlayer = async(req,res,next) =>{
    let player
    const { id } = req.params;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message: 'ID del jugador no es valido'
            })
    }

    try {
        player = await Player.findById(id);
        if(!player){
            return res.status(404).json(
                {
                    message: 'El jugador no fue encontrado'
                }
            )
        }
    }
    catch(error){
        return res.status(500).json(
            {
                message
            }
        )
    }

    res.player = player;
    next();
        
}

//Obtener jugadores
router.get('/', async (req,res) => {
    try{
        const players = await Player.find()
        console.log('GET ALL', players)
        if(players.length === 0){
           return res.status(204).json([])
        }
        res.json(players)
    }
    catch (error){
        res.status(500).json({message: error.message})
    }
})

//crear JUGADORES

router.post('/', async (req, res) => {
        const {name, club, age } = req?.body
        if(!name || !club || !age){
            return res.status(400).json(
                {
                    message: 'Los campos nombre, club, y edad son obligatorios'
                }
            )
        }

        const player = new Player(
            {
                name, 
                club, 
                age 
            }
        )

        try{
            const newPlayer = await player.save()
            console.log(newPlayer)
            res.status(201).json(newPlayer)
        }
        catch(error){
            res.status(400).json({
                message: error.message
            })
        }

    })

     router.get('/:id', getPlayer, async(req,res) => {
         res.json(res.player)
     })



export default router