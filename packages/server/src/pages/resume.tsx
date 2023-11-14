import { Layout, type SiteData } from "../utils";

export default function ResumePage(props: { site_data: SiteData; }) {
  return (
    <Layout {...props.site_data}>
      <h1>Resume</h1> 
      <div id="resume" class="article-wrap">
        <article class="employ-article">
          <h2>Past Employment</h2>
          <section>
            <h3>Software Engineer, Stylitics Inc.</h3>
            <p>New York, NY</p>
            <p>January 2022 to Present</p>
            <ul>
              <li>Core contributor to Stylitics front-end product suite.</li>
              <li>Contributed to formalizing our architecture for Third Party JS widgets.</li>
              <li>Lead our migration to modern tooling like Vite, Vitest, and PNPM.</li>
              <li>Designed, Built, and Deloyed an internal Error Reporting Cloud Service using Google Cloud Functions and Cloud Logger</li>
              <li>Reduced CI compute time by over 75%.</li>
              <li>Designed and instituted git based deployment strategies.</li>
              <li>Contribute to our internal and external technical documentation.</li>
            </ul>
          </section>
          <section>
            <h3>Web & Digital Media Manager, Hennepin Technical College</h3>
            <p>Minneapolis, MN</p>
            <p>June 2021 to January 2022</p>
            <ul>
              <li>Created consistent structural input format to maintain site continuity by authoring and implementing best-practices for designers and content providers.</li>
              <li>Collected and responded to user feedback through iterative improvements to site structure and content.</li>
              <li>Developed and implemented iterative updates by reviewing past performance metrics and traffic analytics via Google Analytics.</li>
              <li>Tested and debugged site updates and prevented functional flaws from impacting public visitors.</li>
              <li>Collaborated with Marketing and Enrollment teams on projects to increase enrollment and engagement with students.</li>
            </ul>
          </section>
          <section>
            <h3>Freelance Web Developer, Self Employed</h3>
            <p>Minneapolis, MN</p>
            <p>December 2019 to June 2021</p>
            <ul>
              <li>Planned website development, converting mockups into usable web presence with HTML, JavaScript, AJAX and JSON coding.</li>
              <li>Provided front-end website development using WordPress, Hubspot and other editing software.</li> 
              <li>Multi-tasked across multiple functions and roles to meet deadlines and organizational expectations.</li> 
              <li>Applied emerging technologies to update and maintain site applicability.</li>
            </ul>
          </section>
        </article>  

        <aside>
          <article>
            <img class="pfp print-hide mobile-hide" src="./static/images/pfp.jpeg" alt="A photograph of the author."/>
            <section class="print-hide">
              <h2>Stuff I'm Particularly Proud Of</h2>
              <ul>
                <li><a href="https://www.youtube.com/watch?v=U3rS-nOiN6k">My 2023 Svelte Summit Talk</a></li>
                <li><a href="https://github.com/stordahl/keg">Keg - a tiny CLI for managing Homebrew</a></li>
                <li><a href="/writing/from-welder-to-software-engineer">How I transitioned my career from welding to software engineering</a></li>
              </ul>
            </section>
            <section>
              <h2>Tech I'm Excited By</h2> 
              <ul>
                <li>TypeScript</li>
                <li>HTML</li>
                <li>Svelte.js</li>
                <li>JavaScript Edge Runtimes</li>
                <li>Bun</li>
                <li>bash</li>
              </ul>
            </section>
            <section>
              <h2>Contact</h2>
              <p><strong>Email:</strong> <a href="mailto:jacob@stordahl.dev">jacob@stordahl.dev</a></p>
              <p><strong>Github:</strong> <a href="https://github.com/stordahl">github.com/stordahl</a></p>
              <p><strong>Location:</strong> Minneapolis, USA</p>
              <p><strong>Timezone:</strong> UTC -5hrs</p>
            </section>
            <section>
              <h2>Education</h2>
              <p><strong>Degree:</strong> BA in Digital Media Arts</p>
              <p><strong>Institution:</strong> Hamline University, 2017</p>
            </section>
          </article>
        </aside>
      </div>
    </Layout>
  );
};

