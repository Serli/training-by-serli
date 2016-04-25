function createPDF (pdfTitle,
                    pdfDuration,
                    pdfCosts,
                    pdfDurationDescription,
                    pdfCostsDescription,
                    pdfPublic,
                    pdfRef,
                    pdfSubject,
                    pdfProgram,
                    pdfContent) {

  function textInRect (doc, x, y, w, h, text, alignWidth, alignHeight, r, g, b) {
    if (typeof r !== 'undefined' && typeof g !== 'undefined' && typeof b !== 'undefined') {
      doc.setFillColor(r,g,b);
      doc.rect(x, y, w, h, 'F');
    }
    var lines = doc.splitTextToSize(text, w);
    var heightLine = doc.getTextDimensions(lines[0]).h/doc.internal.scaleFactor;
    var heightText = heightLine*lines.length;
    lines.forEach(function (element, index, array) {
      var fontSize = doc.internal.getFontSize();
      var widthLine = doc.getTextDimensions(element).w/doc.internal.scaleFactor;
      doc.text(x+((w-widthLine)*alignWidth/2), ((h-heightText)*alignHeight/2)+y+(heightLine*(index+1-0.3)), element); // -0,3 heightLine : Descent font
    });
  }

  function textCenterInRect (doc, x, y, w, h, text, r, g, b) {
    textInRect(doc, x, y, w, h, text, 1, 1, r, g, b);
  }

  function textLeftInRect (doc, x, y, w, h, text, r, g, b) {
    textInRect(doc, x, y, w, h, text, 0, 1, r, g, b);
  }

  function textRightInRect (doc, x, y, w, h, text, r, g, b) {
    textInRect(doc, x, y, w, h, text, 2, 1, r, g, b);
  }

  function textBottomInRect (doc, x, y, w, h, text, r, g, b) {
    textInRect(doc, x, y, w, h, text, 1, 2, r, g, b);
  }

  function textTopInRect (doc, x, y, w, h, text, r, g, b) {
    textInRect(doc, x, y, w, h, text, 1, 0, r, g, b);
  }

  function paragraphInRect (doc, x, y, w, hmax, text, r, g, b) {
    if (typeof r !== 'undefined' && typeof g !== 'undefined' && typeof b !== 'undefined') {
      doc.setFillColor(r,g,b);
      doc.rect(x, y, w, hmax, 'F');
    }
    var PIR_oldLines = text.replace('\n',' ')
                    .replace('\. ','\.\n').replace('! ','!\n')
                    .replace('. ','.\n')
                    .replace('\: ','\:\n').split('\n');
    var PIR_lines = [];
    PIR_oldLines.forEach(function (element, index, array) {
      PIR_lines=PIR_lines.concat(doc.splitTextToSize(element, w));
    });
    //console.log(PIR_lines);
    var PIR_heightLine = doc.getTextDimensions(PIR_lines[0]).h/doc.internal.scaleFactor;
    PIR_heightLine = 4.233336466656; // il y a parfoit un bug avec getTextDimensions
    var PIR_heightText = PIR_heightLine*PIR_lines.length;
    PIR_lines.forEach(function (element, index, array) {
      doc.text(x, y+(PIR_heightLine*(index+1-0.3)), element); // -0,3 PIR_heightLine : Descent font
    });
    return PIR_heightText;
  }

  function afficheList (doc, lx, ly, lw, lh, list, alignWidth, r, g, b) {
    var y = ly;
    var result = [];
    list.forEach(function (listelement, listindex, listarray) {
      var lines = doc.splitTextToSize(listelement, lw);
      var heightLine = doc.getTextDimensions(lines[0]).h/doc.internal.scaleFactor;
      var heightText = heightLine*lines.length;
      if (y+heightLine*(lines.length+1) < ly+lh) {
        if (typeof r !== 'undefined' && typeof g !== 'undefined' && typeof b !== 'undefined') {
          doc.setFillColor(r,g,b);
          doc.rect(lx-1, y-1, lw+2, heightText+2, 'F');
        }
        lines.forEach(function (element, index, array) {
          var fontSize = doc.internal.getFontSize();
          var widthLine = doc.getTextDimensions(element).w/doc.internal.scaleFactor;
          doc.text(lx+((lw-widthLine)*alignWidth/2), y+(heightLine*(index+1-0.3)), element); // -0,3 heightLine : Descent font
        });
      } else {
        result.push(listelement);
      }
      y += heightLine*(lines.length+1);
    });
    return result;
  }

  var doc = new jsPDF('p', 'mm', 'a4'); // 210.297

  doc.setFont("sans-serif");
  doc.setFontType("normal");

  doc.setFillColor(16, 104, 176);//1068b0
  doc.rect(0, 0, 210, 35, 'F');
  doc.setTextColor(255,255,255);
  doc.setFontSize(22);
  textLeftInRect(doc, 20, 0, 130, 35, pdfTitle);

  doc.setFontSize(8);
  textCenterInRect(doc, 150, 0, 20, 35, "REF : "+pdfRef);

  doc.addImage(imageTraining, 'JPEG', 170, 8, 35, 20);

  doc.setTextColor(0,0,0);
  doc.setFontSize(12);

  doc.addImage(imageDuration, 'JPEG', 33, 37, 8, 8);
  doc.addImage(imagePublic, 'JPEG', 93, 37, 8, 8);
  doc.addImage(imageCost, 'JPEG', 153, 37, 8, 8);
  doc.text(46, 40, "DURÉE");
  doc.text(106, 40, "PUBLIC");
  doc.text(166, 40, "TARIF");

  doc.setFontSize(10);
  textBottomInRect(doc, 20, 50, 55, 9, pdfDuration, 220,220,220);
  textTopInRect(doc, 20, 59, 55, 9, pdfDurationDescription, 220,220,220);

  textCenterInRect(doc, 80, 50, 55, 18, pdfPublic, 220,220,220);

  textBottomInRect(doc, 140, 50, 55, 9, pdfCosts, 220,220,220);
  textTopInRect(doc, 140, 59, 55, 9, pdfCostsDescription, 220,220,220);

  var height = 75;
  if (pdfContent !== '') {
    doc.text(20, 73, "PRÉSENTATION");
    height += paragraphInRect(doc, 20, 75, 170, 80, pdfContent) + 10;
  }

  doc.setTextColor(255,255,255);
  pdfSubject = afficheList (doc, 18, height, 40, 90, pdfSubject, 0, 62,200,232);//439be3//3db8d8
  doc.setTextColor(0,0,0);

  // doc.setDrawColor(0,0,0);
  // doc.setLineWidth(0.3);
  // doc.line(62, height-5, 62, 280);

  if (pdfProgram.length>0) {
    doc.text(65, height, "PROGRAMME");
    pdfProgram.forEach(function (element, index, array) {
      doc.setFontType("bold");
      textLeftInRect(doc, 70, height, 120, 10, element.name);
      doc.setFontType("normal");
      height += doc.getTextDimensions(element.name).h/doc.internal.scaleFactor;
      element.activity.forEach(function (activityelement, activityindex, activityarray) {
        textLeftInRect(doc, 80, height+(activityindex*doc.getTextDimensions(activityelement).h/doc.internal.scaleFactor), 110, 10, activityelement);
      });
      height += (doc.getTextDimensions(element.name).h/doc.internal.scaleFactor)*(element.activity.length);
    });
  }

  doc.setTextColor(100,100,100);
  doc.addImage(imageMail, 'JPEG', 35, 282, 5, 5);
  textCenterInRect(doc, 40, 282, 35, 5, "formation@serli.com");
  doc.addImage(imagePhone, 'JPEG', 85, 282, 5, 5);
  textCenterInRect(doc, 90, 282, 35, 5, "+33(0)5 49 49 49 30");
  doc.addImage(imageLien, 'JPEG', 135, 282, 5, 5);
  textCenterInRect(doc, 140, 282, 35, 5, "www.serli.com");
  textCenterInRect(doc, 10, 287, 200, 5, "Serli - Avenue Thomas Edison - BP 20160 - 86960 Futuroscope Cedex");

  doc.save(pdfTitle.replace("/ /g", '').replace(".", ''));
};
