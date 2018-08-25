<template>
	<div>

		<ConfirmChange
			:checkedRows="checkedRows"
			@cancelSignalement="cancelSignalement"
			@cancel="cancel" />

		<b-table
			:data="signalements"
			@click="isCardModalActive = true"
			:striped="true"
			:checked-rows.sync="checkedRows"
			:is-row-checkable="(row) => row.statut === 'Signalé' || row.statut === 'Assigné'"
			checkable>
			<template slot-scope="props">
				<b-table-column field="date" label="Date" sortable>
					<span class="tag is-success">
						{{ props.row.date | moment }}
					</span>
                </b-table-column>

				<b-table-column label="Créneau">
                    {{ props.row.creneauDebut }} - {{ props.row.creneauFin }}
                </b-table-column>

				<b-table-column field="Alerteur" label="Alerteur">
                    {{ props.row.alerteur }}
                </b-table-column>

				<b-table-column field="animal" label="Animal">
                    {{ props.row.animal }}
                </b-table-column>

				<b-table-column field="couleur" label="Couleur">
                    {{ props.row.couleur }}
                </b-table-column>

				<b-table-column label="Adresse">
					{{ props.row.voie }}<br />
					{{ props.row.cp }} {{ props.row.ville }}
				</b-table-column>

				<b-table-column field="etat" label="Etat">
					{{ props.row.etat }}
                </b-table-column>

				<b-table-column field="collier" label="Collier">
                    <span v-if="props.row.collier">Oui</span>
					<span v-else>Non</span>
                </b-table-column>

				<b-table-column field="statut" label="Statut" sortable>
					<b-select @input="assignStatut(props.row)" v-if="props.row.brigade && props.row.statut === 'Signalé' || props.row.statut === 'Assigné' " v-model="props.row.statut">
						<option
							v-for="(statut, index) in statuts"
							:value="statut"
							:key="index">
							{{ statut }}
						</option>
					</b-select>
					<span v-else>{{ props.row.statut }}</span>
                </b-table-column>

				<b-table-column field="brigade" label="Brigade" sortable>
					<span v-if="props.row.statut !== 'Annulé'">
						<b-select v-if="!props.row.brigade" v-model="props.row.brigade" @input="assign(props.row)">
							<option
								v-for="(brigade, index) in brigades"
								:value="brigade"
								:key="index">
								{{ brigade }}
							</option>
						</b-select>
						<span v-else>{{ props.row.brigade }}</span>
					</span>
                </b-table-column>

				<b-table-column label="Modifier">
					<a class="button is-primary" @click="select(props.row._id)">Modifier</a>
				</b-table-column>
			</template>

            <template slot="empty">
                <section class="section">
                    <div class="content has-text-grey has-text-centered">
                        <p>
                            <b-icon
                                icon="emoticon-sad"
                                size="is-large">
                            </b-icon>
                        </p>
                        <p>Aucun signalement</p>
                    </div>
                </section>
            </template>
		</b-table>

		<ConfirmChange
			:checkedRows="checkedRows"
			@cancelSignalement="cancelSignalement"
			@cancel="cancel" />

	</div>
</template>

<script>
import moment from 'moment'

import api from '@/services/Api'
import { brigades } from '@/services/Api'
import ConfirmChange from '@/components/ConfirmChange.vue'

export default {
	name: 'Dashboard',
	components: {
		ConfirmChange
	},
	props: {
		signalements: Array,
	},
	data () {
		return {
			statuts: ['Assigné', 'Sauvé', 'Echec'],
			brigades,
			checkedRows: []
		}
	},
	methods: {
		select(id) {
			this.$router.push({ name: 'edit', params: { id: id }})
		},
		assign(s) {
			return api.updateSignalement(s._id, {
				brigade: s.brigade,
				statut: 'Assigné'
			})
			.then(() => {
				this.signalements.filter(a => {
					if (a._id == s._id) {
						a.statut = 'Assigné'
					}
				})
			})
		},
		assignStatut: (s) => api.updateSignalement(s._id, { statut: s.statut }),
		cancelSignalement() {
			const self = this
			const brigade = ''
			const statut = 'Annulé'
			this.signalements.filter(s => {
				for (let i = 0; i < self.checkedRows.length; i++) {
					if (s._id == self.checkedRows[i]._id) {
						api.updateSignalement(s._id, {
							brigade: brigade,
							statut: statut
						})
						s.brigade = brigade
						s.statut = statut
					}
				}
			})
			this.cancel()
		},
		cancel() {
			this.checkedRows = []
		}
	},
	filters: {
		moment: function (date) {
			return moment(date).format('DD/MM/YY')
		},
	}
}
</script>