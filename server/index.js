const express = require('express');
const cors = require('cors')({ origin: true });
const nodeHtmlToImage = require('node-html-to-image')
const fs = require('fs');
const axios = require('axios');
const archiver = require('archiver');


const app = express()


app.use(cors)
app.use(express.json())
app.listen(process.env.PORT || 5000)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

// app.use(function (req, res, next) {
//     req.headers.origin = req.headers.origin || req.headers.host;
//     next();
//   });


// app.get('/hello', (req, res) => {
//     console.log("hello");
//     doHTML()
//     res.status(200).json({ message: 'hello' })
// })

app.get('/test', async (req, res) => {
    // const path = "./resources/cardBulk.html"
    // const html = await getHtmlFromFileOnDisk(path)
    // const cardPrompts = await getCardPrompts()
    // createCardFromHtml(html,cardPrompts,"borwn1","red","./out/")
    res.status(200).json({ message: 'test3' })
})


// app.get('/card', (req, res) => {
//     console.log("card");
//     doCardsWithArgs()
//     createCards(req.body.printopoly, req.body.cards)
//     res.status(200).json({ message: 'waotd' })
// })

// app.post('/create', async (req, res) => {
//     // console.log(req.body);
//     const uniqueId = getTimeInMiliseconds() + "_" + getRandomNumber()
//     const dir = './out/' + uniqueId
//     console.log("Create dir " + dir)
//     fs.mkdirSync(dir);

//     await doHTMLWithArgs(req.body.printopoly, req.body.cards,dir)
//     // await createCards(req.body.printopoly, req.body.cards,dir)

//     zipDirectory(dir,'./out/' + uniqueId + '.zip')

//     res.status(200).json({ message: req.body.printopoly })
// })

app.post('/printopoly', async (req, res) => {
    console.log("recieved request");
    console.time('printopoly')
    res.set('Access-Control-Allow-Origin', '*');
    const uniqueId = getTimeInMiliseconds() + "_" + getRandomNumber()
    const dir = './out/' + uniqueId
    console.log("Create dir " + dir)
    await fs.mkdir(dir, (err) => {
        if (err) {
            console.log("Error creating " + dir);
            return console.error(err);
        }
        console.log('Directory created successfully! ' + dir);
    });
    await convertImages(req.body.printopoly)

    await doHTMLWithArgs(req.body.printopoly, req.body.cards,dir)

    if(req.body.checked){
        console.log("grouping cards")
        await createCardsGroup(req.body.printopoly, req.body.cards,dir)
    }
    else{
        console.log("individual cards")
        await createCardsAlone(req.body.printopoly, req.body.cards,dir)

    }

    console.log("Created images");

    await zipDirectory(dir,'./out/' + uniqueId + '.zip')
    console.log("Created zip");

    const file =  await './out/' + uniqueId + '.zip';
    // const file = './test/brown1.zip'

    console.timeEnd('printopoly')

    await res.download(file , function(err){
        fs.rm(dir, { recursive:true,  force: true }, (err) => {
            if(err){
                // File deletion failed
                console.error("Something fucky going on");
                console.error(err.message);
                return;
            }
            console.log("File deleted successfully");
                  });
        fs.unlink(file, function(err) {
            if(err && err.code == 'ENOENT') {
                // file doens't exist
                console.info("File doesn't exist, won't remove it.");
            } else if (err) {
                // other errors, e.g. maybe we don't have enough permission
                console.error("Error occurred while trying to remove file");
            } else {
                console.info(`removed`);
            }
        });
    }); 
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
        test1 : {
            test2: "test2"
        }
    }
}

async function doHTML(){
    const path = "./resources/index.html"
    const html = await getHtmlFromFileOnDisk(path)
    await createImageFromHtml(html)

    // const cardpath = "resources/card.html"
    // const cardhtml = await getHtmlFromFileOnDisk(cardpath)
    // const cardPrompts = getCardPrompts()
    // await createCardFromHtml(cardhtml,cardPrompts)

}

async function doHTMLWithArgs(args, cards,dir) {
    const path = "./resources/index.html"
    const html = await getHtmlFromFileOnDisk(path)
    addPrice(args,cards)
    // console.log(args)

   return await createImageFromHtmlWithArgs(html,args,dir)
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

    const cardpath = "./resources/card.html"
    const cardhtml = await getHtmlFromFileOnDisk(cardpath)
    const cardPrompts = getCardPrompts()
    await createCardFromHtml(cardhtml,cardPrompts)

}

async function createCardsAsync(master,cardData,dir){
    // cardData = loadCardJson();
     const cardpath = "./resources/card.html"
     const cardhtml = await getHtmlFromFileOnDisk(cardpath);

    await Promise.all([
        //borwn
         createCardFromHtml(cardhtml,cardData.brown1,master.brown1,master.browncolor,dir),
         createCardFromHtml(cardhtml,cardData.brown2,master.brown2,master.browncolor,dir),
        //cyan
         createCardFromHtml(cardhtml,cardData.cyan1,master.cyan1,master.cyancolor,dir),
         createCardFromHtml(cardhtml,cardData.cyan2,master.cyan2,master.cyancolor,dir),
         createCardFromHtml(cardhtml,cardData.cyan3,master.cyan3,master.cyancolor,dir)
    ])

    await Promise.all([
        //pink
        createCardFromHtml(cardhtml,cardData.purple1,master.purple1,master.purplecolor,dir),
        createCardFromHtml(cardhtml,cardData.purple2,master.purple2,master.purplecolor,dir),
        createCardFromHtml(cardhtml,cardData.purple3,master.purple3,master.purplecolor,dir),
        //orange
        createCardFromHtml(cardhtml,cardData.orange1,master.orange1,master.orangecolor,dir),
        createCardFromHtml(cardhtml,cardData.orange2,master.orange2,master.orangecolor,dir),
        createCardFromHtml(cardhtml,cardData.orange3,master.orange3,master.orangecolor,dir)
    ])        

    await Promise.all([
        //red
        createCardFromHtml(cardhtml,cardData.red1,master.red1,master.redcolor,dir),
        createCardFromHtml(cardhtml,cardData.red2,master.red2,master.redcolor,dir),
        createCardFromHtml(cardhtml,cardData.red3,master.red3,master.redcolor,dir),
        //yellow
        createCardFromHtml(cardhtml,cardData.yellow1,master.yellow1,master.yellowcolor,dir),
        createCardFromHtml(cardhtml,cardData.yellow2,master.yellow2,master.yellowcolor,dir),
        createCardFromHtml(cardhtml,cardData.yellow3,master.yellow3,master.yellowcolor,dir)
    ])

    await Promise.all([
        //green
        createCardFromHtml(cardhtml,cardData.green1,master.green1,master.greencolor,dir),
        createCardFromHtml(cardhtml,cardData.green2,master.green2,master.greencolor,dir),
        createCardFromHtml(cardhtml,cardData.green3,master.green3,master.greencolor,dir),
        //blue
        createCardFromHtml(cardhtml,cardData.blue1,master.blue1,master.bluecolor,dir),
        createCardFromHtml(cardhtml,cardData.blue2,master.blue2,master.bluecolor,dir)
    ])    


    //rail
    const railpath = "./resources/cardRail.html"
    const railhtml = await getHtmlFromFileOnDisk(railpath);

    //util
    const utilpath = "./resources/cardUtil.html"
    const utilhtml = await getHtmlFromFileOnDisk(utilpath);

    await Promise.all([
        createCardFromHtml(railhtml,cardData.rail,master.rail1,master.railcolor,dir,master.railicon),
        createCardFromHtml(railhtml,cardData.rail,master.rail2,master.railcolor,dir,master.railicon),
        createCardFromHtml(railhtml,cardData.rail,master.rail3,master.railcolor,dir,master.railicon),
        createCardFromHtml(railhtml,cardData.rail,master.rail4,master.railcolor,dir,master.railicon),

        createCardFromHtml(utilhtml,cardData.util,master.util1,master.util1color,dir,master.util1icon),
        createCardFromHtml(utilhtml,cardData.util,master.util2,master.util2color,dir,master.util2icon)
    ])    
}

async function createCardsAlone(master, cardData, dir) {
    // cardData = loadCardJson();
    const cardpath = "./resources/card.html"
    const cardhtml = await getHtmlFromFileOnDisk(cardpath);



    //brown
    const brown1Content = createCardContent(cardData.brown1, master.brown1, master.browncolor, dir);
    const brown2Content = createCardContent(cardData.brown2, master.brown2, master.browncolor, dir);
    //cyan
    const cyan1Content = createCardContent(cardData.cyan1, master.cyan1, master.cyancolor, dir);
    const cyan2Content = createCardContent(cardData.cyan2, master.cyan2, master.cyancolor, dir);
    const cyan3Content = createCardContent(cardData.cyan3, master.cyan3, master.cyancolor, dir);
    //pink
    const purple1Content = createCardContent(cardData.purple1, master.purple1, master.purplecolor, dir);
    const purple2Content = createCardContent(cardData.purple2, master.purple2, master.purplecolor, dir);
    const purple3Content = createCardContent(cardData.purple3, master.purple3, master.purplecolor, dir);
    //orange
    const orange1Content = createCardContent(cardData.orange1, master.orange1, master.orangecolor, dir);
    const orange2Content = createCardContent(cardData.orange2, master.orange2, master.orangecolor, dir);
    const orange3Content = createCardContent(cardData.orange3, master.orange3, master.orangecolor, dir);
    //red
    const red1Content = createCardContent(cardData.red1, master.red1, master.redcolor, dir);
    const red2Content = createCardContent(cardData.red2, master.red2, master.redcolor, dir);
    const red3Content = createCardContent(cardData.red3, master.red3, master.redcolor, dir);
    //yellow
    const yellow1Content = createCardContent(cardData.yellow1, master.yellow1, master.yellowcolor, dir);
    const yellow2Content = createCardContent(cardData.yellow2, master.yellow2, master.yellowcolor, dir);
    const yellow3Content = createCardContent(cardData.yellow3, master.yellow3, master.yellowcolor, dir);
    //green
    const green1Content = createCardContent(cardData.green1, master.green1, master.greencolor, dir);
    const green2Content = createCardContent(cardData.green2, master.green2, master.greencolor, dir);
    const green3Content = createCardContent(cardData.green3, master.green3, master.greencolor, dir);
    //blue
    const blue1Content = createCardContent(cardData.blue1, master.blue1, master.bluecolor, dir);
    const blue2Content = createCardContent(cardData.blue2, master.blue2, master.bluecolor, dir);

    contentArray =[brown1Content,brown2Content,
        cyan1Content,cyan2Content,cyan3Content,
        purple1Content,purple2Content,purple3Content,
        orange1Content,orange2Content,orange3Content,
        red1Content,red2Content,red3Content,
        yellow1Content,yellow2Content,yellow3Content,
        green1Content,green2Content,green3Content,
        blue1Content,blue2Content]

    // await createCardFromHtmlBULK(cardhtml, contentArray);

    await createCardFromHtmlBULK(cardhtml, contentArray);


    //rail
    const railpath = "./resources/cardRail.html"
    const railhtml = await getHtmlFromFileOnDisk(railpath);

    const rail1 = createCardContent(cardData.rail, master.rail1, master.railcolor, dir, master.railicon);
    const rail2 = createCardContent(cardData.rail, master.rail2, master.railcolor, dir, master.railicon);
    const rail3 = createCardContent(cardData.rail, master.rail3, master.railcolor, dir, master.railicon);
    const rail4 = createCardContent(cardData.rail, master.rail4, master.railcolor, dir, master.railicon);

    const railContentArray = [rail1,rail2,rail3,rail4]

    // await createCardFromHtmlBULK(railhtml, railContentArray);

    //util
    const utilpath = "./resources/cardUtil.html"
    const utilhtml = await getHtmlFromFileOnDisk(utilpath);

    const util1 = createCardContent(cardData.util, master.util1, master.util1color, dir, master.util1icon);
    const util2 = createCardContent(cardData.util, master.util2, master.util2color, dir, master.util2icon);

    const utilContentArray = [util1,util2]

    // await createCardFromHtmlBULK(utilhtml, utilContentArray);


    await  Promise.all([createCardFromHtmlBULK(railhtml, railContentArray),createCardFromHtmlBULK(utilhtml, utilContentArray)])

}


async function createCardsGroup(master, cardData, dir) {
    //brown
    const brown1Content = createCardContentForGroup(cardData.brown1, master.brown1, master.browncolor);
    const brown2Content = createCardContentForGroup(cardData.brown2, master.brown2, master.browncolor);
    //cyan
    const cyan1Content = createCardContentForGroup(cardData.cyan1, master.cyan1, master.cyancolor);
    const cyan2Content = createCardContentForGroup(cardData.cyan2, master.cyan2, master.cyancolor);
    const cyan3Content = createCardContentForGroup(cardData.cyan3, master.cyan3, master.cyancolor);
    //pink
    const purple1Content = createCardContentForGroup(cardData.purple1, master.purple1, master.purplecolor);
    const purple2Content = createCardContentForGroup(cardData.purple2, master.purple2, master.purplecolor);
    const purple3Content = createCardContentForGroup(cardData.purple3, master.purple3, master.purplecolor);
    //orange
    const orange1Content = createCardContentForGroup(cardData.orange1, master.orange1, master.orangecolor);
    const orange2Content = createCardContentForGroup(cardData.orange2, master.orange2, master.orangecolor);
    const orange3Content = createCardContentForGroup(cardData.orange3, master.orange3, master.orangecolor);
    //red
    const red1Content = createCardContentForGroup(cardData.red1, master.red1, master.redcolor);
    const red2Content = createCardContentForGroup(cardData.red2, master.red2, master.redcolor);
    const red3Content = createCardContentForGroup(cardData.red3, master.red3, master.redcolor);
    //yellow
    const yellow1Content = createCardContentForGroup(cardData.yellow1, master.yellow1, master.yellowcolor);
    const yellow2Content = createCardContentForGroup(cardData.yellow2, master.yellow2, master.yellowcolor);
    const yellow3Content = createCardContentForGroup(cardData.yellow3, master.yellow3, master.yellowcolor);
    //green
    const green1Content = createCardContentForGroup(cardData.green1, master.green1, master.greencolor);
    const green2Content = createCardContentForGroup(cardData.green2, master.green2, master.greencolor);
    const green3Content = createCardContentForGroup(cardData.green3, master.green3, master.greencolor);
    //blue
    const blue1Content = createCardContentForGroup(cardData.blue1, master.blue1, master.bluecolor);
    const blue2Content = createCardContentForGroup(cardData.blue2, master.blue2, master.bluecolor);

    //rail
    const rail1Content = createCardContentForGroup(cardData.rail, master.rail1, master.railcolor, master.railicon);
    const rail2Content = createCardContentForGroup(cardData.rail, master.rail2, master.railcolor, master.railicon);
    const rail3Content = createCardContentForGroup(cardData.rail, master.rail3, master.railcolor, master.railicon);
    const rail4Content = createCardContentForGroup(cardData.rail, master.rail4, master.railcolor, master.railicon);

    //util
    const util1Content = createCardContentForGroup(cardData.util, master.util1, master.util1color, master.util1icon);
    const util2Content = createCardContentForGroup(cardData.util, master.util2, master.util2color, master.util2icon);


    const pageProps1 = {
        card1: brown1Content,
        card2: brown2Content,
        card3: cyan1Content,
        card4: cyan2Content,
        card5: cyan3Content,
        card6: purple1Content,
        card7: purple2Content,
        card8: purple3Content,
        card9: orange1Content
    }

    const pageProps2 = {
        card1: orange2Content,
        card2: orange3Content,
        card3: red1Content,
        card4: red2Content,
        card5: red3Content,
        card6: yellow1Content,
        card7: yellow2Content,
        card8: yellow3Content,
        card9: green1Content
    }

    const pageProps3 = {
        card1: green2Content,
        card2: green3Content,
        card3: blue1Content,
        card4: blue2Content
    }

    const pageProps4 = {
        card1: rail1Content,
        card2: rail2Content,
        card3: rail3Content,
        card4: rail4Content,
        card5: util1Content,
        card6: util2Content
    }



    //pag1
    const pagePath = "./resources/cardBulk.html"
    const pageHtml = await getHtmlFromFileOnDisk(pagePath);

    //pag1
    const pageLastPath = "./resources/cardBulkLast.html"
    const pageLastHtml = await getHtmlFromFileOnDisk(pageLastPath);

    //rail + util
    const railutilpath = "./resources/cardBulkRailUtil.html"
    const railutilhtml = await getHtmlFromFileOnDisk(railutilpath);
    

    await createCardFromHtmlPage(pageHtml, pageProps1, dir, "1",master.currency);

    await createCardFromHtmlPage(pageHtml, pageProps2, dir, "2",master.currency);

    await createCardFromHtmlPage(pageLastHtml, pageProps3, dir, "3",master.currency);

    await createCardFromHtmlPage(railutilhtml, pageProps4, dir, "4",master.currency);
}


function createCardContent(cardPrompts,name,color,dir, icon="") {
    console.log("creating card " + name)
  return { 
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
        output: dir + '/card' + name +'.png' 
    }
}

function createCardContentForGroup(cardPrompts,name,color, icon="") {
    console.log("creating card " + name)
    console.log("icon card " + icon)

  return { 
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
    }
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

//get random number between 1000 and 9999
function getRandomNumber() {
    return Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000;
}

async function createImageFromHtmlWithArgs(htmlin, contentin,dir) {
    const image = await nodeHtmlToImage({
        output: dir +'/board.png' ,
        html: htmlin,
        content: contentin,
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox",'--disable-setuid-sandbox'] }
      })
    return image;
}

function loadIconJson () {
    let rawdata =  fs.readFileSync('./resources/iconData.json');
    let iconData = JSON.parse(rawdata);
    return  iconData;
}

function loadCardJson(){
    let rawdata =  fs.readFileSync('./resources/cardData.json');
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

    // console.log(argsin)


}

function getImage(name, data){
    if(!name || !data){
        return "fa-solid fa-face-dizzy fa-5x"
    }
    // console.log(name.toLowerCase());
    // console.log(data[name.toLowerCase()])
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
        puppeteerArgs: { args: ["--no-sandbox",'--disable-setuid-sandbox'] }
      })
    return image;
}

async function createCardFromHtmlPage(htmlin,promptObject,dir,num,currency) {
    console.log("creating page " + num)
    const image = await nodeHtmlToImage({
        output: dir + '/page' + num +'.png' ,
        html: htmlin,
        content: { 
            card1: promptObject.card1,
            card2: promptObject.card2,
            card3: promptObject.card3,
            card4: promptObject.card4,
            card5: promptObject.card5,
            card6: promptObject.card6,
            card7: promptObject.card7,
            card8: promptObject.card8,
            card9: promptObject.card9,
            currency: currency
        },
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox",'--disable-setuid-sandbox'] }
      })
    return image;
}

async function createCardFromHtmlBULK (htmlin,contentArray) {
    const image = await nodeHtmlToImage({
        html: htmlin,
        content: contentArray,
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox",'--disable-setuid-sandbox'] }
      })
    return image;
}

async function createCardFromHtml(htmlin,cardPrompts,name,color,dir, icon="") {
    console.log("creating card " + name)
    const image = await nodeHtmlToImage({
        output: dir + '/card' + name +'.png' ,
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
            test1: cardPrompts.test1,
        },
        // encoding: 'base64',
        puppeteerArgs: { args: ["--no-sandbox",'--disable-setuid-sandbox'] }
      })
    return image;
}

async function zipDirectory(source, dest) {
    const stream = fs.createWriteStream(dest);
    const archive = archiver('zip', { zlib: { level: 9 } });
  
    archive.on('error', function(err) {
    throw err;
    });
  
    await new Promise((resolve, reject) => {
      archive.pipe(stream);
      archive.directory(source, false);
      archive.on('error', err => {throw err;});
      archive.finalize();
  
      stream
          .on('close', function() {
          console.log(`zipped ${archive.pointer()} total bytes.`);
          resolve();
          });
    });
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



