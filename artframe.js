
function myFunction() {
  
  var element = document.getElementById("img1");
  var imageWidth = element.width;
  var imageHeight = element.height;

  // Assume we want picture to take up 70% of the frame in width

  var frameWidth = imageWidth / 0.7;

  // Now we got the width of the frame, the height follows
  // from the image proportions

  var frameHeight = imageHeight + 0.3 * frameWidth;
  var frameAspect = frameHeight / frameWidth;

  // Both in percentage of frame width:

  var frametoimg = 0.15;  // Distance from top of frame to image border
  var frametomat = 0.025; // Thickness of the frame

  var padbottom = 100 * frameAspect;
  var mattopbottom = (frametomat * frameWidth) / frameHeight;
  var matwidth = (1 - 2 * frametomat) * frameWidth;
  var matheight = ( 1 - 2 * mattopbottom) * frameHeight;
  var disttoframe = (frametoimg - frametomat)  * frameWidth;
  var imgside = disttoframe / matwidth * 100;

  // For optical adjustment, make bottom larger than top ("bottom weight")

  var imgtop = disttoframe / matheight * 100 - 1;
  var imgbottom = disttoframe / matheight * 100 + 1;  

  // Get the enclosing <div> around the image

  var parent = element.parentNode;
  var newdiv = document.createElement('div');

  // The <div> hiearchy is as follows:
  // frame is just a coloured rectangle, mostly covered by mat and image
  // mat is a tinted texture rectangle (white bg + alpha img)
  // image is the actual photo etc to be framed
  // bevel imitates the miter cut of a framer's mat

  newdiv.innerHTML = `
            <div style="flex: 1 1 auto;">
            <div class="frame" style="padding-bottom: ${padbottom}%;">
              <div class="mat" style="top: ${mattopbottom * 100}%;
                                      bottom: ${mattopbottom * 100}%;
                                      left: ${frametomat * 100}%;
                                      right: ${frametomat * 100}%;">
                <div class="image" style="top: ${imgtop}%;
                                          bottom: ${imgbottom}%;
                                          left: ${imgside}%;
                                          right: ${imgside}%;">
                <div class="bevel">
                  <img src="${element.src}">
                </div>
              </div>
            </div>
            </div>
      <p>Resize the browser window!</p>`;

  // Replace the orignal <img> by the new div

  parent.replaceChild(newdiv, element);

}