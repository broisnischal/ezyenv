# ezyenv

A simple CLI tool to automatically generate `.env.example` files from your `.env` files.

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

## Quick Install

```sh
curl -fsSL https://l.nischal.pro/env | sudo sh
```

## What does it do?

ezyenv automatically creates `.env.example` files by reading your `.env` files and removing sensitive values while keeping the structure. This helps teams share environment variable templates without exposing actual credentials.

## Features

- 🚀 Automatically generates `.env.example` from `.env` files
- 🔒 Multiple environment variable support
- 💡 Single file support `ezyenv test.env`
- ⚡️ Simple one-command operation
- 🔒 Preserves structure while removing sensitive values
- Preserves single & Multi line comment
- Remove the example files, `ezyenv rm`
- add the example sample ext, `ezyenv .env --sample (sample|example|eg|default)`

## Usage

Navigate to your project directory and run:

```sh
ezyenv # creates `.example` files for each env

ezyenv .env # specifies the file

ezyenv rm # removes the example files

ezyenv .env --sample sample # specifies the sample (sample|example|eg|default)

```

This will:

1. Find any `.env` files in your current directory
2. Create corresponding `.env.example` files
3. Copy the structure while removing sensitive values

Example:

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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see [LICENSE](LICENSE) for details
