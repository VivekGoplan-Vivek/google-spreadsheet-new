import { GoogleSpreadsheet } from 'google-spreadsheet';

export default async function handler(req, res) {

if(req.method !== 'POST'){
return res.status(405).send("Method not allowed");
}

const doc = new GoogleSpreadsheet(process.env.SHEET_ID);

await doc.useServiceAccountAuth(
JSON.parse(process.env.GOOGLE_CREDENTIALS)
);

await doc.loadInfo();

const sheet = doc.sheetsByIndex[0];

await sheet.addRow(req.body);

res.status(200).json("Row added");

}
