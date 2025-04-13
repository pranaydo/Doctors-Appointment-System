This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



1 Created a public repository on github
2 - Initialised repository with remote 
3 created Application using npx create-next-app@latest 'AppName'
chnage the directory - cd dir name 
start the project using npm run dev 


first Added Created folder Named component
inside component creadted sidenav.js And calling this component in Layout.js
Again created topnav and calling after sidenav
so the basic strucre is created now i am ready to create Calender Component
Basic Layout of calender is created and called in page.js
# Doctors-Appointment-System

Monthly and Weekly calendar views
Appointment creation, editing, and deletion
notification toaster added using ant design for create updatae and delete with the status icon
Ant design library installed
Modal importedform Ant Design
used modal and range picker from antd 
icons imported firm lucide react 
search doctor functionlity addded 


Dark and Light mode toggle using Context API and localStorage was part of the roadmap. However, it wasn't implemented in this version due to time constraints.
Reason: I had an ongoing production release in my current role, which focused heavily on dark/light mode rollout, so I had to prioritize that.

Additional Enhancements
There are several areas where this project can be further enhanced, such as:

Accessibility improvements
Notification/toast system for booking updates or we can send mail or message notification 
Role-based access and login
Backend integration and authentication

Due to limited time, these features have been deferred to a future version.

