# Production Deployment Guide: Babu Electronics on Ubuntu VPS

This step-by-step guide explains how to deploy **Babu Electronics** on a Linux Ubuntu VPS (DigitalOcean, Hetzner, AWS, Hostinger, etc.) using **Node.js**, **PM2 Process Manager**, **Nginx Reverse Proxy**, and **Let's Encrypt Free SSL**.

---

## Step 1: Server Preparation

SSH into your Ubuntu server:
```bash
ssh root@your_vps_ip
```

Update system dependencies and install Node.js 20 LTS:
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs build-essential nginx certbot python3-certbot-nginx git
```

Install PM2 globally:
```bash
npm install -g pm2
```

---

## Step 2: Clone & Configure Codebase

Navigate to `/var/www` and clone your project repository:
```bash
cd /var/www
git clone <your-git-repository-url> babu-electronics
cd babu-electronics
```

Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Install production dependencies:
```bash
npm install --production=false
```

Push SQLite database schema and run seed script:
```bash
npx prisma db push
node prisma/seed.js
```

Build production bundle:
```bash
npm run build
```

---

## Step 3: Start Application with PM2

Start Next.js using PM2 with cluster mode:
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

Verify application status:
```bash
pm2 status
```

---

## Step 4: Configure Nginx Reverse Proxy

Create Nginx server block configuration:
```bash
sudo nano /etc/nginx/sites-available/babuelectronics
```

Paste the following Nginx configuration:
```nginx
server {
    server_name babuelectronics.com www.babuelectronics.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Increase upload file size limit for product image uploads
    client_max_body_size 20M;
}
```

Enable site configuration and restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/babuelectronics /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## Step 5: Enable SSL (HTTPS) with Certbot

Run Certbot to obtain free SSL certificate:
```bash
sudo certbot --nginx -d babuelectronics.com -d www.babuelectronics.com
```

Your **Babu Electronics** platform is now live with HTTPS! 🚀
