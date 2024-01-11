import { model } from "../models";

export const productByRange = async (req, res) => {
  let val = req?.body;

  let filter = {};
  if (val?.allow?.length > 0) {
    let arr = val.allow.map((e) => {
      return { gender: e };
    });
    filter = { $or: arr };
  }
  if (val?.category?.length > 0) {
    let catObj = val?.category?.map?.((e) => {
      return { category: { $in: [e] } };
    });
    filter = { ...filter, $and: catObj };
  }
  try {
    let data = await model.Product.find(
      filter,
      { gender: 1, category: 1 }
      //   {
      //     $and: [{ price: { $gt: val.gt } }, { price: { $lt: val.lt } }],
      //   },
      //   { price: 1, title: 1 }
    );
    res.send({ status: 200, data });
  } catch (error) {
    res.send({ status: 400, message: error.message });
  }
};
export const getAllPaginate = async (req, res) => {
  const filter = req?.params;
  const { limit, page } = req.query;
  const options = limit &&
    page && {
      page,
      limit,
    };

  console.log("-----------  options----------->", options);
  if (filter.color) {
    filter = {
      ...filter,
      color: {
        $in: color,
      },
    };
  }

  try {
    let data = await model.Product.paginate(filter, options);
    console.log("-----------  data----------->", data);

    res.send({ status: 200, data: data?.docs, count: data?.totalDocs });
  } catch (error) {
    res.send({ status: 400, message: error.message });
  }
};

export const getAll = async (req, res) => {
  const filterQuery = req?.query;
  console.log("-----------  filterQuery----------->", filterQuery);
  let filtarableFeilds = [
    "color",
    "size",
    "price",
    "category",
    "rating",
    "discountPercentage",
    "search",
  ];
  let filter = {
    ...(filterQuery?.gender && { gender: filterQuery?.gender }),
    ...(filterQuery?.brand && { brand: filterQuery?.brand }),
    ...(filterQuery?.isAvailable && { isAvailable: filterQuery?.isAvailable }),
  };

  filtarableFeilds.forEach((field) => {
    if (filterQuery[field]) {
      switch (field) {
        case "search":
          filter["$or"] = [
            { title: { $regex: filterQuery[field] } },
            { description: { $regex: filterQuery[field] } },
          ];
          break;
        case "color":
          console.log("color", filter);

          filter[field] = filterQuery?.[field]?.length > 0 && {
            $in: filterQuery[field],
          };
          break;
        case "category":
          console.log("category", filter);
          filter[field] = filterQuery?.[field]?.length > 0 && {
            $in: filterQuery[field],
          };
          break;
        case "size":
          console.log("size", filter);
          filter[field] = filterQuery?.[field]?.length > 0 && {
            $in: filterQuery[field],
          };
          break;
        case "price":
          console.log("price", filter);
          filter[field] = {
            $lte: parseInt(filterQuery[field].lt),
            $gte: parseInt(filterQuery[field].gt),
          };
          break;
        case "discountPercentage":
          console.log("discountPercentage", filter);
          filter[field] = {
            $lte: parseInt(filterQuery[field].lt),
            $gte: parseInt(filterQuery[field].gt),
          };
          break;
        case "rating":
          console.log("rating", filter);
          if (filterQuery.rating) {
            const minRating = parseFloat(filterQuery.rating);
            filter["$expr"] = {
              $gte: [{ $divide: ["$rating", "$totalRaters"] }, minRating],
            };
          }
          break;
      }
    }
  });

  console.log("filter =====>", filter);

  let aggrigation = [
    { $match: filter },
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        data: { $push: "$$ROOT" },
      },
    },
  ];
  try {
    let [response] = await model.Product.aggregate(aggrigation);
    res.send({
      status: 200,
      count: response?.count || 0,
      data: response?.data || [],
    });
  } catch (error) {
    res.send({ status: 400, message: error.message });
  }
};

export const createProduct = (req, res) => {
  model.Product.create(req?.body)
    .then((resData) => {
      console.log("resData", resData);
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const getById = (req, res) => {
  model.Product.findById(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const updateProduct = (req, res) => {
  model.Product.findByIdAndUpdate(req?.params?.id, req?.body, { new: true })
    .then((resData) => {
      res.send({ status: 200, data: resData });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};

export const deleteProduct = (req, res) => {
  console.log("req?.params?.id", req?.params?.id);
  model.Product.findByIdAndRemove(req?.params?.id)
    .then((resData) => {
      res.send({ status: 200, message: "Delete successFully...!" });
    })
    .catch((err) => {
      res.send({ status: 400, message: err.message });
    });
};
