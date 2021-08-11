<!-- ⚠️ This README has been generated from the file(s) "blueprint.md" ⚠️--><h1 align="center">tictactoe</h1>

<p align="center">
  <b>Tic-tac-toe is a classic game where users take turns placing their symbol on a 3X3 grid. To win, user must place in a diagonal, horizontal, or vertical row. If neither player are able to, the game ends in a draw. This game has a slight twist with betting money where the person who bets the most gets to go.</b></br>
  <sub><sub>
</p>

<br />



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#table-of-contents)

## ➤ Table of Contents

* [➤ Installation](#-installation)
* [➤ Getting Started](#-getting-started)
* [➤ Starting development](#-starting-development)
* [➤ Features](#-features)
* [➤ Contributors](#-contributors)
* [➤ License](#-license)


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#installation)

## ➤ Installation

Clone using git or download the files.

```sh
git clone https://github.com/loivp13/react_express_postgres_boilerplate
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#getting-started)

## ➤ Getting Started

In the root directory

```sh
npm run install

cd client

npm run install
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#starting-development)

## ➤ Starting development

In the root directory

```sh
npm run dev

cd client

npm run start
```



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#features)

## ➤ Features

- Redis to store data in memory storage for quick access for socket.io.
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



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#contributors)

## ➤ Contributors
	

| [<img alt="Loi Van Pham" src="https://media-exp1.licdn.com/dms/image/C5603AQEdcwsWFFk01g/profile-displayphoto-shrink_200_200/0/1620352872837?e=1626307200&v=beta&t=lv5YVYtsBcAnhoqTsUGPuy8AjhPK4Y9toZZwPWKSl8Y" width="100">](https://www.linkedin.com/in/loivp13/) |
|:--------------------------------------------------:|
| [Loi Van Pham](https://www.linkedin.com/in/loivp13/) |



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/aqua.png)](#license)

## ➤ License
	
Licensed under [ISC](https://opensource.org/licenses/ISC).


