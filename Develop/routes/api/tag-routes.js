const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
    console.log(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    res.status(200).json(tagData)

    if(!tagData) {
      res.status(404).json({message: 'no tag with this id found.'})
    }
  } catch(err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name
    });
    res.status(200).json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await (req.body, {
      where: {
        id: req.params.id
      }
    });

    if(!tagData[0]) {
      res.status(404).json({message: 'no tag with this id found.'});
      return;
    }
  } catch(err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy(req.params.id, {
      where: {
        id: req.params.id
      }
    });

    if(!tagData) {
      res.status(404).json({message: 'no tag with this id found.'})
    }
    res.json(tagData)
  } catch(err) {
    res.status(500).json(err)
  }
});

module.exports = router;
