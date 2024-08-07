const faker = require("faker");
const fs = require("fs-extra");
const stream = fs.createWriteStream("./data.json");

const categories = [
  "logSleevs",
  "chineesCollor",
  "roundNeck",
  "sleevLess",
  "offSolder",
];
const mainCategorysArr = ["tShirt", "shirt", "jeans", "trouser"];
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
const titles = [
  "Cotton cargo",
  "New Cotton cargo",
  "Hip hop Tee",
  "Check shirt",
  "Pink pong shirt",
  "Doller tee",
  "villen tee",
];
const sizes = ["x", "s", "xl", "xs", "2xl", "3xl"];
// const brands = ["summerSale", "newArrivals", "diwaliSale"];

const generateRandomData = () => {
  const gender = faker.random.arrayElement(["male", "female", "kids"]);
  // const title = faker.commerce.productName();
  const title = faker.random.arrayElement(titles);
  const description = faker.lorem.sentence();
  const price = faker.random.number({ min: 100, max: 15000 });
  const discountPercentage = faker.random.number({ min: 0, max: 50 });
  const rating = faker.random.number({ min: 0, max: 5 });
  const availableStock = faker.random.number({ min: 10, max: 100 });
  // const brand = faker.random.arrayElement(brands);
  const category = faker.random.arrayElements(categories, 2);
  const color = faker.random.arrayElements(colors);
  const mainCategory = faker.random.arrayElement(mainCategorysArr);
  const size = faker.random.arrayElements(sizes);

  return {
    gender,
    title,
    description,
    price,
    discountPercentage,
    availableStock,
    // brand,
    category,
    mainCategory,
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
