// Service landing pages that live under /blog/<slug>.
// Written as answer-first content: every H2 opens with a direct answer so search
// engines and AI assistants can lift it, and every claim is something HesLab
// actually does. No invented clients, stats or results.
//
// Inline links use [label](/path) and are rendered as router links.

export interface ServiceArticleFaq {
  q: string;
  a: string;
}

export interface ServiceArticle {
  slug: string;
  /** Short name used in cards, breadcrumbs and related-service links. */
  name: string;
  cardDesc: string;

  // ---- SEO ----
  metaTitle: string;
  metaDescription: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  /** Internal note: the user problem this page solves. */
  searchIntent: string;

  // ---- Hero ----
  eyebrow: string;
  h1: string;
  heroSub: string;
  heroVisual: {
    /** Placeholder image: replace with the final hero image for this page. */
    image: string;
    video: string;
    emojis: string[];
    chips: string[];
    alt: string;
    caption: string;
    /** Prompt for producing a bespoke hero image/video for this page. */
    prompt: string;
  };

  // ---- Body ----
  definition: { heading: string; answer: string; points?: string[] };
  why: { heading: string; intro: string; items: { title: string; text: string }[] };
  compare?: {
    heading: string;
    beforeLabel: string;
    beforeItems: string[];
    afterLabel: string;
    afterItems: string[];
  };
  whatWeDo: { heading: string; intro: string; items: { title: string; text: string }[] };
  audience?: { heading: string; items: { title: string; text: string }[] };
  process: { heading: string; intro: string; steps: { title: string; text: string }[] };
  mistakes: { heading: string; intro: string; items: { title: string; text: string }[] };
  examples: { heading: string; text: string; videos: string[] };

  faq: ServiceArticleFaq[];
  related: string[];
  cta: { title: string; text: string };
}

const V = (n: number) => `/videos/video_${n}.mp4`;

export const SERVICE_ARTICLES: ServiceArticle[] = [
  // =====================================================================
  // 1. SHORT-FORM VIDEO EDITING
  // =====================================================================
  {
    slug: 'short-form-video-editing',
    name: 'Short-form Editing',
    cardDesc: 'Turn raw footage into engaging short videos.',
    metaTitle: 'Short-Form Video Editing for Reels, TikTok & Shorts',
    metaDescription:
      'Short-form video editing for Instagram Reels, TikTok and YouTube Shorts. HesLab turns raw footage into videos with strong hooks, pacing, captions and sound.',
    primaryKeyword: 'short form video editing',
    secondaryKeywords: ['reels editing service', 'TikTok video editing', 'YouTube Shorts editor', 'short video editor'],
    searchIntent:
      'Creators and brands who have raw footage and want a short video editor they can trust, and need to understand what the service includes before hiring.',
    eyebrow: 'Short-form video editing',
    h1: 'Short-form videos built to keep people watching',
    heroSub:
      'HesLab transforms raw footage into engaging short videos for Instagram Reels, TikTok, and YouTube Shorts through stronger storytelling, pacing, captions, and visual design.',
    heroVisual: {
      image: '/mock/work_vertical_1.webp',
      video: V(1),
      emojis: ['/emojis/clapper_board.png', '/emojis/magic_wand.png'],
      chips: ['Hook', 'Captions', 'Sound'],
      alt: 'Vertical short-form video frame with captions and an editing timeline overlay',
      caption: 'One vertical frame, edited for the first second, the rhythm and the last frame.',
      prompt:
        'Dark creative-studio scene: a vertical 9:16 video frame floating at center with a slim editing timeline overlapping its lower edge, a kinetic caption on screen, small 3D clapperboard and magic-wand emoji props, soft studio lighting, editorial and premium, no stock-photo people.',
    },
    definition: {
      heading: 'What is short-form video editing?',
      answer:
        'Short-form video editing is the process of turning raw clips into concise vertical videos designed for platforms where attention is limited, like Instagram Reels, TikTok and YouTube Shorts. It combines story structure, cutting, pacing, captions, music and sound so the video makes sense with the sound off and holds attention with it on. The goal is not to make footage shorter, it is to make every second earn its place.',
    },
    why: {
      heading: 'What makes a great short-form edit?',
      intro:
        'A strong edit is a set of small decisions that add up. These are the parts that matter most, and the ones we spend the most time on.',
      items: [
        { title: 'The first seconds', text: 'The opening decides whether anyone stays. We lead with the most interesting frame, line or movement, not a slow introduction.' },
        { title: 'Pacing', text: 'Cuts land on the beat of the speech and the music. Dead air, filler and repeated information get removed.' },
        { title: 'Storytelling', text: 'Even a 20-second video needs a beginning, a turn and a payoff. We shape the footage into that structure.' },
        { title: 'Captions', text: 'Most people watch without sound. Clear, well-timed captions keep the message readable at a glance.' },
        { title: 'Visual rhythm', text: 'Punch-ins, b-roll and motion change at a steady tempo so the eye always has something to follow.' },
        { title: 'Retention', text: 'Every choice is judged by one question: does this make someone more likely to keep watching?' },
      ],
    },
    whatWeDo: {
      heading: 'What we handle',
      intro: 'You send footage and references. We take care of the full edit, so you are not stitching tools together.',
      items: [
        { title: 'Video cutting', text: 'Selecting the best takes and trimming everything that slows the video down.' },
        { title: 'Pacing', text: 'Timing cuts and punch-ins to the voice and the music.' },
        { title: 'Captions', text: 'Readable, on-brand captions placed inside platform safe zones.' },
        { title: 'B-roll', text: 'Supporting visuals that illustrate what is being said.' },
        { title: 'Music', text: 'Tracks that fit the tone of the video without covering the voice.' },
        { title: 'Sound effects', text: 'Subtle hits and transitions that make cuts feel intentional. See [sound design](/blog/sound-design-video-editing).' },
        { title: 'Motion elements', text: 'Animated callouts and text where they help. See [motion design for short videos](/blog/motion-design-short-videos).' },
      ],
    },
    process: {
      heading: 'How a short-form edit works',
      intro: 'A simple pipeline with clear hand-offs, built to run asynchronously so there are no extra meetings.',
      steps: [
        { title: 'Footage', text: 'You share raw clips, a reference you like, and a line about the goal of the video.' },
        { title: 'Story structure', text: 'We find the strongest hook and outline the order of the video before cutting.' },
        { title: 'Editing', text: 'Cutting, captions, b-roll, music, sound and motion come together in one pass.' },
        { title: 'Final export', text: 'You review, request revisions, and receive vertical exports ready to publish.' },
      ],
    },
    mistakes: {
      heading: 'Common short-form editing mistakes',
      intro: 'These are the issues we fix most often when creators bring us footage they have already tried to edit.',
      items: [
        { title: 'A slow start', text: 'Greetings, logos or setup in the first seconds. Start on the point instead.' },
        { title: 'Over-editing', text: 'Effects on every cut compete with the message. Motion should guide attention, not distract.' },
        { title: 'Captions in the wrong place', text: 'Text hidden behind platform buttons or cropped on export is lost.' },
        { title: 'Music over the voice', text: 'When the track fights the speech, viewers leave. Levels matter.' },
        { title: 'No consistent look', text: 'Every video feels different, so nothing becomes recognizable. See [brand style for video](/blog/video-brand-style).' },
      ],
    },
    examples: {
      heading: 'What it looks like in practice',
      text: 'A few vertical frames from our own edits. Browse more in the [portfolio](/work).',
      videos: [V(1), V(2), V(3)],
    },
    faq: [
      {
        q: 'What does a short-form video editor do?',
        a: 'A short-form video editor takes raw footage and turns it into a finished vertical video for platforms like Reels, TikTok and YouTube Shorts. That includes choosing the best moments, cutting for pace, adding captions, b-roll, music and sound effects, and exporting in the right format. A good editor also shapes the story and the first seconds, not just the cuts.',
      },
      {
        q: 'How long does editing a Reel take?',
        a: 'It depends on the length, the amount of footage and how much motion work is involved. As a guide, our standard turnaround is around three days per video, and it can be faster or slower for simple or complex edits. Revisions are part of the process and are handled after the first cut.',
      },
      {
        q: 'What footage should I provide?',
        a: 'Send the raw clips you recorded, ideally in their original quality, along with any references you like and a short note on the goal and platform. Extra material such as b-roll, logos or brand colors helps. If you are unsure what to send, share what you have and we will tell you what is usable.',
      },
    ],
    related: ['motion-design-short-videos', 'content-packs-video-editing', 'video-brand-style'],
    cta: {
      title: 'Have footage waiting to be edited?',
      text: 'Send it over and tell us the goal. We will come back with a clear plan and a first cut.',
    },
  },

  // =====================================================================
  // 2. BRAND VISUAL STYLE
  // =====================================================================
  {
    slug: 'video-brand-style',
    name: 'Brand Visual Style',
    cardDesc: 'Build a recognizable editing style for your content.',
    metaTitle: 'Video Brand Style: Build a Recognizable Editing Look',
    metaDescription:
      'Build a consistent video brand style with captions, colors, transitions and pacing that make your short-form content recognizable. Creator branding by HesLab.',
    primaryKeyword: 'video brand style',
    secondaryKeywords: ['content style guide', 'creator branding', 'visual identity for videos'],
    searchIntent:
      'Creators and small brands whose content feels inconsistent and who want a repeatable look they can be recognized by.',
    eyebrow: 'Brand visual style',
    h1: 'A recognizable style for every video you publish',
    heroSub:
      'A consistent editing language helps creators and brands become recognizable across every piece of content.',
    heroVisual: {
      image: '/mock/work_vertical_2.webp',
      video: V(2),
      emojis: ['/emojis/memo.png', '/emojis/magic_wand.png'],
      chips: ['Colors', 'Type', 'Pacing'],
      alt: 'Notes icon labelled Brand style next to a vertical video frame with color swatches',
      caption: 'Colors, captions, transitions and pacing, written down once and used every time.',
      prompt:
        'Dark editorial scene: a vertical video frame beside a floating notes-style icon reading "Brand style" with hand-drawn scribbles, a row of three color swatches and a caption sample, small 3D memo and wand emoji, soft studio glow, premium and playful.',
    },
    definition: {
      heading: 'What is a video style?',
      answer:
        'A video style is the set of repeatable editing choices that make your videos look like they come from the same place: caption design, color, typography, transitions, pacing and sound. It works like a visual identity for video. When it is consistent, viewers recognize your content in a feed before they see your name.',
    },
    why: {
      heading: 'Why consistency matters',
      intro: 'Recognizability is built through repetition. A consistent style does a few things for you.',
      items: [
        { title: 'It makes you recognizable', text: 'People start to identify your videos by look and feel, even while scrolling fast.' },
        { title: 'It builds trust', text: 'A steady, deliberate style signals care. Random edits can feel accidental.' },
        { title: 'It speeds up production', text: 'Decisions about captions, colors and transitions are made once, so every new video is faster to make.' },
        { title: 'It keeps teams aligned', text: 'If more than one person edits, a style guide keeps the output coherent.' },
      ],
    },
    compare: {
      heading: 'Before and after: random edits vs a brand system',
      beforeLabel: 'Random edits',
      beforeItems: [
        'Different caption fonts and colors each week',
        'Transitions chosen on impulse',
        'Pacing that changes from video to video',
        'Music and sound with no shared taste',
      ],
      afterLabel: 'A recognizable brand system',
      afterItems: [
        'One caption style, used everywhere',
        'A small, consistent set of transitions',
        'A pacing signature viewers can feel',
        'A defined sound palette and color grade',
      ],
    },
    whatWeDo: {
      heading: 'Building your editing identity',
      intro: 'We work from your content, your references and your taste, then turn them into a style you can repeat.',
      items: [
        { title: 'Colors', text: 'A palette and a color treatment that fits your brand and your footage.' },
        { title: 'Typography', text: 'Caption and title typography with clear rules for size, weight and placement.' },
        { title: 'Captions', text: 'How words appear, which ones get emphasis, and how long they stay.' },
        { title: 'Transitions', text: 'A small set of transitions that match your tone, used with restraint.' },
        { title: 'Pacing', text: 'The rhythm of cuts and motion that feels like you.' },
        { title: 'Visual references', text: 'A short reference board of looks to aim for, and ones to avoid.' },
      ],
    },
    process: {
      heading: 'How we build a style',
      intro: 'A short, hands-on process. You keep a clear reference for every future video.',
      steps: [
        { title: 'Review', text: 'We look at your existing content and the references you love.' },
        { title: 'Define', text: 'We choose colors, type, captions, transitions and pacing rules.' },
        { title: 'Apply', text: 'We use the style on real videos, so it is tested on your footage, not on a slide.' },
        { title: 'Refine', text: 'We adjust based on feedback until it feels right, then keep it consistent.' },
      ],
    },
    mistakes: {
      heading: 'Common branding mistakes in video',
      intro: 'Most inconsistent content comes from a few repeating habits.',
      items: [
        { title: 'Copying trends every week', text: 'Trends are fine as accents. A style should not change with every format.' },
        { title: 'Too many fonts and colors', text: 'More variety rarely helps. A tight system is easier to recognize.' },
        { title: 'No written rules', text: 'If the style only lives in your head, it will drift. Write it down.' },
        { title: 'Style over clarity', text: 'A look that makes the message harder to read is not working.' },
      ],
    },
    examples: {
      heading: 'Style in motion',
      text: 'Frames from our own edits, shown here as a sample of how a consistent look carries across videos. See the full [portfolio](/work).',
      videos: [V(2), V(4), V(5)],
    },
    faq: [
      {
        q: 'Why does my content feel inconsistent?',
        a: 'Content usually feels inconsistent when each video is edited from scratch with new fonts, colors, transitions and pacing. Without a few fixed rules, small choices drift. Defining a simple style for captions, color and rhythm and applying it every time fixes most of it.',
      },
      {
        q: 'How can creators build a recognizable style?',
        a: 'Start by choosing a small set of repeatable elements: one caption style, a limited palette, a few transitions and a consistent pace. Apply them to every video, and only change them on purpose. Recognition comes from repetition, so keep the system tight and let it carry across your content.',
      },
    ],
    related: ['short-form-video-editing', 'cinematic-video-editing', 'content-packs-video-editing'],
    cta: {
      title: 'Want your videos to look like one brand?',
      text: 'Tell us about your content and what you want to be known for. We will shape the style around it.',
    },
  },

  // =====================================================================
  // 3. MOTION DESIGN FOR SHORT VIDEOS
  // =====================================================================
  {
    slug: 'motion-design-short-videos',
    name: 'Motion & Graphics',
    cardDesc: 'Add motion that makes your content stand out.',
    metaTitle: 'Motion Design for Short Videos: Kinetic Captions & Graphics',
    metaDescription:
      'Motion design for short-form video: kinetic typography, animated captions, transitions and callouts that guide attention. Motion graphics editing by HesLab.',
    primaryKeyword: 'motion design for videos',
    secondaryKeywords: ['kinetic typography', 'animated captions', 'motion graphics editing'],
    searchIntent:
      'Creators and brands who want more energy and clarity in their videos and are asking what motion design is and whether they need it.',
    eyebrow: 'Motion & graphics',
    h1: 'Motion that gives your videos more energy',
    heroSub:
      'Motion design adds visual hierarchy and guides viewers through information, so important moments land and the video feels alive.',
    heroVisual: {
      image: '/mock/work_vertical_3.webp',
      video: V(3),
      emojis: ['/emojis/magic_wand.png', '/emojis/clapper_board.png'],
      chips: ['Kinetic text', 'Callouts', 'Transitions'],
      alt: 'Vertical video with animated kinetic captions and motion callouts',
      caption: 'Text and shapes move with the voice, so the eye always knows where to look.',
      prompt:
        'Dark studio scene: a vertical video frame with bold kinetic captions mid-animation, motion-path guides and small callout shapes around it, a floating timeline with keyframes, small 3D wand emoji, premium editorial look.',
    },
    definition: {
      heading: 'What is motion design?',
      answer:
        'Motion design is the use of animation to communicate: moving text, shapes, graphics and transitions that support what a video is saying. In short-form video it covers things like animated captions, callouts and transitions that direct attention. Good motion design explains and emphasizes, it does not just decorate.',
    },
    why: {
      heading: 'Why motion improves short videos',
      intro: 'Motion works because viewers are drawn to movement. Used with intent, it improves clarity as well as energy.',
      items: [
        { title: 'It guides the eye', text: 'Movement shows what is important right now, so viewers do not have to search the frame.' },
        { title: 'It builds hierarchy', text: 'Key words and numbers can be larger and move first, while supporting detail stays quiet.' },
        { title: 'It carries information', text: 'Animated graphics explain ideas faster than a still image or a paragraph of caption.' },
        { title: 'It sets rhythm', text: 'Motion that lands on the beat makes cuts feel tight and intentional.' },
      ],
    },
    whatWeDo: {
      heading: 'Types of motion we use',
      intro: 'We choose the lightest motion that does the job, and use more only when the idea needs it.',
      items: [
        { title: 'Kinetic captions', text: 'Captions that animate with the voice, emphasizing the words that matter.' },
        { title: 'Animated graphics', text: 'Simple custom graphics that explain a point, a number or a step.' },
        { title: 'Transitions', text: 'Cuts and movements that connect scenes without drawing attention to themselves.' },
        { title: 'Callouts', text: 'Arrows, highlights and labels that point to the detail you want seen.' },
        { title: 'Visual effects', text: 'Subtle effects such as masks, light and texture where they support the story.' },
      ],
    },
    process: {
      heading: 'How we add motion',
      intro: 'Motion is planned with the edit, not painted over it at the end.',
      steps: [
        { title: 'Pick the moments', text: 'We mark where a viewer needs help: the hook, key facts and the payoff.' },
        { title: 'Design the system', text: 'We set the type, shapes and movement style so it matches your brand.' },
        { title: 'Animate', text: 'We build the motion in sync with the voice, music and cuts.' },
        { title: 'Polish', text: 'We tidy timing and easing, and remove anything that does not earn its place.' },
      ],
    },
    mistakes: {
      heading: 'Common motion design mistakes',
      intro: 'Motion fails when it fights the content.',
      items: [
        { title: 'Animating everything', text: 'If everything moves, nothing stands out. Leave room to rest.' },
        { title: 'Motion out of sync', text: 'Animation that ignores the beat and the voice feels random.' },
        { title: 'Hard to read text', text: 'Fast or tiny kinetic text loses the message. Readability comes first.' },
        { title: 'Mismatched tone', text: 'Playful effects on a serious topic, or the reverse, break trust.' },
      ],
    },
    examples: {
      heading: 'Motion in our edits',
      text: 'Frames from our own videos where captions and graphics move with the story. More in the [portfolio](/work).',
      videos: [V(3), V(5), V(6)],
    },
    faq: [
      {
        q: 'Do short videos need motion graphics?',
        a: 'Not always. A clean cut with clear captions is often enough. Motion graphics help most when you need to explain something, emphasize a key moment or give a video a distinct look. We add motion where it improves clarity or energy, and leave it out where it would only decorate.',
      },
      {
        q: 'What is kinetic typography?',
        a: 'Kinetic typography is text that moves as part of the message, such as words that appear, scale or shift in time with the voice. In short videos it is commonly used for captions and key phrases, because it keeps attention on the words that matter and makes the spoken message easier to follow with the sound off.',
      },
    ],
    related: ['short-form-video-editing', 'sound-design-video-editing', 'video-brand-style'],
    cta: {
      title: 'Want more energy in your videos?',
      text: 'Share a video you like and the one you want to improve. We will show you how motion can help.',
    },
  },

  // =====================================================================
  // 4. SOUND DESIGN
  // =====================================================================
  {
    slug: 'sound-design-video-editing',
    name: 'Sound Design',
    cardDesc: 'Make every cut feel better with sound.',
    metaTitle: 'Sound Design for Videos: Music, SFX & Audio Cleanup',
    metaDescription:
      'Sound design for short-form video: music selection, sound effects, audio cleanup and impact sounds that make cuts feel better. Sound design by HesLab.',
    primaryKeyword: 'sound design for videos',
    secondaryKeywords: ['video editing sound effects', 'music selection', 'SFX editing'],
    searchIntent:
      'Creators who sense their edits feel flat and want to understand how sound changes a video and what a sound design service covers.',
    eyebrow: 'Sound design',
    h1: 'The invisible layer behind great edits',
    heroSub:
      'Sound shapes how a video feels. We choose music, add effects and clean the audio so every cut lands the way it should.',
    heroVisual: {
      image: '/mock/work_4.webp',
      video: V(4),
      emojis: ['/emojis/clapper_board.png', '/emojis/eyes.png'],
      chips: ['Music', 'SFX', 'Clean audio'],
      alt: 'Vertical video above an audio timeline with music and sound effect tracks',
      caption: 'Music, impacts and cleanup stacked under the picture so cuts feel earned.',
      prompt:
        'Dark studio scene: a vertical video frame over a stylized audio timeline with an orange music track and a purple sound-effect track, tiny waveform bars, small 3D clapperboard emoji, soft glow, premium editorial look.',
    },
    definition: {
      heading: 'What is sound design in video editing?',
      answer:
        'Sound design is the craft of building everything you hear in a video: music, sound effects, transitions, ambience and clean voice. In short-form video it is what makes cuts feel smooth, moments feel important and the whole piece feel finished. Viewers rarely notice good sound, but they quickly feel bad sound.',
    },
    why: {
      heading: 'Why sound matters',
      intro: 'Picture gets the attention, sound decides how it feels.',
      items: [
        { title: 'Emotion', text: 'Music sets the mood in a second. The same footage can feel funny, tense or warm depending on the track.' },
        { title: 'Rhythm', text: 'Cuts that land on the beat feel intentional and keep the video moving.' },
        { title: 'Transitions', text: 'Whooshes and hits smooth over cuts so changes between scenes feel natural.' },
        { title: 'Attention', text: 'A well-placed sound at the start gives viewers a reason to stay.' },
      ],
    },
    whatWeDo: {
      heading: 'What we add',
      intro: 'Sound is layered with the edit, then balanced so the voice stays clear.',
      items: [
        { title: 'Music selection', text: 'Tracks that match the tone and the tempo of the edit.' },
        { title: 'Sound effects', text: 'Transitions, risers and small details that support what is on screen.' },
        { title: 'Audio cleanup', text: 'Reducing noise and evening out levels so the voice is easy to understand.' },
        { title: 'Impact sounds', text: 'Hits and accents on key moments to give them weight.' },
      ],
    },
    process: {
      heading: 'How we approach sound',
      intro: 'We treat audio as part of the edit from the first cut.',
      steps: [
        { title: 'Clean the voice', text: 'Remove noise and set a consistent level for speech.' },
        { title: 'Choose the bed', text: 'Select music that supports the story without competing with it.' },
        { title: 'Layer effects', text: 'Add transitions and accents in sync with the picture.' },
        { title: 'Mix', text: 'Balance everything so it sounds good on a phone speaker and on headphones.' },
      ],
    },
    mistakes: {
      heading: 'Common sound mistakes',
      intro: 'A few audio habits quietly hurt otherwise good videos.',
      items: [
        { title: 'Music too loud', text: 'If the track competes with the voice, the message is lost.' },
        { title: 'Too many effects', text: 'Constant sound effects get tiring. Use them where they add meaning.' },
        { title: 'Ignoring room noise', text: 'Hum and echo make even great footage feel amateur. Clean it up.' },
        { title: 'Wrong tempo', text: 'Music that does not match the pace of the cuts makes edits feel off.' },
      ],
    },
    examples: {
      heading: 'Sound in our edits',
      text: 'Turn the sound on for these vertical frames from our own videos. More in the [portfolio](/work).',
      videos: [V(4), V(1), V(6)],
    },
    faq: [
      {
        q: 'Why is sound important in video editing?',
        a: 'Sound controls emotion, rhythm and clarity. Clear voice makes the message understandable, music sets the mood, and effects smooth transitions and emphasize moments. Many viewers judge quality by sound without realizing it, so good audio makes the whole video feel more professional.',
      },
      {
        q: 'How does music affect short videos?',
        a: 'Music sets the tone and the pace of a short video. Upbeat tracks speed up the feel of the edit, calm tracks slow it down, and the beat gives your cuts something to land on. The right track supports the story, while the wrong one competes with the voice or clashes with the mood.',
      },
    ],
    related: ['short-form-video-editing', 'cinematic-video-editing', 'motion-design-short-videos'],
    cta: {
      title: 'Want your edits to sound as good as they look?',
      text: 'Send a video that feels flat. We will tell you what sound can do for it.',
    },
  },

  // =====================================================================
  // 5. CINEMATIC VIDEO EDITING
  // =====================================================================
  {
    slug: 'cinematic-video-editing',
    name: 'Cinematic Editing',
    cardDesc: 'Create a more polished, story-driven look.',
    metaTitle: 'Cinematic Video Editing for Short-Form Content',
    metaDescription:
      'Cinematic video editing for Reels and Shorts: color grading, composition, pacing and emotion for a polished, story-driven look. Professional editing by HesLab.',
    primaryKeyword: 'cinematic video editing',
    secondaryKeywords: ['cinematic reels', 'professional video editing', 'color grading'],
    searchIntent:
      'Creators and brands who want their short videos to look more polished and film-like and want to know what makes an edit cinematic.',
    eyebrow: 'Cinematic editing',
    h1: 'Cinematic storytelling for short-form content',
    heroSub:
      'A more polished, story-driven look: considered color, composition and pacing, built for the vertical frame.',
    heroVisual: {
      image: '/mock/work_5.webp',
      video: V(5),
      emojis: ['/emojis/clapper_board.png', '/emojis/eyes.png'],
      chips: ['Color', 'Framing', 'Emotion'],
      alt: 'Vertical video frame with a cinematic color grade and a color wheel overlay',
      caption: 'Color, framing and pacing shaped around the story, not around a preset.',
      prompt:
        'Dark studio scene: a vertical video frame with a rich filmic grade, subtle letterbox crop marks, a small color wheel and waveform scope overlapping its edge, 3D clapperboard emoji, moody and premium.',
    },
    definition: {
      heading: 'What makes editing cinematic?',
      answer:
        'Cinematic editing is storytelling through deliberate choices in color, composition, pacing and sound, so that a video feels like a scene from a film rather than a clip from a phone. It is less about a filter and more about intent: every shot, cut and tone supports one emotion. In short-form video, it means doing that in a few seconds, in a vertical frame.',
      points: ['Color', 'Composition', 'Pacing', 'Emotion', 'Storytelling'],
    },
    why: {
      heading: 'What gives a video a cinematic feel',
      intro: 'Five things do most of the work.',
      items: [
        { title: 'Color', text: 'A consistent, intentional grade gives footage mood and ties different shots together.' },
        { title: 'Composition', text: 'Framing and crops that direct the eye, even inside a tall vertical frame.' },
        { title: 'Pacing', text: 'Cuts that let moments breathe, then speed up when the energy rises.' },
        { title: 'Emotion', text: 'Music and sound that carry the feeling of the scene.' },
        { title: 'Storytelling', text: 'A clear beginning, turn and ending, even in a very short video.' },
      ],
    },
    compare: {
      heading: 'Cinematic editing vs normal editing',
      beforeLabel: 'Normal editing',
      beforeItems: [
        'Clips joined in order, with default color',
        'Cuts at a fixed rhythm',
        'Music dropped in under the footage',
        'Focus on information only',
      ],
      afterLabel: 'Cinematic editing',
      afterItems: [
        'A graded look that matches the mood',
        'Pacing that follows emotion, with room to breathe',
        'Sound designed with the picture',
        'Focus on the feeling of the story',
      ],
    },
    whatWeDo: {
      heading: 'What we do',
      intro: 'We shape the look and the story together, without losing the speed that short-form needs.',
      items: [
        { title: 'Color grading', text: 'Balancing and grading footage so it feels consistent and intentional.' },
        { title: 'Shot selection', text: 'Choosing the most expressive moments and building the sequence around them.' },
        { title: 'Pacing and rhythm', text: 'Editing to the emotion of the scene, not just to a timer.' },
        { title: 'Sound and music', text: 'Layering tracks and effects that carry the mood. See [sound design](/blog/sound-design-video-editing).' },
        { title: 'Finishing', text: 'Subtle texture, framing and export settings for a polished final video.' },
      ],
    },
    process: {
      heading: 'How a cinematic edit comes together',
      intro: 'A clear order of work keeps the story first and the polish last.',
      steps: [
        { title: 'Find the story', text: 'We decide the feeling of the video and what each moment is for.' },
        { title: 'Build the cut', text: 'We assemble the sequence and set the pacing.' },
        { title: 'Grade', text: 'We balance shots and apply a look that supports the mood.' },
        { title: 'Finish', text: 'We add sound, final details and export for each platform.' },
      ],
    },
    mistakes: {
      heading: 'Common mistakes when going cinematic',
      intro: 'Chasing a film look can backfire on social platforms.',
      items: [
        { title: 'Heavy filters', text: 'A preset on top of unbalanced footage looks fake. Fix exposure first.' },
        { title: 'Pacing that is too slow', text: 'Slow cuts lose viewers in short-form. Keep moments tight, with a few breaths.' },
        { title: 'Letterboxing for its own sake', text: 'Black bars waste space in a vertical frame unless they serve the shot.' },
        { title: 'Style without a story', text: 'A beautiful look does not rescue a video that has no point.' },
      ],
    },
    examples: {
      heading: 'A cinematic look in practice',
      text: 'Frames from our own edits, graded and paced for the vertical frame. Explore more in the [portfolio](/work).',
      videos: [V(5), V(3), V(2)],
    },
    faq: [
      {
        q: 'How do you make a video look cinematic?',
        a: 'Start with the story and the feeling you want. Then support it with intentional color, thoughtful framing, pacing that follows emotion and sound that carries the mood. Good lighting and stable footage help, and finishing details like subtle texture make it feel polished. A filter alone will not do it.',
      },
      {
        q: 'What is cinematic color grading?',
        a: 'Cinematic color grading is adjusting the color and contrast of footage so it matches the mood of the story and stays consistent across shots. It usually starts with balancing exposure and white balance, then applies a deliberate look, for example warmer highlights or cooler shadows. The aim is mood and cohesion, not an effect for its own sake.',
      },
    ],
    related: ['video-brand-style', 'sound-design-video-editing', 'short-form-video-editing'],
    cta: {
      title: 'Want your videos to feel more like film?',
      text: 'Share your footage and the mood you are going for. We will build the look around it.',
    },
  },

  // =====================================================================
  // 6. CONTENT PACKS
  // =====================================================================
  {
    slug: 'content-packs-video-editing',
    name: 'Content Packs',
    cardDesc: 'Consistent edits, delivered regularly.',
    metaTitle: 'Content Packs: Monthly Short-Form Video Editing',
    metaDescription:
      'Content packs for creators and brands: recurring short-form video edits in a consistent style, with captions, sound design, revisions and a clear delivery schedule.',
    primaryKeyword: 'content editing packages',
    secondaryKeywords: ['monthly video editing service', 'creator content packages', 'reels editing package'],
    searchIntent:
      'Creators and founders who need steady video output and want to know how a monthly or recurring editing package works.',
    eyebrow: 'Content packs',
    h1: 'Consistent content without editing every week',
    heroSub:
      'Content packs provide creators and brands with recurring edited videos while maintaining a consistent visual style.',
    heroVisual: {
      image: '/mock/work_6.webp',
      video: V(6),
      emojis: ['/emojis/package.png', '/emojis/clapper_board.png'],
      chips: ['10 videos', 'One style', 'On schedule'],
      alt: 'Stack of vertical video frames with a package emoji and a delivery calendar',
      caption: 'A set of videos made together, so they look like one body of work.',
      prompt:
        'Dark studio scene: a fanned stack of vertical video frames in one consistent style, a small 3D package emoji, a minimal delivery-schedule strip beneath, soft glow, premium editorial look.',
    },
    definition: {
      heading: 'What are content packs?',
      answer:
        'A content pack is a set of short-form videos edited together in one consistent style, delivered on a clear schedule. Instead of ordering one edit at a time, you send footage regularly and receive a batch of finished videos. It saves time, keeps your look consistent and makes publishing predictable.',
    },
    why: {
      heading: 'Why a pack beats one-off edits',
      intro: 'Consistency compounds. A pack is built around that idea.',
      items: [
        { title: 'Consistent style', text: 'Every video is made with the same captions, color and pacing, so your feed looks coherent.' },
        { title: 'Predictable delivery', text: 'You know what arrives and when, so you can plan posting.' },
        { title: 'Less overhead', text: 'No briefing from zero each time. The style and preferences are already set.' },
        { title: 'Better value', text: 'Editing several videos together is more efficient than treating each one separately.' },
      ],
    },
    audience: {
      heading: 'Who content packs are for',
      items: [
        { title: 'Creators', text: 'Who record often and want editing off their plate.' },
        { title: 'Founders', text: 'Who share ideas and updates and need polished short videos without a production team.' },
        { title: 'Personal brands', text: 'Who want a recognizable look across every post.' },
        { title: 'Businesses', text: 'Who publish regularly and need videos that match their brand.' },
      ],
    },
    whatWeDo: {
      heading: 'What is included',
      intro: 'Packs bundle the parts of the edit that matter for a steady content flow.',
      items: [
        { title: 'Multiple short videos', text: 'Our Content Pack is built around 10 short-form videos. See [pricing](/#pricing) for the current details.' },
        { title: 'Consistent style', text: 'A shared look across the whole batch. See [brand style for video](/blog/video-brand-style).' },
        { title: 'Captions', text: 'Clear, on-brand captions throughout.' },
        { title: 'Sound design', text: 'Music and effects that match your tone. See [sound design](/blog/sound-design-video-editing).' },
        { title: 'Revisions', text: 'Feedback rounds so each video lands the way you want.' },
        { title: 'Delivery schedule', text: 'A clear timeline, with a standard turnaround of about three days for a pack.' },
      ],
    },
    process: {
      heading: 'How a content pack works',
      intro: 'A repeatable rhythm that keeps your content moving.',
      steps: [
        { title: 'Set the style', text: 'We agree on the look, tone and references for your content.' },
        { title: 'Send footage', text: 'You share raw clips for the batch in a shared folder.' },
        { title: 'We edit', text: 'We edit the videos together so they feel like one set.' },
        { title: 'Review and deliver', text: 'You give feedback, we refine, and you receive final exports ready to post.' },
      ],
    },
    mistakes: {
      heading: 'Common mistakes with recurring content',
      intro: 'A pack works best when the basics are in place.',
      items: [
        { title: 'No agreed style', text: 'Without a defined look, a batch can end up feeling uneven.' },
        { title: 'Late or scattered footage', text: 'Sending clips in pieces slows everything down. Share the batch together.' },
        { title: 'Vague feedback', text: 'Specific notes, like a timestamp and what to change, save a revision round.' },
        { title: 'Quantity over quality', text: 'More posts only help if each one is worth watching.' },
      ],
    },
    examples: {
      heading: 'Videos from one visual world',
      text: 'A batch of vertical frames from our own work, shown here to illustrate how a set of videos can share a look. See the [portfolio](/work).',
      videos: [V(1), V(4), V(6)],
    },
    faq: [
      {
        q: 'What is a monthly editing package?',
        a: 'A monthly editing package is a recurring arrangement where you send footage regularly and receive a set of edited short videos in a consistent style. It replaces ordering single edits and makes your publishing schedule more predictable. The exact scope, such as number of videos and revisions, is agreed upfront.',
      },
      {
        q: 'How many videos are included?',
        a: 'Our Content Pack is designed around 10 short-form videos, and the one-off option covers a single video. Details can change, so check the [pricing](/#pricing) section for what is currently offered, or get in touch if you need something different.',
      },
    ],
    related: ['short-form-video-editing', 'video-brand-style', 'sound-design-video-editing'],
    cta: {
      title: 'Ready to stop editing every week?',
      text: 'Tell us how often you publish and we will suggest a pack that fits.',
    },
  },
];

export const getServiceArticle = (slug: string): ServiceArticle | undefined =>
  SERVICE_ARTICLES.find((a) => a.slug === slug);
