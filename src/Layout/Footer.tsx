import * as React from 'react';

export type FooterProps = {};

const Footer: React.FC<FooterProps> = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer mt-auto py-3">
      <div className="container">
        <span className="text-muted">
          openMic&reg; &nbsp;&bull; &nbsp; &copy;{year}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
