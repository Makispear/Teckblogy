const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const withAuth = require('../utils/auth');
const post404Message = 'Post with this id not found'


router.get('/', withAuth, (req, res) => {
  Post.findAll({
    where: {
      // use the ID from the session
      user_id: req.session.user_id
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

    const posts = dbPostData.map(post => post.get({plain: true}))

    console.log(posts)
    
    res.render('dashboard', {
      posts,
      loggedIn: true
    })
  })
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
})

router.get('/edit/:id', withAuth, (req, res) => {
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
        attributes: [
          'id',
          'text',
          'user_id',
          'post_id',
          'created_at'
        ],
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
    res.render('edit-post', {post, loggedIn: true})
  })
})



module.exports = router