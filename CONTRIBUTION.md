# How to Contribute

We appreciate your interest in contributing to this project! Please follow the
steps below to ensure a smooth contribution process.

## 1. Fork and Clone the Repository

1. **Fork the Repository**: Click the "Fork" button on the top right of this
   repository to create your own copy.
2. **Clone the Repository**: Clone your forked repository to your local machine:
    ```bash
    git clone https://github.com/<your-username>/create-react-template.git
    ```
3. **Navigate to the Project Directory**:
    ```bash
    cd create-react-template
    ```

## 2. Install Dependencies

1. **Install Global Tools**:
    ```bash
    npm i -g pnpm pkg
    ```
2. **Install Project Dependencies**:
    ```bash
    pnpm install
    ```
3. **Set Up Git Hooks**:
    ```bash
    pnpm exec lefthook install
    ```

## 3. Create a New Branch

1. **Create a Feature Branch**:
    ```bash
    git checkout -b feat/your-feature-name
    ```

## 4. Make Your Changes

1. **Write Code**: Implement your feature or fix the issue.
2. **Run Linters**:
    ```bash
    pnpm exec eslint .
    ```
3. **Format Code**:
    ```bash
    pnpm exec prettier --write .
    ```
4. **Run Tests**:
    ```bash
    pnpm test
    ```

## 5. Commit Your Changes

1. **Stage Your Changes**:
    ```bash
    git add .
    ```
2. **Write a Conventional Commit Message**:
    ```bash
    git commit -m "<type>: <description>"
    ```
    Examples:
    - `feat: add user authentication`
    - `fix: resolve crash on login`
    - `docs: update README with setup instructions`

## 6. Push and Create a Pull Request

1. **Push Your Branch**:
    ```bash
    git push origin feat/your-feature-name
    ```
2. **Open a Pull Request**:
    - Go to the original repository on GitHub.
    - Click "Compare & pull request".
    - Provide a clear and concise description of your changes.

## 7. Respond to Code Reviews

- Be open to feedback from maintainers.
- Make necessary changes and update your pull request.

## 8. Additional Guidelines

- Follow the project's coding standards.
- Add tests for new features or bug fixes.
- Update documentation if applicable.

Thank you for contributing! Your efforts make this project better.
