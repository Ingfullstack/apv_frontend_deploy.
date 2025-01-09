import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <main className="container mx-auto md:grid md:grid-cols-2 mt-12 px-5 gap-12 items-center">
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
