import { initTippy } from '../utils'

console.log('global.ts');

// Used for reinitialization actious when using editor preview
(window as any).previewInit = function(){initTippy(true)}
