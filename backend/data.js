import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Admin Tea',
      email: '2051150193@ut.edu.vn',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Ty',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'PC1',
      slug: 'PC1',
      category: '250',
      image: '/images/pc1.jpg',
      price: 120,
      countInStock: 10,
      brand: 'AMD',
      rating: 4.5,
      numReviews: 10,
      description: 'high',
    },
    {
      // _id: '2',
      name: 'PC2',
      slug: 'PC2',
      category: '350',
      image: '/images/pc2.jpg',
      price: 120,
      countInStock: 0,
      brand: 'AMD',
      rating: 3,
      numReviews: 10,
      description: 'high',
    },
    {
      //_id: '3',
      name: 'PC3',
      slug: 'PC3',
      category: '450',
      image: '/images/pc3.jpg',
      price: 120,
      countInStock: 10,
      brand: 'AMD',
      rating: 4.5,
      numReviews: 10,
      description: 'high',
    },
    {
      //_id: '4',
      name: 'PC4',
      slug: 'PC4',
      category: '250',
      image: '/images/pc4.jpg',
      price: 120,
      countInStock: 10,
      brand: 'AMD',
      rating: 4.5,
      numReviews: 10,
      description: 'high',
    },
  ],
};
export default data;
