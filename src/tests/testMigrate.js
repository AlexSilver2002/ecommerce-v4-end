const User = require('../models/User');
const sequelize = require('../utils/connection');
require('../models/User');
require('../models/Category');
require('../models/Product');
require('../models');

const main = async () => {
  try {
    await sequelize.sync({ force: true });

    await User.create({
      firstName: 'BotUser',
      lastName: 'BotUser',
      email: 'botUser@gmail.com',
      password: 'botuser123',
      phone: '60378021',
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();
