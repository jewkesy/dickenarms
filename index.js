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

const fFont = 'fonts/PraxisCom-Light.ttf';

//Create a document 
doc = new PDFDocument({
   margin: 0,
   size: 'A4' // A4: [595.28, 841.89]
})
 
// Pipe its output somewhere, like to a file or HTTP response 
// See below for browser usage 
doc.pipe(fs.createWriteStream('pdf/output.pdf'));
 
// Embed a font, set the font size, and render some text 

header(doc, brown, 10);

// var t = 25;   
// doc.fontSize(12).text('THE', 0, t, {
//   width: fullWidth,
//   align: 'center'})

// doc.moveTo((fullWidth/2)-80, t+20)
//    .lineTo((fullWidth/2)+80, t+20)
//    .lineWidth(1)
//    .stroke(brown)

// doc.fontSize(18).text('DICKEN ARMS', 0, t+26, {
//   width: fullWidth,
//   align: 'center'})

// doc.moveTo((fullWidth/2)-80, t+44)
//    .lineTo((fullWidth/2)+80, t+44)
//    .lineWidth(1)
//    .stroke(brown)

doc.image(dogLogo.path, (fullWidth/2)-(dogLogo.width/2), 83, {width: dogLogo.width})

doc.font(fFont)
   .fontSize(20)
   
//  FOOTER
footer(doc);

// Add another page 
doc.addPage()
doc.rect(0, 0, fullWidth, 80).fill(brown);

doc.fillColor(white)

header(doc, white, 10);



//  FOOTER
footer(doc);
 
// Finalize PDF file 
doc.end()

function header(doc, color, top) {
   var t = top;
   doc.fontSize(12).text('THE', 0, t, {
     width: fullWidth,
     align: 'center'})

   doc.moveTo((fullWidth/2)-80, t+20)
      .lineTo((fullWidth/2)+80, t+20)
      .lineWidth(0.5)
      .stroke(color)

   doc.fontSize(18).text('DICKEN ARMS', 0, t+23, {
     width: fullWidth,
     align: 'center'})

   doc.moveTo((fullWidth/2)-80, 57)
      .lineTo((fullWidth/2)+80, 57)
      .lineWidth(0.5)
      .stroke(color)
}

function footer(doc) {
   var t = 750
   doc.fillColor(black).fontSize(12)

   doc.text('THE DICKIN ARMS', 0, t, {
      width: fullWidth,
      align: 'center'})

   doc.text('LOPPINGTON, SHREWSBURY, SY4 5SR', 0, t+14, {
      width: fullWidth,
      align: 'center'})

   doc.text('T: +44 (0)1939 233471', 0, t+28, {
      width: fullWidth,
      align: 'center'})

   doc.text('WWW.THEDICKINARMS.COM', 0, t+52, {
      width: fullWidth,
      align: 'center'
   })
}
