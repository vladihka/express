const express = require("express");
const app = express();
const port = 3000;

// Middleware — функция, которая выполняется при каждом запросе
app.use((req, res, next) => {
  console.log(`Запрос: ${req.method} ${req.url}`);
  next(); // передаёт управление дальше
});

app.use((req, res, next) => {
    console.log("Время:", new Date().toISOString());
    next();
});

app.use("/admin",(req, res, next) => {
    const key = req.query.key;
    if (key === "secret") {
        next(); // ключ верный, продолжаем обработку
    } else {
        res.status(403).send("Forbidden: Invalid key");
    }
})

// Подключаем статические файлы из папки public
// Можно задать префикс URL
app.use("/static", express.static("public"));


app.get("/", (req, res) => {
  res.send("Home page");
});

app.get("/admin", (req, res) => {
  res.send("Admin page");
});

app.get("/about", (req, res) => {
  res.send("About page");
});

app.get("/contact", (req, res) => {
  res.send("Contact page");
});

app.get("/users", (req, res) => {
  res.send("GET users");
});

app.post("/users", (req, res) => {
  res.send("POST users");
});

app.get("/users/:id", (req, res) => {
  res.send(`User ID: ${req.params.id}`);
});

app.get("/search", (req, res) => {
  res.send(`Query: ${req.query.q}`);
});

app.get("/product/:name", (req, res) => {
  res.send(`Product Name: ${req.params.name}`);
});

app.get("/hello", (req, res) => {
  const name = req.query.name || "Guest";
  res.send(`Hello, ${name}!`);
});

app.get("/error", (req, res) => {
  throw new Error("Тестовая ошибка");
});


// 404 middleware
app.use((req, res) => {
  res.status(404).send("Страница не найдена");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Что-то пошло не так!");
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
