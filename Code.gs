/***********************
 * KONFIGURATION
 ***********************/
const SHEET_ID = "1a6uMojo3gVU1YF_Jwta7Kj9RUmBqx04tcgB5dYMYKAc";
const SHEET_NAME = "Sheet1";

/***********************
 * API: Nachricht speichern
 * Wird von GitHub Pages per fetch() aufgerufen
 ***********************/
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    if (!data.email || !data.message || !data.send_at) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: "Fehlende Felder" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp
      .openById(SHEET_ID)
      .getSheetByName(SHEET_NAME);

    sheet.appendRow([
      data.email,
      data.message,
      data.send_at,
      false,
      new Date() // created_at (optional)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/***********************
 * CRON: geplante Mails versenden
 * Wird per Zeit-Trigger (jede Minute) ausgeführt
 ***********************/
function sendScheduledEmails() {

  const ss = SpreadsheetApp.openById(SHEET_ID);
  console.log("Spreadsheet-Name: " + ss.getName());
  console.log("Alle Sheets: " + ss.getSheets().map(s => s.getName()).join(", "));
  const sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    console.error(`Sheet mit Name "${SHEET_NAME}" nicht gefunden!`);
    return;
  }

  const rows = sheet.getDataRange().getValues();
  console.log(`Insgesamt Zeilen: ${rows.length}`);

  for (let i = 1; i < rows.length; i++) {
    let [email, message, sendAt, sent] = rows[i];
    sent = sent === true;
    const sendDate = new Date(sendAt);

    console.log(`Zeile ${i + 1}: email=${email}, message=${message}, sendAt=${sendAt}, sent=${sent}`);

    if (sent) {
      console.log(`Zeile ${i + 1} übersprungen: Bereits gesendet`);
      continue;
    }
    if (!email || !message) {
      console.log(`Zeile ${i + 1} übersprungen: Fehlende Email oder Nachricht`);
      continue;
    }
    if (isNaN(sendDate.getTime())) {
      console.log(`Zeile ${i + 1} übersprungen: Ungültiges Datum`);
      continue;
    }

    const now = new Date();
    if (sendDate <= now) {
      try {
        GmailApp.sendEmail(email, "Nachricht an dein Zukunfts-Ich", message);
        sheet.getRange(i + 1, 4).setValue(true);
        console.log(`Mail gesendet an: ${email}`);
      } catch (e) {
        console.log(`Fehler beim Senden an: ${email} – ${e.message}`);
      }
    } else {
      console.log(`Zeile ${i + 1}: Mail noch nicht fällig (sendAt=${sendAt})`);
    }
  }
}
