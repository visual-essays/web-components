import { initTippy } from '../utils'

// Used for reinitialization actious when using editor preview
(window as any).previewInit = function(){initTippy(true)}
