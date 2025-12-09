# onsign-todo

## 📝 TodoList Project with Drag & Drop

A TodoList application built using native HTML5 Drag and Drop for desktop.

For mobile devices, a custom touch-based Drag and Drop system was implemented to ensure a smooth and responsive user experience.

### 📦 Persistence Layer

The project uses LocalStorage for data persistence, implemented following clean code and dependency injection principles.
This design allows the storage mechanism to be replaced easily—for example, with LocalForage—by simply creating a new class that implements the IStorageClient interface.

### ✨ Features

- Add new tasks

- Remove tasks

- Move tasks between boards using Drag & Drop

### 🏗️ Architecture Notes

Designed with dependency injection to keep the project flexible and maintainable;

Supports different storage providers;

Desktop and mobile drag-and-drop implementations;

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```
