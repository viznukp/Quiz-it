
## Local Development Setup

First clone this repo.

Then install the [Node.js](https://nodejs.org) version `v18.12` which we have specified inside the `.node-version` file of this repo., using the following command:

```bash
nvm install
```

Make sure that [yarn](https://yarnpkg.com) is installed with it as well in your
system.

After `yarn` is installed, install the Node.js and Rails dependencies and also
seed the database, by running:

```bash
./bin/setup
```

Start the server by executing following command.

```bash
bundle exec rails server -p 3000
```

Visit http://localhost:3000 and login with email `oliver@example.com` and
password `welcome`.

install redis server and SideKiq to test mail delivery and report download feature

## Features

- Uses [Tailwind CSS](https://tailwindcss.com).
- `rake setup` to set sensible sample data including user `oliver@example.com`
  with password `welcome`.
- Uses [Sidekiq](https://github.com/mperham/sidekiq).
- Uses PostgreSQL.
- Auto-formats Ruby code with [rubocop](https://github.com/bbatsov/rubocop).
- Auto-formats JavaScript and CSS code with
  [prettier](https://github.com/prettier/prettier).
- Letter opener gem for development.
