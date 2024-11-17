import AuthHeader from "@/components/shared/AuthHeader";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="auth">
      <AuthHeader />
      <div className="flex justify-center items-center mx-auto h-[80vh] md:h-[90vh] overflow-hidden container">
        {children}
        <svg
          className="bottom-0 -z-10 fixed w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#f59300"
            fillOpacity="1"
            d="M0,288L60,266.7C120,245,240,203,360,202.7C480,203,600,245,720,234.7C840,224,960,160,1080,160C1200,160,1320,224,1380,256L1440,288L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>
    </main>
  );
}
