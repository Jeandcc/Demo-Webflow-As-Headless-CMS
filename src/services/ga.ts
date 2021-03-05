declare global {
  interface Window {
    usesFirebase: boolean;
    usesMegaThemes: boolean;
    websiteUniqueIds: {
      ga: string | null;
      gtm: string | null;
    };
  }
}

type TGAEventNames =
  | 'Opened Desktop Popup'
  | 'Closed Desktop Popup'
  | 'Time spent on Desktop Popup'
  | 'Scrolled to Startup'
  | 'Time spent on startup'
  | 'External link click'
  | 'Viewed "Why this matters"'
  | 'Viewed "Company information"'
  | 'Viewed "External links"'
  | 'Viewed "Speakers"'
  | 'Commented'
  | 'Liked'
  | 'Removed Like'
  | 'Disliked'
  | 'Removed Dislike'
  | 'Played Video'
  | 'Paused Video'
  | 'Watched video to the end'
  | 'Time spent with video playing'
  | 'Opened image/info-graphic'
  | 'Closed image/info-graphic'
  | 'Time spent with image/info-graphic open'
  | 'Swipe with slider arrow (desktop)'
  | 'Swipe with touch (mobile)'
  | 'Swipe with slider dot'
  | 'Slide view X of Y of the startup'
  | 'Time spent on slide X'
  | 'Click next theme link'
  | 'Click prev theme link'
  | 'Click agenda participant link'
  | 'Click agenda startup link'
  | 'Click nav link'
  | 'Click open/close nav button'
  | 'Hover In'
  | 'Hover Out'
  | 'Time spent hovering'
  | 'Click on "more"'
  | 'Login w/ Firebase'
  | 'Signup w/ Firebase'
  | 'Asked for password recover w/ Firebase'
  | 'Login w/ first and last name';

type TGAEventCategories =
  | 'Startup'
  | 'Startup Sections'
  | 'Startup Engagement'
  | 'Startup Video'
  | 'Startup Infographic'
  | 'Startup Swiper'
  | 'Startup Slide'
  | 'Themes Navigation'
  | 'Agenda Participants'
  | 'Navbar'
  | 'Theme Tile'
  | 'login'
  | 'sign_up'
  | 'Authentication';

interface IGADefaults {
  category?: TGAEventCategories;
  label?: string;
}

interface ISendEventReq extends IGADefaults {
  name: TGAEventNames;
  value?: number | string;
  method?: string;
}

export default class GAEventsEmitter {
  defaults = {
    category: '',
    label: '',
  };

  constructor(defaults?: IGADefaults) {
    this.defaults = { ...this.defaults, ...defaults };
  }

  public emit(req: ISendEventReq): void {
    if (!window.gtag) return;

    if (!req.category && !this.defaults.category) {
      console.warn('GA event category not provided');
    }

    if (!req.label && !this.defaults.label) {
      console.warn('GA event label not provided');
    }

    const eventObj:
      | Gtag.CustomParams
      | Gtag.ControlParams
      | Gtag.EventParams
      | undefined = {
      event_category: req.category || this.defaults.category,
      event_label: req.label || this.defaults.label,
      value: req.value,
    };

    if (req.method) eventObj.method = req.method;

    window.gtag('event', req.name, eventObj);
  }
}
