const express = require('express');

const mongoose = require('mongoose');

const app = express();

const PORT = process.env.PORT || 3001;


const cors = require('cors');

const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://crud:crud@cluster.hjmib.mongodb.net/Test-Case?retryWrites=true&w=majority", {
    useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName;
    const days = req.body.days;

    const food = new FoodModel({ foodName: foodName, daysSinceIAte: days });
    try {
        await food.save();
        res.send('insterted data');
    } catch (err) {

        console.log(err);

    }

});

app.get("/read", async (req, res) => {

    FoodModel.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.send(result);
    })

})


app.put('/update', async (req, res) => {

    const newfood = req.body.newfood;
    const id = req.body.id;

    try {
        await FoodModel.findById(id, (err, updatefood) => {
            updatefood.foodName = newfood;
            updatefood.save();
            res.send('update');
        });

    } catch (err) {

        console.log(err);

    }

});

app.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;

    await FoodModel.findByIdAndRemove(id).exec();
    res.send(deleted);
})


app.listen(PORT, console.log(`Server is starting at ${PORT}`));

