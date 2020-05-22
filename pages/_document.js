import Document, { Head, Main, NextScript } from 'next/document';
import { extractCritical } from 'emotion-server';

export default class MyDocument extends Document {
	static getInitialProps({ renderPage }) {
		const page = renderPage();
		const styles = extractCritical(page.html);
		return { ...page, ...styles };
	}

	constructor(props) {
		super(props);
		const { __NEXT_DATA__, ids } = props;
		if (ids) {
			__NEXT_DATA__.ids = ids;
		}
	}

	render() {
		return (
			<html>
				<Head>
					<title>Looking for the Earth Next Door</title>

					<meta charset="UTF-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />

					<meta name="twitter:card" content="summary_large_image" />
					<meta name="twitter:site" content="@ixt" />
					<meta name="twitter:creator" content="@ixt" />

					<meta property="og:url" content="https://exoplanets.interactivethings.io/" />
					<meta property="og:type" content="website" />
					<meta property="og:title" content="Looking for the Earth Next Door" />
					<meta
						property="og:image"
						content="https://exoplanets.interactivethings.io/static/exoplanets-sharing.jpg"
					/>
					<meta
						property="og:description"
						content="A data story about exoplanets. How do we discover planets outside of the Solar System? How far from Earth exoplanets are? Can humans live on an exoplanet?"
					/>

					<style dangerouslySetInnerHTML={{ __html: this.props.css }} />

					<link href="https://fonts.googleapis.com/css?family=IBM+Plex+Mono:200,400,700" rel="stylesheet" />

					<link
						rel="apple-touch-icon-precomposed"
						sizes="57x57"
						href="static/favicon/apple-touch-icon-57x57.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="114x114"
						href="static/favicon/apple-touch-icon-114x114.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="72x72"
						href="static/favicon/apple-touch-icon-72x72.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="144x144"
						href="static/favicon/apple-touch-icon-144x144.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="60x60"
						href="static/favicon/apple-touch-icon-60x60.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="120x120"
						href="static/favicon/apple-touch-icon-120x120.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="76x76"
						href="static/favicon/apple-touch-icon-76x76.png"
					/>
					<link
						rel="apple-touch-icon-precomposed"
						sizes="152x152"
						href="static/favicon/apple-touch-icon-152x152.png"
					/>
					<link rel="icon" type="image/png" href="static/favicon/favicon-196x196.png" sizes="196x196" />
					<link rel="icon" type="image/png" href="static/favicon/favicon-96x96.png" sizes="96x96" />
					<link rel="icon" type="image/png" href="static/favicon/favicon-32x32.png" sizes="32x32" />
					<link rel="icon" type="image/png" href="static/favicon/favicon-16x16.png" sizes="16x16" />
					<link rel="icon" type="image/png" href="static/favicon/favicon-128.png" sizes="128x128" />
					<meta name="application-name" content="&nbsp;" />
					<meta name="msapplication-TileColor" content="#FFFFFF" />
					<meta name="msapplication-TileImage" content="static/favicon/mstile-144x144.png" />
					<meta name="msapplication-square70x70logo" content="static/favicon/mstile-70x70.png" />
					<meta name="msapplication-square150x150logo" content="static/favicon/mstile-150x150.png" />
					<meta name="msapplication-wide310x150logo" content="static/favicon/mstile-310x150.png" />
					<meta name="msapplication-square310x310logo" content="static/favicon/mstile-310x310.png" />
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		);
	}
}
