import { css } from "hono/css"

export const _globalCss = css`
  :-hono-global {
    body {
      font-size: 14px;
	    background-color: var(--bg);
      fill: currentColor;
    }

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    @font-face {
      font-family: Work Sans;
      src: url('/static/fonts/WorkSans-Regular.ttf') format('truetype'); 
      font-display: swap;
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: var(--heading-family);
      font-weight: var(--heading-weight);
      color: var(--text-secondary);
      margin-bottom: clamp(5px, calc(5px + 0.5vw), 20px);
    }

    h1 { font-size: clamp(2rem, calc(2vw + 2rem), 2.3rem); }
    h2 { font-size: clamp(1.25rem, calc(2vw + 1.25rem), 1.7rem); }
    h3 { font-size: clamp(1.15rem, calc(2vw + 1.15rem), 1.3rem); }

    p, a, span:not([class*="demo"]), blockquote, figcaption {
      font-family: var(--copy-family);
      font-weight: var(--copy-weight);
      color: var(--text-primary);
    }

    p {
      margin-bottom: 20px;
      font-size: var(--copy-size);
      line-height: 1.6rem;
    }

    a { color: var(--text-secondary); }

    a:hover, a:focus { 
      text-decoration: underline; 
      border: none; 
      outline: none;
    }

    ul:not(article ul) {
      list-style: none;
    }

ol {
  color: var(--text-primary);
  padding-left: revert;
}

ul, ol {
  margin-bottom: 20px;
}

li {
  color: var(--text-primary);
  font-size: var(--copy-size);
  font-family: var(--copy-family);
  font-weight: var(--copy-weight);
  margin-bottom: clamp(.75rem, calc(0.5vw + .1rem), 1rem);
}

img {
  max-width: 100%;
}

figure {
	margin: auto;
	margin-bottom: 20px;
	max-width: 650px;
}

figure > img {
	margin-bottom: 10px;
}

figcaption {
	font-style: italic;
}


blockquote {
  margin: 3rem auto;
  border-left: 3px solid var(--text-secondary);
  font-size: clamp(1rem, calc(0.5vw + 1.2rem), 1.8rem);
  padding-left: 1.2rem;
  font-style: italic;
}

blockquote p {
  font-size: clamp(1rem, calc(0.5vw + 1.2rem), 1.4rem);
  line-height: 1.8rem;
}

    .mobile-hide {
      display: none;
    }

  @media screen and (min-width: 700px) {
    .mobile-hide {
      display: unset;
    }
  }

  @media print {
    .print-hide {
      display: none;
    }
  }

    .out::after {
      content: "";
      width: 8px;
      height: 8px;
      margin-left: 3px;
      margin-bottom: 0.5%;
      background-color: var(--bg);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='black' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z'/%3E%3Cpath fill-rule='evenodd' d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z'/%3E%3C/svg%3E");
      background-position: center;
      background-repeat: no-repeat;
      background-size: contain;
      display: inline-block;
      white-space: nowrap;
    }

    @media (prefers-color-scheme: dark) {
      img {
        filter: grayscale(1) brightness(1.2);
      }

      code:not(pre>code) {
        background-color: #333741;    
        color: #f2f2f2;
      }

      .out:after {
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='white' viewBox='0 0 16 16'%3E%3Cpath fill-rule='evenodd' d='M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z'/%3E%3Cpath fill-rule='evenodd' d='M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z'/%3E%3C/svg%3E");
      }
    }
  }
`
