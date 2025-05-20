/*import { Router } from "express";
import db from "../config/db.js";

const router = Router();

async function testQuery() {
  try {
    const [rows] = await db.query('SELECT 1');  
    console.log('✅ Query succeeded:', rows);  
  } catch (err) {
    console.error('❌ Query failed:', err);
    process.exit(1);
  }
}

router.route('/')
  .get(async (req, res) => {
    res.status(200).json({ msg: "hi" });
  })

router.route('/mariam')
  .get(async (req, res) => {
    res.status(200).json({ msg: "hi mariam" });
  })

router.route('/:userId/books/:bookId')
  .get(async (req, res) => {
    res.status(200).send(req.params)
})

router.route('/search')
  .get(async (req, res) => {
    const user = req.query.user
    const value = req.query.value
    res.status(200).send({user, value})
  })
  .post(async (req, res) => {
    const user = req.body.user
    const value = req.body.value + "$"
    res.status(200).send({user, value})
  })

router.route('/sql')
  .get(testQuery)

export default router;
*/