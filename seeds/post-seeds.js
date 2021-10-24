const { Post } = require('../models');

const postdata = [
  {
    title: 'Donec posuere metus vitae ipsum.',
    content: 'lorems sadfh sdfsadf jbsajdfn jbsdaj fbj',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    content: 'asvd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 4
  },
  {
    title: 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 2
  },
  {
    title: 'Nunc purus.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef dfsg  ersg er sdfg ersdf gersadf sdafwe asdfas dfawe sdfaes dfearsd fgaersd fg',
    user_id: 4
  },
  {
    title: 'Pellentesque eget nunc.',
    content: 'vd sad ggasf a',
    user_id: 7
  },
  {
    title: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 4
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'asdgfnasd fwaesd fawes',
    user_id: 1
  },
  {
    title: 'Morbi non quam nec dui luctus rutrum.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef  vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 1
  },
  {
    title: 'Duis ac nibh.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd aspx',
    user_id: 5
  },
  {
    title: 'Curabitur at ipsum ac tellus semper interdum.',
    content: 'sdag asdg as df aseg a seg as fg 12334213',
    user_id: 5
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'sad gsadg sad gf waesf',
    user_id: 3
  },
  {
    title: 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 8
  },
  {
    title: 'Donec dapibus.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 8
  },
  {
    title: 'Nulla tellus.',
    content: 'vd sad ggasf awesfasdf sadf asedf',
    user_id: 3
  },
  {
    title: 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 3
  },
  {
    title:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere ',
    content: 'https://paginegialle.it/mattis/egestas.jsp',
    user_id: 7
  },
  {
    title: 'In hac habitasse platea dictumst.',
    content: 'http://wikia.com/turpis/eget.jpg',
    user_id: 6
  },
  {
    title: 'Etiam justo.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 4
  },
  {
    title: 'Nulla ut erat id mauris vulputate elementum.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 6
  },
  {
    title: 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    content: 'vd sad ggasf awesfasdf sadf asedf asdf asdf asdf asdfaesd fsadf asgd wef ',
    user_id: 7
  }
];

const seedPosts = () => Post.bulkCreate(postdata);

module.exports = seedPosts;