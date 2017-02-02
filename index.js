var PDFDocument = require('pdfkit');
var fs = require('fs');
var console = require('tracer').colorConsole();

const brown = "#884639";
const white = "#fff";
const black = "#000";
const fullWidth = 595.28;
const dogLogo = {
   path: 'images/dog.png',
   width: 70
};

const headFontSize = 24;
const subTitleFontSize = 12;
const fFont = 'fonts/tw-cen-mt.ttf'; // 'fonts/PraxisCom-Light.ttf';

var y = 0;  //tracking the Y position

createDoc({
   output: 'pdf/output.pdf',
   soups: {
      title: "SOUP",
      subTitle: "",
      menu: [{
         title: "SOUP OF THE DAY, FRESH BREAD",
         price: 4.5
      },{
         title: "SPICY CHICKEN & SWEETCORN CHOWDER",
         price: 6.0
      }]},
   starters: {
      title: "STARTERS/SNACKS",
      subTitle: "Served tapas style, try one or two for a snack or three or more the share",
      menu: [{
         title: "QUEEN GREEN OLIVES",
         price: 3.0
      },{
         title: "LEMON & CORIANDER HOUMOUS, PITTA BREAD",
         price: 3.0
      },{
         title: "Y FENNI CHEESE & SHROPSHIRE GOLD WELSH RAREBIT",
         price: 3.0
      },{
         title: "OVEN DRIED PLUM TOMATO ARANCINI, SAFFRON MAYONNAISE",
         price: 3.5
      },{
         title: "PAPRIKA DUSTED CALAMARI, AIOLI",
         price: 3.5
      },{
         title: "PIRI-PIRI CHICKEN WINGS",
         price: 4.0
      },{
         title: "THAI CRAB CAKES, ASIAN SLAW",
         price: 4.0
      },{
         title: "BREADED HAGGIS BEIGNETS, APPLE & MUSTARD SEED SAUCE",
         price: 4.5
      },{
         title: "MINI SCOTCH EGGS",
         price: 5.0
      },{
         title: "MINI CHORIZO & GARLIC",
         price: 5.0
      },{
         title: "BREAD & OILS/BUTTER",
         price: 5.5
      },{
         title: "BAKED CAMEMBERT, TOAST & LOPPINGTON HALL QUINCE & CHILLI JAM",
         price: 9.0
      }]},
   mains: {
      title: "MAINS",
      subTitle: "",
      menu: [{
         title: "\"WREXHAM\" BATTERED HADDOCK & CHIPS",
         subTitle: "Tartare Sauce, Mushy Peas",
         price: 10.0
      },{
         title: "LOCAL PORK SAUSAGES",
         subTitle: "Mustard Mashed Potatoes, Onion Gravy",
         price: 10.0
      },{
         title: "PIE OF THE DAY",
         subTitle: "Chunky Chips, Gravy",
         price: 10.0
      },{
         title: "DUCK CASSUOLET",
         subTitle: "French Stew of Confit Duck Leg, Toulouse Sausage, Pulses",
         price: 14.5
      }]},
   grill: {
      title: "THE GRILL",
      subTitle: "All served with plum tomato, flat mushroom, Shropshire gold onion rings and chips",
      menu: [{
         title: "10oz BACON CHOP",
         note: "(ADD 2 FREE RANGE FRIED EGGS FOR £2.00)",
         price: 12.0
      },{
         title: "8oz RUMP STEAK",
         price: 12.5
      },{
         title: "8oz RIBEYE STEAK",
         price: 16.5
      },{
         title: "12oz T-BONE STEAK",
         price: 19.5
      },{
         title: "8oz FILLET STEAK",
         price: 22.5
      }]},
   sfv: {
      title: "SALADS, FISH AND VEGETARIAN",
      subTitle: "",
      menu: [{
         title: "CAESAR",
         subTitle: "Romaine Lettuce hearts hearts, Ciabatta Croutes, Anchovies (optional) Local Smoked Bacon, Poached free range egg, Caesar Dressing",
         note: "(ADD WARM SMOKED CHICKEN FOR £2.50)",
         price: 10.5
      },{
         title: "GOATS CURD & BEETROOT",
         subTitle: "Welsh goats curd, pickled raw and baked beetroot, candied and pickled walnuts, beetroot sprouts, Walnutoil & sherry vinaigrette",
         price: 12.0
      },{
         title: "PORCINI MUSHROOM & TALEGGIO CHEESE RISOTTO",
         subTitle: "Parmesan, Rocket",
         price: 12.5
      },{
         title: "SEARED SEABREAM FILLETS",
         subTitle: "Oven-dried plum tomatoes, queen olives, roast courgettes and rocket pesto",
         price: 14.0
      }]},
   sides: {
      title: "SIDES",
      subTitle: "",
      menu: [{
         title: "PEPPERCORN OR BLUE CHEESE SAUCE",
         price: 2.0
      },{
         title: "DAILY VEGETABLES (PLEASE ASK)",
         price: 3.0
      },{
         title: "CHIPS",
         price: 3.0
      },{
         title: "ROCKET & PARMESAN SALAD",
         price: 3.0
      }]},
   address: {
      line1: "THE DICKIN ARMS,",
      line2: "LOPPINGTON, SHREWSBURY, SY4 5SR",
      tel: "+44 (0)1939 233471",
      url: "WWW.THEDICKINARMS.COM"
   }
});

function createDoc(menu) {

   //Create a document
   doc = new PDFDocument({
      autoFirstPage: true,
      margins: {
         top: 10,
         left: 35,
         right: 35,
         bottom: 10
      },
      // margin: 72,
      size: 'A4' // A4: [595.28, 841.89]
   })

   // Pipe its output somewhere, like to a file or HTTP response
   doc.pipe(fs.createWriteStream(menu.output));
   doc.font(fFont);

   // HEADER
   header(doc, black);

   doc.image(dogLogo.path, (fullWidth/2)-(dogLogo.width/2), 65, {width: dogLogo.width})

   // MENU

   y = 160
   buildFullWidthLine(y);
   y = y + 2
   doc.fontSize(headFontSize).fillColor(brown).text(menu.soups.title, 0, y, {
     width: fullWidth,
     align: 'center'})

   y = y + 30
   buildFullWidthLine(y);

   doc.moveDown()
  doc.moveTo(0, 0)
  // SOUPS
  buildFullWidthMenu(menu.soups.menu, doc);

   y = y + 98
   buildFullWidthLine(y);

   doc.fontSize(headFontSize).fillColor(brown).text(menu.starters.title, 0, y+8, {
     width: fullWidth,
     align: 'center'})

   y = y + 33

   doc.fontSize(subTitleFontSize).fillColor(black).text(menu.starters.subTitle, 0, y+8, {
     width: fullWidth,
     align: 'center'})

   y = y + 33
   buildFullWidthLine(y);


    doc.moveDown().moveDown()
    // STARTERS
    doc.fillColor(brown);

    buildFullWidthMenu(menu.starters.menu, doc);

   // FOOTER
   footer(doc, menu);


////////////////////////////

   doc.addPage()
   var y = 0;
   // HEADER
   doc.rect(0, 0, fullWidth, 80).fill(brown);
   doc.fillColor(white);
   header(doc, white);

   // MAINS
   y = 96
   buildHalfWidthLine(y, true);
   y = y + 2
   doc.fontSize(headFontSize).fillColor(brown).text(menu.mains.title, 0, y, {
     width: fullWidth/2,
     align: 'center'})

   y = y + 30
   buildHalfWidthLine(y, true);

   // GRILL
   y = 96
   buildHalfWidthLine(y, false);
   y = y + 2
   doc.fontSize(headFontSize).fillColor(brown).text(menu.grill.title, (fullWidth/2), y, {
     width: fullWidth/2,
     align: 'center'})
   y = y + 30
   buildHalfWidthLine(y, false);

   // SALADS, FISH & VEGETARIAN
   y = 360
   buildFullWidthLine(y);
   y = y + 2
   doc.fontSize(headFontSize).fillColor(brown).text(menu.sfv.title, 0, y, {
     width: fullWidth,
     align: 'center'})

   y = y + 30
   buildFullWidthLine(y);
   doc.moveDown()
   doc.fillColor(brown);
   buildFullWidthMenu(menu.sfv.menu, doc);

   // SIDES
   y = 640
   buildFullWidthLine(y);
   y = y + 2
   doc.fontSize(headFontSize).fillColor(brown).text(menu.sides.title, 0, y, {
     width: fullWidth,
     align: 'center'})
   y = y + 30
   buildFullWidthLine(y);
   doc.moveDown()

   buildHalfWidthMenu(menu.sides.menu, doc);

   // FOOTER
   footer(doc, menu);

   // Finalize PDF file
   doc.end()
   console.log("done")
}

function buildHalfWidthMenu(section, doc) {
  doc.fillColor(black);
  doc.fontSize(14);

  // fullWidth-doc.options.margins.left-doc.options.margins.left

  // var halfWidth = ((fullWidth-90)/2);
  var halfWidth = ((fullWidth-doc.options.margins.left-doc.options.margins.left)/2)-10;
  var dSize = doc.widthOfString(".");
  for (var i = 0; i < section.length; i++) {
    var x = section[i];
    var price = formatPrice(x.price);
    var tSize = doc.widthOfString(x.title);
    var pSize = doc.widthOfString(price);

    var dotWidth = halfWidth - tSize - pSize;

    var dots = '';
    var curDotSize = 0;

    //how many dots can fit into
    var dotsNeeded = (dotWidth.toFixed(2)/dSize.toFixed(2)).toFixed(0);

    for (var a = 0; a < dotsNeeded; a++) {
      dots += '.';
    }

    var retVal = x.title + ' ' + dots + ' ' + price;

    if (isOdd(i)) {
      doc.fontSize(14).text(retVal, halfWidth+doc.options.margins.left+15, doc.y, {lineBreak: false, align: 'justify'});
      doc.moveDown(1.85)
    }
    else {
      doc.fontSize(14).text(retVal, 35, doc.y, {lineBreak: false, align: 'justify'});
    }

  }
}

function buildFullWidthMenu(section, doc) {
  doc.fillColor(black);
  doc.fontSize(14);
  var dSize = doc.widthOfString(".");
  for (var i = 0; i < section.length; i++) {
    var x = section[i];
    var price = formatPrice(x.price);
    var tSize = doc.widthOfString(x.title);
    var pSize = doc.widthOfString(price);

    var dotWidth = (fullWidth-75) - tSize - pSize;

    var dots = '';
    var curDotSize = 0;

    //how many dots can fit into
    var dotsNeeded = (dotWidth.toFixed(2)/dSize.toFixed(2)).toFixed(0);

    for (var a = 0; a < dotsNeeded; a++) {
      dots += '.';
    }

    var retVal = x.title + ' ' + dots + ' ' + price;

    doc.fontSize(14).text(retVal, 35, doc.y, {lineBreak: false, align: 'justify'});
    doc.moveDown(1.85)
  }
}

function buildFullWidthLine(y) {
  doc.moveTo(doc.options.margins.left, y)
     .lineTo(fullWidth-doc.options.margins.left, y)
     .lineWidth(1.25)
     .stroke(brown)
  // console.log(fullWidth-doc.options.margins.left-doc.options.margins.left)
}

function buildHalfWidthLine(y, leftAligned) {
  if (leftAligned)
    doc.moveTo(doc.options.margins.left, y)
  else
    doc.moveTo(doc.options.margins.left, y)

     doc.lineTo(fullWidth-doc.options.margins.left, y)
       .lineWidth(1.25)
       .stroke(brown)
}

function formatPrice(decimal) {
  return "£"+decimal.toFixed(2).toString();
}

function header(doc, color) {
   var t = 10;
   doc.fontSize(14).text('THE', 0, t, {
     width: fullWidth,
     align: 'center'})

   doc.moveTo((fullWidth/2)-80, 30)
      .lineTo((fullWidth/2)+80, 30)
      .lineWidth(0.75)
      .stroke(color)

   doc.fontSize(21).text('DICKIN ARMS', 0, 32, {
     characterSpacing: 2,
     width: fullWidth,
     align: 'center'})

   doc.moveTo((fullWidth/2)-80, 57)
      .lineTo((fullWidth/2)+80, 57)
      .lineWidth(0.75)
      .stroke(color)
}

function footer(doc, menu) {
   var t = 750
   doc.fillColor(black).fontSize(12)

   doc.text(menu.address.line1, 0, t, {
      width: fullWidth,
      align: 'center'})

   doc.text(menu.address.line2, 0, t+14, {
      width: fullWidth,
      align: 'center'})

   doc.text(menu.address.tel, 0, t+28, {
      width: fullWidth,
      align: 'center'})

   doc.text(menu.address.url, 0, t+52, {
      width: fullWidth,
      align: 'center'
   })
}

function isOdd(num) { return num % 2;}
