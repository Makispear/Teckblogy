const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, Comment, User } = require('../models');
const post404Message = 'Post with this id not found'


router.get('/', (req, res) => {
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



module.exports = router