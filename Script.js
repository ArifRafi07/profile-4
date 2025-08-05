const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Wb0862TiSBnUfWjWG-j3RJ77eOTSZrZadLjYxic1pnw/pubhtml';

function showInfo(data, tabletop) {
  const tbody = document.getElementById('dataBody');
  tbody.innerHTML = '';
  data.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.ID || ''}</td>
      <td>${item.NAMA || ''}</td>
      <td>${item.INSTANSI || ''}</td>
      <td>${item.KEPERLUAN || ''}</td>
      <td>${item.WAKTU || ''}</td>
    `;
    tbody.appendChild(tr);
  });
}

window.addEventListener('DOMContentLoaded', () => {
  Tabletop.init({
    key: publicSpreadsheetUrl,
    callback: showInfo,
    simpleSheet: true
  });
});
