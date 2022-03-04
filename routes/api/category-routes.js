const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  //find all categories
  Category.findAll()
  .then(dbCategoryData => res.status(200).json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    console.log(req.params.id);
    const dbCategoryData = await Product.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    );
    if(!dbCategoryData){
      res.status(404).json({message: 'no categories are found' });
      return;
    }
    res.status(200).json(dbCategoryData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    game_title: req.body.category_name
  })
  .then(dbCategoryData => {
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Product.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({ message: 'A category with this id is not found'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.delete(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then(dbCategoryData => {
    if(!dbCategoryData){
      res.status(404).json({ message: 'A category with this id is not found'});
      return;
    }
    res.json(dbCategoryData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

module.exports = router;
