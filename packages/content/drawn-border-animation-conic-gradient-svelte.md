---
title: Creating a Drawn Border Animation with Conic Gradient & Svelte
date: "2022-09-25"
status: published
---

If you've worked with CSS & Animation on the web for a while, you've likely run into a very common animation that is rather difficult to implement - smoothly drawing a border around a DOM element. There are a few different approaches out there, but they all have limitations that have disqualified them from projects in the past. The first approach I've explored is wrapping your element in an SVG path which can easily be animated with Javascript or using something like [Svelte's](https://svelte.dev) built in draw animation. However, this requires knowledge of the inner elements dimensions. If the element is a submit button, that will always contain the text 'Submit', for example, this approach is adequate. 

However, I'm often building design systems, or reusable components where the element and its inner content will change depending on the destination of the component. SVGs do not play well with the normal document flow, which makes sense given they are vector graphics. There are other approaches to animating borders, like this [Animated Gradient Border](https://dev.to/dailydevtips1/animating-a-gradient-border-in-css-1dho) by Chris Bongers, however the crux of this solution is CSS border-image. Border Image makes it easy to use different CSS gradients to create borders around elements, but there is one key flaw: it doesn't respect border-radius.

The solution for this particular animation I'm looking to achieve, must meet these requirements

1. Work on any DOM element
2. Work even when the inner content changes
3. Respect the child elements border-radius property

## The Hypothesis

In researching approaches to this animation, I thought there might be a way to use Javascript to manipulate a CSS gradient that could create this drawing effect. I realized that, since I'm working with Svelte, I can make use of its reactivity to make that solution pretty concise. Then I stumbled upon a CSS feature I had never heard of and it happened to be the perfect tool for this approach: the Conic Gradient. A conic gradient is similar to a radial gradient, with the difference being that a conic gradient's color transitions rotate around a center point (similar to the motion of a clock), rather than radiating from the center, like a radial gradient does. Below is a screenshot of the MDN demo of a conic gradient, to help visualize this.

![A screenshot of the MDN playground for conic gradients](/static/images/conic-gradient-1.png)

## Markup

The basic HTML strategy for this is based on a [CodePen example](https://codepen.io/shshaw/pen/MqMZGR) by Stephen Shaw where Stephen uses a wrapper div with a gradient background, then applying a transparent border to the child. This gives the effect of a gradient border on the child element. However, to make this component as reusable as possible, we're going to use two wrapper divs. This eliminates the need to apply styles to the target element in order for the animation to work. Here's the basic markup in the form of a Svelte template...

```html
<div style:border-radius={borderRadius}
		 style="max-width: max-content;">
	<div style="
	  border-radius: calc({borderRadius} - 2px); 
	  border: 2px solid transparent;">
		<slot/>		
	</div>
</div>
```

The parent div receives its border radius from a component prop which we apply to the element using Svelte's style directive. This div also needs a max-width rule to eliminate the default block display behavior of the div. 

The nested div around the slot has the 2px transparent border, as well as a calc function, using the borderRadius prop and subtracting the border width to create the same radii for the two nested div elements. We'll add to this markup as we build the component, but this is a good base.

## Props & Component State

Now that we have our basic markup, we can initialize the mechanism for applying the gradient that will create the animation. First we need to create the state for our gradient value and incorporate it into our markup.

Since this is a reusable component, we want to allow the components user to control certain values, so we're providing some props for border radius, initial color, and end color. initialColor being the color of the border before the animation starts, and endColor being the color of the border after the animation is finished. 

```html
<script>
  export let initialColor
  export let endColor
  export let borderRadius
  
  let gradientState = `${initialColor}, ${initialColor}`
</script>

<div style:border-radius={borderRadius}
		 style="max-width: max-content;"
		 style:background-color={initialColor}
		 style:background={`conic-gradient(${gradientState})`}
>
	<div style="
	  border-radius: calc({borderRadius} - 2px); 
	  border: 2px solid transparent;">
		<slot/>		
	</div>
</div>
```

Next, we initialize the gradientState variable, and give it a default value that is a valid CSS gradient value, but is only made up of the initialColor prop. 

Finally, we need to add two more style directives for background color and background. Background color uses the initial color prop to create the initial state of the element's border, and the background directive is where we apply our conic gradient along with our gradientState variable. This is the foundation for updating the gradient with Javascript and Svelte's reactivity.

## The Logic

The first part of our logic is a small helper function that returns a CSS gradient string that we can use to update our state. We can use an arrow function and template string to create this in one line. 

```html
<script>
  export let initialColor
  export let endColor
  export let borderRadius
  export let startingDeg
  
  let gradientState = `${initialColor}, ${initialColor}`
  
  const createGradient = (deg) => `from ${startingDeg}deg, ${endColor} ${deg}deg, ${initialColor} ${deg}deg`;
  
</script>

<div><!-- Template --></div>
```

The createGradient function takes one argument that represents the degree values in the conic gradient. This function also makes use of the initialColor and endColor prop values for the gradient colors. We've also added a new prop, startingDeg, that allows the component user to choose where the animation starts based on the 360 degrees of the conic gradient(zero being the middle top of the element).

Now that we have this helper, we can setup the main mechanism that will use this helper to create the animation. We'll make use of setInterval to create an interval and update the gradientState variable. But first we need to create a few more state variables in order for the setInterval to work. 

```html
<script>
  export let initialColor
  export let endColor
  export let borderRadius
  export let startingDeg
  
  let gradientState = `${initialColor}, ${initialColor}`
  let tick = 0;	
	let intervalFwd = undefined;
	let intervalRev = undefined;
  
  const createGradient = (deg) => `from ${startingDeg}deg, ${endColor} ${deg}deg, ${initialColor} ${deg}deg`;
  
</script>

<div><!-- Template --></div>
```

The new tick variable is used to store the current degree count of the animation as the setIntervals are running, and the interval variable will allow use to reference the interval we have running while the animation is playing.

Now it's time for the real logic of this animation. The animation function takes one argument that represents the direction the animation should play when the function is called. First, we clear the interval assuming it may have already been created previously. Then we assign a new setInterval to our interval state variable, and provide a callback function to setInterval. 

This callback function is doing all the heavy lifting and completely powers the animation. First we check if our tick state variable is less than or equal two 360. Since a conic gradient rotates around a point, and a circle consists of 360 degrees, if our tick reaches that number, we can assume the animation is over. If tick is less than 360, we call the createGradient helper, passing it tick, and assign the return value to our gradientState variable. This will trigger Svelte to re-render the template, updating the CSS gradient value in the process. However, if tick is greater than 360, we want to set the gradient to a solid color just like we did when initializing gradientState, but using endColor this time. 

The last step in this callback function is we need to increment or decrement tick based on the dir argument passed to the parent function. Then we set the interval to run every 0.001 milliseconds and we should get a pretty smooth animation.

The last piece of the logic is a result of the value we are incrementing/decrementing by. I've found three to be the best value for the animation, however this means that we will always over shoot 0/360 when updating the tick value. To normalize this behavior, we can use Svelte's reactive statement feature, checking if tick passes either 0 or 360 as it changes, and reassigning it to 0 or 360 respectively.

```html
<script>
  export let initialColor
  export let endColor
  export let borderRadius
  export let startingDeg
  
  let gradientState = `${initialColor}, ${initialColor}`
  let tick = 0;	
	let interval = undefined;
  
  const createGradient = (deg) => `from ${startingDeg}deg, ${endColor} ${deg}deg, ${initialColor} ${deg}deg`;
  
  const animation = (dir) => {
			clearInterval(interval)
			interval = setInterval(() => {
				tick <= 360 ? 
					gradientState = createGradient(tick) :
			  	gradientState = `${endColor}, ${endColor}`;
					if(dir === 'fwd') tick = tick + 3
					if(dir === 'rev') tick = tick - 3
			}, 0.001)
	}
	
	$: if(tick >= 361) tick = 360
	$: if(tick < 0) tick = 0
</script>

<div><!-- Template --></div>
```

## Event Handling

The final step in building this component is using the animation function and attaching it to a DOM event that will trigger it. In this example we'll trigger the animation on hover, and reverse it when hover ends.

```html
<script>
  export let initialColor
  export let endColor
  export let borderRadius
  export let startingDeg
  
  let gradientState = `${initialColor}, ${initialColor}`
  let tick = 0;	
	let interval = undefined;
  
  const createGradient = (deg) => `from ${startingDeg}deg, ${endColor} ${deg}deg, ${initialColor} ${deg}deg`;
  
  const animation = (dir) => {
			clearInterval(interval)
			interval = setInterval(() => {
				tick <= 360 ? 
					gradientState = createGradient(tick) :
			  	gradientState = `${endColor}, ${endColor}`;
					if(dir === 'fwd') tick = tick + 3
					if(dir === 'rev') tick = tick - 3
			}, 0.001)
	}
	
	$: if(tick >= 361) tick = 360
	$: if(tick < 0) tick = 0
</script>

<div on:mouseenter={() => animation('fwd')}
		 on:mouseleave={() => animation('rev')}
     style:border-radius={borderRadius}
		 style="max-width: max-content;"
		 style:background-color={initialColor}
		 style:background={`conic-gradient(${gradientState})`}
>
	<div style="
	  border-radius: calc({borderRadius} - 2px); 
	  border: 2px solid transparent;">
		<slot/>		
	</div>
</div>
```

Now we have a reusable Svelte component to apply a drawn border animation to any DOM element, even when the content is changed or the element changes in size. A few notes on the component you wrap with this animation component

1. The child element needs a background color or you will see the animation through the element
2. The child element should not have margin or it will effect the fake border we're creating with the element
3. The child element should have border-radius: inherit, so it inherits the border radius you pass in as props to the parent component

If you'd like to see the full REPL where I built this, here's [the link](https://svelte.dev/repl/e8f01306bf904a09b72d631816d55775). I may end up turning this into an npm package with more props for further customization, and I will update this post if I do so. Thanks for reading and happy animating!

