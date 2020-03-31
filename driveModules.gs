function saveFile(fileBlob, fileName, folderId) {
  //blobソースをGoogle Driveに保存しそのファイルオブジェクトを返す
  const myfolder = DriveApp.getFolderById(folderId);
  var file = myfolder.createFile(fileBlob);
  file.setName(fileName);
  return file;
}
