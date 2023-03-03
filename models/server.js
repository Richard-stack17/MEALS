const express = require('express')
const cors = require('cors');
const { db } = require('../database/db');
const { userRouter } = require('../routes/user.routes');
const { mealRouter } = require('../routes/meal.routes');
const { orderRouter } = require('../routes/order.routes');
const { restaurantRouter } = require('../routes/restaurant.routes');
const globalErrorHandler = require('../controllers/error.controller');
const morgan = require('morgan');
const AppError = require('../utils/appError');
const initModel = require('./initmodel');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.paths = {
            user: '/api/v1/users',
            restaurant: '/api/v1/restaurants',
            meal: '/api/v1/meals',
            order: '/api/v1/orders',
        };
        this.database();
        this.middlewares(); //middlewares antes de las routes
        this.routes();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        
        if(process.env.NODE_ENV === 'development') {
            this.app.use(morgan('dev'));
        }
    }

    routes() {
        this.app.use(this.paths.user, userRouter);
        this.app.use(this.paths.restaurant, restaurantRouter);
        this.app.use(this.paths.meal, mealRouter);
        this.app.use(this.paths.order, orderRouter);

        this.app.all('*', (req,res,next) => {
            return next(new AppError(`Cant't find ${req.originalUrl} on this server!`), 404)
        });

        this.app.use(globalErrorHandler);
    }

    database() {
        db.authenticate()
            .then(() => console.log('Database authenticated '))
            .catch(error => console.log(error));

        initModel()
        
        db.sync()
            .then(() => console.log('Database synced!!!'))
            .catch(error => console.log(error));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Server running on port: ', this.port)
        })
    }
}

module.exports = Server;