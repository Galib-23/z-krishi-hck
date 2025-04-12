# Z-Krishi: AI-Powered Agricultural Solution

Z-Krishi is an innovative platform designed to assist farmers in optimizing crop production, managing pests and diseases, and improving overall agricultural efficiency. With features powered by AI and machine learning, Z-Krishi aims to help farmers grow healthy crops and increase productivity.

## Features

### 1. **Crop Recommendation by AI**
   - Z-Krishi uses custom machine learning models to analyze soil data, weather patterns, and historical crop yield data.
   - Based on these factors, the website recommends the best crops for a farmer to plant, ensuring optimal growth and yield.

### 2. **Pests and Disease Detection**
   - Users can upload images of infected crop leaves or other plant parts.
   - The AI model identifies diseases and pests, providing suggestions for treatment and remedies to protect crops.

### 3. **Resources**
   - The platform provides a collection of documents and articles on sustainable agriculture practices.
   - Tutorials and guides are available for growing specific plants and crops efficiently.

### 4. **Weather Forecast and Alarm System**
   - Z-Krishi offers real-time weather forecasts, including predictions for potential storms or natural disasters.
   - In case of adverse weather, the system suggests preventive measures to mitigate crop damage and losses.

### 5. **Organic Products Marketplace**
   - Z-Krishi promotes food security by offering a marketplace where farmers can sell their crops directly.
   - Farmers can list organic produce for sale, supporting sustainable agricultural practices and increasing access to fresh produce.

### 6. **Community Forum**
   - A space for farmers to ask questions, share experiences, and connect with fellow farmers and experts.
   - The forum helps foster collaboration and knowledge sharing within the farming community.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Prisma ORM
- **Database**: PostgreSQL (local database)
- **AI/ML**: TensorFlow.js, ml5.js, Custom ML Models
- **Authentication**: NextAuth.js (Auth.js v5)
- **Deployment**: Microsoft Azure configured with nginx web server and pm2.
- **Domain**: Domain from duckdns.org




## Database Schema:

![Z-Krishi Logo](assets/schema.png)



## Getting Started

1. Clone this repository:
  
    ```bash
    git clone https://github.com/Galib-23/z-krishi-hck.git
    cd z-krishi-hck
    ```
2. Install dependencies:
  
    ```bash
    npm install
    ```
3. Set database url to `.env ` file:
  
    ```bash
    DATABASE_URL=postgresql://user:password@localhost:5432/zkrishi
    ```
3. Run the development server:
  
    ```bash
    npm run dev
    ```

