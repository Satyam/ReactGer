import React from 'react';

export default class Main extends React.Component {
	render () {
		return (
			<div className="home">
				<h1>Germán Ponce Estilistas</h1>
				<h2>Un estilo personal</h2>
				<div className="big-logo"></div>
				<p>
					Salvador Lluch 2 (esq. Zapadores)
					<br />46006, Valencia
					<br/>
					<a href="https://maps.google.es/maps?q=Germ%C3%A1n+Ponce+Estilistas&hl=es&ie=UTF8&ll=39.458513,-0.368707&spn=0.009195,0.016608&sll=41.692152,1.746005&sspn=2.27641,4.251709&t=m&hnear=Calle+de+Salvador+Lluch,+2,+46006+Valencia,+Comunidad+Valenciana&cid=14140476976250366462&z=16" target="_blank">
						Ver ubicación</a>
				</p>
				<p>Tel: 96 328 39 17</p>
			</div>
		);
	}
}
