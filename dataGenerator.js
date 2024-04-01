const faker = require("faker");
const fs = require("fs-extra");

const categories = [
  "haldi",
  "mehndi",
  "silk",
  "cotton",
  "banarasi",
  "kanjivaram",
  "ajarakh",
];
const mainCategoriesArr = ["Wedding", "Casual", "Simple", "Luxury"];
const colors = ["red", "yellow", "green", "blue", "black", "white"];
// const sizes = ["36mm", "40mm", "42mm"];

const generateRandomData = () => {
  // const gender = faker.random.arrayElement(["male", "female", "kids"]);
  const title = faker.commerce.productName();
  const description = faker.lorem.sentence();
  const price = faker.random.number({ min: 500, max: 10000 });
  const discountPercentage = faker.random.number({ min: 0, max: 50 });
  const stock = faker.random.number({ min: 1, max: 100 });
  const brand = faker.random.arrayElement(brandArr);
  const category = faker.random.arrayElements(categories);
  const color = faker.random.arrayElements(colors);
  const mainCategorie = faker.random.arrayElement(mainCategoriesArr);
  // const size = faker.random.arrayElement(sizes);

  return {
    // gender,
    title,
    description,
    price,
    discountPercentage,
    stock,
    // brand,
    category,
    mainCategorie,
    color,
    // size,
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
fs.writeJson("./data.json", watchesData, (err) => {
  if (err) return console.error(err);
  console.log("Data has been written to data.json");
});

console.log(watchesData);
