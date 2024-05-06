import asyncHandler from "../middleware/asyncHandler.js";
import User from '../models/userModel.js';


// @description     Auth user & get token
// @route           POST /api/users/login
// @access          Public
const authUser = asyncHandler(async (req, res) => {
    res.send('auth user')
 });

// @description     Register user
// @route           POST /api/users
// @access          Public
const registerUser = asyncHandler(async (req, res) => {
    res.send('register user')
 });

// @description     Logout user / Clean cookies
// @route           POST /api/users/logout
// @access          Private
const logoutUser = asyncHandler(async (req, res) => {
    res.send('logout user')
 });

// @description     Get user profile
// @route           GET /api/users/profile
// @access          Private
const getUserProfile = asyncHandler(async (req, res) => {
    res.send('get user profile')
 });

// @description     Update user profile
// @route           PUT /api/users/profile
// @access          Private
const updateUserProfile = asyncHandler(async (req, res) => {
    res.send('update user profile')
 });

// @description     Get all users
// @route           GET /api/users
// @access          Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    res.send('get users')
 });

// @description     Get user by ID
// @route           GET /api/users/:id
// @access          Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id')
 });

// @description     Delete user
// @route           DELETE /api/users/:id
// @access          Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user')
 });

// @description     Update user
// @route           PUT /api/users/:id
// @access          Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    res.send('update user')
 });
 

