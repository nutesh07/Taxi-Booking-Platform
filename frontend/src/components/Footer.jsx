export default function Footer(){
  return (
    <footer className="bg-white text-center py-4 mt-5 shadow-sm">
      <div className="container">
        <small>© {new Date().getFullYear()} CabX — All rights reserved</small>
      </div>
    </footer>
  );
}
