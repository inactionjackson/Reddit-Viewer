# Reddit-Viewer

Reddit-Viewer is a simplified view of reddit without any comments or voting. Posts are pulled from the Reddit json api. It is responsive and supports gifs, infinite scrolling, and will automatically select the lowest res image that will work for your screen size to save data when on mobile.

Frontend is React with hooks, backend is Node.js with express.

## Deployment

Initial setup

```bash
npm install
npm run client-install
```

Development environment:

```bash
npm run dev
```

Production:

```bash
npm build
npm run start
```
