var PDFDocument = require('pdfkit');
var fs = require('fs');

const brown = "#884639";
const white = "#fff";
const black = "#000";
const fullWidth = 595.28;
const dogLogo = {
   path: 'images/dog.png',
   width: 70
};

const fFont = 'fonts/tw-cen-mt.ttf'; // 'fonts/PraxisCom-Light.ttf';

createDoc({
   output: 'pdf/output.pdf',
   soups: {
      title: "SOUP",
      subTitle: "",
      menu: [{
         title: "",
         price: 0
      }]},
   starters: {
      title: "STARTERS/SNACKS",
      subTitle: "Served tapas style, try one or two for a snack or three or more the share",
      menu: [{
         title: "",
         price: 0
      }]},
   mains: {
      title: "MAINS",
      subTitle: "",
      menu: [{
         title: "",
         price: 0
      }]},
   grill: {
      title: "THE GRILL",
      subTitle: "All served with plum tomato, flat mushroom, Shropshire gold onion rings and chips",
      menu: [{
         title: "",
         price: 0
      }]},
   sfv: {
      title: "SALADS, FISH AND VEGETARIAN",
      subTitle: "",
      menu: [{
         title: "",
         price: 0
      }]},
   sides: {
      title: "SIDES",
      subTitle: "",
      menu: [{
         title: "",
         price: 0
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
      margins: {
         top: 10,
         left: 70,
         right: 40,
         bottom: 10
      },
      size: 'A4' // A4: [595.28, 841.89]
   })
    
   // Pipe its output somewhere, like to a file or HTTP response 
   doc.pipe(fs.createWriteStream(menu.output));
   doc.font(fFont);
   // HEADER
   header(doc, brown);

   doc.image(dogLogo.path, (fullWidth/2)-(dogLogo.width/2), 83, {width: dogLogo.width})


   // MENU

   var y = 160

   doc.moveTo(0+38, y)
      .lineTo(fullWidth-38, y)
      .lineWidth(1.25)
      .stroke(brown)

   doc.fontSize(22).fillColor(brown).text(menu.soups.title, 0, y+8, {
     width: fullWidth,
     align: 'center'})

   y = y + 30
   doc.moveTo(0+40, y)
      .lineTo(fullWidth-40, y)
      .lineWidth(1.25)
      .stroke(brown)

   y = y + 98
   
   doc.moveTo(0+38, y)
      .lineTo(fullWidth-38, y)
      .lineWidth(1.25)
      .stroke(brown)

   doc.fontSize(22).fillColor(brown).text(menu.starters.title, 0, y+8, {
     width: fullWidth,
     align: 'center'})


   y = y + 30

   doc.fontSize(10).fillColor(brown).text(menu.starters.subTitle, 0, y+8, {
     width: fullWidth,
     align: 'center'})

   y = y + 30
   doc.moveTo(0+40, y)
      .lineTo(fullWidth-40, y)
      .lineWidth(1.25)
      .stroke(brown)



      
   // FOOTER
   footer(doc, menu);


////////////////////////////

   doc.addPage()

   // HEADER
   doc.rect(0, 0, fullWidth, 80).fill(brown);
   doc.fillColor(white);
   header(doc, white);

   // MENU


   // FOOTER
   footer(doc, menu);
    
   // Finalize PDF file 
   doc.end()
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
