import express, { query } from 'express';
import Product from '../models/productModel.js';
import expressAsyncHandler from 'express-async-handler';

const productRouter = express.Router();

productRouter.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

productRouter.get('/search', expressAsyncHandler(async (req, res) => {
  const { query } = req;
  const PAGE_SIZE = 10;
  const pageSize = query.pageSize || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || '';
  const name = query.name || '';
  const brand = query.brand || '';
  const price = query.price || '';
  const rating = query.rating || '';
  const order = query.order || '';
  const searchQuery = query.query || '';
  const queryFilter =
    searchQuery && searchQuery !== 'all'
      ? {
        $or: [
          { name: { $regex: searchQuery, $options: 'i' } },
          {
            price: isNaN(searchQuery) ? undefined : Number(searchQuery),
          },
          { brand: { $regex: searchQuery, $options: 'i' } },
          {
            rating: isNaN(searchQuery) ? undefined : Number(searchQuery),
          },
        ],
      }
      : {};
  const nameFilter =
    name && name != 'all'
      ? {
        name
      }
      : {};
  const brandFilter =
    brand && brand !== 'all'
      ? {
        brand
      }
      : {};
  const categoryFilter =
    category && category !== 'all'
      ? {
        category
      }
      : {};

  const ratingFilter =
    rating && rating !== 'all'
      ? {
        rating: {
          $gte: Number(rating)
        }
      }
      : {};

  const priceFiler =
    price && price !== 'all'
      ? {
        price: {
          $gte: Number(price.split('-')[0]),
          $lte: Number(price.split('-')[1]),
        }
      }
      : {};


  const sortOrder =
    order === 'featured'
      ? { featured: - 1 }
      : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
          ? { price: -1 }
          : order === 'toprated'
            ? { rating: -1 }
            : order === 'newest'
              ? { createdAt: -1 }
              : { _id: -1 };
  const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFiler,
    ...ratingFilter,
    ...brandFilter,
    ...nameFilter,
  })
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFiler,
    ...ratingFilter,
    ...brandFilter,
    ...nameFilter,
  });
  res.send({
    products,
    countProducts,
    page,
    pages: Math.ceil(countProducts / pageSize),
  });
})
);


productRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct('category');
    res.send(categories);
  })
);
productRouter.get(
  '/names',
  expressAsyncHandler(async (req, res) => {
    const names = await Product.find().distinct('name');
    res.send(names);
  })
);

productRouter.get(
  '/brands',
  expressAsyncHandler(async (req, res) => {
    const brands = await Product.find().distinct('brand');
    res.send(brands);
  })
);

productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found ' });
  }
});

productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found ' });
  }
});

export default productRouter;