import React from "react";

const Footer = () => {
  return (
    <footer className="mb-auto bg-muted py-4 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} StockChart Pro. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
