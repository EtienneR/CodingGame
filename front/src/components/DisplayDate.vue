<template>
    <div>
        <span class="tag is-success">
            {{ date }}
        </span>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    name: 'DisplayDate',
    props: {
		date: String,
	}
}
</script>