// seed.js
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const { Gender, Category, SubCategory, Product } = require('./Models/product');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://0.0.0.0:27017/database', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');

    // Clear existing data
    await Gender.deleteMany({});
    await Category.deleteMany({});
    await SubCategory.deleteMany({});
    await Product.deleteMany({});

    // Seed Gender collection
    const genders = ['Male', 'Female', 'Unisex'];
    for (let genderName of genders) {
      await new Gender({ name: genderName }).save();
    }

    // Seed Category collection
    const genderRecords = await Gender.find();
    for (let i = 0; i < 5; i++) {
      const randomGender = genderRecords[Math.floor(Math.random() * genderRecords.length)];
      await new Category({
        name: faker.commerce.department(),
        gender: randomGender._id
      }).save();
    }

    // Seed SubCategory collection
    const categoryRecords = await Category.find();
    for (let i = 0; i < 10; i++) {
      const randomCategory = categoryRecords[Math.floor(Math.random() * categoryRecords.length)];
      await new SubCategory({
        name: faker.commerce.productAdjective(),
        category: randomCategory._id
      }).save();
    }

    // Seed Product collection
    const subCategoryRecords = await SubCategory.find();
    for (let i = 0; i < 20; i++) {
      const randomSubCategory = subCategoryRecords[Math.floor(Math.random() * subCategoryRecords.length)];
      await new Product({
        name: faker.commerce.productName(),
        description: faker.lorem.sentence(),
        price: parseFloat(faker.commerce.price()), // Ensure price is a float
        sku: faker.string.uuid(), // Use faker.string.uuid() for UUIDs
        stock_quantity: faker.number.int({ min: 1, max: 100 }), // Use faker.number.int() for integers
        sub_category: randomSubCategory._id,
        image_url: faker.image.url(),
        brand: faker.company.name(), // Updated to faker.company.name()
        // color: faker.commerce.color(),
        size: faker.helpers.arrayElement(['S', 'M', 'L', 'XL']), // Use faker.helpers.arrayElement()
        // material: faker.commerce.material()
      }).save();
    }

    console.log('Database seeded!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    mongoose.disconnect();
  }
};

seedDatabase();
