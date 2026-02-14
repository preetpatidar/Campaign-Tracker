Paste this:

🚀 Campaign Tracker SaaS

A full-stack marketing campaign management system built with Django + PostgreSQL (Backend) and React + Tailwind (Frontend).

Live Demo:
https://campaign-tracker-frontend-self.vercel.app/

📌 Features
✅ Campaign Management

Create, update, delete campaigns

Track platform, budget, status, dates

Status: Active / Paused / Completed

✅ Analytics Dashboard

Total campaigns

Total budget

Active campaign count

Interactive doughnut chart

✅ Industry News Integration

Fetches external API data

Responsive cards

Show more functionality

✅ UI/UX

Fully responsive

Dark mode toggle

Mobile navbar

Toast notifications

Premium SaaS design

🛠 Tech Stack
Backend

Django 4.x

PostgreSQL

Django REST Framework

Gunicorn

Render (Deployment)

Frontend

React

Tailwind CSS

Chart.js

Framer Motion

Heroicons

Vercel (Deployment)

⚙️ Setup Instructions (Local Development)
1️⃣ Clone Repository
git clone https://github.com/preetpatidar/Campaign-Tracker.git
cd Campaign-Tracker

🔹 Backend Setup
cd campaign-tracker-backend
python -m venv venv
source venv/bin/activate   (Windows: venv\Scripts\activate)
pip install -r requirements.txt


Create .env file:

DATABASE_URL=your_postgresql_url
SECRET_KEY=your_secret_key
DEBUG=True


Run migrations:

python manage.py migrate
python manage.py runserver


Backend runs at:

http://localhost:8000

🔹 Frontend Setup
cd campaign-tracker-frontend
npm install


Create .env file:

REACT_APP_API_URL=http://localhost:8000 / your backend url


Start frontend:

npm start


Frontend runs at:

http://localhost:3000


1️⃣ Get All Campaigns
GET /api/campaigns/


Response:

[
  {
    "id": 1,
    "title": "Instagram Sale",
    "platform": "Instagram",
    "budget": 15000,
    "status": "Active",
    "start_date": "2026-01-01",
    "end_date": "2026-01-31"
  }
]

2️⃣ Create Campaign
POST /api/campaigns/


Body:

{
  "title": "New Campaign",
  "platform": "Facebook",
  "budget": 20000,
  "status": "Active",
  "start_date": "2026-02-01",
  "end_date": "2026-02-28"
}

3️⃣ Update Campaign
PUT /api/campaigns/:id/

4️⃣ Delete Campaign
DELETE /api/campaigns/:id/

5️⃣ Get Dashboard Stats
GET /api/stats/


Response:

{
  "total_campaigns": 10,
  "total_budget": { "total": 120000 },
  "status_counts": [
    { "status": "Active", "count": 5 },
    { "status": "Paused", "count": 3 },
    { "status": "Completed", "count": 2 }
  ]
}

6️⃣ Get Industry News
GET /api/news/


🎥 Demo Video

https://drive.google.com/file/d/1T5aEaAaY0lXWbMSFTX2pzH8oJXfPWO8-/view?usp=sharing

🧪 Validation & Error Handling

API failure handling

Loading states

Empty states

Form validation

Delete confirmation

Production safe build

📌 Project Status

✔ Backend deployed
✔ Frontend deployed
✔ PostgreSQL connected
✔ Production build passing
✔ Fully responsive

👨‍💻 Author
Preet Patidar