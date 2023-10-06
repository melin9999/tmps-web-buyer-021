import MainFooter from "@/components/footers/MainFooter";
import MainHeader from "@/components/headers/MainHeader";
import Navbar from "@/components/headers/Navbar";

export default function RootLayout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center w-full bg-white">
      <MainHeader/>
      <Navbar/>
      {children}
      <MainFooter/>
    </div>
  )
}