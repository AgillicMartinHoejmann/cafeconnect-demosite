<script lang="ts">
  import {Button, Column, FormGroup, Grid, PasswordInput, Row, TextInput} from "carbon-components-svelte";
</script>


<Grid>
  <Row>
    <Column>
      <h1>Login</h1>
      <form method="post">
        <FormGroup>
          <TextInput labelText="Username" name="username"></TextInput>
        </FormGroup>
        <FormGroup>
          <PasswordInput labelText="Password" placeholder="Enter password" name="password"></PasswordInput>
        </FormGroup>
        <Button type="submit">Log in</Button>
      </form>
    </Column>
  </Row>
</Grid>