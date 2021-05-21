const Songs = require("./songsModel");
const router = require("express").Router();

router.get("/", async (req, res) => {
	res.json(await Songs.getAll());
});

router.post("/", async (req, res) => {
	res.json(await Songs.create(req.body));
});

router.delete("/:id", async (req, res) => {
	res.json(await Songs.remove(req.params.id));
});

module.exports = router;
