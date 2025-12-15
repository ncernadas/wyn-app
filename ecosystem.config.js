module.exports = {
  apps: [
    {
      name: 'wyn-app',
      script: '.next/standalone/server.js',
      cwd: './',
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3003,
        HOSTNAME: 'localhost',
        USE_BASE_PATH: 'true',
        NEXT_PUBLIC_BASE_PATH: '/wyn'
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      combine_logs: true,
      merge_logs: true,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
