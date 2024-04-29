const faker = require("faker");
const fs = require("fs-extra");
const stream = fs.createWriteStream("./data.json");
const categories = ["leather", "laptop", "rainProof"];
const mainCategoriesArr = [
  "casual",
  "professional",
  "travel",
  "sports",
  "school",
  "lunchBag",
];
const colors = [
  "red",
  "blue",
  "green",
  "yellow",
  "gray",
  "black",
  "orange",
  "rust",
  "brown",
];
const sizes = ["S", "M", "L", "XL"];
const brands = [
  "summerSale",
  "endOfSeassionSale",
  "bigBillonDay",
  "diwaliSale",
];

const generateRandomData = () => {
  // const gender = faker.random.arrayElement(["male", "female", "kids"]);
  const title = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const price = faker.random.number({ min: 100, max: 8000 });
  const discountPercentage = faker.random.number({ min: 0, max: 70 });
  const rating = faker.random.number({ min: 0, max: 5 });
  const availableStock = faker.random.number({ min: 1, max: 500 });
  const brand = faker.random.arrayElement(brands);
  const category = faker.random.arrayElements(categories, 2);
  const color = faker.random.arrayElements(colors);
  const mainCategorie = faker.random.arrayElement(mainCategoriesArr);
  const size = faker.random.arrayElements(sizes);

  return {
    // gender,
    title,
    description,
    price,
    discountPercentage,
    availableStock,
    brand,
    category,
    mainCategorie,
    color,
    size,
    rating,
  };
};

const generateDataSet = (num) => {
  const dataSet = [];
  for (let i = 0; i < num; i++) {
    dataSet.push(generateRandomData());
  }
  return dataSet;
};

const watchesData = generateDataSet(300);

stream.once("open", (fd) => {
  stream.write(JSON.stringify(watchesData), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Data has been written to data.json");
    }
    stream.end();
  });
});


// "images": [
//   "https://urbantribe.in/cdn/shop/products/05_178c1433-ca5e-4cdf-a348-77d0a1048fe5_600x.jpg?v=1669106301"
// ],
// "thumbnail": "https://urbantribe.in/cdn/shop/products/Fitpackneo_3_600x.jpg?v=1618984413"
