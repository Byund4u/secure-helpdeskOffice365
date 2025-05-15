/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";

interface WrapperProps {
  children?: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  useEffect(() => {
    const body = document.querySelector(`body`);

    body?.setAttribute(`class`, `cb`);

    return () => {
      body?.removeAttribute(`class`);
    };
  }, []);
  return (
    <div>
      <form>
        <div className={`login-paginated-page`}>
          <div id="lightboxTemplateContainer">
            <div id="lightboxBackgroundContainer">
              <div className="background-image-holder">
                <div
                  className={`background-image ext-background-image`}
                  style={{
                    backgroundImage: `url("/images/bg.svg")`,
                  }}
                />
              </div>
            </div>
          </div>
          <div className={`outer`}>
            <div className={`template-section main-section`}>
              <div className={`middle`}>
                <div className="full-height">
                  <div className="flex-column">{children}</div>
                </div>
              </div>
            </div>
            <div id="footer" className="footer ext-footer">
              <div>
                <div id="footerLinks" className="footerNode text-secondary">
                  <a href="" className="footer-content footer-item">
                    Terms of use
                  </a>
                  <a href="" className="footer-content footer-item">
                    Privacy & cookies
                  </a>
                  <a
                    href=""
                    className={`footer-content ext-footer-content footer-item ext-footer-item debug-item ext-debug-item`}
                  >
                    ...
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
