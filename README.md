# Virtual Cloth Assistant

A web application that allows users to virtually try on clothes using AI technology.

## Features

- Upload model images
- Upload clothing items
- Generate virtual try-on previews
- User authentication
- Responsive design

## Installation

### 1. Clone the repository:
```bash
git clone https://github.com/shubhamghadi123/virtualclothassistant
cd virtualclothassistant
```

### 2. Install dependencies:
```bash
npm install
```

### 3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Replace placeholder values with your actual API keys
```bash
cp .env.example .env
```

### 4. Setup and Configuration of API Key and URL

#### 1. Get Your API Key

   1. Go to the [**Segmind API Keys page**](https://cloud.segmind.com/console/api-keys).
   2. **Log in** or sign up for a new account.
   3. Click **Create New API Key** and copy the key that is generated for you.

#### 2. Find Your Model URL

1. Navigate to the **Model Hub** section on the Segmind website.
2. Search for a virtual try-on model, such as **"SegFit"** or **"Try-On Diffusion"**.
3. Select your desired model and go to its **API** tab.
4. **Copy the URL** provided for that model.

#### 3. Configure Your Project

1. In the root directory of the project, create a file named .env.
2. Open the .env file and add your credentials in the following format, replacing the placeholders with your actual key and URL:
```
   REACT_APP_SEGMIND_API_KEY=YOUR_API_KEY_HERE
   REACT_APP_SEGMIND_API_URL=YOUR_MODEL_URL_HERE
```
3. Save the `.env` file.


### 5. Start the development server:
```bash
npm start
```

## Usage

1. Register a new account or log in
2. Upload a model image (a full-body photo)
3. Upload a clothing item image
4. Click "Generate Try-On" to see the result
5. Download or share the generated image

## Technologies Used

- React.js
- Material-UI
- React Router
- Context API for state management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Thanks to all contributors
- Inspired by virtual try-on technologies 