// // Only change code above this line
// function urlSlug(title) {
//   return title.toLowerCase().trim().split(/\s+/).join("-");
// }

// urlSlug(" Winter Is  Coming");

// console.log(urlSlug(" Winter Is  Coming"));

//process.env.MESSAGE_TYPE = "uppercase";

const message = "Hello json";

app.use((req, res, next) => {
  if (process.env.MESSAGE_STYLE === "uppercase") {
    req.message = req.message.toUpperCase();
  }
  next();
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
  console.log(req.message);
});
