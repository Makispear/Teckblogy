const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../../models');
const post404Message = 'Post with this id not found'

router.get('/', (req, res) => {
    Post.findAll({
      where: {
        user_id: req.params.user_id
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
          attributes: ['id', 'text', 'post_id', 'user_id', 'created_at'],
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
        // serialize data before passing to template
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
          },
          attributes: [
            'id',
            'post_url',
            'title',
            'created_at'
        ],
          include: [
            {
              model: Comment,
              attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', { post })

    })
})


module.exports = router