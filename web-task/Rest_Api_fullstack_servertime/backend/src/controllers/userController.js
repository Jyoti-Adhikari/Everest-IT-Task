
// Mock DB Layer Data
let usersDb = [
    { id: 1, name: 'Alice', role: 'Admin' },
    { id: 2, name: 'Bob', role: 'Developer' }
];

export const getAllUsers = (req, res) => {
    res.json(usersDb);
};

export const createUser = (req, res) => {
    const newUser = {
        id: usersDb.length ? usersDb[usersDb.length - 1].id + 1 : 1,
        name: req.body.name,
        role: req.body.role || 'Guest'
    };
    usersDb.push(newUser);
    res.status(201).json(newUser);
};

export const updateUser = (req, res) => {
    const id = parseInt(req.params.id);
    const index = usersDb.findIndex(u => u.id === id);
    if (index !== -1) {
        usersDb[index] = { ...usersDb[index], ...req.body };
        res.json(usersDb[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
};