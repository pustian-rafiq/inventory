/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import reactDom from "react-dom";
import Draggable from "react-draggable";
import "./CustomModal.scss";
import closeWidowImg from "./images/close.png";
import minimizeWidowImg from "./images/minimize.png";
import maximizeWidowImg from "./images/square.png";
import resizeWidowImg from "./images/two-square.png";

const CustomModal = ({ isOpen, children, setIsOpen, headline = "" }) => {
  const [minimize, setMinimize] = useState(true);
  const [resize, setResize] = useState(false);
  const [maximize, setMaximize] = useState(true);
  const [drag, setDrag] = useState(true);

  // handle minimize
  const handleminimize = (e) => {
    // variable for targeted modal
    const modal = e.target.parentNode.parentNode.parentNode;
    // empty div to store add minimized modal
    const minimizeModalMain = document.querySelector(".minimize-modal-main");
    // to toggle class in main div of modal
    modal.classList.toggle("resize");
    // to toggle class in modal content div to hida and show the content in modal
    modal.children[1].classList.toggle("minimize");
    // remove the class to minimize the modal
    modal.classList.remove("fullscreen");
    // to append as child inside the minimize modal main div
    minimizeModalMain.appendChild(modal);

    // to place the modal in same position of minimize bar

    // console.log(minimizeModalMain.children.length)

    // for (var i = 0; i < minimizeModalMain.children.length; i++){
    //   console.log('for loop is working')
    // }
  };

  // function for make the modal resize or by default shape
  const handleResize = (e) => {
    // variable for targeted modal
    const modal = e.target.parentNode.parentNode.parentNode;
    // to remove the class and move the modal from minimize to resize position
    modal.classList.remove("resize");
    // to remove the class fullscreen and move the modal from fullscreen to resize position
    modal.classList.remove("fullscreen");
    // appending modal as child of body
    document.body.appendChild(modal);
    // removing the minimize class to get back the content inside the modal
    modal.children[1].classList.remove("minimize");
  };

  // function for make the modal full screen
  const handleMaximize = (e) => {
    // variable for targeted modal
    const modal = e.target.parentNode.parentNode.parentNode;
    // to toggle the fullscreen class when maximize button is clicked
    modal.classList.toggle("fullscreen");
    // removing the remove class to make the modal full screen
    modal.classList.remove("resize");
    // to place the modal in body like by default
    document.body.appendChild(modal);
    // removing the minimize class to show the content inside the modal
    modal.children[1].classList.remove("minimize");
  };

  // function for close the modal
  const handleClose = (e) => {
    // variable for targeted modal
    const modal = e.target.parentNode.parentNode.parentNode;
    // to place the modal on it's default position and to work the close functionality
    document.body.appendChild(modal);
  };

  // function for active modal and move the modal top from other modal
  const handleZIndex = (e) => {
    var modalContainer = document.body;
    // to get all the modals with draggable-main class
    var modals = modalContainer.getElementsByClassName("draggable-main");

    if (modals.length > 1) {
      for (var i = 0; i < modals.length; i++) {
        modals[i].addEventListener("click", function () {
          var current = document.getElementsByClassName("zIndex");
          // If there's no zIndex class
          if (current.length > 0) {
            current[0].className = current[0].className.replace(" zIndex", "");
          }
          // Add the zIndex class to the current/clicked button
          this.className += " zIndex";
        });
      }
    }
  };

  // minimized modal horizontal scroll when the modal is minimized
  const slider = document.querySelector(".minimize-modal-main");
  let isDown = false;
  let startX;
  let scrollLeft;

  slider?.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });
  slider?.addEventListener("mouseleave", () => {
    isDown = false;
  });
  slider?.addEventListener("mouseup", () => {
    isDown = false;
  });

  slider?.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    slider.scrollLeft = scrollLeft - walk;
    console.log(walk);
  });

  // to track media query
  const extraSmallDevice = window.matchMedia("(max-width: 600px)").matches;
  const smallDevice = window.matchMedia("(min-width: 600px)").matches;
  const mediumDevice = window.matchMedia("(min-width: 768px)").matches;
  const largeDevice = window.matchMedia("(min-width: 992px)").matches;
  const extraLargeDevice = window.matchMedia("(min-width: 1200px)").matches;

  return reactDom.createPortal(
    <>
      {isOpen && (
        <Draggable handle="strong" onStart={() => drag}>
          <div
            className="draggable-main"
            id={"modal.id"}
            onClick={(e) => handleZIndex(e)}
          >
            {/* custom modal header  */}
            <div className="custom-modal-header">
              <strong className="modal-header-main">
                <p className="custom-headline">{headline}</p>
                {/* <span className='tooltiptext'>{headline}</span> */}
              </strong>
              <div className="py-2 d-flex justify-content-end modal-actions-img">
                {/* modal actions */}

                {/* minimize icon */}
                {/* {minimize && (
                  <img
                    src={minimizeWidowImg}
                    onClick={(e) => {
                      handleminimize(e);
                      setDrag(false);
                      setMinimize(false);
                      setResize(true);
                      setMaximize(false);
                    }}
                    className="close-img"
                    alt="close images"
                  />
                )} */}

                {/* resize icon */}
                {/* {resize && (
                  <img
                    src={resizeWidowImg}
                    onClick={(e) => {
                      handleResize(e);
                      setDrag(true);
                      setMinimize(true);
                      setResize(false);
                      setMaximize(true);
                    }}
                    className="close-img"
                    alt="close images"
                  />
                )} */}

                {/* maximize  icon*/}
                {/* {maximize && (
                  <img
                    src={maximizeWidowImg}
                    onClick={(e) => {
                      handleMaximize(e);
                      setDrag(true);
                      setMinimize(true);
                      setResize(true);
                      setMaximize(false);
                    }}
                    className="close-img"
                    alt="close images"
                  />
                )} */}

                {/* close icon */}
                {/* <img
                  src={closeWidowImg}
                  onClick={(e) => {
                    //setIsOpen(false);
                    handleClose(e);
                    setDrag(true);
                    setMinimize(true);
                    setResize(false);
                    setMaximize(true);
                  }}
                  className="close-img"
                  alt="close images"
                /> */}
              </div>
            </div>

            {/* custom modal content  */}
            <div className="custom-modal-content">{children}</div>
          </div>
        </Draggable>
      )}
    </>,
    document.body
  );
};

export default CustomModal;
