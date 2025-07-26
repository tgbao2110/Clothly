const CustomerFooter = () => {
  return (
    <footer className="w-full border-t bg-muted py-6 px-4 text-sm text-muted-foreground">
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p>&copy; {new Date().getFullYear()} Clothly. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms of Service</a>
          <a href="/contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;