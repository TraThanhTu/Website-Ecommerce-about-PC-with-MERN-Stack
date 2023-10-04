import bcrypt from 'bcrypt';



const data = {

  users: [
    {
      name: 'NguyenVanTy',
      email: 'nguyenvanty@example.com',
      password: bcrypt.hashSync('nguyenvanty', 10),
      isAdmin: true,
    },
    {
      name: 'TraThanhTu',
      email: 'trathanhtu@example.com',
      password: bcrypt.hashSync('trathanhtu', 10),
      isAdmin: true,
    },
    {
      name: 'person1',
      email: 'person1@example.com',
      password: bcrypt.hashSync('person1', 10),
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
      // _id: '3',
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
      // _id: '4',
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
