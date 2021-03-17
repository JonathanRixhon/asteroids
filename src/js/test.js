const main = {
	fpsInterval: 0,
	now: 0,
	then: 0,
	elapsed: 0,
	stop: false,
	init(fps) {
		this.stop = false
		//on décrit combien d'image par seconde
		this.fpsInterval = 1000 / fps
		//on défini la date de lancement, qui est un timestamp
		this.then = Date.now()
		//lancer l'animation
		console.log('test')
		this.animate()
	},
	stopAnimating() {
		this.stop = true
	},

	animate() {
		// boucle d'animation
		requestId = window.requestAnimationFrame(() => {
			this.animate()
		})
		//on s'amuse avec le code
		if (this.stop) {
			cancelAnimationFrame(requestId)
		}
		//on s'amuse avec le code

		// calcul du temps écoulé depuis la boucle précédente
		this.now = Date.now()
		this.elapsed = this.now - this.then
		// si le temps écoulé est suffisant, on passe à la nouvelle frame
		if (this.elapsed >= this.fpsInterval) {
			// On prépare pour l'image suivante en affectant now à then
			//mais aussi, on ajuste pour ne pas que le fps interval ne soit pas un multiple de 16.67 (je cherche toujours pourquoi)
			this.then = this.now - (this.elapsed % this.fpsInterval)
			// différentes fonctions d'update
			console.log(this.elapsed, this.fpsInterval)
		}
	},
}
