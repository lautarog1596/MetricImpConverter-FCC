'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = (app) => {

    let convertHandler = new ConvertHandler();

    app.route('/api/convert')
        .get((req, res) => {
            let input = req.query.input;
            let initNum = convertHandler.getNum(input);
            let initUnit = convertHandler.getUnit(input);

            if (!initNum && !initUnit) {
                res.send({ error: 'invalid number and unit' });
            } else if (!initNum) {
                res.send('invalid number');
            } else if (!initUnit) {
                res.send({ error: 'invalid unit' });
            }

            let returnNum = convertHandler.convert(initNum, initUnit);
            let returnUnit = convertHandler.getReturnUnit(initUnit);
            let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

            res.json({
                initNum: initNum,
                initUnit: initUnit,
                returnNum: returnNum,
                returnUnit: returnUnit,
                string: toString
            });
        });

};