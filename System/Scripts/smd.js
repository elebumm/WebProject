var screenW, screenH, leftPos, topPos;

function smdCenterPositionForWindowOpen(width, height) {
  width = (width) ? width : 500;
  height = (height) ? height: 249;            
  
  smdScreenSize();

  leftPos = (screenW - width) / 2;
  topPos = (screenH - height) / 2;
}
function smdScreenSize() {
  screenW = 1024, screenH = 768;
  if (parseInt(navigator.appVersion)>3) {
   screenW = screen.width;
   screenH = screen.height;
  }
}
function smdReturnBoolean(val) {
  return val == 'on' ? true : false;
}
function smdWindowOpen(url, fullscreen, width, height, toolbar, location, directories, status, menubar, scrollbars, copyhistory, resizable) {
  fullscreen = (fullscreen) ? fullscreen : 'yes';
  if (fullscreen == 'yes') {
    smdScreenSize();
    width  = screenW - 60;
    height = screenH - 120;
    toolbar = 'no';
    location = 'no';
    directories = 'no';
    status = 'no';
    menubar = 'no';
    topPos = '30';
    leftPos = '30';
  }
  width = (width) ? width : 800;
  height = (height) ? height: 500;            
  if (fullscreen == 'no') {
    smdCenterPositionForWindowOpen(width, height);
  }
  toolbar = (toolbar) ? toolbar : 'yes';
  location = (location) ? location : 'yes';
  directories = (directories) ? directories : 'yes';
  status = (status) ? status : 'yes';
  menubar = (menubar) ? menubar : 'yes';
  scrollbars = (scrollbars) ? scrollbars : 'yes';
  copyhistory = (copyhistory) ? copyhistory : 'no';
  resizable = (resizable) ? resizable : 'yes';
  window.open(url, null,
           'width = ' + width + ',' +
           'height = ' + height + ',' +
           'top = ' + topPos + ',' +
           'left = ' + leftPos + ',' +
           'toolbar = ' + toolbar + ',' +
           'location = ' + location + ',' + 
           'directories = ' + directories + ',' + 
           'status = ' + status + ',' + 
           'menubar = ' + menubar + ',' + 
           'scrollbars = ' + scrollbars + ',' +
           'copyhistory =' + copyhistory + ',' + 
           'resizable = ' + resizable);
}
function smdLoadJSfile(filename) {
  var fileref=document.createElement('script')
  fileref.setAttribute("type","text/javascript")
  fileref.setAttribute("src", filename)
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}
function smdLoadCSSfile(filename) {
  var fileref=document.createElement("link")
  fileref.setAttribute("rel", "stylesheet")
  fileref.setAttribute("type", "text/css")
  fileref.setAttribute("href", filename)
  if (typeof fileref!="undefined")
    document.getElementsByTagName("head")[0].appendChild(fileref)
}