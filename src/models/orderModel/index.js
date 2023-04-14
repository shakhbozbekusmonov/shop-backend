const { fetch , fetchAll } = require('../../lib/connectdb')
const { GET , POST  , DELETE}  =require('./model')
const path = require('path')
const ApiError = require('../../error/ApiError');
const {v4} = require('uuid');

class UserModel {
    async get(){
        return await fetchAll(GET)
    }

    async post({product_id } , {id}){
        if(!await fetch(`select * from products where id = ${product_id}`)){
            return "Product is not found!";
        }
        if(await fetch(`select * from orders where product_id = ${product_id}`)) return "You've already ordered for this product!"
        let orders = await fetch(POST , product_id  , id)
        return orders
    }

    async delete({id}){
        await fetch(DELETE , id)
        return 'deleted'
    }
}

module.exports = new UserModel()