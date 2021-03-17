const controller = {
	keys: {
		ArrowRight: Math.PI / 50,
		ArrowLeft: -Math.PI / 50,
		ArrowUp: -1,
		' ': 1,
	},
	activeKeys: [],

	init() {
		//écouteur d'event pour le clavier
		document.addEventListener('keydown', e => {
			if (
				Object.keys(this.keys).includes(e.key) &&
				!this.activeKeys.includes(e.key)
			) {
				e.preventDefault()
				e.stopPropagation()
				this.activeKeys.push(e.key)
			}
		})

		document.addEventListener('keyup', e => {
			if (this.activeKeys.includes(e.key)) {
				e.preventDefault()
				e.stopPropagation()
				const index = this.activeKeys.indexOf(e.key)
				this.activeKeys.splice(index, 1)
			}
		})
	},
}
export default controller
