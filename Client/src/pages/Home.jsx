//import { Analytics } from "../components/Analytics";
import { Button } from 'react-bootstrap';

export const Home = () => {
    return (
      <>

        <main>
          <section className="section-hero">
            <div className="container grid grid-two-cols">
              <div className="hero-content">
                <p>EditMasters: Your Online PDF and Photo Editing Suite</p>
                <h1>Welcome to EditMasters</h1>
                <p>Revolutionize your digital editing with EditMasters! Our innovative and user-friendly tools make it easy to edit PDFs and photos, whether you’re a professional or a creative enthusiast. Simplify your document workflows and create stunning visuals with just a few clicks.</p>
                
              </div>
  
              {/* hero images  */}
              <div className="hero-image">
                <img
                  src="/images/home.png"
                  alt="editing tools"
                  width="400"
                  height="500"
                />
              </div>
            </div>
          </section>
        </main>
  
        {/* 3rd section  */}
        <section className="section-hero">
          <div className="container grid grid-two-cols">
            {/* hero images  */}
            <div className="hero-image">
              <img
                src="/images/design.png"
                alt="design tools"
                width="400"
                height="500"
              />
            </div>
  
            <div className="hero-content">
              <p>We're Here to Assist You</p>
              <h1>Start Your Journey with Us</h1>
              <p>Take the first step towards seamless and secure digital editing. Contact us today for a free consultation and explore how EditMasters can transform your document and photo editing experience.</p>
              <div className="btn btn-group">
        
              </div>
            </div>
          </div>
        </section>
      </>
    );
  };
  