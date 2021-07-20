const bcryptjs = require('bcryptjs');
const models = require('../models/index');
exports.index = async (req, res, next) => {
    // const users = await models.User.findAll();
    // const users = await models.User.findAll({
    //     attributes : ['id', 'name', 'email', 'created_at'],
    //     order : [['id', 'desc']]
    // });    

    // const users = await models.User.findAll({
    //     attributes : {exclude : ['password']},
    //     where :  {
    //         email : '1@ac.c'
    //     },
    //     order : [['id', 'desc']]
    // });
    
    // const users = await models.User.findAll({
    //     attributes : ['id', 'name', ['email', 'username'], 'created_at'],
    //     order : [['id', 'desc']]
    // });

    const sql = 'select id,name,created_at as user from users order by id desc';
    const users = await models.sequelize.query(sql,{
        type : models.sequelize.QueryTypes.SELECT
    });
    res.status(200).json({
        data : users
    });
}
exports.show = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await models.User.findByPk(id,{
            attributes : ['id', 'name', ['email', 'username'], 'created_at'],
        });
        if(!user){
            const error = new Error('Not Found User');
            error.statusCode = 400;
            throw error;
        }
        return res.status(200).json({
            data : user
        });
    }catch(error){
        return res.status(error.statusCode).json({
            error : {
                message : error.message
            }
        });
    }
}
exports.insert = async (req, res, next) => {
    try {
        const {name, email, password} = req.body;

        //check email repeat
        const existEmail = await models.User.findOne({where : {email : email}});
        if(existEmail){
            const error = new Error('email repeat');
            error.statusCode = 400;
            throw error;
        }

        //hash password
        const salt = await bcryptjs.genSalt(8);
        const passwordHash = await bcryptjs.hash(password, salt);
        //insert 
        const user = await models.User.create({
            name : name,
            email: email,
            password : passwordHash
        });
        
        return res.status(201).json({
            data : 'created user success',
            message : {
                id : user.id
            }
        });
    }catch(error){
        return res.status(error.statusCode).json({
            error : {
                message : error.message
            }
        });
    }
}
exports.update = async (req, res, next) => {
    try {
        const {id, name, email, password} = req.body;
        if(req.params.id !== id){
            const error = new Error('user wrong');
            error.statusCode = 400;
            throw error;
        }

        //hash password
        const salt = await bcryptjs.genSalt(8);
        const passwordHash = await bcryptjs.hash(password, salt);
        //insert 
        const user = await models.User.update({
            name : name,
            email: email,
            password : passwordHash
        }, {
            where : {
                id : id
            }
        });
        
        return res.status(201).json({
            data : 'updated',
        });
    }catch(error){
        return res.status(error.statusCode).json({
            error : {
                message : error.message
            }
        });
    }
}
exports.destroy = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await models.User.findByPk(id);
        if(!user){
            const error = new Error('Not Found User');
            error.statusCode = 400;
            throw error;
        }

        //delete user by id
        await models.User.destroy({
            where : {
                id : id
            }
        });
        return res.status(201).json({
            data : 'deleted',
        });
    }catch(error){
        return res.status(error.statusCode).json({
            error : {
                message : error.message
            }
        });
    }
}