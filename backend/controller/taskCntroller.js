const Task = require('../modules/taskModule');


const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;
        const userId = req.user.id;

        
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        
        const task = await Task.create({
            userId,
            title,
            description: description || null,
            status: status || 'pending'
        });

        res.status(201).json({
            message: 'Task created successfully',
            task
        });
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const getUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Pagination parameters
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        // Get total count
        const totalTasks = await Task.count({ where: { userId } });

        const tasks = await Task.findAll({
            where: { userId },
            order: [['created_at', 'DESC']],
            limit,
            offset
        });

        res.status(200).json({
            message: 'Tasks retrieved successfully',
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
            count: tasks.length,
            tasks
        });
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status } = req.body;
        const userId = req.user.id;

        // Find task
        const task = await Task.findOne({ where: { id, userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Update task
        await task.update({
            title: title || task.title,
            description: description !== undefined ? description : task.description,
            status: status || task.status
        });

        res.status(200).json({
            message: 'Task updated successfully',
            task
        });
    } catch (error) {
        console.error('Update task error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Find task
        const task = await Task.findOne({ where: { id, userId } });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

   
        await task.destroy();

        res.status(200).json({
            message: 'Task deleted successfully'
        });
    } catch (error) {
        console.error('Delete task error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = {
    createTask,
    getUserTasks,
    updateTask,
    deleteTask
};
