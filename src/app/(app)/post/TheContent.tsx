import Image from 'next/image'

/**
 * Demo article bodies.
 *
 * The post page is the screen a reader spends longest on, so these are written
 * rather than filled, and there are four of them picked by category — opening
 * two articles in a row should not show the same words. Each one exercises the
 * full set of prose styles (headings, lists, a pull quote, a figure, a code
 * block) so the typography is visible without anyone having to hunt for it.
 *
 * To render your own content instead, delete everything below the component and
 * return the `content` prop — it is already passed in:
 *
 *   return <div dangerouslySetInnerHTML={{ __html: content }} />
 *
 * Sanitise it first if it can come from anyone but you.
 */

type Topic = 'technology' | 'travel' | 'food' | 'culture'

// Matched against the headline first. The demo fixtures assign categories fairly
// loosely — a piece on French cuisine is filed under Architecture — and the
// headline is what a reader has just read, so it is the better signal.
const TOPIC_BY_KEYWORD: [RegExp, Topic][] = [
  // Word boundaries on the short ones: without them `art` matches "smarter".
  // The four bodies are really four voices — craft, attention, practice, rigour
  // — so a headline is matched to the one that reads naturally beneath it
  // rather than to a subject that happens to share a word.
  [/cuisine|food|recipe|cook|chef|coffee|wine/i, 'food'],
  [
    /travel|destination|journey|mountain|ocean|rainforest|wildlife|asia|architect|urban|\bcity\b|airport|mindful|meditat|sustainab|\bliving\b/i,
    'travel',
  ],
  [
    /music|jazz|\bbeat|piano|symphon|\brock\b|festival|photograph|\bart\b|\bfilm|album|concert|collier|chopin|tomorrowland|champion|olympic|world cup|fitness/i,
    'culture',
  ],
  [
    /\bai\b|tech|react|crypto|blockchain|digital|space|mars|science|internet|device|remote work|education|interactive|\bdata\b|software/i,
    'technology',
  ],
]

const TOPIC_BY_CATEGORY: Record<string, Topic> = {
  technology: 'technology',
  science: 'technology',
  education: 'technology',
  finance: 'technology',
  typography: 'technology',
  travel: 'travel',
  garden: 'travel',
  architecture: 'travel',
  food: 'food',
  health: 'food',
  wellness: 'food',
  fitness: 'food',
  music: 'culture',
  photography: 'culture',
  art: 'culture',
  history: 'culture',
}

const FIGURES: Record<Topic, { src: string; alt: string; caption: string }> = {
  technology: {
    src: 'https://images.unsplash.com/photo-1534445867742-43195f401b6c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'A workstation lit only by the screen, late in a build cycle',
    caption: 'The hours that decide whether a system holds are rarely the ones in the launch photos.',
  },
  travel: {
    src: 'https://images.unsplash.com/photo-1469796466635-455ede028aca?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'An empty street in the blue hour before the shops open',
    caption: 'Six in the morning, before the city puts its face on.',
  },
  food: {
    src: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'A pan held off the heat, mid-service',
    caption: 'Most of the technique is knowing when to take the pan off the heat.',
  },
  culture: {
    src: 'https://images.unsplash.com/photo-1489493585363-d69421e0edd3?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0',
    alt: 'A mixing desk with the faders set for a take',
    caption: 'Every fader on this desk is a decision someone will argue about later.',
  },
}

function Figure({ topic }: { topic: Topic }) {
  const figure = FIGURES[topic]

  return (
    <figure>
      <Image
        src={figure.src}
        alt={figure.alt}
        sizes="(max-width: 1024px) 100vw, 1240px"
        className="rounded-2xl"
        width={1635}
        height={774}
      />
      <figcaption>{figure.caption}</figcaption>
    </figure>
  )
}

function TechnologyBody() {
  return (
    <>
      <p>
        The demo always works. That is the first thing anyone shipping a system like this learns, and usually the most
        expensive lesson on the schedule.
      </p>
      <p>
        A demo runs on the happy path — clean input, a forgiving room, someone at the keyboard who knows which button
        not to press. Production runs on everything else: the malformed upload at two in the morning, the person who
        pastes a spreadsheet into a field built for a name, the region where the connection drops every ninety seconds
        and nobody thought to test what happens on the way back up.
      </p>
      <h2>The gap nobody puts in the estimate</h2>
      <p>
        Teams are good at estimating the part they can picture. The model, the endpoint, the screen. What gets left out
        is the work that only appears once real people touch the thing:
      </p>
      <ul>
        <li>
          Deciding what the system does when it is <em>unsure</em>, rather than when it is wrong.
        </li>
        <li>Making a failure legible to someone who did not build it.</li>
        <li>Undoing things. Almost nothing ships with a way back.</li>
      </ul>
      <p>
        None of that is glamorous and all of it is load-bearing. The teams that ship well are not the ones with the
        cleverest architecture; they are the ones who wrote down what happens when it breaks before they had to find
        out.
      </p>
      <Figure topic="technology" />
      <h3>Measure the boring number</h3>
      <p>
        There is usually one number that decides whether a project is going well, and it is rarely the one on the slide.
        Not throughput — <strong>recovery time</strong>. How long between something going wrong and somebody knowing.
        Everything else is downstream of that.
      </p>
      <blockquote>
        <p>
          You do not get judged on your best day. You get judged on how you behave on your worst one, and on whether
          anyone had to find out from a customer.
        </p>
      </blockquote>
      <h2>A worked example</h2>
      <p>
        The shape of the fix is almost always the same: make the failure a value you can pass around instead of an
        exception you hope someone catches.
      </p>
      <pre className="rounded-2xl!">
        <code className="language-js">
          {`async function load(id) {
  const res = await fetch(\`/api/items/\${id}\`)

  if (!res.ok) {
    // A result, not a throw: the caller decides what the reader sees.
    return { ok: false, status: res.status }
  }

  return { ok: true, data: await res.json() }
}`}
        </code>
      </pre>
      <p>
        It is not a clever change. It moves one decision from the place that cannot make it — deep in a helper, with no
        idea what screen it is on — to the place that can.
      </p>
      <h3>What to take away</h3>
      <h4>Start with the failure, not the feature.</h4>
      <p>
        Write the error state first and the happy path second. The order sounds pedantic and it changes the design more
        than any framework choice will. By the time you get to the part everyone was excited about, the hard questions
        are already answered — and the demo, when you finally give it, is the same code the customers are running.
      </p>
    </>
  )
}

function TravelBody() {
  return (
    <>
      <p>
        Arrive somewhere at six in the morning and you get a version of it that the guidebooks never describe, largely
        because nobody writing a guidebook is awake.
      </p>
      <p>
        The shutters are still down. A man is hosing the pavement outside a bar that will not open for four hours. Two
        women argue amiably over a delivery crate. This is the hour when a place is still talking to itself rather than
        to you, and it is the only time you will see it that way.
      </p>
      <h2>Stay longer in fewer places</h2>
      <p>
        The arithmetic of a short trip pushes hard in the wrong direction. Four cities in six days sounds like more, and
        delivers less: you spend the surplus on stations, and you meet nobody twice.
      </p>
      <ol>
        <li>Pick one base and treat day trips as the exception.</li>
        <li>Go back to the same café three mornings running. The third time, something changes.</li>
        <li>Leave one day completely unplanned. It will be the one you describe when you get home.</li>
      </ol>
      <Figure topic="travel" />
      <h3>The market is the shortcut</h3>
      <p>
        If you have one morning and want to understand what a place actually eats, skip the restaurants and go to the
        market. Prices tell you what is in season and what is precious. The queue tells you which stall is worth it.
        Nobody is performing for visitors at seven in the morning.
      </p>
      <blockquote>
        <p>
          You learn more about a city from what it throws away than from what it puts in the window. Watch the back
          doors of the restaurants at closing time.
        </p>
      </blockquote>
      <h2>On getting lost properly</h2>
      <p>
        There is a difference between being lost and being unsure, and the phone in your pocket has quietly abolished
        the second one. <em>Unsure</em> is productive. It makes you look up, read the shopfronts, notice that the street
        is climbing. Navigating turn by turn, you arrive having seen nothing between the two points.
      </p>
      <p>
        The compromise most travellers settle on: keep the map for the way back, and refuse to look at it on the way
        out. You will lose twenty minutes. You will also find the thing you came for, which is not on the map anyway.
      </p>
      <h3>What to pack that nobody lists</h3>
      <h4>A pen, and something to write on that is not a screen.</h4>
      <p>
        Not for the diary you will not keep. For the address someone gives you, the name of a dish you cannot pronounce,
        the time the last bus leaves. Handing someone a pen is also a way of asking them to help you, and most people
        say yes.
      </p>
    </>
  )
}

function FoodBody() {
  return (
    <>
      <p>
        The reason restaurant food tastes different is not a secret ingredient. It is salt, heat, and the willingness to
        stand closer to failure than you are comfortable with.
      </p>
      <p>
        Home cooks tend to undersalt and undercook, in that order, and for the same reason: both mistakes are
        irreversible in one direction only. A professional kitchen takes the pan further because it has done it four
        hundred times and knows exactly how far <em>too far</em> is.
      </p>
      <h2>Salt is a technique, not a topping</h2>
      <p>
        Salt added at the end sits on the surface. Salt added early travels. The same quantity, applied at three
        different moments, gives you three different dishes:
      </p>
      <ul>
        <li>On the raw ingredient, an hour ahead — it seasons the inside and changes the texture.</li>
        <li>In the pan — it draws water out and helps things brown instead of steam.</li>
        <li>At the table — it is a top note, and it is the only one most people ever use.</li>
      </ul>
      <Figure topic="food" />
      <h3>Heat: the part that takes nerve</h3>
      <p>
        Most domestic pans are underloaded and underheated. Crowding the pan drops the temperature, the food releases
        water, and you braise something you meant to sear. The fix is unglamorous: cook in two batches, and get the pan
        hotter than feels reasonable before anything goes in.
      </p>
      <blockquote>
        <p>
          You are not looking for a colour. You are listening. When the sound in the pan changes from a hiss to a
          crackle, the water is gone and the browning has started.
        </p>
      </blockquote>
      <h2>Acid, last</h2>
      <p>
        A dish that tastes flat is usually not short of salt — it is short of acid. A squeeze of lemon or a spoon of
        vinegar at the end does what nothing else will: it makes everything before it legible. Add it off the heat, so
        it stays sharp.
      </p>
      <ol>
        <li>Taste. Is it flat, or is it dull? Flat wants salt; dull wants acid.</li>
        <li>Add half of what you think. Wait. Taste again.</li>
        <li>Stop one step before it is perfect. It keeps developing in the bowl.</li>
      </ol>
      <h3>The habit worth building</h3>
      <h4>Taste at every stage, not at the end.</h4>
      <p>
        Cooking is a sequence of small corrections, and you cannot correct what you have not tasted. The cook who tries
        the dish once, at the point of serving, has given themselves exactly one chance to be right — and no information
        about which of the last six decisions was the wrong one.
      </p>
    </>
  )
}

function CultureBody() {
  return (
    <>
      <p>
        Ask an engineer what they are listening for and you will not get an answer about music. You will get an answer
        about space: how far back the drums sit, whether the vocal is sharing a frequency with the guitar, what the room
        is doing between the notes.
      </p>
      <p>
        That is the part that separates a recording that sounds expensive from one that does not, and almost none of it
        is audible as a thing you could point to. It registers as an impression — this sounds finished — long before
        anyone could say why.
      </p>
      <h2>Arrangement is the first mix</h2>
      <p>
        Most problems described as mixing problems are arrangement problems wearing a disguise. Two instruments
        occupying the same register will fight no matter how carefully they are balanced. The fix happens before anyone
        touches a fader:
      </p>
      <ul>
        <li>Move one part up an octave, and the argument disappears.</li>
        <li>Take something out entirely. Subtraction is the cheapest tool in the room.</li>
        <li>Let the loudest moment arrive once, near the end, rather than every eight bars.</li>
      </ul>
      <Figure topic="culture" />
      <h3>The case for committing early</h3>
      <p>
        Recording to a fixed sound — deciding, printing it, moving on — used to be forced by tape and is now a
        discipline you have to choose. Keeping every option open sounds like freedom and behaves like paralysis. A
        record made of <strong>decisions</strong> sounds like something. A record made of possibilities sounds like a
        demo.
      </p>
      <blockquote>
        <p>
          The best-sounding records are usually not the ones with the most work in them. They are the ones where
          somebody knew when to stop and had the authority to say so.
        </p>
      </blockquote>
      <h2>Listening as a skill</h2>
      <p>
        It is trainable, and the training is boring. Play the same passage twenty times and change one thing. Learn what
        two decibels actually sounds like. Most people discover their ears are far more sensitive than they assumed, and
        that the difference between <em>good</em> and <em>right</em> is smaller and more specific than they expected.
      </p>
      <h3>Where to start</h3>
      <h4>Pick a record you know too well and listen to one instrument the whole way through.</h4>
      <p>
        Follow the bass for four minutes and nothing else. You will hear arrangement decisions you have walked past a
        hundred times — an entry held back, a part that drops out exactly where the vocal needs room. After a few weeks
        of this you stop hearing songs as a wall of sound and start hearing them as a set of choices, which is both a
        gift and, occasionally, a curse.
      </p>
    </>
  )
}

const BODY_BY_TOPIC: Record<Topic, () => React.JSX.Element> = {
  technology: TechnologyBody,
  travel: TravelBody,
  food: FoodBody,
  culture: CultureBody,
}

interface Props {
  /** The post's own body. Unused by the demo — see the note at the top. */
  content: string
  /** Used to pick a demo body that reads like it belongs under the headline. */
  title?: string
  /** Handle of the post's primary category; the fallback signal. */
  categoryHandle?: string
}

function pickTopic(title?: string, categoryHandle?: string): Topic {
  if (title) {
    const match = TOPIC_BY_KEYWORD.find(([pattern]) => pattern.test(title))
    if (match) return match[1]
  }

  return (categoryHandle && TOPIC_BY_CATEGORY[categoryHandle]) || 'technology'
}

const TheContent = ({ title, categoryHandle }: Props) => {
  const Body = BODY_BY_TOPIC[pickTopic(title, categoryHandle)]

  return <Body />
}

export default TheContent
