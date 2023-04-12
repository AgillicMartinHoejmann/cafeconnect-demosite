<script lang="ts">
    import type { ActionData } from './$types'

    import { enhance } from "$app/forms";

    export let form: ActionData
</script>

<h1>Register</h1>

<form method="POST" use:enhance>
    <div>
        <label for="username">Username</label>
        <input id="username" name="username" type="text" required />
    </div>

    <div>
        <label for="password">Password</label>
        <input id="password" name="password" type="password" required />
    </div>

    <button type="submit">Register</button>
</form>
