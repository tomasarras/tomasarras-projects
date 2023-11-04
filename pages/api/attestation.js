
export default function handler(req, res) {
  req.body.password
  res.status(200).json({ password: req.body.password })
}
