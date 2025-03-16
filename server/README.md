# Virtual Cloth Try-On Automation Server

This server provides browser automation for the Virtual Cloth Assistant application, allowing it to use the Hugging Face Kolors Virtual Try-On space as an alternative to the API.

## Features

- Automated browser interaction with the Hugging Face space
- Uploads model and cloth images
- Retrieves the generated result
- Runs in the background
- Provides a REST API for the frontend to communicate with

## Requirements

- Node.js 14+
- Playwright (Chromium)

## Installation

The dependencies should be installed when you run `npm install` in the root directory of the project.

## Usage

### Starting the Server

There are two ways to start the server:

1. **Foreground Mode** (for development):

```bash
npm run start-server
```

2. **Background Mode** (for production):

```bash
npm run start-server-bg
```

The background mode will start the server as a detached process and write logs to `server/server.log`.

### API Endpoints

The server exposes the following endpoints:

- `POST /api/virtual-try-on`: Uploads model and cloth images to the Hugging Face space and returns the generated result
  - Request body:
    - `modelImage`: Base64 encoded model image
    - `clothImage`: Base64 encoded cloth image
  - Response:
    - `success`: Boolean indicating if the operation was successful
    - `resultImage`: Base64 encoded result image

- `GET /api/health`: Health check endpoint
  - Response:
    - `status`: "ok" if the server is running

### Using the Automation in the Frontend

The frontend will automatically detect if the automation server is running and provide a toggle to switch between using the API and the automation.

## Troubleshooting

If you encounter issues with the automation:

1. Check the server logs in `server/server.log`
2. Make sure Playwright is installed correctly
3. Try running the server in foreground mode to see the logs in real-time
4. Check if the Hugging Face space is available and has not changed its UI

## License

This project is licensed under the MIT License. 