# Kent Jorsh Turno Fe — Portfolio

A static portfolio site. `index.html` is the hosting entry point, `turno.png` is the transparent hero portrait, and the compiled Tailwind stylesheet is in `assets/styles.css`. 

## Run locally

Build the stylesheet after changing Tailwind classes, then start the local server from this folder:

```powershell
npm.cmd install
npm.cmd run build
npm.cmd run dev
```

Open `http://127.0.0.1:4173` in your browser. In VS Code, pressing **F5** runs the **Run Portfolio** configuration; it starts the server and opens the portfolio automatically.

The contact form validates the fields and opens a pre-filled email in the visitor's email app. It does not send or store messages on a server.

## Deploy to GitHub Pages

1. Push the contents of this folder to the root of a GitHub repository. Commit the generated `assets/styles.css` file.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/(root)`, then save.
4. Wait for the Pages deployment to finish; GitHub will show the published URL in the Pages settings.

## Deploy to Vercel

1. Import the GitHub repository into Vercel.
2. Select **Other** as the framework preset. Set the build command to `npm run build` and use `.` as the output directory.
3. Deploy. Vercel serves `index.html` from the project root.

Google Fonts load from Google Fonts' CDN and require an internet connection; the Tailwind stylesheet is compiled locally for production.
