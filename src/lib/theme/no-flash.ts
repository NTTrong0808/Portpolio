// Returns the inline script string that sets data-theme before hydration
export function getNoFlashScript(): string {
  return `(function(){try{var t=localStorage.getItem('portpolio-theme');if(t&&['default','midnight','sunset','terminal','paper','cyberpunk','mono'].includes(t)){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})();`
}
