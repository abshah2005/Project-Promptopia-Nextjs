import Provider from "@/components/Provider";
import "../styles/globals.css";
import Nav from "@/components/Nav";
import { Suspense } from "react";

export const metadata = {
  title: "Promptia",
  description: "Discover and Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Suspense>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
