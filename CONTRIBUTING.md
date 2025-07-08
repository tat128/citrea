# Contributing to Citrea Stacking Circles

Thank you for your interest in contributing to Citrea Stacking Circles! Whether you're a hackathon judge, developer, or enthusiast, your feedback and contributions are welcome.

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-org/citrea-stacking-circles.git
   cd citrea
   ```
2. **Install dependencies:**
   ```bash
   cd frontend && npm install
   cd ../contracts && npm install
   ```
3. **Run the frontend:**
   ```bash
   cd ../frontend
   npm run dev
   ```
4. **Deploy contracts (optional):**
   ```bash
   cd ../contracts
   npx hardhat run scripts/deploy.js --network <network>
   ```

## Code Style
- Use Prettier and ESLint (configured in the repo) for formatting and linting.
- Write clear, descriptive commit messages.
- Use TypeScript for all frontend code.
- Comment complex logic and public functions.

## Submitting Pull Requests
- Fork the repo and create a feature branch (`feature/your-feature` or `fix/your-fix`).
- Ensure your code passes all linting and type checks.
- Add tests or demo steps if applicable.
- Open a pull request with a clear description of your changes.
- Reference any related issues or features.

## Hackathon Notes
- This project was built for the Citrea WaveHack hackathon.
- Judges: See the README for a feature overview, demo instructions, and Citrea integration highlights.
- Feedback and suggestions are highly appreciated!

## Community & Support
- Join the [Citrea Discord](https://discord.gg/citrea) for questions and collaboration.
- Open issues for bugs, feature requests, or feedback.

## License
MIT 