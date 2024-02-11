import Links from "./Links";

export default function Hero() {
  return (
    <div class="flex-row" style="margin-top: 50px; margin-bottom: 25px;">
      <div>
        <h1>Hi, I'm Jacob.</h1>
        <p style="font-size: calc(var(--copy-size) * 1.1); margin-bottom: 5px;">Full Stack Software Engineer & Web Developer passionate about building UI's and enabling product teams through design & developer tools.</p>
        <p>Minneapolis, USA | UTC -5hrs</p>
        <Links />
      </div>
      <img class="mobile-hide" style="width: 175px; height: 175px; border-radius: 12px;" src="./static/images/pfp.jpeg" alt="A photograph of the author."/>
    </div>
  );
}
