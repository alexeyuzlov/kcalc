# KCalc

**KCalc** is a minimalistic and powerful mobile app built with React Native for tracking calories, proteins, fats, and carbohydrates (CPFC). The app provides full control over each product you enter, enabling precise calculations and customization. Additionally, you can create complex dishes using individual products or other pre-defined dishes, ensuring accurate CPFC tracking for your diet goals.

---

## Features

- **Complete Control**: Enter and manage every product manually to maintain accuracy.
- **Dish Composition**: Combine products and other dishes to create complex recipes.
- **Focus on Quality**: Minimalistic design to concentrate on precise CPFC calculations without distractions.

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 14.x recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [React Native CLI](https://reactnative.dev/docs/environment-setup) for development.
- A simulator or physical device for testing (iOS or Android).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/alexeyuzlov/kcalc.git
   cd kcalc
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up the environment:
   Follow the [React Native environment setup guide](https://reactnative.dev/docs/environment-setup) to configure your environment for iOS and Android.

---

## Usage

1. Run the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

2. Run the app on an Android device or emulator:
   ```bash
   npm run android
   # or
   yarn android
   ```

   Run the app on an iOS device or simulator:
   ```bash
   npm run ios
   # or
   yarn ios
   ```

---

## Project Structure

```
KCalc/
├── android/                # Android-specific files
├── ios/                    # iOS-specific files
├── src/                    # Source files
│   ├── components/         # Reusable components
│   ├── screens/            # App screens
│   ├── utils/              # Utility functions
│   ├── assets/             # Images, fonts, etc.
│   └── App.js              # Main app entry point
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

---

## Contributing

Contributions are welcome! Please fork this repository, make your changes, and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Thanks to the open-source community for making this project possible.
- Built with [React Native](https://reactnative.dev/).

