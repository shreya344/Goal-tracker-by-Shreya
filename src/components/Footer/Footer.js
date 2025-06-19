import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import Switch from "react-switch";

export function Footer({ isDarkMode, onToggle, onReset }) {
  return (
    <footer className="footer-outer">
      <div className="footer">
        <div className="footer-links">
          <a
            href="https://github.com/shreya344"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillGithub className="footer-icons" />
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shreya-akotkar008"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillLinkedin className="footer-icons" />
            LinkedIn
          </a>
        </div>
        <div className="footer-copyright">
          <p>
           © {new Date().getFullYear()} Shreya. All Rights Reserved.
          </p>
        </div>
        <div className="footer-actions">
          <button className="reset-button" onClick={onReset}>
            Reset Goals
          </button>
          <Switch
            onChange={onToggle}
            checked={isDarkMode}
            onColor={"#e18006"}
            offColor={"#138091"}
            uncheckedIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "2px",
                }}
              >
                🌞
              </div>
            }
            checkedIcon={
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  padding: "2px",
                }}
              >
                🌙
              </div>
            }
          />
        </div>
      </div>
    </footer>
  );
}
