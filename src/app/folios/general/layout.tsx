import {
  Footer,
  NavBar,
  SideBar,
} from "@/modules/folios/components/components";
import { UserType } from "@/types/UserType";

export default async function GeneralLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: UserType = await fetch("https://gist.githubusercontent.com/wareval0/9be2798f217d52c0b759e0f521e7516e/raw/a16bb805a79551a492cc744840419888e2dd8652/user_sc.json").then((res) => res.json());

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <NavBar />
        <div className="flex pt-[82px]">
          <SideBar user={user}/>

          {/* Main Content  */}
          <main className="flex-1 flex flex-col ml-[280px]">
            <div
              className="flex-1 overflow-y-auto bg-gray-50 shadow-md"
              style={{ height: "calc(100vh - 165px)" }}
            >
              <div
                className="max-w-5xl mx-auto px-10 py-5 flex flex-col gap-3"
                style={{ height: "calc(100vh - 165px)" }}
              >
                {children}
              </div>
            </div>
            
            <Footer />
          </main>
        </div>
      </div>
    </>
  );
}
