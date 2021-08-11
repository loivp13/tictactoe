## Features

- Full stack application with Express, React, Sequelize(ORM configured for
  Postgres), Tailwindcss, AWS SES, JWT, Nodemon, and Multiple Themes support.
- Express framework with cors and body parser enabled.
- Basic routes for CRUD operations such as user resistration and user creations.
- JWT for sessions and authenications and AWS SES for automatic emailing
  confirmations links. You will need to add a .env in the root folder with JWT
  secrets as well as AWS access key and region in order for this to work. See
  [express-jwt](https://www.npmjs.com/package/express-jwt) and
  [SES](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/get-aws-keys.html)
  for more information on how to get and use keys.
- Setup Sequelize for Postgres. You will need to add your own db.config.js in
  app/config for your postgress database configuration. See sequelize
  [docs](https://sequelize.org/master/manual/getting-started.html) for more
  infomation.
- React created with CRA and with redux template with Tailwindcss.
- Multiple theme support using Tailwindcss. Please read
  [this](https://dev.to/ohitslaurence/creating-dynamic-themes-with-react-tailwindcss-59cl)
  to see how to add your own themes.
