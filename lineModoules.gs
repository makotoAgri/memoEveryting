function getLineEvent(e) {
//e:HttpRequest
  var lineEvent = {};
  lineEvent.lineJson = JSON.parse(e.postData.contents);
  lineEvent.events = lineEvent.lineJson.events[0];
  lineEvent.replyToken = lineEvent.events.replyToken;
  lineEvent.message = lineEvent.events.message;
  lineEvent.messageId = lineEvent.message.id;
  lineEvent.text = lineEvent.message.text;
  lineEvent.type = lineEvent.message.type;
  lineEvent.userId = lineEvent.events.source.userId;
  return lineEvent;
}

function pushLineMessage(text, p, lineEvent) {
  //Pushでtextメッセージを送る
  const LINE_ACCESS_TOKEN = p.LINE_ACCESS_TOKEN;
  const userId = lineEvent.userId;
  const messages = [
    {
      "type":"text",
      "text": text
    }
  ]
  UrlFetchApp.fetch("https://api.line.me/v2/bot/message/push", {
    "headers": {
      "Content-Type": "application/json; charset=UTF-8",
      "Authorization": "Bearer " + LINE_ACCESS_TOKEN,
    },
    "method": "post",
    "payload": JSON.stringify({
      "to": userId,
      "messages": messages,
      }
    )
  });
}

function getLineName(p, lineEvent) {
//userIdからプロフィールを参照し、表示名を取得する
  const LINE_ACCESS_TOKEN = p.LINE_ACCESS_TOKEN;
  const userId = lineEvent.userId;
  const url = 'https://api.line.me/v2/bot/profile/' + userId;
  const userProfile = UrlFetchApp.fetch(url,{
    'headers': {
      'Authorization' :  'Bearer ' + LINE_ACCESS_TOKEN,
    },
  })
  return JSON.parse(userProfile).displayName;  
}

function getLineBlob(p, lineEvent){
//添付されたファイルのBLOBデータを取得する
  const LINE_ACCESS_TOKEN = p.LINE_ACCESS_TOKEN;
  const messageId = lineEvent.messageId;
  const lineFileUrl = "https://api.line.me/v2/bot/message/" + messageId + "/content/";
  const lineFileResponse = UrlFetchApp.fetch(lineFileUrl, {
    'headers': {
      'Content-Type': 'application/json; charaset=UTF-8',
      'Authorization': 'Bearer ' + LINE_ACCESS_TOKEN
    },
    'method': 'get'
  })
  .getBlob();
  return lineFileResponse;
}

function getLineLocation(lineEvent) {
  var location = {};
  const events = lineEvent.events;
  location.title = events.message.title;
  location.address = events.message.address;
  location.latitude = events.message.latitude;
  location.longitude = events.message.longitude;
  location.url = 'https://www.google.com/maps/@'+location.latitude+','+location.longitude+',17z?hl=ja&authuser=0';
  return location;
}
