import TodoRouter from './todo.route';

export default (app) => {
    app.use('/', TodoRouter);
};