const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const bodyParser = require("body-parser");
 
const express = require("express");
const app = express()
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
 
let process = async (url) => {
 
    const chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless']
    });
    const options = {
        logLevel: 'info',
        output: 'html',
        onlyCategories: ['performance'],
        port: chrome.port
    };
    const runnerResult = await lighthouse(url, options);
 
    // `.report` is the HTML report as a string
    const reportHtml = runnerResult.report;
    fs.writeFileSync('lhreport.html', reportHtml);
 
    return await runnerResult.lhr
 
}

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    )
    next();
})
 

 
app.post("", async (req, res, next) => {
    try{

    let variable = await process(req.body.link);
    const a = 0.25;
    const population = 1;
    const timeInMs = parseFloat(variable.audits.interactive.numericValue);
    const sizeInByte = parseFloat(variable.audits["total-byte-weight"].numericValue);
    const URL = variable.finalUrl

    const carbonFootprint = a * (sizeInByte / 1000) * (timeInMs / 1000).toFixed(2) * population;

    const tree = carbonFootprint / 21000;
    const person = carbonFootprint / 14514960;
    const car = carbonFootprint / 404;
    const phone = carbonFootprint/ 7.84 ;
    const plastic = carbonFootprint / 33;
    
    
    res.status(200).send({
        time: parseFloat((timeInMs / 1000).toFixed(2)),
        size: sizeInByte / 1000,
        coefficient: a,
        population: population,
        carbonFootprint: carbonFootprint,
        URL: URL,
        tree: parseFloat(tree.toFixed(3)),
        person: parseFloat(person.toFixed(3)),
        car: parseFloat(car.toFixed(2)),
        phone: parseFloat(phone.toFixed(0)),
        plastic: parseFloat(plastic.toFixed(3))
        
        
    })

    // res.status(200).send(variable)

    }

    
    catch(error){
        res.status(500).send({
            message: "Could not compute for Carbon Footprint. Please check the link that you've provided."
        })

    }
    
 
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

module.exports = app;