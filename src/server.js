const express = require('express');
const Axios = require('axios');

const app = express();

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});

app.get('/items/lootfarm', async (req, res) => {
    try {
        const {data} = await Axios.get('https://loot.farm/fullpriceRUST.json');
        
        res.status(200).json(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Произошла ошибка при запросе предметов loot.farm',
        });
    }
});

app.get('/items/rustTm', async (req, res) => {
    try {
        const {data: {items}} = await Axios.get('https://rust.tm/api/v2/prices/class_instance/USD.json');
        
        const formattedItems = Object.entries(items).map(([key, value]) => {
            return {...value, id: key};
        });
        
        res.status(200).json(formattedItems);
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Произошла ошибка при запросе предметов rust.tm',
        });
    }
});

app.get('/valute/usd', async (req, res) => {
    try {
        const {data: {Valute: {USD: {Value}}}} = await Axios.get('https://www.cbr-xml-daily.ru/daily_json.js');
        
        res.status(200).json({
            value: Value,
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({
            message: 'Произошла ошибка при запросе валюты USD',
        });
    }
});

app.listen(7000);