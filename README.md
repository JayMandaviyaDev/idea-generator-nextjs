# AI Idea Generator (Next.js & Google Gemini)

This is a web application that leverages the power of the Google Gemini large language model to generate creative ideas. Users can input a topic, and the application will return a list of unique, AI-generated ideas.

This project is built using a modern, full-stack JavaScript approach with Next.js, demonstrating how to securely integrate a powerful AI service into a web application.

## Features

*   **Dynamic Idea Generation:** Get instant ideas on any topic without a page reload.
*   **Secure API Integration:** All calls to the Google Gemini API are handled through a secure backend API route, protecting the API key.
*   **Responsive UI:** The user interface is built with Tailwind CSS and is fully responsive for both desktop and mobile use.
*   **Loading & Error States:** The application provides clear feedback to the user while ideas are being generated or if an error occurs.

## Tech Stack

*   **Framework:** [Next.js](https://nextjs.org/) (using the App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **AI Model:** [Google Gemini Pro](https://deepmind.google/technologies/gemini/)
*   **AI SDK:** [`@google/generative-ai`](https://www.npmjs.com/package/@google/generative-ai)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **Deployment:** [Vercel](https://vercel.com/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (version 18.x or later)
*   npm or yarn
*   A Google Gemini API Key

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JayMandaviyaDev/idea-generator-nextjs.git
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd idea-generator-nextjs
    ```

3.  **Install the dependencies:**
    ```bash
    npm install
    ```

### Environment Variables

This project requires an API key from Google to interact with the Gemini model.

1.  Create a file named `.env.local` in the root of your project.
2.  Open the file and add your API key as follows:

    ```
    # .env.local

    GOOGLE_API_KEY="PASTE_YOUR_GEMINI_API_KEY_HERE"
    ```
    You can obtain a free API key from [Google AI Studio](https://aistudio.google.com/).

## Running the Application

To start the development server, run the following command:

```bash
npm run dev
```

Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application in action.

## Deployment

The easiest way to deploy this application is using **Vercel**, the platform built by the creators of Next.js.

1.  Push your code to a GitHub repository.
2.  Import the repository into Vercel.
3.  Add your `GOOGLE_API_KEY` as an environment variable in the Vercel project settings.
4.  Vercel will automatically build and deploy your application.