<template>
	<div v-if="!loading">

		<section class="hero">
			<div class="hero-body has-text-centered">
				<h1 class="title is-1">
					Signalements ({{ signalements.length }})
				</h1>
				<h2 class="subtitle">
					Liste des signalements d'animaux dans Paris et sa petite couronne.
				</h2>
			</div>
		</section>

		<Dashboard :signalements="signalements" />

	</div>
</template>

<script>
import Dashboard from '@/components/Dashboard.vue'
import api from '@/services/Api'

export default {
	metaInfo: {
		title: 'Tableau des signalements',
	},
	name: 'home',
	components: {
		Dashboard
	},
	data () {
		return {
			loading: false,
			signalements: []
		}
	},
	async created() {
		this.getAllSignalements()
	},
	methods: {
		async getAllSignalements() {
			this.loading = true
			await api.getAllSignalements()
			.then(res => {
				this.signalements = res.data
			})
			.catch(err => {
				if (err.response == null || err.response.status === 500) {
					console.err(err)
				}
			})
			this.loading = false
		}
	}
}
</script>
