import { SinkDemosCanvas, SinkDemosDialog } from "@/components/sink-demos";
import Layout from "@/components/ui/layout";
import Image from "next/image";

export default function Home() {
  return (
    <Layout variant="default" className="*:p-md *:w-full">
      <header id="top" role="banner" className="shrink">
        <h1>
          <span id="page-title">
            Completely WCAG Compliant HTML Kitchen Sink
          </span>
          <a href="#table-of-contents" className="sr-nav-link">
            Skip to Table of Contents.
          </a>
        </h1>
        <p>A WCAG-compliant reference of every HTML5 element.</p>
        <aside aria-labelledby="#table-of-contents">
          <h2 id="table-of-contents">
            Table of Contents
            <a href="#color-pallet" className="sr-nav-link">
              Skip to Color Pallet.
            </a>
            <a href="#top" className="sr-nav-link">
              Back to top.
            </a>
          </h2>

          <nav>
            <ul>
              <li>
                <a href="#top">Introduction</a>
              </li>
              <li>
                <a href="#color-pallet">Colors</a>
              </li>
              <li>
                <a href="#headings">Headings</a>
              </li>
              <li>
                <a href="#sections">Sections</a>
              </li>
              <li>
                <a href="#grouping">Grouping</a>
              </li>
              <li>
                <a href="#phrasing">Phrasing</a>
              </li>
              <li>
                <a href="#forms">Forms</a>
              </li>
              <li>
                <a href="#tables">Tables</a>
              </li>
              <li>
                <a href="#embeds">Embeds</a>
              </li>
              <li>
                <a href="#interactive">Interactive</a>
              </li>
              <li>
                <a href="#bottom">Credits</a>
              </li>
            </ul>
          </nav>
        </aside>
      </header>
      <main
        role="main"
        id="main"
        className="flex flex-col gap-md grow place-items-stretch place-content-stretch *:w-full"
      >
        <section
          id="color-pallet"
          aria-labelledby="color-pallet-title"
          className="flex flex-col gap-md"
        >
          <h2>
            <span id="color-pallet-title">Color Pallet</span>
            <a href="#headings" className="sr-nav-link">
              Skip to next section: {`"Headings"`}.
            </a>
            <a href="#table-of-contents" className="sr-nav-link">
              back to Table of Contents.
            </a>
          </h2>
          <div className="flex flex-col gap-1 text-center">
            <div className="grid *:text-background grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-7 *:aspect-square *:object-cover *:place-content-center *:place-items-center *:rounded-md *:border-border/60 *:border-2">
              <a href="#" className="bg-rosewater">
                Rosewater
              </a>
              <a href="#" className="bg-flamingo">
                Flamingo
              </a>
              <a href="#" className="bg-pink">
                Pink
              </a>
              <a href="#" className="bg-mauve">
                Mauve
              </a>
              <a href="#" className="bg-red">
                Red
              </a>
              <a href="#" className="bg-maroon">
                Maroon
              </a>
              <a href="#" className="bg-peach">
                Peach
              </a>
              <a href="#" className="bg-yellow">
                Yellow
              </a>
              <a href="#" className="bg-green">
                Green
              </a>
              <a href="#" className="bg-teal">
                Teal
              </a>
              <a href="#" className="bg-sky">
                Sky
              </a>
              <a href="#" className="bg-sapphire">
                Sapphire
              </a>
              <a href="#" className="bg-blue">
                Blue
              </a>
              <a href="#" className="bg-lavender">
                Lavender
              </a>
            </div>
            <div className="grid *:text-background grid-cols-2 gap-1 md:grid-cols-3 *:aspect-square *:object-cover *:place-content-center *:place-items-center *:rounded-md *:border-border/60 *:border-2">
              <a href="#" className="bg-text">
                Text
              </a>
              <a href="#" className="bg-subtext-1">
                Subtext-1
              </a>
              <a href="#" className="bg-subtext-0">
                Subtext-0
              </a>
            </div>
            <div className="grid grid-cols-2 gap-1 md:grid-cols-3 *:aspect-square *:object-cover *:place-content-center *:place-items-center *:rounded-md *:border-border/60 *:border-2">
              <a href="#" className="bg-overlay-2">
                Overlay-2
              </a>
              <a href="#" className="bg-overlay-1">
                Overlay-1
              </a>
              <a href="#" className="bg-overlay-0">
                Overlay-0
              </a>
              <a href="#" className="bg-surface-2">
                Surface-2
              </a>
              <a href="#" className="bg-surface-1">
                Surface-1
              </a>
              <a href="#" className="bg-surface-0">
                Surface-0
              </a>
              <a href="#" className="bg-base">
                Base
              </a>
              <a href="#" className="bg-mantle">
                Mantle
              </a>
              <a href="#" className="bg-crust">
                Crust
              </a>
            </div>
          </div>
        </section>

        <hr />

        <section id="headings" aria-labelledby="headings-title">
          <h2>
            <span id="headings-title">Headings</span>
            <a href="#sections" className="sr-nav-link">
              Skip to next section: {`"Sectioning Content"`}.
            </a>
            <a href="#color-pallet" className="sr-nav-link">
              back to Color Pallet.
            </a>
          </h2>
          <p>
            Elements
            <code>h1</code>
            through
            <code>h6</code>
            form the heading content category. Each level carries semantic
            weight —<code>h1</code>
            is the page title,
            <code>h2</code>
            marks major sections, and so on down. Skipping levels (e.g.
            <code>h2</code>→<code>h4</code>) breaks the document outline and
            harms assistive technology navigation.
          </p>

          <p className="h1">
            <code>&lt;h1 /&gt;</code>
            The quick brown fox jumps over the lazy dog
          </p>
          <p className="h2">
            <code>&lt;h2 /&gt;</code>
            Pack my box with five dozen liquor jugs
          </p>
          <p className="h3">
            <code>&lt;h3 /&gt;</code>
            Jaunty zinnias vie with flaunting phlox
          </p>
          <p className="h4">
            <code>&lt;h4 /&gt;</code>
            Five or six big jet planes zoomed quickly by the tower
          </p>
          <p className="h5">
            <code>&lt;h5 /&gt;</code>
            Expect skilled signwriters to use many jazzy alphabets
          </p>
          <p className="h6">
            <code>&lt;h6 /&gt;</code>
            How vexingly quick daft zebras jump
          </p>

          <p>
            The heading demonstrations above are shown in descending order for
            visual reference only. In a real document, heading levels must
            reflect the content hierarchy, not the desired font size.
          </p>
        </section>

        <hr />

        <section id="sections" aria-labelledby="sections-title">
          <h2>
            <span id="sections-title">Sectioning Content</span>
            <a href="#grouping" className="sr-nav-link">
              Skip to next section: {`"Grouping Content"`}.
            </a>
            <a href="#table-of-contents" className="sr-nav-link">
              back to previous section: {`"Headings"`}.
            </a>
          </h2>
          <p>
            The elements
            <code>article</code>,<code>aside</code>,<code>nav</code>, and
            <code>section</code>
            create distinct regions in the document outline. Each can contain
            its own heading hierarchy.
          </p>

          <nav aria-label="Sample navigation">
            <h3>Navigation</h3>
            <p>
              A<code>nav</code>
              element with a list of links, as you might find in a site header
              or sidebar:
            </p>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </nav>

          <article>
            <h3>Article</h3>
            <p>
              An
              <code>article</code>
              represents a self-contained composition — a blog post, a news
              story, a forum thread. This paragraph is nested inside one. It
              contains many different, sometimes useful,
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML">
                HTML elements
              </a>
              . Of course there are classics like
              <em>emphasis</em>,<strong>strong importance</strong>, and
              <small>small print</small>, but there are many others as well.
            </p>
            <section>
              <h4>Article subsection</h4>
              <p>
                This paragraph lives inside a<code>section</code>
                within the parent
                <code>article</code>. Nesting sections like this is valid and
                useful for long-form content with internal structure.
              </p>
              <p>
                ↓ The following paragraph has the
                <code>hidden</code>
                attribute and should not be displayed. ↓
              </p>
              <p hidden>→ You should not see this paragraph. ←</p>
              <p>↑ The previous paragraph should not be displayed. ↑</p>
            </section>
          </article>

          <aside>
            <h3>Aside</h3>
            <p>
              An
              <code>aside</code>
              holds content tangentially related to its surrounding context — a
              pull quote, a sidebar, a related-links panel. Screen readers can
              jump directly to it via landmark navigation.
            </p>
          </aside>
        </section>

        <hr />

        <section id="grouping" aria-labelledby="grouping-title">
          <h2>
            <span id="grouping-title">Grouping Content</span>
            <a href="#grouping" className="sr-nav-link">
              Skip to next section: {`"Phrasing Content"`}.
            </a>
            <a href="#sections" className="sr-nav-link">
              back to previous section: {`"Sectioning Content"`}.
            </a>
          </h2>
          <p>
            Block-level elements that group runs of text or other content
            together: paragraphs, lists, blockquotes, preformatted text,
            figures, and more.
          </p>

          <h3>Blockquote</h3>
          <blockquote>
            <p>I quickly explained that many big jobs involve few hazards.</p>
          </blockquote>
          <blockquote cite="https://en.wikipedia.org/wiki/Steve_Jobs">
            <p>
              People think focus means saying yes to the thing you&apos;ve got
              to focus on. But that&apos;s not what it means at all. It means
              saying no to the hundred other good ideas that there are. You have
              to pick carefully.
            </p>
            <footer>
              — Steve Jobs,
              <cite>Apple WWDC, 1997</cite>
            </footer>
          </blockquote>

          <h3>Lists</h3>
          <h4>Unordered list</h4>
          <ul>
            <li>
              List item one
              <ul>
                <li>
                  Nested item
                  <ul>
                    <li>Level three, item one</li>
                    <li>Level three, item two</li>
                  </ul>
                </li>
                <li>Nested item two</li>
              </ul>
            </li>
            <li>List item two</li>
            <li>List item three</li>
          </ul>

          <h4>Ordered list</h4>
          <ol>
            <li>
              First item
              <ol>
                <li>
                  Sub-item one
                  <ol>
                    <li>Deep item one</li>
                    <li>Deep item two</li>
                  </ol>
                </li>
                <li>Sub-item two</li>
              </ol>
            </li>
            <li>Second item</li>
            <li>Third item</li>
          </ol>

          <h4>Description list</h4>
          <dl>
            <dt>Golden ratio</dt>
            <dd>
              An irrational number approximately equal to
              <span className="phi-expand">1.618</span>, often denoted by the
              Greek letter phi (φ).
            </dd>
            <dt>Fibonacci sequence</dt>
            <dd>
              A sequence where each number is the sum of the two preceding ones.
              The ratio of consecutive terms converges to φ.
            </dd>
            <dt>Kitchen sink</dt>
            <dd>
              A document containing every conceivable element, used for testing
              styles.
            </dd>
          </dl>

          <h3>Preformatted text</h3>
          <pre>{`:root {
  --gwx: calc(((1 + sqrt(5)) / 2) - 1);
  --gnx: calc(1 - var(--gwx));
  --swx: calc(1 + var(--gwx));
}`}</pre>

          <pre>
            <samp>
              ${" "}
              <kbd>
                node -e &ldquo;console.log((1 + Math.sqrt(5)) / 2)&rdquo;
              </kbd>
              1.618033988749895
            </samp>
          </pre>
          <h3>Figure</h3>
          <figure>
            <Image
              src="https://placecats.com/200/124"
              alt="A kitten in golden ratio aspect"
              width={200}
              height={124}
            />
            <figcaption>
              Figure 1: A 200×124 image — approximately φ:1 aspect ratio.
            </figcaption>
          </figure>

          <h3>Horizontal rule</h3>
          <p>A thematic break between paragraphs:</p>
          <hr />
          <p>The content continues after the break above.</p>

          <h3>Address</h3>
          <address>
            1 Infinite Loop
            <br />
            Cupertino, CA 95014
            <br />
            United States
          </address>
        </section>

        <hr />

        <section id="phrasing" aria-labelledby="phrasing-title">
          <h2>
            <span id="phrasing-title">Phrasing Content</span>
            <a href="#forms" className="sr-nav-link">
              Skip to next section: {`"Forms"`}.
            </a>
            <a href="#grouping" className="sr-nav-link">
              back to previous section: {`"Grouping Content"`}.
            </a>
          </h2>
          <p>
            Inline elements that mark up runs of text within block-level
            containers.
          </p>

          <h3>Emphasis and importance</h3>
          <p>
            <code>em</code>
            is used for
            <em>emphasis</em>
            and usually renders as italics. Contrast with
            <code>i</code>, which offsets text for an alternate voice or mood:
            <i>E. coli</i>
            can be dangerous.
          </p>
          <p>
            <code>strong</code>
            conveys
            <strong>importance or urgency</strong>. Contrast with
            <code>b</code>, which draws
            <b>visual attention</b>
            without implying semantic weight.
          </p>

          <h3>Edits and annotations</h3>
          <p>
            <code>del</code>
            marks
            <del dateTime="2026-03-15">removed</del>
            text.
            <code>ins</code>
            marks
            <ins dateTime="2026-03-15">inserted</ins>
            text.
            <code>s</code>
            marks text that is no longer accurate:
            <s>Windows XP version available.</s>
          </p>
          <p>
            <code>mark</code>
            is the HTML equivalent of a<mark>yellow highlighter</mark>.
            <code>u</code>
            underlines without semantic meaning:
            <u>underlined text</u>.
          </p>

          <h3>Abbreviations and definitions</h3>
          <p>
            <code>abbr</code>: Some vehicles meet the
            <abbr title="Super Ultra Low Emission Vehicle">SULEV</abbr>
            standard.
          </p>
          <p>
            <code>dfn</code>: Foreign phrases add a certain
            <dfn lang="fr" title="French: indefinable quality">
              je ne sais quoi
            </dfn>
            {"to one's writing."}
          </p>

          <h3>Citations and quotations</h3>
          <p>
            <code>cite</code>: In the words of
            <cite>Charles Bukowski</cite>—
            <q>
              An intellectual says a simple thing in a hard way. An artist says
              a hard thing in a simple way.
            </q>
          </p>
          <p>
            <code>q</code>: The {"W3C's"} mission is
            <q cite="https://www.w3.org/Consortium/">
              to lead the World Wide Web to its full potential by developing
              protocols and guidelines that ensure long-term growth for the Web
            </q>
            .
          </p>

          <h3>Code, keyboard, and sample output</h3>
          <p>
            <code>code</code>: The
            <code>calc()</code>
            function performs arithmetic in CSS.
          </p>
          <p>
            <code>kbd</code>: Press
            <kbd>
              <kbd>Ctrl</kbd>+<kbd>R</kbd>
            </kbd>
            to redo in Vim. Just kidding — {"it's"}
            <kbd>
              <kbd>Ctrl</kbd>+<kbd>R</kbd>
            </kbd>
            everywhere else too.
          </p>
          <p>
            <code>samp</code>: The console returned
            <samp>1.618033988749895</samp>.
          </p>
          <p>
            <code>var</code>: To log in, type
            <kbd>
              ssh
              <var>user</var>
              @example.com
            </kbd>
            , where
            <var>user</var>
            is your username.
          </p>

          <h3>Data and time</h3>
          <p>
            <code>data</code>: The meeting is at
            <data value="2026-03-15T17:00-04:00">5 P.M.</data>
            Eastern.
          </p>
          <p>
            <code>time</code>: The golden ratio was studied as early as
            <time dateTime="-0300">300 BC</time>
            by Euclid.
          </p>

          <h3>Bidirectional and line-break control</h3>
          <p>
            <code>bdi</code>: Some names read right to left:
            <bdi lang="ar">مرحبا</bdi>.
          </p>
          <p>
            <code>bdo</code>:
            <bdo dir="rtl">This sentence has been reversed.</bdo>
          </p>
          <p>
            <code>wbr</code>
            : A very long word like super
            <wbr />
            cali
            <wbr />
            fragil
            <wbr />
            istic
            <wbr />
            expiali
            <wbr />
            do
            <wbr />
            cious can break at the indicated points.
          </p>
          <p>
            <code>br</code>
            : A line break
            <br />
            occurred here.
          </p>

          <h3>Meter and progress</h3>
          <p>
            <code>meter</code>: Storage used:
            <meter value={6} max={8} low={2} high={7} optimum={4}>
              6 of 8 blocks
            </meter>
          </p>
          <p>
            <code>progress</code>: Upload progress:
            <progress value={62} max={100}>
              62%
            </progress>
          </p>

          <h3>Subscript, superscript, and small</h3>
          <p>
            <code>sub</code>: H<sub>2</sub>O is water.
            <code>sup</code>: E = MC
            <sup>2</sup>.<code>small</code>:
            <q>
              I built this whole system.
              <small>[Editor&apos;s note: with help from φ]</small>
            </q>
          </p>

          <h3>Span</h3>
          <p>
            <code>span</code>: A<span>generic inline container</span>
            with no inherent meaning — useful as a styling hook.
          </p>
        </section>

        <hr />

        <section id="forms" aria-labelledby="forms-title">
          <h2>
            <span id="forms-title">Forms</span>
            <a href="#tables" className="sr-nav-link">
              Skip to next section: {`"Tables"`}.
            </a>
            <a href="#phrasing" className="sr-nav-link">
              back to previous section: {`"Phrasing Content"`}.
            </a>
          </h2>
          <p>
            Interactive controls for collecting user input. Every input must
            have an associated
            <code>label</code>— either wrapping the input or linked via
            <code>for</code>/<code>id</code>.
          </p>

          <form method="dialog" className="flex flex-col gap-md w-full grow">
            <div className="flex flex-col md:flex-row gap-md w-full grow">
              <div className="flex flex-col gap-md grow">
                <h3>Text inputs</h3>

                <p>
                  <label htmlFor="input-text">Text</label>
                  <br />
                  <input
                    type="text"
                    id="input-text"
                    placeholder="Plain text input"
                  />
                </p>
                <p>
                  <label htmlFor="input-email">Email address</label>
                  <br />
                  <input
                    type="email"
                    id="input-email"
                    placeholder="you@example.com"
                  />
                </p>
                <p>
                  <label htmlFor="input-password">Password</label>
                  <br />
                  <input
                    type="password"
                    id="input-password"
                    placeholder="••••••••"
                  />
                </p>
                <p>
                  <label htmlFor="input-search">Search</label>
                  <br />
                  <input
                    type="search"
                    id="input-search"
                    placeholder="Search…"
                  />
                </p>
                <p>
                  <label htmlFor="input-url">URL</label>
                  <br />
                  <input
                    type="url"
                    id="input-url"
                    placeholder="https://example.com"
                  />
                </p>
                <p>
                  <label htmlFor="input-tel">Telephone</label>
                  <br />
                  <input
                    type="tel"
                    id="input-tel"
                    placeholder="+1 (555) 000-0000"
                  />
                </p>
                <p>
                  <label htmlFor="input-readonly">Read-only</label>
                  <br />
                  <input
                    type="text"
                    id="input-readonly"
                    readOnly
                    defaultValue="Cannot edit this"
                  />
                </p>
                <p>
                  <label htmlFor="input-disabled">Disabled</label>
                  <br />
                  <input
                    type="text"
                    id="input-disabled"
                    disabled
                    defaultValue="Not available"
                  />
                </p>
              </div>
              <div className="flex flex-col gap-md grow">
                <h3>Number and date inputs</h3>
                <p>
                  <label htmlFor="input-number">Number</label>
                  <br />
                  <input
                    type="number"
                    id="input-number"
                    min={0}
                    max={100}
                    step={0.001}
                    defaultValue={1.618}
                  />
                </p>
                <p>
                  <label htmlFor="input-date">Date</label>
                  <br />
                  <input type="date" id="input-date" />
                </p>
                <p>
                  <label htmlFor="input-datetime-local">
                    Date &amp; time (local)
                  </label>
                  <br />
                  <input type="datetime-local" id="input-datetime-local" />
                </p>
                <p>
                  <label htmlFor="input-month">Month</label>
                  <br />
                  <input type="month" id="input-month" />
                </p>
                <p>
                  <label htmlFor="input-week">Week</label>
                  <br />
                  <input type="week" id="input-week" />
                </p>
                <p>
                  <label htmlFor="input-time">Time</label>
                  <br />
                  <input type="time" id="input-time" />
                </p>
              </div>
              <div className="flex flex-col gap-md">
                <h3>Other inputs</h3>
                <p>
                  <label htmlFor="input-color">Color</label>
                  <br />
                  <input type="color" id="input-color" defaultValue="#c9a96e" />
                </p>
                <p>
                  <label htmlFor="input-range">Range</label>
                  <br />
                  <input
                    type="range"
                    id="input-range"
                    min={0}
                    max={100}
                    defaultValue={62}
                  />
                </p>
                <p>
                  <label htmlFor="input-file">File upload</label>
                  <br />
                  <input type="file" id="input-file" />
                </p>

                <h3>Select menus</h3>
                <p>
                  <label htmlFor="select-single">Single select</label>
                  <br />
                  <select id="select-single">
                    <option value="">Choose one…</option>
                    <option>Option A</option>
                    <option>Option B</option>
                    <option>Option C</option>
                  </select>
                </p>
                <p>
                  <label htmlFor="select-grouped">Grouped select</label>
                  <br />
                  <select id="select-grouped">
                    <optgroup label="Group One">
                      <option>Alpha</option>
                      <option>Beta</option>
                    </optgroup>
                    <optgroup label="Group Two">
                      <option>Gamma</option>
                      <option>Delta</option>
                    </optgroup>
                  </select>
                </p>
                <p>
                  <label htmlFor="select-multiple">Multiple select</label>
                  <br />
                  <select id="select-multiple" multiple size={4}>
                    <option>Red</option>
                    <option>Green</option>
                    <option>Blue</option>
                    <option>Gold</option>
                  </select>
                </p>

                <h3>Datalist</h3>
                <p>
                  <label htmlFor="input-datalist">Favorite ratio</label>
                  <br />
                  <input
                    type="text"
                    id="input-datalist"
                    list="ratios"
                    placeholder="Start typing…"
                  />
                  <datalist id="ratios">
                    <option value="Golden ratio (φ)"></option>
                    <option value="Silver ratio (δ)"></option>
                    <option value="Pi (π)"></option>
                    <option value="Euler's number (e)"></option>
                  </datalist>
                </p>

                <h3>Textarea</h3>
                <p>
                  <label htmlFor="textarea">Message</label>
                  <br />
                  <textarea
                    id="textarea"
                    rows={4}
                    placeholder="Write something…"
                  ></textarea>
                </p>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-md grow">
              <div className="flex flex-col gap-md grow">
                <h3>Radio buttons</h3>
                <fieldset>
                  <legend>Choose a ratio</legend>
                  <p>
                    <input
                      type="radio"
                      name="ratio"
                      id="radio-golden"
                      value="golden"
                      defaultChecked
                    />
                    <label htmlFor="radio-golden">
                      Golden ratio — φ ≈ 1.618
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      name="ratio"
                      id="radio-silver"
                      value="silver"
                    />
                    <label htmlFor="radio-silver">
                      Silver ratio — δ ≈ 2.414
                    </label>
                  </p>
                  <p>
                    <input
                      type="radio"
                      name="ratio"
                      id="radio-disabled"
                      value="plastic"
                      disabled
                    />
                    <label htmlFor="radio-disabled">
                      Plastic ratio — ρ ≈ 1.325 (disabled)
                    </label>
                  </p>
                </fieldset>
              </div>
              <div className="flex flex-col gap-md grow">
                <h3>Checkboxes</h3>
                <fieldset>
                  <legend>Select properties</legend>
                  <p>
                    <input
                      type="checkbox"
                      id="check-irrational"
                      defaultChecked
                    />
                    <label htmlFor="check-irrational">Irrational number</label>
                  </p>
                  <p>
                    <input type="checkbox" id="check-algebraic" />
                    <label htmlFor="check-algebraic">Algebraic number</label>
                  </p>
                  <p>
                    <input type="checkbox" id="check-transcendental" disabled />
                    <label htmlFor="check-transcendental">
                      Transcendental number (disabled)
                    </label>
                  </p>
                </fieldset>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-md grow">
              <div className="flex flex-col gap-md">
                <h3>Buttons</h3>
                <div className="flex flex-wrap *:grow gap-md">
                  <section className="flex *:grow flex-col gap-md">
                    <h4>Raw buttons</h4>
                    <p>
                      <button type="submit">Submit</button>
                      <button type="reset">Reset</button>
                      <button type="button">Button</button>
                      <input type="submit" value="Input submit" />
                      <input type="reset" value="Input reset" />
                      <input type="button" value="Input button" />
                      <button type="button" disabled>
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button base style (._button)</h4>
                    <p>
                      <button className="_button" type="submit">
                        Submit
                      </button>
                      <button className="_button" type="reset">
                        Reset
                      </button>
                      <button className="_button" type="button">
                        Button
                      </button>
                      <input
                        className="_button"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button"
                        type="button"
                        value="Input button"
                      />
                      <button className="_button" type="button" disabled>
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button Primary (._button.primary)</h4>
                    <p>
                      <button className="_button primary" type="submit">
                        Submit
                      </button>
                      <button className="_button primary" type="reset">
                        Reset
                      </button>
                      <button className="_button primary" type="button">
                        Button
                      </button>
                      <input
                        className="_button primary"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button primary"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button primary"
                        type="button"
                        value="Input button"
                      />
                      <button
                        className="_button primary"
                        type="button"
                        disabled
                      >
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button Secondary (._button.secondary)</h4>
                    <p>
                      <button className="_button secondary" type="submit">
                        Submit
                      </button>
                      <button className="_button secondary" type="reset">
                        Reset
                      </button>
                      <button className="_button secondary" type="button">
                        Button
                      </button>
                      <input
                        className="_button secondary"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button secondary"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button secondary"
                        type="button"
                        value="Input button"
                      />
                      <button
                        className="_button secondary"
                        type="button"
                        disabled
                      >
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button accent (._button.accent)</h4>
                    <p>
                      <button className="_button accent" type="submit">
                        Submit
                      </button>
                      <button className="_button accent" type="reset">
                        Reset
                      </button>
                      <button className="_button accent" type="button">
                        Button
                      </button>
                      <input
                        className="_button accent"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button accent"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button accent"
                        type="button"
                        value="Input button"
                      />
                      <button className="_button accent" type="button" disabled>
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button success (._button.success)</h4>
                    <p>
                      <button className="_button success" type="submit">
                        Submit
                      </button>
                      <button className="_button success" type="reset">
                        Reset
                      </button>
                      <button className="_button success" type="button">
                        Button
                      </button>
                      <input
                        className="_button success"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button success"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button success"
                        type="button"
                        value="Input button"
                      />
                      <button
                        className="_button success"
                        type="button"
                        disabled
                      >
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button destructive (._button.destructive)</h4>
                    <p>
                      <button className="_button destructive" type="submit">
                        Submit
                      </button>
                      <button className="_button destructive" type="reset">
                        Reset
                      </button>
                      <button className="_button destructive" type="button">
                        Button
                      </button>
                      <input
                        className="_button destructive"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button destructive"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button destructive"
                        type="button"
                        value="Input button"
                      />
                      <button
                        className="_button destructive"
                        type="button"
                        disabled
                      >
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button outline (._button.outline)</h4>
                    <p>
                      <button className="_button outline" type="submit">
                        Submit
                      </button>
                      <button className="_button outline" type="reset">
                        Reset
                      </button>
                      <button className="_button outline" type="button">
                        Button
                      </button>
                      <input
                        className="_button outline"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button outline"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button outline"
                        type="button"
                        value="Input button"
                      />
                      <button
                        className="_button outline"
                        type="button"
                        disabled
                      >
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button ghost (._button.ghost)</h4>
                    <p>
                      <button className="_button ghost" type="submit">
                        Submit
                      </button>
                      <button className="_button ghost" type="reset">
                        Reset
                      </button>
                      <button className="_button ghost" type="button">
                        Button
                      </button>
                      <input
                        className="_button ghost"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button ghost"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button ghost"
                        type="button"
                        value="Input button"
                      />
                      <button className="_button ghost" type="button" disabled>
                        Disabled
                      </button>
                    </p>
                  </section>

                  <section className="flex *:grow flex-col gap-md">
                    <h4>Button link (._button.link)</h4>
                    <p>
                      <button className="_button link" type="submit">
                        Submit
                      </button>
                      <button className="_button link" type="reset">
                        Reset
                      </button>
                      <button className="_button link" type="button">
                        Button
                      </button>
                      <input
                        className="_button link"
                        type="submit"
                        value="Input submit"
                      />
                      <input
                        className="_button link"
                        type="reset"
                        value="Input reset"
                      />
                      <input
                        className="_button link"
                        type="button"
                        value="Input button"
                      />
                      <button className="_button link" type="button" disabled>
                        Disabled
                      </button>
                    </p>
                  </section>
                </div>
              </div>
              <div className="flex flex-col gap-md grow">
                <h3>Output</h3>
                <p>
                  <label htmlFor="output-a">Value A</label>
                  <input
                    type="number"
                    id="output-a"
                    name="a"
                    defaultValue={1}
                  />
                  +<label htmlFor="output-b">Value B</label>
                  <input
                    type="number"
                    id="output-b"
                    name="b"
                    defaultValue={0.618}
                  />
                  =
                  <output name="result" htmlFor="output-a output-b">
                    1.618
                  </output>
                </p>
              </div>
            </div>
          </form>
        </section>

        <hr />

        <section id="tables" aria-labelledby="tables-title">
          <h2>
            <span id="tables-title">Tables</span>
            <a href="#embeds" className="sr-nav-link">
              Skip to next section: Embeds.
            </a>
            <a href="#forms" className="sr-nav-link">
              back to previous section:Forms.
            </a>
          </h2>
          <p>
            Tables are for tabular data — not layout. Proper use of{" "}
            <code>thead</code>, <code>tbody</code>, <code>tfoot</code>,{" "}
            <code>th</code> with <code>scope</code>, and <code>caption</code>{" "}
            makes tables accessible to screen readers.
          </p>

          <h3>Simple table</h3>
          <table>
            <caption>Golden ratio scale at 21px base</caption>
            <thead>
              <tr>
                <th scope="col">Token</th>
                <th scope="col">Scale</th>
                <th scope="col">~Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>--text-xs</code>
                </td>
                <td>base ÷ φ²</td>
                <td>~8px</td>
              </tr>
              <tr>
                <td>
                  <code>--text-sm</code>
                </td>
                <td>base ÷ φ</td>
                <td>~13px</td>
              </tr>
              <tr>
                <td>
                  <code>--text-base</code>
                </td>
                <td>1×</td>
                <td>~21px</td>
              </tr>
              <tr>
                <td>
                  <code>--text-md</code>
                </td>
                <td>base × φ</td>
                <td>~34px</td>
              </tr>
              <tr>
                <td>
                  <code>--text-lg</code>
                </td>
                <td>base × φ²</td>
                <td>~55px</td>
              </tr>
            </tbody>
          </table>

          <h3>Complex table</h3>
          <p id="characteristics-summary">
            In this table, negative traits appear on the left and positive
            traits on the right.
          </p>
          <table aria-describedby="characteristics-summary">
            <caption>Characteristics with positive and negative sides</caption>
            <thead>
              <tr>
                <th scope="col" id="neg">
                  Negative
                </th>
                <th scope="col">Characteristic</th>
                <th scope="col" id="pos">
                  Positive
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td headers="neg">Sad</td>
                <th scope="row">Mood</th>
                <td headers="pos">Happy</td>
              </tr>
              <tr>
                <td headers="neg">Failing</td>
                <th scope="row">Grade</th>
                <td headers="pos">Passing</td>
              </tr>
            </tbody>
          </table>

          <h3>Table with multiple sections</h3>
          <table>
            <caption>
              Revenue summary with
              <code>thead</code>,<code>tbody</code>, and
              <code>tfoot</code>
            </caption>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">2024</th>
                <th scope="col">2025</th>
                <th scope="col">2026</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Net sales</th>
                <td>$32,479</td>
                <td>$38,154</td>
                <td>$45,598</td>
              </tr>
              <tr>
                <th scope="row">Cost of sales</th>
                <td>$21,334</td>
                <td>$24,852</td>
                <td>$28,717</td>
              </tr>
            </tbody>
            <tbody>
              <tr>
                <th scope="row">Gross margin</th>
                <td>$11,145</td>
                <td>$13,302</td>
                <td>$16,881</td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <th scope="row">Margin %</th>
                <td>34.3%</td>
                <td>34.9%</td>
                <td>37.0%</td>
              </tr>
            </tfoot>
          </table>

          <h3>Table with colgroup</h3>
          <table>
            <caption>Proto-Indo-European language family sample</caption>
            <colgroup span={1}></colgroup>
            <colgroup span={2}></colgroup>
            <colgroup span={2}></colgroup>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="colgroup" colSpan={2}>
                  Germanic
                </th>
                <th scope="colgroup" colSpan={2}>
                  Romance
                </th>
              </tr>
              <tr>
                <th scope="col">English</th>
                <th scope="col">Swedish</th>
                <th scope="col">Dutch</th>
                <th scope="col">French</th>
                <th scope="col">Spanish</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">No</th>
                <td>Nej</td>
                <td>Nee</td>
                <td>Non</td>
                <td>No</td>
              </tr>
              <tr>
                <th scope="row">Yes</th>
                <td>Ja</td>
                <td>Ja</td>
                <td>Oui</td>
                <td>Sí</td>
              </tr>
              <tr>
                <th scope="row">Bear</th>
                <td>Björn</td>
                <td>Beer</td>
                <td>Ours</td>
                <td>Oso</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr />

        <section id="embeds" aria-labelledby="embeds-title">
          <h2>
            <span id="embeds-title">Embedded Content</span>
            <a href="#interactive" className="sr-nav-link">
              Skip to next section: {`"Interactive"`}.
            </a>
            <a href="#tables" className="sr-nav-link">
              back to previous section: {`"Tables"`}.
            </a>
          </h2>
          <p>
            Elements that embed external resources: images, audio, video,
            iframes, SVG, MathML, and canvas.
          </p>

          <h3>Image</h3>
          <p>
            <Image
              src="https://placecats.com/150/150"
              alt="A 150 by 150 pixel photo of a kitten"
              width={150}
              height={150}
            />
          </p>

          <h3>Picture with responsive sources</h3>
          <picture>
            <source srcSet="https://placecats.com/240/148 2x,https://placecats.com/120/74  1x" />
            <Image
              src="https://placecats.com/120/74"
              alt="A kitten at golden ratio aspect"
              width={120}
              height={74}
            />
          </picture>

          <h3>Audio</h3>
          <audio controls preload="none">
            <source
              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/What_hath_God_wrought.ogg"
              type="audio/ogg"
            />
            <p>
              Your browser does not support the audio element.
              <a href="https://upload.wikimedia.org/wikipedia/commons/c/c7/What_hath_God_wrought.ogg">
                Download the audio
              </a>
              .
            </p>
          </audio>

          <h3>Video</h3>
          <iframe
            loading="lazy"
            sandbox=""
            className="aspect-video object-cover bg-black w-2xl"
            title="Sample embedded document"
            srcDoc={`<html><head><style>*{margin:0; padding:0; width:100%; aspect-ratio: 16/9; object-fit: cover; background:black; overflow: hidden;}</style></head><body><video controls width={320} preload="none">
            <source src="/video.mp4" type="video/mp4" />
            <p>
              Your browser does not support the video element.
              <a href="/video.mp4">Download the video</a>.
            </p>
          </video></body></html>`}
          ></iframe>

          <h3>Iframe</h3>
          <iframe
            title="Sample embedded document"
            srcDoc="<p style='font-family:system-ui;padding:1em'>This is an embedded document inside an <code>iframe</code>.</p>"
            width="100%"
            height={80}
          ></iframe>

          <h3>SVG</h3>
          <svg
            role="img"
            aria-labelledby="svg-title"
            width={200}
            height={124}
            viewBox="0 0 200 124"
          >
            <rect
              x={0}
              y={0}
              width={200}
              height={124}
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
            />
            <line
              x1={124}
              y1={0}
              x2={124}
              y2={124}
              stroke="currentColor"
              strokeWidth={0.5}
              strokeDasharray="4 2"
            />
            <line
              x1={124}
              y1={47}
              x2={200}
              y2={47}
              stroke="currentColor"
              strokeWidth={0.5}
              strokeDasharray="4 2"
            />
            <text
              x={50}
              y={65}
              fontSize={11}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui"
            >
              φ
            </text>
            <text
              x={155}
              y={25}
              fontSize={9}
              fill="currentColor"
              textAnchor="middle"
              fontFamily="system-ui"
            >
              1−1/φ
            </text>
          </svg>

          <h3>MathML</h3>
          <math
            display="block"
            aria-label="phi equals one plus square root of five, all divided by two"
          >
            <mrow>
              <mi>φ</mi>
              <mo>=</mo>
              <mfrac>
                <mrow>
                  <mn>1</mn>
                  <mo>+</mo>
                  <msqrt>
                    <mn>5</mn>
                  </msqrt>
                </mrow>
                <mn>2</mn>
              </mfrac>
            </mrow>
          </math>

          <h3>Canvas</h3>
          <SinkDemosCanvas />
        </section>

        <hr />

        <section id="interactive" aria-labelledby="interactive-title">
          <h2>
            <span id="interactive-title">Interactive Elements</span>
            <a href="#footer" className="sr-nav-link">
              Skip to the last section: {`"Footer"`}.
            </a>
            <a href="#embeds" className="sr-nav-link">
              back to previous section: {`"Embeds"`}.
            </a>
          </h2>
          <p>Elements that provide interactive disclosure or summarization.</p>

          <h3>Details and summary</h3>
          <details>
            <summary>What is the golden ratio?</summary>
            <p>
              The golden ratio (φ) is an irrational number equal to
              <code>(1 + √5) / 2</code>, approximately 1.6180339887. It appears
              in geometry, art, architecture, and nature. Two quantities are in
              the golden ratio if their ratio equals the ratio of their sum to
              the larger quantity.
            </p>
          </details>
          <details>
            <summary>Why use it in CSS?</summary>
            <p>
              Proportions derived from φ create visual harmony without arbitrary
              magic numbers. A type scale, spacing system, and layout grid all
              derived from the same irrational constant produce inherently
              cohesive designs.
            </p>
          </details>
          <details open>
            <summary>File transfer progress (open by default)</summary>
            <dl>
              <dt>Transfer rate</dt>
              <dd>452 KB/s</dd>
              <dt>Elapsed</dt>
              <dd>01:16:27</dd>
              <dt>Progress</dt>
              <dd>
                <progress max={375505392} value={97543282}></progress>
                26%
              </dd>
            </dl>
          </details>
          <SinkDemosDialog />
        </section>
      </main>
    </Layout>
  );
}
