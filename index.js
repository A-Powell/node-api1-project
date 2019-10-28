// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();

server.use(express.json());


server.post('/api/users', (req, res) => {
    const user = req.body;
    if (!user.name || !user.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
    db.insert(user)
    .then(user => {
        res.status(201).json(user);
    })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the user to the database"})
    })
}
})

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({ error: "The users information could not be retrieved."})
    })
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
    .then(user => {
        if (user) {
        res.status(200).json(user)
        } else {
            res.status(404).json({ message: 'The user with the specified ID does not exist.'})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved."})
    });
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(user => {
        if (user) {
            res.status(200).json({message: `Deleted user with id ${id}`})
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "The user could not be removed"})
    });

});

server.put('/api/users/:id', (req, res) => {
    const {name, bio } = req.body;
    const id = req.params.id;

    if (!name || !bio ) {
        res.status(400).json({ errorMessage: 'Please provide name and bio for the user.'})
    } else {
        db.update(id, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'The user with the specified ID does not exist.' })
            }
        })
        .catch(() => {
            res.status(404).json({ errorMessage: 'The user information could not be modified.'})
        });
    }
});





const port = 8000;
server.listen(port, () => console.log('\n=== Running on port 8000 ===\n'));