export const onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({
    itemScope: true,
    itemType: 'http://schema.org/Restaurant',
    className: 'has-navbar-fixed-top'
  });
};
