# Cricket Fantasy League

## Overview
The Cricket Fantasy League is a comprehensive web application that allows cricket enthusiasts to create and manage fantasy teams, track live matches, and compete on leaderboards. Built with modern web technologies, it provides an engaging platform for users to showcase their cricket knowledge and strategy.

## Key Features
### Match Management
- View upcoming, live, and completed matches
- Detailed match statistics and player performances
- Real-time score updates and ball-by-ball commentary

### Team Creation
- Build fantasy teams with real players
- Manage team within budget constraints
- Set captain and vice-captain for bonus points
- Player statistics and performance history

### Live Score Tracking
- Real-time match updates
- Detailed player performance metrics
- Interactive scorecards and match analysis

### Leaderboards
- Real-time ranking updates
- Compare performance with other users
- Historical performance tracking

### User Management
- Secure authentication system
- User profile management
- Team history and performance tracking

### Admin Features
- Manage matches and tournaments
- Add/update teams and players
- Monitor user activities
- Manage system configurations

## Technology Stack
- **Frontend**: React, TypeScript, Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Build Tool**: Vite
- **Linting**: ESLint
- **Formatting**: Prettier

## Installation
### Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/Deepika2430/cricket-fantasy-league-ui.git
   cd cricket-fantasy-league-ui
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root directory with:
   ```
   VITE_API_BASE_URL=your_api_url
   VITE_AUTH_TOKEN_KEY=authToken
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application:
   Open http://localhost:5173 in your browser

## Configuration
### Environment Variables
| Variable               | Description                          |
|------------------------|--------------------------------------|
| VITE_API_BASE_URL      | Base URL for the backend API          |
| VITE_AUTH_TOKEN_KEY    | Key for storing authentication token |

### Project Structure
```
src/
├── components/         # Reusable UI components
│   ├── common/        # Shared components
│   ├── admin/         # Admin specific components
│   └── user/          # User facing components
├── services/          # API service layer
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
├── context/           # React context providers
├── App.tsx            # Main application component
└── main.tsx           # Application entry point
```

## Development Workflow
1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/feature-name
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Run linter:
   ```bash
   npm run lint
   ```

4. Run formatter:
   ```bash
   npm run format
   ```

5. Commit your changes:
   ```bash
   git add .
   git commit -m "Add feature description"
   ```

6. Push your branch:
   ```bash
   git push origin feature/feature-name
   ```

## API Documentation
The application interacts with a backend API. Refer to the [API Documentation](https://api.example.com/docs) for detailed information about available endpoints and request/response formats.

## Screenshots
![Dashboard](screenshots/dashboard.png)
![Team Selection](screenshots/team-selection.png)
![Live Match](screenshots/live-match.png)

## Contributing
We welcome contributions! Please follow these guidelines:
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

Please ensure:
- Code follows our style guidelines
- Include appropriate tests
- Update documentation as needed

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support
For any issues or questions, please open an issue on our [GitHub repository](https://github.com/Deepika2430/cricket-fantasy-league-ui/issues).
