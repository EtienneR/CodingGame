<template>
	<div>

		<span v-if="checkedRows.length > 0">
			Annuler ces {{ checkedRows.length }} signalements ?
				<b-field>
					<b-radio-button
						@click.native="cancelSignalement"
                        type="is-primary">
                        <b-icon icon="check"></b-icon>
                        <span>Oui</span>
                    </b-radio-button>
                    <b-radio-button 
                        @click.native="cancel"
                        type="is-danger">
                        <b-icon icon="close"></b-icon>
                        <span>Non</span>
                    </b-radio-button>
				</b-field>
		</span>

		<b-table
			:data="signalements"
			@click="isCardModalActive = true"
			:striped="true"
			:checked-rows.sync="checkedRows"
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
					<b-select v-if="props.row.brigade && props.row.statut === 'Signalé' || props.row.statut === 'Assigné' " v-model="props.row.statut">
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
						<b-select v-if="!props.row.brigade" v-model="props.row.brigade" @input="assign(props.row.id)">
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

	</div>
</template>

<script>
import moment from 'moment'
import Edit from '@/components/Edit.vue'

export default {
	name: 'Dashboard',
	props: {
		signalements: Array,
	},
	components: {
		Edit
	},
	data () {
		return {
			etats: ['Très faible', 'Faible', 'Moyen', 'Bon'],
			statuts: ['Assigné', 'Sauvé', 'Echec'],
			brigades: ['75015-A', '75015-B', '75002', '75001', '75006-C'],
			checkedRows: []
		}
	},
	methods: {
		select(id) {
			this.$router.push({ name: 'edit', params: { id: id }})
		},
		assign(id) {
			this.signalements.filter(s => {
				if (s.id == id) {
					s.statut = 'Assigné'
				}
			})
		},
		cancelSignalement() {
			const self = this
			this.signalements.filter(s => {
				for(let i = 0; i < self.checkedRows.length; i++) {
					if (s.id == self.checkedRows[i].id) {
						s.statut = 'Annulé'
						s.brigade = ''
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