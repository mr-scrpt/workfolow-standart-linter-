import smartgrid from "smart-grid";
/* It's principal settings in smart grid project */
const settings = {
  outputStyle: "scss" /* less || scss || sass || styl */,
  columns: 12 /* number of grid columns */,
  offset: "30px" /* gutter width px || % || rem */,
  mobileFirst: true /* mobileFirst ? 'min-width' : 'max-width' */,
  container: {
    maxWidth: "1100px" /* max-width оn very large screen */,
    fields: "15px" /* side fields */,
  },
  breakPoints: {
    bp1100: {
      width: "1100px" /* -> @media (max-width: 1100px) */,
    },
    bp994: {
      width: "994px",
    },
    bp768: {
      width: "768px",
    },
    bp480: {
      width: "480px",
    },
    /*
        We can create any quantity of break points.

        some_name: {
            width: 'Npx',
            fields: 'N(px|%|rem)',
            offset: 'N(px|%|rem)'
        }
        */
  },
};

smartgrid("./src/styles/lib", settings);
