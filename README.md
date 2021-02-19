# Grizzly-Winter-Gear: an eCommerce web app built on NERP

## Visit Us
https://grizzly-winter-gear.herokuapp.com/login

## NERP Stack
- Built with Node.js, Express.js, React.js, PostgreSQL over three weeks in a three person team

### Front End
- Front end utilizes React and Material UI for interface, Redux for store management, React Router for page management

- User authorization is persisted with local storage use of JWT Token

- User can log in via GitHub OAuth2 API

- Cart is persistent for a user across browsers, phones

- Stripe API used for epayment and checkout process

### Back End
- Back end utilizes Express for RESTful API, Sequelize for ORM with PostgreSQL database

- User Authorization via JWT in header authorization tokens

- Passwords encrypted with bcrypt

### Deployment
- Deployed on Heroku with postgres db and secret keys for OAuth, Stripe, JWT
