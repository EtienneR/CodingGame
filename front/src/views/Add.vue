<template>
	<div>

        <section class="hero">
            <div class="hero-body has-text-centered">
                <h1 class="title is-1">
                    {{ title }}
                </h1>
                <h2 class="subtitle" v-if="!$route.params.id">
                    Afin de permettre à nos equipes de se mobiliser.
                </h2>
                <h2 class="subitle" v-else>
                    <div class="level">
                        <div class="level-item tags">
                            <span class="tag is-medium" :class="statutColor">{{ signalement.statut }}</span> 
                            <span v-if="signalement.brigade" class="tag is-medium is-black">{{ signalement.brigade }}</span>
                        </div>
                    </div>
                </h2>
            </div>
        </section>

        <FormSignalement :signalement="signalement" />

        <Map :signalement="signalement" v-if="this.$route.params.id" />

    </div>
</template>

<script>
import api from '@/services/Api'
import FormSignalement from '@/components/FormSignalement.vue'
import Map from '@/components/Map.vue'

export default {
    metaInfo() {
        return {
            title: this.title
        }
    },
	name: 'Add',
	components: {
		FormSignalement,
        Map
	},
	data () {
		return {
            title: this.$route.params.id ? 'Modifier un signalement' : 'Ajouter un signalement',
            signalement: {
                creneauDebut: '',
                creneauFin: '',
                alerteur: '',
                animal: '',
                couleur: '',
                voie: '',
                cp: '',
                ville: '',
                etat: '',
                collier: Boolean,
                coordonnees: {
                    lat: '',
                    lon: '',
                },
                statut: 'Signalé',
                brigade: ''
            },
        }
    },
    computed: {
        statutColor() {
            if (this.signalement.statut === 'Signalé') {
                return 'is-light'
            }
            if (this.signalement.statut === 'Assigné') {
                return 'is-info'
            }
            if (this.signalement.statut === 'Sauvé') {
                return 'is-success'
            }
            if (this.signalement.statut === 'Echec') {
                return 'is-danger'
            }
            if (this.signalement.statut === 'Annulé') {
                return 'is-light'
            }
        }
    },
    async created() {
        if (this.$route.params.id) {
            this.getSignalement(this.$route.params.id)
        }
    },
    methods: {
        async getSignalement(id) {
            await api.getSignalement(id)
            .then(res => {
                this.signalement = res.data
            })
            .catch(err => {
                if (err.response == null || err.response.status === 500) {
                    console.err(err)
                }
            })
        }
    }
}
</script>