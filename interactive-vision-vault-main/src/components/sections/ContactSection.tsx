import ContactForm from "@/components/ContactForm";
import { ExternalLink } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 px-4">
      <div className="section-container">
        <h2 className="section-title mx-auto">Contact Me</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-12">
          <div className="card animate-slide-in-left">
            <h3 className="text-2xl font-bold mb-6 gradient-text">Get In Touch</h3>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Feel free to reach out if you have any questions, project ideas, or just want to connect!
            </p>

            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-purple">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href="mailto:vipulmilindvadhe@gmail.com" className="text-portfolio-purple hover:underline">vipulmilindvadhe@gmail.com</a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-purple">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">LinkedIn</p>
                  <a
                    href="https://www.linkedin.com/in/vipul-vadhe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-portfolio-purple hover:underline"
                  >
                    vipul-vadhe
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-purple">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">GitHub</p>
                  <a
                    href="https://github.com/Vipul7620"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-portfolio-purple hover:underline"
                  >
                    Vipul7620
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-portfolio-purple/10 flex items-center justify-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-portfolio-purple">
                    <path d="M17.472 14.382a10.94 10.94 0 0 1-3.356-.533c-.524-.162-1.13-.36-1.797-.617a1 1 0 0 0-.949.13l-2.2 1.65a.998.998 0 0 1-1.09.09c-2.1-1.17-3.8-2.87-4.97-4.97a1 1 0 0 1 .09-1.09l1.65-2.2a1 1 0 0 0 .13-.95c-.257-.667-.455-1.273-.617-1.797A10.94 10.94 0 0 1 4.618 6.53a1 1 0 0 0-1.118-.326l-2.5.83A1 1 0 0 0 0 8.01C0 17.388 6.612 24 16 24a1 1 0 0 0 .966-.743l.83-2.5a1 1 0 0 0-.326-1.118z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">WhatsApp</p>
                  <a
                    href="https://wa.me/917620403834"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-portfolio-purple hover:underline"
                  >
                    Send Message
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
