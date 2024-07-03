import { Inter } from "next/font/google";
import "./globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_contexts/ReservationContext";

const JosefinFont = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  // title: "The Wild Oasis",
  title: {
    template: "%s | The Wild Oasis",
    default: "Welcome to The Wild Oasis",
  },
  description: "Luxurious Hotel bla bla bla",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` min-h-screen relative flex flex-col bg-primary-950 ${JosefinFont.className} antialiased text-primary-100 `}
      >
        <Header />
        <div className="px-8 py-12 flex-1 grid">
          <main className=" mx-auto max-w-7xl w-full">
            {/* This ReservationProvider is a Context API which makes it a Client Component. While the children here is the page component of whatever page we are visiting, so  it is actually a server component. So here we are passing in a server component into a client component. They are no problem because these children have already been generated and have already been rendered on the server, so the result is already there, the React Elements have been created, so thats what we pass now into the Client Component. */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <footer>This is Footer</footer>
      </body>
    </html>
  );
}
