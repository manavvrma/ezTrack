import React, { useState } from "react";
import classNames from "classnames";
import { Button, Stack } from "@mui/material";
// import Image from "./Image";
// import Modal from "./Modal";
import "./styles/hero.css";
import { useNhostClient } from "@nhost/react";

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {
  const [videoModalActive, setVideoModalActive] = useState(false);
  const nhost = useNhostClient();

  const openModal = (e) => {
    e.preventDefault();
    setVideoModalActive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideoModalActive(false);
  };

  const handleLogin = async () => {
    try {
      await nhost.auth.signIn({
        provider: "google",
      });
      // Additional login logic (e.g., redirect) can be added here
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const outerClasses = classNames(
    "hero section center-content",
    topOuterDivider && "has-top-divider",
    bottomOuterDivider && "has-bottom-divider",
    hasBgColor && "has-bg-color",
    invertColor && "invert-color",
    className
  );

  const innerClasses = classNames(
    "hero-inner section-inner",
    topDivider && "has-top-divider",
    bottomDivider && "has-bottom-divider"
  );

  return (
    <section {...props} className={outerClasses}>
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="hero-title">
              Introducing{" "}
              <span style={{ color: "#2c8ff2" }}>Price Tracker</span>
            </h1>
            <Stack direction="column">
              <p className="hero-subtitle">
                This is a place where you can keep track of the price of your
                favourite product and when it drops under your desired value,
                you will be notified. You can even view the price history of the
                product.
              </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <div className="button-group">
                  <Button
                    variant="contained"
                    onClick={handleLogin}
                    size="large"
                  >
                    Get started now
                  </Button>
                  <Button
                    variant="contained"
                    component="a"
                    href="https://github.com/manavvrma"
                    size="large"
                    sx={{
                      backgroundColor: "#06213e",
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#022d47", // Adjust to a slightly lighter or darker shade for hover
                      },
                    }}
                  >
                    View on Github
                  </Button>
                </div>
              </div>
            </Stack>
          </div>
          {/* <div
            className="hero-figure"
            data-reveal-value="20px"
            data-reveal-delay="800"
          >
            <a
              data-video="https://player.vimeo.com/video/174002812"
              href="#0"
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src="/static/video-placeholder.jpg"
                alt="Hero"
              />
            </a>
          </div> */}
          {/* <Modal
            id="video-modal"
            show={videoModalActive}
            handleClose={closeModal}
            video="https://www.youtube.com/embed/R_GvQFZ8CIc"
            videoTag="iframe"
          /> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
