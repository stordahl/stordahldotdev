import Card from "../components/Card";

export function Consulting() {
	return (
		<>
			<h1>Third Party JavaScript Consulting</h1>
			<p>
				Unlock the full potential of your web software with expert guidance on
				Third Party JavaScript development. Whether you are looking to build
				SDKs, widgets, or analytics tools, I'd love to work with your team to
				ensure modern developer experience, seamless integration, and optimized
				performance.
			</p>

			<h2>Why Third Party JavaScript Matters</h2>
			<p>
				In today's interconnected web ecosystem, providing a Third Party
				JavaScript integration for your software can bring a lot of value to
				your business. From embedded widgets to complex analytics solutions,
				third-party scripts enrich user experiences while provided a platform
				agnostic integration target.
			</p>

			<h2>My Background</h2>
			<p>
				Throughout my career, I've been dealing with a lot of Third Party code.
				From managing Third Party Integrations for the{" "}
				<a href="https://hennepintech.edu/">
					largest technical college in Minnesota
				</a>
				, to building Third Party JavaScript applications that live on
				e-commerce sites like{" "}
				<a href="https://stylitics.com/resources/newsroom/stylitics-maximizes-retailers-catalogs-with-automated-styling-and-outfitting-solutions-2-2/">
					Puma
				</a>{" "}
				and{" "}
				<a href="https://stylitics.com/resources/case-studies/use-case-how-stylitics-is-helping-dicks-sporting-goods-effortlessly-create-featured-shops-and-merchandising-bundles/">
					Dick's Sporting Goods
				</a>
				. Currently, I'm a Product Engineer at{" "}
				<a href="https://stylitics.com">Stylitics</a>, which has provided me
				time to go deep on the problem space of Third Party JavaScript, and now
				I'm looking to help other teams navigate this fruitful though ambiguous
				product market.
			</p>

			<Card dashed={true}>
				<p>
					If you're intersted in the services I offer, shoot me an{" "}
					<a href="mailto:jacob@stordahl.dev">email</a>.
				</p>
			</Card>

			<h2>What I Offer</h2>

			<Card
				title="Consulting"
				description="I will provide guidance on application architecture, tooling, and workflows. We'll explore how developing a Third Party application can fit into your teams existing workflows, and design an architecture that gives maximum power to you team."
			/>
		</>
	);
}

export const ConsultingMeta = {
	title: "Consulting",
	description: "",
};
