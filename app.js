const express = require("express");
const app = express();
const port = 3000;

// Подключаем маршруты
const usersRouter = require("./routes/users");
app.use("/users", usersRouter);

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

// Указываем, что будем использовать EJS
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
  res.render("index", { title: "Главная страница", name: "Vlad" });
});

app.get("/test-users", (req, res) => {
  const users = ["Alice", "Bob", "Charlie"];
  res.render("test-users", { users });
});

app.get("/test-hello", (req, res) => {
  const name = req.query.name || "Guest";
  res.render("test-hello", { title: "Hello Page", name });
});



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
