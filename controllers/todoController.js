exports.sayHello = (req, res) => {
  res.status(200).json({
    status: "success",
    data: "Hello",
  });
};
