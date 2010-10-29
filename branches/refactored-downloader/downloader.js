/* Extend function  */
function extend(subClass, superClass) {
  var F = function() {};
  F.prototype = superClass.prototype;
  subClass.prototype = new F();
  subClass.prototype.constructor = subClass;

  subClass.superClass = superClass.prototype;
  if (superClass.prototype.constructor == Object.prototype.constructor) {
    superClass.prototype.constructor = superClass;
  }
}

/*
* superClass
**/
function Downloader(link, plugin, progId) {
  this.link = link;
  this.plugin = plugin;
  this.progId = progId;

}

Downloader.prototype.createNpObjectInstance = function() {
  return this.plugin.CreateObject(this.progId);
}

Downloader.prototype.download = function() {
  return this.link;
}

Downloader.prototype.downloadAll = function() {
  return this.link;
}

/*
thunder downloader
 */
function Thunder(link, plugin, progId) {
  Thunder.superClass.constructor.apply(this, arguments);
  this.thunder = this.createNpObjectInstance();
}

extend(Thunder, Downloader);

Thunder.prototype.download = function() {
  var linkObj = Thunder.superClass.download.call(this);
  this.thunder.AddTask5(linkObj.url, '', '', '', '', -1, 0, -1, '', '', '', 1, '', -1);
  this.thunder.CommitTasks2(1);
}

Thunder.prototype.downloadAll = function() {
  var links = Thunder.superClass.downloadAll.call(this);
  for (var i = 0; i < links.length; i++) {
    this.thunder.AddTask4(links[i].url, '', '', links[i].text, '', -1, 0, -1,
        '', '', '');
  }
  this.thunder.CommitTasks2(1);
}

/*
 mini thunder downloader
 */
function MiniThunder(link, plugin, progId) {
  MiniThunder.superClass.constructor.apply(this, arguments);
  this.miniThunder = this.createNpObjectInstance();
}

extend(MiniThunder, Downloader);

MiniThunder.prototype.download = function() {
  var linkObj = MiniThunder.superClass.download.call(this);
  this.miniThunder.AddTask(linkObj.url, '', '', '', '');
}

/*
  flashget downloader
 */
function Flashget(link, plugin, progId, pageUrl) {
  this.pageUrl = pageUrl;
  Flashget.superClass.constructor.apply(this, arguments);
  this.flashget = this.createNpObjectInstance();
}

extend(Flashget, Downloader);

Flashget.prototype.download = function() {
  var linkObj = Flashget.superClass.download.call(this);
  this.flashget.AddUrlEx(linkObj.url, linkObj.text, linkObj.pageUrl, "FlashGet3",'', 0, 3 ); 
}

Flashget.prototype.downloadAll = function() {
  var links = Flashget.superClass.downloadAll.call(this);
  var newLinks = [];
  newLinks.push(this.pageUrl);
  for (var i = 0; i < links.length; i++) {
    var url = links[i].url;
    var text = links[i].text;
    newLinks.push(url);
    newLinks.push(text);
  }
  this.flashget.AddAll(newLinks, '', "FlashGet3", 0,'');
}

/*
 mini thunder downloader
 */
function MiniFlashget(link, plugin, progId, pageUrl) {
  this.pageUrl = pageUrl;
  MiniFlashget.superClass.constructor.apply(this, arguments);
  this.miniFlashget = this.createNpObjectInstance();
}

extend(MiniFlashget, Downloader);

MiniFlashget.prototype.download = function() {
  var linkObj = MiniFlashget.superClass.download.call(this);
  this.miniFlashget.AddUrlEx(linkObj.url, linkObj.text, '', "FlashGetMini", 0,'');
}

MiniFlashget.prototype.downloadAll = function() {
  var links = MiniFlashget.superClass.downloadAll.call(this);
  var newLinks = [];
  newLinks.push(this.pageUrl);
  for (var i = 0; i < links.length; i++) {
    var url = links[i].url;
    var text = links[i].text;
    newLinks.push(url);
    newLinks.push(text);
  }
  this.miniFlashget.AddAll(newLinks, '', "FlashGetMini", 0,'');
}

/*QQWhirlWind*/
function QQWhirlWind(link, plugin, progId, pageUrl) {
  this.pageUrl = pageUrl;
  QQWhirlWind.superClass.constructor.apply(this, arguments);
  this.qqWhirlWind = this.createNpObjectInstance();
}

extend(QQWhirlWind, Downloader);
QQWhirlWind.prototype.download = function() {
  var linkObj = QQWhirlWind.superClass.download.call(this);
  this.qqWhirlWind.SendUrl2(linkObj.url, linkObj.pageUrl, linkObj.text, '', 0, 0);
}

QQWhirlWind.prototype.downloadAll = function() {
  var links = QQWhirlWind.superClass.downloadAll.call(this);
  for (var i = 0; i < links.length; i++) {
    this.qqWhirlWind.AddTask(links[i].url, this.pageUrl, links[i].text);
  }
  this.qqWhirlWind.SendMultiTask();
}

function EMule(link, plugin, progId, pageUrl) {
  this.pageUrl = pageUrl;
  EMule.superClass.constructor.apply(this, arguments);
  this.eMule = this.createNpObjectInstance();
}
extend(EMule, Downloader);
EMule.prototype.download = function() {
  var linkObj = QQWhirlWind.superClass.download.call(this);
  this.eMule.SendUrl(linkObj.url, linkObj.text, linkObj.pageUrl);
}

function Orbit(link, plugin, progId, pageUrl) {
  this.pageUrl = pageUrl;
  Orbit.superClass.constructor.apply(this, arguments);
  this.orbit = this.createNpObjectInstance();
}
extend(Orbit, Downloader);
Orbit.prototype.download = function() {
  var linkObj = Orbit.superClass.download.call(this);
  this.orbit.download(linkObj.url, linkObj.text, linkObj.pageUrl, '', 0);
}

Orbit.prototype.downloadAll = function() {
  var links = Orbit.superClass.downloadAll.call(this);
  var urls = [];
  var texts = [];
  for (var i = 0; i < links.length; i++) {
    urls.push(links[i].url);
    texts.push(links[i].text);
  }
  this.orbit.downloadList(urls, texts, this.pageUrl, "");
}

var downloaderManager = {}

downloaderManager.supportDownloader = [
  {name: 'flashget', showName: 'menu_flashget', showName2:'download_all_with_flashget', progId: 'BHO.IFlashGetNetscapeEx', privateLink: 'flashget://', supportDownloadAll: true, image: 'images/icon_flashget.png'},
  {name: 'mini_flashget', showName: 'menu_mini_flashget', showName2:'download_all_with_mini_flashget', progId: 'BHO.IFlashGetNetscape', privateLink: 'flashget://', supportDownloadAll: true, image: 'images/icon_flashget.png'},
  {name: 'thunder', showName: 'menu_thunder', showName2:'download_all_with_thunder', progId: 'ThunderAgent.Agent.1', privateLink: 'thunder://', supportDownloadAll: true, image: 'images/icon_thunder.png'},
  {name: 'mini_thunder', showName: 'menu_mini_thunder', showName2:'download_all_with_mini_thunder', progId: 'ToolbarThunder.DownloadAgent.1', privateLink: 'thunder://', supportDownloadAll: false, image: 'images/icon_thunder.png'},
  {name: 'qq_whirlwind', showName: 'menu_qq_whirlwind', showName2:'download_all_with_qq_whirlwind', progId: 'QQIEHelper.QQRightClick.2', privateLink: '', supportDownloadAll: true, image: 'images/icon_qq.png'},
  {name: 'emule', showName: 'menu_emule', showName2:'download_all_with_emule', progId: 'IE2EM.IE2EMUrlTaker', privateLink: 'ed2k://', supportDownloadAll: false, image: 'images/icon_emule.png'},
  {name: 'orbit', showName: 'menu_orbit', showName2:'download_all_with_orbit', progId: 'Orbitmxt.Orbit', privateLink: '', supportDownloadAll: true, image: 'images/icon_orbit.png'},
  {name: 'chrome_downloader', showName: 'menu_chrome', isSystem: true, supportDownloadAll: false, image: 'images/icon_chrome.png'}
]

downloaderManager.downloader = function(mode, link, plugin, pageUrl) {
  var downloader;
  switch(mode) {
    case 'thunder':
      downloader = new Thunder(link, plugin, 'ThunderAgent.Agent.1');
      break;
    case 'mini_thunder':
      downloader = new MiniThunder(link, plugin, 'ToolbarThunder.DownloadAgent.1');
      break;
    case 'flashget':
      downloader = new Flashget(link, plugin, 'BHO.IFlashGetNetscapeEx', pageUrl);
      break;
    case 'mini_flashget':
      downloader = new MiniFlashget(link, plugin, 'BHO.IFlashGetNetscape', pageUrl);
      break;
    case 'qq_whirlwind':
      downloader = new QQWhirlWind(link, plugin, 'QQIEHelper.QQRightClick.2', pageUrl);
      break;
    case 'emule':
      downloader = new EMule(link, plugin, 'IE2EM.IE2EMUrlTaker', pageUrl);
      break;
    case 'orbit':
      downloader = new Orbit(link, plugin, 'Orbitmxt.Orbit', pageUrl);
      break;
  }
  return downloader;
}

downloaderManager.getEnableDownloader = function(plugin) {
  var enableDownloader = [];
  for (var i = 0; i < downloaderManager.supportDownloader.length; i++) {
    var downloader = downloaderManager.supportDownloader[i];
    if (downloader.isSystem || plugin.CheckObject(downloader.progId)) {
      enableDownloader.push(downloader);
    }
  }
  return enableDownloader;
}

downloaderManager.copyLinkToClipboard = function(plugin, url) {
  plugin.CopyToClipboard(url);
}