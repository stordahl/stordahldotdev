export function Resume() {
  return (
    <>
      <h1 class="visually-hidden">Resume</h1>  
      <div id="resume">
        <img class="pfp print-hide" src="./static/images/pfp.jpeg" alt="A photograph of the author."/>
        
        <div class="resume-header">
          <p class="name">Jacob Stordahl</p>
          <p>Minneapolis, USA &nbsp;|&nbsp; UTC -5hrs</p>
        </div>

        <p class="big-copy">Software Engineer, passionate about building UI's and enabling product teams through design & developer tools.</p>
        
        <section>
          <h2>Past Employment</h2>
          <article>
            <h3>Software Engineer, Stylitics Inc.</h3>
            <p>New York, NY &nbsp;|&nbsp; January 2022 to Present</p>
            <ul class="list">
              <li>Core contributor to Stylitics front-end product suite of Third Party JS widgets.</li>
              <li>Lead our migration to modern tooling like Vite, Vitest, and PNPM, which led to a reduction in CI compute time by over 75%.</li>
              <li>Designed, Built, and Deloyed an internal Error Reporting Cloud Service using Google Cloud Functions and Cloud Logger.</li>
              <li>Designed and instituted git based deployment strategies.</li>
              <li>Contribute to our internal and external technical documentation.</li>
            </ul>
          </article>

          <article>
            <h3>Web & Digital Media Manager, Hennepin Technical College</h3>
            <p>Minneapolis, MN &nbsp;|&nbsp; June 2021 to January 2022</p>
            <ul class="list">
              <li>Created consistent structural input format to maintain site continuity by authoring and implementing best-practices for designers and content providers.</li>
              <li>Collected and responded to user feedback through iterative improvements to site structure and content.</li>
              <li>Developed and implemented iterative updates by reviewing past performance metrics and traffic analytics via Google Analytics.</li>
              <li>Tested and debugged site updates and prevented functional flaws from impacting public visitors.</li>
              <li>Collaborated with Marketing and Enrollment teams on projects to increase enrollment and engagement with students.</li>
            </ul>
          </article>
        </section>

        <section>
          <h2>Education</h2>
          <p><strong>Degree:</strong> BA in Digital Media Arts</p>
          <p><strong>Institution:</strong> Hamline University, 2017</p>
        </section>

      </div>
    </>
  );
};

export const ResumeMeta = { 
  description: "My resume.",
  title: "Resume" 
};
