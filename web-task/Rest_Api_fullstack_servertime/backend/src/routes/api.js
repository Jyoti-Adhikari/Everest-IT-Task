import { Router } from 'express';
import { uploadConfig } from '../config/multer.js';
import { getServerTime, downloadFile, uploadFile } from '../controllers/systemController.js';
import { getAllUsers, createUser, updateUser } from '../controllers/userController.js';

const router = Router();

// Core System Routes
router.get('/time', getServerTime);
router.get('/download', downloadFile);
router.post('/upload', uploadConfig.single('fileArg'), uploadFile);

// Model Database / Entity Routes
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);

export default router;