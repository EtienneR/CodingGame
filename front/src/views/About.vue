<template>
	<div>

		<section class="hero">
			<div class="hero-body has-text-centered">
				<h1 class="title is-1">
					A propos
				</h1>
				<h2 class="subtitle">
					FAQ
				</h2>
			</div>
		</section>

        <section class="container">

            <b-tabs position="is-centered">
                <b-tab-item label="Coding Game">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Pourquoi avoir créé cette application ?</p>
                                <p>Dans le but de faire un Coding Game pour la startup HelloZack sur une durée courte de 3 jours</p>
                            </article>
                        </div>
                    </div>
                </b-tab-item>

                <b-tab-item label="Annexe 1">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Les animaux</p>
                                <p class="subtitle">Les catégories possibles</p>
                                <ul v-for="(animal, index) in animaux" :key="index">
                                    <li>{{ animal }}</li>
                                </ul>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Les etats</p>
                                <p class="subtitle">Les catégories possibles</p>
                                <ul v-for="(etat, index) in etats" :key="index">
                                    <li>{{ etat }}</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </b-tab-item>

                <b-tab-item label="Annexe 2">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Les statuts</p>
                                <p class="subtitle">Les catégories possibles</p>
                                <b-table :data="statuts">
                                    <template slot-scope="props">
                                        <b-table-column field="name" label="Statut">
                                            {{ props.row.name }}
                                        </b-table-column>

                                        <b-table-column field="last_name" label="Description">
                                            {{ props.row.description }}
                                        </b-table-column>
                                    </template>
                                </b-table>
                            </article>
                        </div>
                    </div>
                </b-tab-item>

                <b-tab-item label="Annexe 3">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Les brigades</p>
                                <p class="subtitle">Les catégories possibles</p>
                                <b-table :data="brigades">
                                    <template slot-scope="props">
                                        <b-table-column label="Brigade">
                                            {{ props.row }}
                                        </b-table-column>
                                    </template>
                                </b-table>
                            </article>
                        </div>
                    </div>
                </b-tab-item>

                <b-tab-item label="Technologies utilisées">
                    <div class="tile is-ancestor">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Back</p>
                                <p class="subtitle">Propulsé par Node.js</p>
                                <ul>
                                    <li>Express</li>
                                    <li>Mongoose</li>
                                    <li>Cors</li>
                                    <li>Morgan</li>
                                    <li>Nodemon</li>
                                </ul>
                            </article>
                        </div>
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                                <p class="title">Front</p>
                                <p class="subtitle">Vue.js</p>
                                <ul>
                                    <li>Vue</li>
                                    <li>VueRouter</li>
                                    <li>Axios</li>
                                    <li>Buefy</li>
                                    <li>Moment</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                </b-tab-item>
            </b-tabs>

        </section>

	</div>
</template>

<script>
import { animaux } from '@/services/Api'
import { etats } from '@/services/Api'
import { brigades } from '@/services/Api'

export default {
	metaInfo: {
		title: 'A propos',
	},
	data () {
		return {
            animaux,
            etats,
			statuts: [
                { 
                    name: 'Signalé',
                    description: "Une alerte a été faite et le signalement vient d’apparaitre sur le dashboard"
                },
                {
                    name: 'Assigné',
                    description: 'Une brigade a été assignée au signalement'
                },
                {               
                    name: 'Sauvé',
                    description: 'La brigade est intervenue et a sauvé l’animal'
                },
                {               
                    name: 'Echec',
                    description: 'La brigade est intervenue et n’a pas sauvé l’animal'
                },
                {               
                    name: 'Annulé',
                    description: 'Signalement annulé par l’opérateur'
                }
            ],
            brigades
		}
	},
}
</script>