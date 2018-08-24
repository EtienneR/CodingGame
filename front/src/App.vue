<template>
	<div id="app">
		<nav class="navbar is-transparent">
				<div class="navbar-brand">
					<div @click="isActive"
						:class="{ 'is-active': active }"
						class="navbar-burger burger"
						data-target="navMenu"
						aria-label="menu"
						aria-expanded="false">
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
						<span aria-hidden="true"></span>
					</div>
				</div>
			<div class="navbar-menu" :class="{ 'is-active': active }">
				<div class="navbar-start">
					<router-link to="/" class="navbar-item">Dashboard</router-link> 
					<router-link to="/ajouter" class="navbar-item">Ajouter un signalement</router-link>
				</div>
				<div class="navbar-end">
					<router-link to="/about" class="navbar-item">A propos</router-link> 
				</div>
			</div>
		</nav>
		<router-view/>
	</div>
</template>

<script>
import { EventBus } from '@/event-bus.js'

export default {
	data() {
		return {
			active: false,
			message: ''
		}
	},
	methods: {
		isActive() {
			if (!this.active) {
				this.active = true
			} else {
				this.active = false
			}
		},
		snackbar(value) {
			this.$snackbar.open({
				duration: 5000,
				position: 'is-top',
				message: value,
				action: 'OK'
			})
		}
	},
	created() {
		const self = this
		EventBus.$on('toast', function (value) {
			self.snackbar(value)
		})
	}
}

</script>