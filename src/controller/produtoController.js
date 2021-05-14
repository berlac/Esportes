const Produto = require('../model/Produto')

const { Op } = require('sequelize')

module.exports = {
    async list(req, res){
        const produtos = await Produto.findAll()
        return res.render('admin/produto/list.ejs', { 'Produtos': produtos, 'msg': req.flash('msg')})
    },
    async filter(req, res){
        let query = '%'+req.body.filtro+'%'
        const produtos = await Produto.findAll({
            where:{
                nome:{
                    [Op.like]: query
                }
            }
        })
        return res.render('admin/produto/list.ejs', { 'Produtos': produtos, 'msg': req.flash('msg')})
    },
    async openadd(req, res){
        res.render('admin/produto/add.ejs', { msg: req.flash('msg') })
    },
    async add(req, res){
        const { nome, valor, tipo } = req.body;
        await Produto.create({ nome, valor, tipo }).then(
            (produto) => {
            req.flash('msg', produto.nome + ' foi adicionado com sucesso!')
            res.redirect('/admin/produto/add');
        }, (err) => {
            req.flash('msg', 'Houve um erro ao adicionar o produto')
            res.redirect('/admin/produto/add');
        });
    },
    async openedit(req, res){
        const id = req.params.id;
        const produto = await Produto.findByPk(id);
        return res.render('admin/produto/edit.ejs', { 'Produto': produto, 'msg': req.flash('msg')})
    },
    async edit(req, res){
        const id = req.params.id;
        const produto = await Produto.findByPk(id);
        produto.nome = req.body.nome;
        produto.valor = req.body.valor;
        produto.tipo = req.body.tipo;
        produto.save().then(
            (produto) => {
                req.flash('msg', produto.nome + ' foi alterado com sucesso!')
                res.render('admin/produto/edit.ejs', { 'Produto': produto, 'msg': req.flash('msg')})
            },
            (err) => {
                req.flash('msg', 'Problema ao alterar o produto')
                res.render('admin/produto/edit.ejs', { 'Produto': produto, 'msg': req.flash('msg')})
            }
        );
    },
    async delete(req, res){
        
    }
}