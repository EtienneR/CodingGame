<template>
    <div class="modal-card">
		
        <div class="card">
            <div class="card-content">
                <div class="content">
                    <b-tabs>
                        <b-tab-item label="Informations">
                            <b-field label="Créneau">
                                <b-input v-model="selected.creneau"></b-input>
                            </b-field>

                            <b-field label="Alerteur">
                                <b-input class="field" v-model="selected.alerteur"></b-input>
                            </b-field>

                            <div class="field is-horizontal">
                                <div class="field">
                                    <b-field label="Animal">
                                        <b-select required  v-model="selected.animal">
                                            <option
                                                v-for="animal in animaux"
                                                :value="animal"
                                                :key="animal">
                                                {{ animal }}
                                            </option>
                                        </b-select>
                                    </b-field>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <b-field label="Couleur">
                                            <b-input v-model="selected.couleur"></b-input>
                                        </b-field>
                                    </div>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <b-field label="Etat">
                                            <b-select required v-model="selected.etat">
                                                <option
                                                    v-for="etat in etats"
                                                    :value="etat"
                                                    :key="etat">
                                                    {{ etat }}
                                                </option>
                                            </b-select>
                                        </b-field>
                                    </div>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <b-field label="Collier">
                                            <b-switch v-model="selected.collier">
                                                <span v-if="selected.collier">Oui</span>
                                                <span v-else>Non</span>
                                            </b-switch>
                                        </b-field>
                                    </div>
                                </div>
                            </div>
                    
                            <b-field label="Voie">
                                <b-input v-model="selected.voie"></b-input>
                            </b-field>
                    
                            <div class="field is-horizontal">
                                <div class="field">
                                    <b-field label="Code Postal">
                                        <b-input v-model="selected.cp"></b-input>
                                    </b-field>
                                </div>
                                <div class="field-body">
                                    <div class="field">
                                        <b-field label="Ville">
                                            <b-input v-model="selected.ville"></b-input>
                                        </b-field>
                                    </div>
                                </div>
                            </div>
                        </b-tab-item>
                        <b-tab-item label="Status">
                            {{ selected.statut }}
                        </b-tab-item>
                    </b-tabs>
                </div>
            </div>
            <footer class="modal-card-foot">
                <button class="button" @click.native="closeModal()">Fermer</button>
                <button class="button is-primary">Modifier</button>
            </footer>
        </div>
    </div>
</template>

<script>
import { etats } from '@/services/Api'

export default {
	name: 'Edit',
	props: {
		selected: Object,
	},
	data () {
		return {
			animaux: ['Chien', 'Chat', 'Lapin', 'Perroquet'],
			etats: etats
		}
	},

}
</script>