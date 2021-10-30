const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
const post404Message = 'Post with this id not found'
const username404Message = 'Username not found'
const password400Message = 'Incorrect password!'
const login200Message = 'You are now logged in!'


router.get('/', (req, res) => {
    Post.findAll({
        order: [
            ['created_at', 'DESC'],
        ],
        attributes: [
            'id',
            'title',
            'content',
            'user_id',
            'created_at'
        ],
        include: [{
                model: User,
                attributes: ['username']
        }]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}))

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })
})

router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'text', 'user_id', 'post_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            return res.status(404).json({message: post404Message})
        }
        const post = dbPostData.get({plain: true})
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })
})

router.get('/signup', (req, res) => {
    res.render('signup')
})

router.get('/add-post', (req, res) => {
    res.render('add-post')
})

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect('/');
    }
    
    res.render('login');
});

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: username404Message });
            return;
        }

        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: password400Message });
            return;
        }

        req.session.save(() => {
            // declare session variables
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: login200Message });
        });
    });
});





module.exports = router