import * as jwt from 'jsonwebtoken';
import * as express from 'express';
import middleware from '../middleware';
import db from '../db';

const {authenticateJwt, SECRET} = middleware;
const {TodoModel} = db;

const router = express.Router();

interface Todo {
    title : string;
    description : string;
    done : boolean;
    userId : string;
}

router.post('/todos', authenticateJwt, (req : any, res) => {
    const { title, description } = req.body;
    const done = false;
    const userId = req.userId;
  
    const newTodo = new TodoModel({ title, description, done, userId });
  
    newTodo.save()
      .then((savedTodo) => {
        res.status(201).json(savedTodo);
      })
      .catch((err :any ) => {
        res.status(500).json({ error: 'Failed to create a new todo' });
      });
  });
  
  
  router.get('/todos', authenticateJwt, (req : any, res) => {
    const userId = req.userId;
  
    TodoModel.find({ userId })
      .then((todos) => {
        res.json(todos);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to retrieve todos' });
      });
  });
  
  router.patch('/todos/:todoId/done', authenticateJwt, (req : any, res) => {
    const { todoId } = req.params;
    const userId = req.userId;
  
    TodoModel.findOneAndUpdate({ _id: todoId, userId }, { done: true }, { new: true })
      .then((updatedTodo) => {
        if (!updatedTodo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(updatedTodo);
      })
      .catch((err) => {
        res.status(500).json({ error: 'Failed to update todo' });
      });
  });

export default router;