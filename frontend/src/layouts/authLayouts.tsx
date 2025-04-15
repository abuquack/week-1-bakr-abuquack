interface AuthLayoutsType {
  children: React.ReactNode;
  titleCard: string;
}

export const AuthLayouts = ({ children, titleCard }: AuthLayoutsType) => {
  return (
    <div className="container min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md md:max-w-2xl p-6 bg-primary rounded-md shadow-md">
        <h1 className="text-2xl font-semibold text-white">{titleCard}</h1>
        {children}
      </div>
    </div>
  );
};
