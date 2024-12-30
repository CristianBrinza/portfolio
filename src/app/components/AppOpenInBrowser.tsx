// export const openInAppBrowser = (url: string) => {
//   if (
//     window.navigator.standalone ||
//     window.matchMedia('(display-mode: standalone)').matches
//   ) {
//     window.open(url, '_blank', 'noopener,noreferrer');
//   }
// };

function isStandalone() {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone
  );
}

export const openInAppBrowser = (url: string) => {
  if (isStandalone()) {
    window.open(url, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = url; // Fallback for non-standalone mode
  }
};
