<script lang="ts">
    import {goto} from '$app/navigation';
    import {
        Button,
        Column,
        FormGroup,
        Grid,
        OverflowMenu,
        OverflowMenuItem,
        Row,
        Search,
        StructuredList,
        StructuredListBody,
        StructuredListCell,
        StructuredListHead,
        StructuredListRow,
        StructuredListSkeleton
    } from 'carbon-components-svelte';
    import type {ActionData} from './$types';

    export let form: ActionData;

    async function getRecipients() {
        const res = await fetch('http://localhost:5173/admin/api/recipients', {
            method: 'get'
        });

        const allRecipients = await res.json();

        return allRecipients;
    }

    async function deleteRecipient(agillicId?: string) {
        const res = await fetch('http://localhost:5173/admin/api/recipients', {
            method: 'delete',
            body: JSON.stringify({recipientId: agillicId})
        });

        const response = await res.json();

        location.reload();

        return response;
    }

    function handleClick(agillicId: any) {
        goto(`/admin/recipients/${agillicId}`);
    }
</script>

<Grid>
    <Row padding>
        <Column>
            <form method="post">
                <FormGroup>
                    <Search labelText="Search by email" placeholder="Search by email ..." name="search"/>
                </FormGroup>
                <Button type="submit">Search</Button>
            </form>
        </Column>
    </Row>
</Grid>
{#if form}
    <Grid>
        <Row padding>
            <Column>
                <StructuredList selection>
                    <StructuredListHead>
                        <StructuredListRow head>
                            <StructuredListCell head>AGILLIC_ID</StructuredListCell>
                            <StructuredListCell head>Firstname</StructuredListCell>
                            <StructuredListCell head>Lastname</StructuredListCell>
                            <StructuredListCell head>Email</StructuredListCell>
                            <StructuredListCell head>Created</StructuredListCell>
                            <StructuredListCell head>Last Updated</StructuredListCell>
                            <StructuredListCell head>Email Permission</StructuredListCell>
                            <StructuredListCell head>Other</StructuredListCell>
                        </StructuredListRow>
                    </StructuredListHead>
                    <StructuredListBody>
                        {#each form.formRecipients as item}
                            <StructuredListRow>
                                <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                    {item.personData.AGILLIC_ID}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.FIRSTNAME}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.LASTNAME}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.EMAIL}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.CREATED}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.LAST_UPDATED}
                                </StructuredListCell>
                                <StructuredListCell on:click={() => handleClick(item.personData.AGILLIC_ID)}>
                                    {item.personData.EMAIL_PERMISSION}
                                </StructuredListCell>
                                <OverflowMenu>
                                    <OverflowMenuItem
                                            danger
                                            text="Delete"
                                            on:click={() => deleteRecipient(item.personData.AGILLIC_ID)}
                                    />
                                </OverflowMenu>
                            </StructuredListRow>
                        {/each}
                    </StructuredListBody>
                </StructuredList>
            </Column>
        </Row>
    </Grid>
{:else}
    {#await getRecipients()}
        <Grid>
            <Row padding>
                <Column>
                    <StructuredListSkeleton rows={3}/>
                </Column>
            </Row>
        </Grid>
    {:then row}
        <Grid>
            <Row padding>
                <Column>
                    <StructuredList selection>
                        <StructuredListHead>
                            <StructuredListRow head>
                                <StructuredListCell head>AGILLIC_ID</StructuredListCell>
                                <StructuredListCell head>Firstname</StructuredListCell>
                                <StructuredListCell head>Lastname</StructuredListCell>
                                <StructuredListCell head>Email</StructuredListCell>
                                <StructuredListCell head>Created</StructuredListCell>
                                <StructuredListCell head>Last Updated</StructuredListCell>
                                <StructuredListCell head>Email Permission</StructuredListCell>
                                <StructuredListCell head>Other</StructuredListCell>
                            </StructuredListRow>
                        </StructuredListHead>
                        <StructuredListBody>
                            {#each row as item}
                                <StructuredListRow>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.AGILLIC_ID}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.FIRSTNAME}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.LASTNAME}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.EMAIL}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.CREATED}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.LAST_UPDATED}
                                    </StructuredListCell>
                                    <StructuredListCell on:click={() => handleClick(item.AGILLIC_ID)}>
                                        {item.EMAIL_PERMISSION}
                                    </StructuredListCell>
                                    <OverflowMenu>
                                        <OverflowMenuItem
                                                danger
                                                text="Delete"
                                                on:click={() => deleteRecipient(item.AGILLIC_ID)}
                                        />
                                    </OverflowMenu>
                                </StructuredListRow>
                            {/each}
                        </StructuredListBody>
                    </StructuredList>
                </Column>
            </Row>
        </Grid>
    {/await}
{/if}
