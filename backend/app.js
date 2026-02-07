const express = require('express')
const app = express()
const port = 3000

////// FEを壊すかもしれないBEの挙動を再現しています //////


const products = [
    { id: 1, name: "apple" },
    null,
    { id: "x", name: 123 }
];

app.use(express.json());

app.get("/products", (req, res) => {
    const r = Math.random()

    if (r < 0.15) {
        return res.status(200).json({
            items: "not array",
            total: null
        })
    }

    if (r < 0.3) {
        return res.status(500).json({
            items: products,
            message: "temporary error"
        })
    }

    if (r < 0.45) {
        return res.status(200).json({ items: products })
    }

    if (r < 0.6) {
        return res.status(400).json(products)
    }

    return res.status(200).json(products)
})

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
    // 3秒間情報取得を遅延させる
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.send(products[id])
})

app.post("/products", async (req, res) => {
    const product = req.body;
    products.push(product);
    // 2秒間情報取得を遅延させる
    await new Promise(resolve => setTimeout(resolve, 2000));
    return res.send(products);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
