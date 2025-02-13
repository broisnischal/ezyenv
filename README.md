# ezyenv

Push `env` to github but using ezyenv which is tool to automatically generate sample env files from your existing `.env` files! making example env file, easy, intutive to share. This helps teams share environment variable templates without exposing actual credentials.

## Quick Use

```sh
# npm
npx ezyenv

# bun
bunx ezyenv

# yarn
yarn global add ezyenv

# pnpm
pnpm add -g ezyenv

```

## Quick Install CLI

```sh
curl -fsSL https://l.nischal.pro/env | sudo sh
```

## Features

- 🚀 Automatically generates `.env.example` from `.env` files
- 🔒 Multiple environment variable support
- 💡 Single file support `ezyenv test.env`
- ⚡️ Simple one-command operation
- 🔒 Preserves structure while removing sensitive values
- 🔒 Preserves single & Multi line comment
- ⚡️ Remove the example files, `ezyenv rm`
- 🚀 add the example sample ext, `ezyenv .env --sample (sample|example|eg|default)`

## Usage Guide

Navigate to your project directory and run:

```sh
ezyenv # creates `.example` files for each env

ezyenv .env # specifies the file

ezyenv rm # removes the example files

ezyenv .env --sample sample # specifies the sample (sample|example|eg|default)

```

Your `.env` file:

```env
DB_HOST=localhost
DB_USER=admin
DB_PASS=super_secret_password
API_KEY=1234567890
```

Generated `.env.example`:

```env
DB_HOST=
DB_USER=
DB_PASS=
API_KEY=
```

## Keywords

dotenv-sample-generator, dotenv-eg-generator, dotenv generator, env example, env generator, env-example-generator, generate-env-example, dotenv, dotenv example, environement example

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details
