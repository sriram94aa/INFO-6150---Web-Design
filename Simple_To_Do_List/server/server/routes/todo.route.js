import express from 'express';
import todoController from './../controllers/todo.controller';

// Express Frameworl
const expressRouter = express.Router();


// Search & Create Operation
expressRouter.route('/todolist')
    .get(todoController.index)
    .post(todoController.create);

// Retrieve update & delete command
expressRouter.route('/todolist/:id')
    .get(todoController.get)
    .put(todoController.update)
    .delete(todoController.remove);

export default expressRouter;