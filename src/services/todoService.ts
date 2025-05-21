import { Todo } from '../models/Todo'

export const createTodo = async (data: any, userId: string) => {
    return Todo.create({ ...data, userId })

}

export const getTodos = async (userId: string) => {
    return Todo.find({ userId })
}

export const getTodoById = async (id: string, userId: string) => {
    return Todo.findOne({ _id: id, userId })
}

export const updateTodo = async (id: string, data: any) => {
  return Todo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTodo = async (id: string) => {
  return Todo.findByIdAndDelete(id);
};