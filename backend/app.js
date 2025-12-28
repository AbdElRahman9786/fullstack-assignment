const express = require('express');
const app = express();
const dotenv = require('dotenv')
const cors=require('cors');
const loginRouter=require('./routes/user.route');
const taskRouter=require('./routes/task.route');
const { sequelize, User, Task } = require('./modules');
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/',loginRouter);
app.use('/tasks',taskRouter);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');
        
        // Sync tables
        await sequelize.sync();
        console.log('All tables synced successfully');
    } catch (err) {
        console.log('Error: ' + err);
    }
})();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});