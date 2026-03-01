module.exports = {
  apps: [
    {
      name: "backend",
      cwd: "./backend",
      script: "src/index.js",
      watch: ["src"],
      env: {
        NODE_ENV: "development",
        PORT: 3000,
      },
    },
    {
      name: "customer",
      cwd: "./frontend/customer",
      script: "node_modules/vite/bin/vite.js",
      args: "--port 5173",
      env: {
        NODE_ENV: "development",
      },
    },
    {
      name: "admin",
      cwd: "./frontend/admin",
      script: "node_modules/vite/bin/vite.js",
      args: "--port 5174",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
