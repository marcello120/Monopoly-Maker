const express = require('express');
const cors = require('cors')({ origin: true });
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const axios = require('axios');



require('dotenv').config();

const app = express()

app.use(cors)
app.use(express.json())

app.listen(process.env.PORT || 5000)


app.get('/hello', (req, res) => {
    console.log("hello");
    doHTML()
    res.status(200).json({ message: 'hello' })
})

app.get('/test', (req, res) => {
    res.status(200).json({ message: 'test' })
})


app.get('/card', (req, res) => {
    console.log("card");
    doCardsWithArgs()
    res.status(200).json({ message: 'waotd' })
})

app.post('/create', (req, res) => {
    console.log(req.body);
    doHTMLWithArgs(req.body.printopoly)
    res.status(200).json({ message: req.body.printopoly })
})

function getCardPrompts(){
    return { 
        title: 'AM HOF',
        color: "red",
        rent0: "60",
        rentSet: "120",
        rent1: "180",
        rent2: "300",
        rent3: "450",
        rent4: "600",
        rentH: "750",
        housecost: "100",
        hotelcost: "100",
        currency: 'fa-light fa-dollar-sign',
    }
}

async function doHTML(){
    const path = "resources\\index.html"
    const html = await getHtmlFromFileOnDisk(path)
    await createImageFromHtml(html)

    // const cardpath = "resources/card.html"
    // const cardhtml = await getHtmlFromFileOnDisk(cardpath)
    // const cardPrompts = getCardPrompts()
    // await createCardFromHtml(cardhtml,cardPrompts)

}

async function doHTMLWithArgs(args){
    const path = "resources/index.html"
    const html = await getHtmlFromFileOnDisk(path)
    convertImages(args)
    await createImageFromHtmlWithArgs(html,args)

    // const cardpath = "resources\\card.html"
    // const cardhtml = await getHtmlFromFileOnDisk(cardpath)
    // const cardPrompts = getCardPrompts()
    // await createCardFromHtml(cardhtml,cardPrompts)

}

async function doCardsWithArgs(args){
    // const path = "resources/index.html"
    // const html = await getHtmlFromFileOnDisk(path)
    // convertImages(args)
    // await createImageFromHtmlWithArgs(html,args)

    const cardpath = "resources\\card.html"
    const cardhtml = await getHtmlFromFileOnDisk(cardpath)
    const cardPrompts = getCardPrompts()
    await createCardFromHtml(cardhtml,cardPrompts)

}


//get htmlfrom file on disk
async function getHtmlFromFileOnDisk(filepath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function getTimeInMiliseconds() {
    return new Date().getTime()
}

async function createImageFromHtmlWithArgs(htmlin, contentin) {
    const image = await nodeHtmlToImage({
        output: './image'+ getTimeInMiliseconds() +'.png' ,
        html: htmlin,
        content: contentin,
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox"] }
      })
    return image;
}

function loadIconJson () {
    let rawdata =  fs.readFileSync('resources/iconData.json');
    let iconData = JSON.parse(rawdata);
    console.log(iconData.faregtimescircle);
    return  iconData;
}

function convertImages(argsin){
    console.log(argsin)
    let data = loadIconJson()
    console.log(data.favihara);


    argsin.currency = getImage(argsin.currency, data)
    argsin.railicon = getImage(argsin.railicon, data) + " fa-5x"
    argsin.chesticon = getImage(argsin.chesticon, data) + " fa-5x"
    argsin.chanceicon = getImage(argsin.chanceicon, data) + " fa-5x"
    argsin.util1icon = getImage(argsin.util1icon, data) + " fa-5x"
    argsin.util2icon = getImage(argsin.util2icon, data) + " fa-5x"
    argsin.gojailicon = getImage(argsin.gojailicon, data) + " fa-5x"
    argsin.parkingicon = getImage(argsin.parkingicon, data) + " fa-5x"
    argsin.jailicon = getImage(argsin.jailicon, data) + " fa-5x"
    argsin.tax1icon = getImage(argsin.tax1icon, data) + " fa-5x"
    argsin.tax2icon = getImage(argsin.tax2icon, data) + " fa-5x"

    console.log(argsin)


}

function getImage(name, data){
    if(!name || !data){
        return "fa-solid fa-face-dizzy fa-5x"
    }
    console.log(name.toLowerCase());
    console.log(data[name.toLowerCase()])
    return data[name.toLowerCase()];
}

//create image from html
async function createImageFromHtml(htmlin) {
    const image = await nodeHtmlToImage({
        output: './image'+ getTimeInMiliseconds() +'.png' ,
        html: htmlin,
        content: { 
            title: 'Gangopoly',
            currency: 'fas fa-pound-sign',

            railicon: 'fas fa-pound-sign fa-5x',
            chesticon: 'fa-solid fa-gift fa-5x',
            chanceicon: 'fa-solid fa-circle-question fa-5x',
            util1icon: 'fa-solid fa-lightbulb fa-5x',
            util2icon: 'fa-solid fa-shower fa-5x',
            gojailicon: 'fa-solid fa-handcuffs fa-5x',
            parkingicon: 'fa-solid fa-car-side fa-5x',
            jailicon: 'fa-solid fa-face-dizzy fa-5x',
            tax1icon: 'fa-solid fa-money-bill-wave-alt fa-5x',
            tax2icon: 'fa-solid fa-money-bill-wave-alt fa-5x',

            brown1: "brown1",
            brown2: "brown2",
            cyan1: "cyan1",
            cyan2: "cyan2",
            cyan3: "cyan3",
            purple1: "purple1",
            purple2: "purple2",
            purple3: "purple3",
            orange1: "orange1",
            orange2: "orange2",
            orange3: "orange3",
            red1: "red1",
            red2: "red2",
            red3: "red3",
            yellow1: "yellow1",
            yellow2: "yellow2",
            yellow3: "yellow3",
            green1: "green1",
            green2: "green2",
            green3: "green3",
            blue1: "blue1",
            blue2: "blue2",
            rail1: "rail1",
            rail2: "rail2",
            rail3: "rail3",
            rail4: "rail4",
            util1: "util1",
            util2: "util2",
            chance: "chance",
            chest: "chest",
            tax1: "tax1",
            tax2: "tax2",

            jail: "jail",
            parking: "parking",

            browncolor: "#964B00",
            cyancolor: "#00FFFF",
            purplecolor: "#6a0dad",
            orangecolor: "#FFA500",
            redcolor: "#FF0000",
            yellowcolor: "#FFFF00",
            greencolor: "#00FF00",
            bluecolor: "#0000FF",
            railcolor: "#000000",
            util1color: "#FFFF00",
            util2color: "#0000FF",
            chancecolor: "#FFA500",
            chestcolor: "#0000FF",
            tax1color: "#FFA500",
            tax2color: "#6a0dad",
            parkingcolor: "#FF0000",
            gojailcolor: "#000000",
        },
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox"] }
      })
    return image;
}



async function createCardFromHtml(htmlin,cardPrompts) {
    const image = await nodeHtmlToImage({
        output: './card'+ getTimeInMiliseconds() +'.png' ,
        html: htmlin,
        content: { 
            title: cardPrompts.title,
            color: cardPrompts.color,
            rent0: cardPrompts.rent0,
            rentSet: cardPrompts.rentSet,
            rent1: cardPrompts.rent1,
            rent2: cardPrompts.rent2,
            rent3: cardPrompts.rent3,
            rent4: cardPrompts.rent4,
            rentH: cardPrompts.rentH,
            housecost: cardPrompts.housecost,
            hotelcost: cardPrompts.hotelcost,
            currency: cardPrompts.currency,
        },
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox"] }
      })
    return image;
}

// const { join, extname, basename } = require('path');
// const { readdirSync, renameSync } = require('fs');


// function rename(pathToOldFolder, prefix, type, iconData){
//     for (const oldFile of readdirSync(pathToOldFolder)) {
//          const extension = extname(oldFile);
//          const name = basename(oldFile, extension);
//          const key = prefix + name.replace(/-/g, "");
//          const valuepair = type + " fa-" + name;
//          iconData[key] = valuepair;

//          console.log( name)
//         // const newFile =  "fa" + oldFile;
//         // renameSync(join(pathToOldFolder, oldFile), join(pathToOldFolder, newFile));
        
//     }
    
// }



