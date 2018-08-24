<template>
    <div class="container">

        <p class="label">
            <strong>Créneau</strong>
        </p>
        <div class="columns">
            <div class="column is-one-quarter">
                <b-field label="Début" label-for="creneauDebut">
                    <b-input
                        id="creneauDebut"
                        icon="clock"
                        type="time"
                        required
                        v-model="signalement.creneauDebut">
                    </b-input>
                </b-field>
            </div>
            <div class="column is-one-quarter">
                <b-field label="Début" label-for="creneauFin">
                    <b-input
                        id="creneauFin"
                        icon="clock"
                        type="time"
                        required
                        v-model="signalement.creneauFin">
                    </b-input>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Alerteur" label-for="alerteur">
                    <b-input
                        id="alerteur"
                        class="field"
                        type="email"
                        icon="email"
                        v-model="signalement.alerteur"></b-input>
                </b-field>
            </div>
        </div>

        <div class="columns">
            <div class="column">
                <b-field label="Animal" label-for="animal">
                    <b-select required v-model="signalement.animal" id="animal">
                        <option
                            v-for="animal in animaux"
                            :value="animal"
                            :key="animal">
                            {{ animal }}
                        </option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Couleur" label-for="couleur">
                    <b-input id="couleur" v-model="signalement.couleur"></b-input>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Etat" label-for="etat">
                    <b-select required id="etat" v-model="signalement.etat">
                        <option
                            v-for="etat in etats"
                            :value="etat"
                            :key="etat">
                            {{ etat }}
                        </option>
                    </b-select>
                </b-field>
            </div>
            <div class="column">
                <p class="label"><strong>Collier</strong></p>
                <b-field>
                    <b-radio-button required v-model="signalement.collier"
                        :native-value="true"
                        type="is-success">
                        <b-icon icon="check"></b-icon>
                        <span>Oui</span>
                    </b-radio-button>
                    <b-radio-button required v-model="signalement.collier"
                        :native-value="false"
                        type="is-danger">
                        <b-icon icon="close"></b-icon>
                        <span>Non</span>
                    </b-radio-button>
                </b-field>
            </div>
        </div>

        <div class="columns">
            <div class="column is-half">
                <b-field label="Voie" label-for="voie">
                    <b-input id="voie" v-model="signalement.voie"></b-input>
                </b-field>
            </div>
            <div class="column is-one-quarter">
                <b-field label="Code Postal" label-for="cp">
                    <b-input id="cp" type="number" v-model="signalement.cp"></b-input>
                </b-field>
            </div>
            <div class="column">
                <b-field label="Ville" label-for="ville">
                    <b-input id="ville" v-model="signalement.ville"></b-input>
                </b-field>
            </div>
        </div>

        <button class="button is-primary" @click="save">{{ currentSave }}</button>

    </div>
</template>

<script>
import api from '@/services/Api'
import axios from 'axios'
import { EventBus } from '@/event-bus.js'

export default {
	name: 'FormSignalement',
	props: {
		signalement: Object
	},
	computed: {
		currentSave() {
			if (this.$route.params.id) {
				return 'Modifier'
			} else {
				return 'Ajouter'
			}
		}
	},
	data () {
		return {
			animaux: ['Chien', 'Chat', 'Lapin', 'Perroquet'],
			etats: ['Très faible', 'Faible', 'Moyen', 'Bon']
        }
	},
    methods: {
        save() {
            this.getGeo()
            if (this.$route.params.id) {
                return api.updateSignalement(this.$route.params.id, this.signalement)
                .then(() => {
                    EventBus.$emit('toast', 'Signalement modifié')
                    this.$root.$router.push({ name: 'home' })
                })
            } else {
                return api.addSignalement(this.signalement)
                .then(() => {
                    //EventBus.$emit('toast', 'Signalement ajouté, merci pour votre coopération. Nous vous tiendrons informer de l évolution par courriel.')
                    this.$root.$router.push({ name: 'home' })
                })
            }
        },
        getGeo() {
            const url = encodeURI(`https://nominatim.openstreetmap.org/search?format=json&street=${this.signalement.voie}&city=${this.signalement.ville}&postalcode=${this.signalement.cp}&limit=1`)
            axios.get(url)
            .then(res => {
                if (res.data[0]) {
                    this.signalement.coordonnees[0] = res.data[0].lat
                    this.signalement.coordonnees[1] = res.data[0].lon
                }
			})
        },
    }
}
</script>