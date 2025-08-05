function doGet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const output = [];

  for (let i = 1; i < data.length; i++) {
    let row = {};
    for (let j = 0; j < headers.length; j++) {
      row[headers[j]] = data[i][j];
    }
    output.push(row);
  }

  return ContentService.createTextOutput(JSON.stringify(output))
                       .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  const id = new Date().getTime(); // ID unik
  const nama = data.nama || '';
  const instansi = data.instansi || '';
  const keperluan = data.keperluan || '';
  const waktu = new Date();

  sheet.appendRow([id, nama, instansi, keperluan, waktu]);

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Data berhasil disimpan',
    id: id
  })).setMimeType(ContentService.MimeType.JSON);
}
