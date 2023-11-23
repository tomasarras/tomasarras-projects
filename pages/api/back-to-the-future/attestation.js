
export default async function handler(req, res) {
  let { data } = JSON.parse(req.body);
  if (process.env.PASSWORD == data) {
    const { client } = require('../../../db');
    const db = client();
    const [bttf] = await db.any('SELECT * from bttf');
    const attestationDuration = parseInt(process.env.ATTESTATION_DURATION);
    const newDestination = new Date(bttf.destination.getTime() + attestationDuration);
    db.tx(t => {
      const q1 = t.none('UPDATE bttf SET last_time = $1, destination = $2', [new Date(), newDestination]);
      return t.batch([q1]);
    });
    res.status(200).json({ status: "accepted" });
  } else {
    res.status(200).json({ status: "dennied" });
  }
}
