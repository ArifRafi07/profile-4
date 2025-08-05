// Fungsi READ (GET): getAll atau getOne?id=...
function doGet(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();
  const headers = data[0];

  if (e && e.parameter && e.parameter.action === 'getOne' && e.parameter.id) {
    const id = e.parameter.id;
    for (let i = 1; i < data.length; i++) {
      if (data[i][0].toString() === id) {
        let row = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = data[i][j];
        }
        return ContentService.createTextOutput(JSON.stringify(row))
                             .setMimeType(ContentService.MimeType.JSON);
      }
    }
    return ContentService.createTextOutput(JSON.stringify({ error: "Data tidak ditemukan" }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  // GET ALL
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

// Fungsi CREATE (POST): Tambah data
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  const id = new Date().getTime(); // ID unik berbasis waktu
  const nama = data.nama || '';
  const instansi = data.instansi || '';
  const keperluan = data.keperluan || '';
  const waktu = new Date(); // Waktu saat ini

  sheet.appendRow([id, nama, instansi, keperluan, waktu]);

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    message: 'Data berhasil ditambahkan',
    id: id
  })).setMimeType(ContentService.MimeType.JSON);
}

// Fungsi UPDATE (PUT): Perbarui data berdasarkan ID
function doPut(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);

  const id = data.id;
  const nama = data.nama;
  const instansi = data.instansi;
  const keperluan = data.keperluan;
  const waktu = new Date();

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0].toString() === id.toString()) {
      if (nama) sheet.getRange(i + 1, 2).setValue(nama);
      if (instansi) sheet.getRange(i + 1, 3).setValue(instansi);
      if (keperluan) sheet.getRange(i + 1, 4).setValue(keperluan);
      sheet.getRange(i + 1, 5).setValue(waktu);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data berhasil diperbarui',
        id: id
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Data dengan ID tersebut tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}

// Fungsi DELETE: Hapus data berdasarkan ID
function doDelete(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  const id = data.id;

  const rows = sheet.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0].toString() === id.toString()) {
      sheet.deleteRow(i + 1);
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Data berhasil dihapus',
        id: id
      })).setMimeType(ContentService.MimeType.JSON);
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: 'Data dengan ID tersebut tidak ditemukan'
  })).setMimeType(ContentService.MimeType.JSON);
}