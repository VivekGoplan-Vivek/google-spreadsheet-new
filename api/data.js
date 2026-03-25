import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {

  const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

  await doc.useServiceAccountAuth(
    JSON.parse(process.env.GOOGLE_CREDENTIALS)
  );

  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[0];

  const rows = await sheet.getRows();

  res.status(200).json(rows);

}
