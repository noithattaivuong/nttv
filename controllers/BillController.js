const Bill = require("../models/Bill");
const BillDetail = require("../models/BillDetail");
const Product = require("../models/Product");
const sequelize = require('../lib/db')


function createBillId() {
    var time = new Date().getTime();
    return 'HD-' + time.toString(36).toUpperCase()
}
module.exports = {
    getList: async function (req, res, next) {
        try {
            bills = await Bill.findAll();
            for (var i in bills) {
                bills[i].detail = await BillDetail.findAll({ where: { billId: bills[i].id } });
            }
            res.json(bills)
        } catch (error) {
            res.errorException(error);
        }
    },
    get: async function (req, res, next) {
        try {
            if (!req.params.id) return res.errorParam();
            let bill = await Bill.findOne({ where: { id: req.params.id } });
            if (bill) bill.detail = await BillDetail.findAll({ billId: { id: req.params.id } });
            res.sendObject(bill, 'bill');
        } catch (error) {
            res.errorException(error);
        }
    },
    add: async function (req, res, next) {
        let transaction;
        try {
            var body = req.body;
            var detail = req.body.detail
            if (!body.username || !detail) return res.errorParam();

            var total = 0;
            var id = createBillId();
            for (var i = 0; i < detail.length; i++) {
                try {
                    if (!detail[i].productId || !detail[i].count) {
                        return res.errorParam('param in detail bill error')
                    }
                    var productId = detail[i].productId;
                    var count = parseInt(detail[i].count);
                    if (count == 0) {
                        return res.errorParam('param in detail bill error')
                    }
                    let product = await Product.findOne({ where: { id: productId } });
                    if (!product) return res.errorParam('product with id= ' + productId + ' not found')
                    detail[i].name = product.name;
                    detail[i].price = product.price;
                    detail[i].link = product.link;
                    detail[i].size = product.size;
                    detail[i].material = product.material;
                    detail[i].billId = id;
                    total = total + (product.price * count)
                } catch (ex) {
                    return res.errorParam('param in detail bill error')
                }
            }

            body.id = id;
            body.count = detail.length;
            body.status = 0;
            body.total = total;
            transaction = await sequelize.transaction();
            var bill = await Bill.create(body, { transaction });
            bill.data = await BillDetail.bulkCreate(detail, { transaction });
            await transaction.commit();
            res.json(bill)
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }
            res.errorException(error);
        }
    },
    update: async function (req, res, next) {
        return res.errorParam();
    },
    delete: async function (req, res, next) {
        return res.errorParam();
    },
}