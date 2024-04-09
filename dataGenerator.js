const faker = require("faker");
const fs = require("fs-extra");
const stream = fs.createWriteStream("./data.json");
const categories = [
  "gift",
  "combo",
  "perfume",
  "deu",
  "attar",
  "mist",
  "bodyMess",
];
const mainCategoriesArr = ["premium", "budget", "luxury"];
// const colors = ["male", "unisex", "female"];
const sizes = ["100ml", "70mm", "50ml"];
// const brands= ["belavita"];

const generateRandomData = () => {
  const gender = faker.random.arrayElement(["male", "female", "kids"]);
  const title = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const price = faker.random.number({ min: 100, max: 10000 });
  const discountPercentage = faker.random.number({ min: 0, max: 50 });
  const stock = faker.random.number({ min: 1, max: 500 });
  //   const brand = faker.random.arrayElement(brandArr);
  const category = faker.random.arrayElements(categories, 2);
  // const color = faker.random.arrayElements(colors);
  const mainCategorie = faker.random.arrayElement(mainCategoriesArr);
  const size = faker.random.arrayElement(sizes);

  return {
    gender,
    title,
    description,
    price,
    discountPercentage,
    stock,
    // brand,
    category,
    mainCategorie,
    // color,
    size,
  };
};

const generateDataSet = (num) => {
  const dataSet = [];
  for (let i = 0; i < num; i++) {
    dataSet.push(generateRandomData());
  }
  return dataSet;
};

const watchesData = generateDataSet(100);

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
