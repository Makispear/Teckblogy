const router = require('express').Router()
const sequelize = require('../config/connection')
const { Post, User, Comment } = require('../models')
const post404Message = 'Post with this id not found'


router.get('/', (req, res) => {
    Post.findAll({
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

        res.render('homepage', { posts })
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
            post
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json(err)
    })
})


module.exports = router