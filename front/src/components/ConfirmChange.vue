<template>
    <div>

		<span v-if="checkedRows.length > 0">
			Annuler ces {{ checkedRows.length }} signalements ?
            <b-field>
                <b-radio-button
                    @click.native="save"
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

    </div>
</template>

<script>
export default {
	name: 'ConfirmChange',
	props: {
		checkedRows: Array,
	},
    methods: {
        save() {
            this.$emit('cancelSignalement')
        },
        cancel() {
            this.$emit('cancel')
        }
    }
}
</script>