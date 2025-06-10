import React from 'react';

const Contact: React.FC = () => (
  <section id="contact" className="flex flex-col items-center py-12 px-4 space-y-4">
    <h2 className="text-4xl font-bold">Contact Me</h2>
    <p>Email: <a href="mailto:adriankeomaa@gmail.com" className="underline">adriankeomaa@gmail.com</a></p>
    <p>Phone: <a href="tel:+5491140955906" className="underline">+54 9 1140955906</a></p>
    <div className="space-x-6 mt-4">
      <a href="https://github.com/adrian161103" target="_blank" rel="noopener" className="underline">GitHub</a>
      <a href="https://linkedin.com/in/adrianalejosgarcia" target="_blank" rel="noopener" className="underline">LinkedIn</a>
    </div>
  </section>
);

export default Contact;