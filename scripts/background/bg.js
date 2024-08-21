particlesJS(
  "particles-js",

  {
    particles: {
      number: {
        value: 90,
        density: {
          enable: true,
          value_area: 1000,
        },
      },
      color: {
        value: "#808080",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0.4,
          color: "#000000",
        },
        polygon: {
          nb_sides: 10,
        },
        image: {
          src: "img/github.svg",
          width: 100,
          height: 100,
        },
      },
      opacity: {
        value: 0.,
        random: false,
        anim: {
          enable: false,
          speed: 1.5,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 5,
        random: true,
        anim: {
          enable: false,
          speed: 70,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 347,
        color: "#ffffff",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 4.5,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "push",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: false,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 0.3,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 0.5,
          speed: 3,
        },
        repulse: {
          distance: 194,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
    config_demo: {
      hide_card: false,
      background_color: "#b61924",
      background_image: "",
      background_position: "50% 50%",
      background_repeat: "no-repeat",
      background_size: "cover",
    },
  }
);
