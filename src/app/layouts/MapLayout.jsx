import Navbar from '../components/Navbar';

const MapLayout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <main className="flex-1 relative">{children}</main>
    </div>
  );
};

export default MapLayout;
