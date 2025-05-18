import { Router } from "express";

const router = Router();

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
export default router;
