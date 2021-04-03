import ToDo from './../models/todomodels';

/**
 * Returns a promise for search results.
 *
 * @param search param.
 */
const search = (param) => {
    const promise = ToDo.find(param).exec();
    return promise;
};

/**
 * Saves the new todo object.
 *
 * @param todo
 */

/**
 * Returns the order object by id.
 *
 * @param id
 */
const get = (id) => {
        const promise = ToDo.findById(id).exec();
        return promise;
    }
    /**
     * creates a new Todo
     * @param  newTodo 
     */

const create = (newTodo) => {
        const todo = new ToDo(newTodo);
        const promise = todo.save();
        return promise;
    }
    /**
     * Updates an existing todo item.
     *
     * @param updatedTodo
     */
const update = (id, updatedTodo) => {
        const promise = ToDo.findByIdAndUpdate({ _id: id },
            updatedTodo, { new: true }
        ).exec();
        return promise;
    }
    /**
     * Deletes an existing order.
     *
     * @param todoId
     */
const remove = (id) => {
    const promise = ToDo.remove({ _id: id }).exec();
    return promise;
}

export default {
    search: search,
    get: get,
    create: create,
    update: update,
    remove: remove
}