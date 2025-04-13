interface AuthLayoutsType {
  children: React.ReactNode;
  titleCard: string;
}

export const AuthLayouts = ({ children, titleCard }: AuthLayoutsType) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold">{titleCard}</h1>
        {children}
      </div>
    </div>
  );
};
