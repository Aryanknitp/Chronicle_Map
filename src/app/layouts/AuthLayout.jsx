import Navbar from '../components/Navbar';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f5f1e8] via-[#e8dcc8] to-[#d4c4a8]">
      {children}
    </div>
  );
};

export default AuthLayout;
