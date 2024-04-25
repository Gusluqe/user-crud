const catchError = require('../utils/catchError');
const User = require('../models/User');
const { use } = require('../routes/user.router');

const getAll = catchError(async (req, res) => {
    const users = await User.findAll()    
    return res.json(users)
});

const create = catchError(async (req, res) => {
    const user = req.body    
    const createUser = await User.create(user)
    return res.status(201).json(createUser)
});

const getOne = catchError(async(req,res)=> {
    const {id} = req.params
    const user = await User.findByPk(id)
    if(!user) return res.status(404).json({menssage: "User not found"})
    return res.json(user)
});

const remove = catchError(async (req,res)=> {
    const {id} = req.params

    const removeUSer = await User.destroy( {where: {id} })
    if(!removeUSer) return res.status(404).json({menssage: "User not found"})
    
    return res.sendStatus(204) // no contenido
})

const update = catchError(async(req,res) => {
    const {id} = req.params
    const user = req.body
    const userUpdate = await User.update(user, {where:{id}, returning: true})
    if (userUpdate[0] === 0) return res.status(404).json({menssage: "User not found"})
    return res.json(userUpdate[1][0])
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}