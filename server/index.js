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
    createCards(req.body.printopoly, req.body.cards)
    res.status(200).json({ message: 'waotd' })
})

app.post('/create', (req, res) => {
    console.log(req.body);
    doHTMLWithArgs(req.body.printopoly, req.body.cards)
    createCards(req.body.printopoly, req.body.cards)
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

async function doHTMLWithArgs(args, cards){
    const path = "resources/index.html"
    const html = await getHtmlFromFileOnDisk(path)
    convertImages(args)
    addPrice(args,cards)
    console.log(args)

    await createImageFromHtmlWithArgs(html,args)
}

function addPrice(argsin, cardsin){
    //brown
    argsin.brown1price = cardsin.brown1.price
    argsin.brown2price = cardsin.brown2.price
    //cyan
    argsin.cyan1price = cardsin.cyan1.price
    argsin.cyan2price = cardsin.cyan2.price
    argsin.cyan3price = cardsin.cyan3.price
    //purple
    argsin.purple1price = cardsin.purple1.price
    argsin.purple2price = cardsin.purple2.price
    argsin.purple3price = cardsin.purple3.price
    //orange
    argsin.orange1price = cardsin.orange1.price
    argsin.orange2price = cardsin.orange2.price
    argsin.orange3price = cardsin.orange3.price
    //red
    argsin.red1price = cardsin.red1.price
    argsin.red2price = cardsin.red2.price
    argsin.red3price = cardsin.red3.price
    //yellow
    argsin.yellow1price = cardsin.yellow1.price
    argsin.yellow2price = cardsin.yellow2.price
    argsin.yellow3price = cardsin.yellow3.price
    //green
    argsin.green1price = cardsin.green1.price
    argsin.green2price = cardsin.green2.price
    argsin.green3price = cardsin.green3.price
    //blue
    argsin.blue1price = cardsin.blue1.price
    argsin.blue2price = cardsin.blue2.price
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

async function createCards(master,cardData){
    // cardData = loadCardJson();
     const cardpath = "resources\\card.html"
     const cardhtml = await getHtmlFromFileOnDisk(cardpath);
    //borwn
    await createCardFromHtml(cardhtml,cardData.brown1,master.brown1,master.browncolor)
    await createCardFromHtml(cardhtml,cardData.brown2,master.brown2,master.browncolor)
    //cyan
    await createCardFromHtml(cardhtml,cardData.cyan1,master.cyan1,master.cyancolor)
    await createCardFromHtml(cardhtml,cardData.cyan2,master.cyan2,master.cyancolor)
    await createCardFromHtml(cardhtml,cardData.cyan3,master.cyan3,master.cyancolor)
    //pink
    await createCardFromHtml(cardhtml,cardData.purple1,master.purple1,master.purplecolor)
    await createCardFromHtml(cardhtml,cardData.purple2,master.purple2,master.purplecolor)
    await createCardFromHtml(cardhtml,cardData.purple3,master.purple3,master.purplecolor)
    //orange
    await createCardFromHtml(cardhtml,cardData.orange1,master.orange1,master.orangecolor)
    await createCardFromHtml(cardhtml,cardData.orange2,master.orange2,master.orangecolor)
    await createCardFromHtml(cardhtml,cardData.orange3,master.orange3,master.orangecolor)
    //red
    await createCardFromHtml(cardhtml,cardData.red1,master.red1,master.redcolor)
    await createCardFromHtml(cardhtml,cardData.red2,master.red2,master.redcolor)
    await createCardFromHtml(cardhtml,cardData.red3,master.red3,master.redcolor)
    //yellow
    await createCardFromHtml(cardhtml,cardData.yellow1,master.yellow1,master.yellowcolor)
    await createCardFromHtml(cardhtml,cardData.yellow2,master.yellow2,master.yellowcolor)
    await createCardFromHtml(cardhtml,cardData.yellow3,master.yellow3,master.yellowcolor)
    //green
    await createCardFromHtml(cardhtml,cardData.green1,master.green1,master.greencolor)
    await createCardFromHtml(cardhtml,cardData.green2,master.green2,master.greencolor)
    await createCardFromHtml(cardhtml,cardData.green3,master.green3,master.greencolor)
    //blue
    await createCardFromHtml(cardhtml,cardData.blue1,master.blue1,master.bluecolor)
    await createCardFromHtml(cardhtml,cardData.blue2,master.blue2,master.bluecolor)

    //rail
    const railpath = "resources\\cardRail.html"
    const railhtml = await getHtmlFromFileOnDisk(railpath);

    await createCardFromHtml(railhtml,cardData.rail,master.rail1,master.railcolor,master.railicon)
    await createCardFromHtml(railhtml,cardData.rail,master.rail2,master.railcolor,master.railicon)
    await createCardFromHtml(railhtml,cardData.rail,master.rail3,master.railcolor,master.railicon)
    await createCardFromHtml(railhtml,cardData.rail,master.rail4,master.railcolor,master.railicon)

    //util
    const utilpath = "resources\\cardUtil.html"
    const utilhtml = await getHtmlFromFileOnDisk(utilpath);
    await createCardFromHtml(utilhtml,cardData.util,master.util1,master.util1color,master.util1icon)
    await createCardFromHtml(utilhtml,cardData.util,master.util2,master.util2color,master.util2icon)

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
    return  iconData;
}

function loadCardJson(){
    let rawdata =  fs.readFileSync('resources/cardData.json');
    let cardData = JSON.parse(rawdata);
    return  cardData;
}


function convertImages(argsin){
    let data = loadIconJson()

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



async function createCardFromHtml(htmlin,cardPrompts,name,color, icon="") {
    const image = await nodeHtmlToImage({
        output: './card' + name + getTimeInMiliseconds() +'.png' ,
        html: htmlin,
        content: { 
            title: name,
            color: color,
            rent0: cardPrompts.rent0,
            rent1: cardPrompts.rent1,
            rent2: cardPrompts.rent2,
            rent3: cardPrompts.rent3,
            rent4: cardPrompts.rent4,
            rentH: cardPrompts.rentH,
            mortgage: cardPrompts.price/2,
            housecost: cardPrompts.housecost,
            hotelcost: cardPrompts.housecost,
            icon: icon,
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



