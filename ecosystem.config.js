module.exports = {
  apps: [
    {
      name: 'babu-electronics',
      script: 'node_modules/next/dist/bin/next',
      args: 'start -p 3000',
      cwd: './',
      instances: 'max',
      exec_mode: 'cluster',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        DATABASE_URL: 'file:./prisma/dev.db',
        ADMIN_PASSWORD: 'babu2025',
      },
    },
  ],
};
