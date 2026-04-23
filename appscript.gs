const SHEET_ID = 'PUT_YOUR_SHEET_ID_HERE';
const SHEET_NAME = 'Sheet1';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(e.postData.contents || '{}');
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    // Build header map from first row (case/space-insensitive)
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const col = {};
    headers.forEach((h, i) => { col[String(h).trim().toLowerCase()] = i + 1; });

    const row = new Array(headers.length).fill('');
    const set = (name, value) => {
      const c = col[name];
      if (c) row[c - 1] = (value === undefined || value === null) ? '' : value;
    };

    set('datetimestamp', data.datetimestamp || '');
    set('set', data.set || '');
    set('q1', data.q1 || '');
    set('q2', data.q2 || '');
    set('q3', data.q3 || '');
    set('q4', data.q4 || '');
    set('q5', data.q5 || '');
    set('score', data.score);

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
