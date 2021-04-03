import todoService from './../services/todo.service';
//CRUD Operations
const index = (request, response) => {
    todoService.search({})
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};
// Fetch All To Do Items
const get = (request, response) => {
    const id = request.params.id;
    todoService.get(id)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};
// Add All To Do Items
const create = (request, response) => {
    const newTodo = Object.assign({}, request.body);
    todoService.create(newTodo)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};
//Update a todo Item
const update = (request, response) => {
    const id = request.params.id;
    const updateTodo = Object.assign({}, request.body);
    todoService.update(id, updateTodo)
        .then((todo) => {
            response.status(200);
            response.json(todo);
        })
        .catch(handleError(response));
};
// Delete a todo Item
const remove = (request, response) => {
    const id = request.params.id;
    todoService.remove(id)
        .then((todo) => {
            response.status(200);
            response.json({
                message: "Deleted Successfully!"
            });
        })
        .catch(handleError(response));
};
//Handling Error
const handleError = (response) => {
    return (error) => {
        response.status(500);
        response.json({
            message: error.message
        })
    };
}

export default {
    index: index,
    get: get,
    create: create,
    update: update,
    remove: remove
}