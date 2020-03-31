function createDocFromImage(imageBlob, name) {
  //Drive APIを有効にしておく。
  //画像とOCRで読み取ったテキストの入ったGoogle Documentファイルを作成する。
  const meta = {
    title: name,
    mimeType: 'image/png'
  };
  const option = {
    ocr: true
  }
  const file = Drive.Files.insert(meta, imageBlob, option);
  return file;
} 
 
function getTextFromImage(imageBlob) {
  //createDocFromImageで作ったDocumentファイルからテキストを読み込んだ上でDocumentファイルをゴミ箱に移動する。
  const file = createDocFromImage(imageBlob, 'image');
  const doc = DocumentApp.openByUrl(file.embedLink);
  const text = doc.getBody().getText();
  const docId = file.getId();
  DriveApp.getFileById(docId).setTrashed(true);
  return text;
}
