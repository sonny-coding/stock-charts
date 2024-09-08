import React from "react";

const Footer = () => {
  return (
    <footer className="flex-end bg-muted py-4 text-center">
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} ChartCrunch. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
