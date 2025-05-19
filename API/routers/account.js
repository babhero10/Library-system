import { Router } from "express";

const router = Router;

router.route('/login')
  .post(async (req, res) => {
    eamil, password = req.body

    if (!email || !password) {
      res.status(400).send({error: "Missing information"})
    }

    // TODO: Login logic.

    // Create a session.
    req.session.name = ""
    req.session.role = ""
    res.status(200).send()
  })
