# 📧 Fastify Email Subscription & Campaign System

A Fastify-based backend service for managing email subscriptions, verification, scheduled campaigns, and email open tracking.

---

## 🚀 Features

- Email subscription API
- Email verification system
- Campaign email sending
- Email open tracking (tracking pixel)
- Scheduled campaigns
- Database integration with Sequelize
- Fastify server with form body support

---

## 🛠️ Tech Stack

- Node.js
- Fastify
- Sequelize (ORM)
- Nodemailer (Email service)
- node-schedule (Scheduler)
- dotenv (Environment variables)

---

## 📁 Project Structure

```
project-root/
│
├── services/
│   ├── mailer.js          # Email sending logic
│   ├── scheduler.js       # Campaign scheduler
│
├── models/
│   └── mailer.js          # Lead database model
│
├── mailTemplates.js       # Email templates
├── index.js               # Main server file
├── .env                   # Environment variables
├── package.json
└── README.md
```
