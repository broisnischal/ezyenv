# ezyenv

A simple CLI tool to automatically generate `.env.example` files from your `.env` files.

## Quick Install

```sh
curl -fsSL https://l.nischal.pro/env | sudo sh
```

## What does it do?

ezyenv automatically creates `.env.example` files by reading your `.env` files and removing sensitive values while keeping the structure. This helps teams share environment variable templates without exposing actual credentials.

## Features

- 🚀 Automatically generates `.env.example` from `.env` files
- 🔒 Strips sensitive values while preserving variable names
- 💡 Maintains comments and file structure
- ⚡️ Simple one-command operation

## Usage

Navigate to your project directory and run:

```sh
ezyenv
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
