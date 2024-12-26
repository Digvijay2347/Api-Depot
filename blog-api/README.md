# Blog API

## Overview
The Blog API is a powerful backend service designed to manage blog articles efficiently. It provides a complete set of endpoints for creating, retrieving, updating, and deleting blog posts, as well as uploading images. Built with Node.js, the API integrates seamlessly with Supabase for database and storage functionalities. However, users have the flexibility to use their custom Database-as-a-Service (DBaaS) platform if preferred, by updating the database import and initialization settings to align with their chosen service.

---

## Features
- CRUD operations for blog articles
- Image upload and storage with public URL generation
- Tag and status management for articles

---

## Prerequisites
- **Node.js**: Ensure Node.js is installed (v14 or later recommended).
- **Supabase**: Set up a Supabase project with the required `articles` table and storage bucket (`article-images`).

---

## Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Digvijay2347/Api-Depot.git
cd blog-api
```
### 2. Install Dependencies
Install the required dependencies:
```bash
npm install or npm i
npm start
```
### 3.Configure Environment Variables
Create a .env file in the root directory and configure the following:
```bash
SUPABASE_URL=<your_supabase_url>
SUPABASE_KEY=<your_supabase_anon_key>
```


## License

[MIT](https://choosealicense.com/licenses/mit/)

## Authors

- [@Digvijay2347](https://github.com/Digvijay2347)


### Database Schema
| Coulmn | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `UUID` | Unique identifier |
| `title`      | `String` | Article title |
| `contents`      | `text` | Article content |
| `tags`      | `Arrays[String]` | Tags |
| `status`      | `String` | Draft or Published |
| `image_url`      | `String` | URL of the article image |
| `created_at`      | `Timestamp` | Creation Date |
| `updated_at`      | `Timestamp` | Last Update Date |
