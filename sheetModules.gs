function writeData(SHEET_ID, dataArray) {
  //一番最後の行にdataArrayの値を記入する。
  //setUpSeet()を用いてシートのフォーマットを行う。空のシートを指定するのが望ましい。
  const sheet = SpreadsheetApp.openById(SHEET_ID).getActiveSheet();
  setUpSheet(sheet);
  const rowNum = sheet.getRange("B1").getValue();
  const colNum =dataArray.length;  
  var range = sheet.getRange(rowNum, 1, 1,colNum);
  var array = [dataArray];
  range.setValues(array);
}

function setUpSheet(sheet) {
  const A1_VALUE = 'Next row number';
  const SHEET_NAME = 'log';
  if ((sheet.getRange("A1").getValue() !== A1_VALUE) || (sheet.getSheetName() !== SHEET_NAME)) {
    var A1 = sheet.getRange('A1');
    A1.setValue(A1_VALUE);
    var B1 = sheet.getRange('B1');
    B1.setFormula('=COUNTA(A:A)+1');
    sheet.setName(SHEET_NAME);
  };
}
