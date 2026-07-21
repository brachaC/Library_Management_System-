import axios from 'axios';
import { config } from '../config';

export const getBooks = () => axios.get(`${config}/Book/getBooks`);

export const getBookById = (id: number) => axios.get(`${config}/Book/getBookById/${id}`);

export const addNewBook = (data: object) => axios.post(`${config}/Book/addBook`, data);

export const updateBook = (id: number, data: object) => axios.put(`${config}/Book/update/${id}`, data);

export const deleteBook = (id: number) => axios.delete(`${config}/Book/delete/${id}`);

export const getCommentsByBookId = (id: number) => axios.get(`${config}/Comment/getCommentsbyBookId/${id}`);

export const addComment = (data: object) => axios.post(`${config}/Comment/AddComment`, data);

export const updateComment = (id: number, data: object) => axios.put(`${config}/Comment/updateComment/${id}`, data);

export const deleteComment = (id: number) => axios.delete(`${config}/Comment/delete/${id}`);

export const getLends = () => axios.get(`${config}/Lend/getLend`);

export const getLendById = (id: number) => axios.get(`${config}/Lend/getLendById/${id}`);

export const addLend = (data: object) => axios.post(`${config}/Lend/addLend`, data);

export const updateLend = (id: number, data: object) => axios.put(`${config}/Lend/updateLend/${id}`, data);

export const deleteLend = (id: number) => axios.delete(`${config}/Lend/delete/${id}`);

export const getLendByUserId = (userId: number) => axios.get(`${config}/Lend/getlendByUserId/${userId}`);

export const getUsers = () => axios.get(`${config}/Users/getUsers`);

export const getUserById = (id: number) => axios.get(`${config}/Users/getUsersById/${id}`);

export const getUserByUserName = (userName: string) => axios.get(`${config}/Users/getUserByUserName/${userName}`);

export const createUser = (data: object) => axios.post(`${config}/Users/addUser`, data);

export const updateUser = (id: number, data: object) => axios.put(`${config}/Users/updateUsers/${id}`, data);

export const deleteUser = (id: number) => axios.delete(`${config}/Users/delete/${id}`);

export const getCategories = () => axios.get(`${config}/Category/getCategory`);

export const createCategory = (data: object) => axios.post(`${config}/Category/CreateCategory`, data);
