const User = require('../model/User')
var bcrypt = require('bcrypt')

const { Op } = require('sequelize')

module.exports = {
    async list(req, res){
        const users = await User.findAll()
        return res.render('admin/usuario/list.ejs', { 'Users': users, 'msg': req.flash('msg')})
    },
    async filter(req, res){
        let query = '%'+req.body.filtro+'%'
        const users = await User.findAll({
            where:{
                nome:{
                    [Op.like]: query
                }
            }
        })
        return res.render('admin/usuario/list.ejs', { 'Users': users, 'msg': req.flash('msg')})
    },
    async openadd(req, res){
        res.render('admin/usuario/add.ejs', { msg: req.flash('msg') })
    },
    async add(req, res){
        const nome = req.body.nome
        const email = req.body.email
        var senha = req.body.senha
        const avatar = req.file.filename

        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                senha = hash;
                User.create({ nome, email, senha, avatar }).then(
                    (user) => {
                        req.flash('msg', user.nome + ' foi adicionado com sucesso!')
                        res.redirect('/admin/user/add');
                    },
                    (err) => {
                        req.flash('msg', 'Houve um erro ao adicionar o usuário')
                        res.redirect('/admin/user/add');
                });
            });
        });
    },
    async openedit(req, res){
        const id = req.params.id;
        const user = await User.findByPk(id);
        return res.render('admin/usuario/edit.ejs', { 'User': user, 'msg': req.flash('msg')})
    },
    async edit(req, res){
        const id = req.params.id;
        const user = await User.findByPk(id);

        var senha = req.body.senha

        
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(senha, salt, function(err, hash) {
                senha = hash;
                user.nome = req.body.nome;
                user.email = req.body.email;
                user.senha = senha;
                user.avatar = req.file.avatar;
                
                user.save().then(
                    (user) => {
                        req.flash('msg', user.nome + ' foi alterado com sucesso!')
                        res.render('admin/usuario/edit.ejs', { 'User': user, 'msg': req.flash('msg')})
                    },
                    (err) => {
                        req.flash('msg', 'Problema ao alterar o usuário')
                        res.render('admin/usuario/edit.ejs', { 'User': user, 'msg': req.flash('msg')})
                    }
                );
            })
        });
    },
    async delete(req, res){
        const id = req.params.id;
        await User.destroy({where: {
            id:id
        }}).then(
            () => {
                req.flash('msg', 'Usuário foi deletado com sucesso!')
                res.redirect('/admin/user/')
            },
            (err) => {
                req.flash('msg', 'Problema ao deletar o usuário')
                res.redirect('/admin/user/')
            }
        );
    }
}