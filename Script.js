// Gunakan spreadsheet yang sudah kamu share
const publicSpreadsheetURL = 'https://docs.google.com/spreadsheets/d/1Wb0862TiSBnUfWjWG-j3RJ77eOTSZrZadLjYxic1pnw/pubhtml';

function showData(data) {
  const tbody = document.getElementById("dataBody");
  tbody.innerHTML = "";

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.ID || ''}</td>
      <td>${row.NAMA || ''}</td>
      <td>${row.INSTANSI || ''}</td>
      <td>${row.KEPERLUAN || ''}</td>
      <td>${row.WAKTU || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: publicSpreadsheetURL,
    callback: showData,
    simpleSheet: true
  });
});
