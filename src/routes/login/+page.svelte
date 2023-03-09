<script lang="ts">
  export let form;
  let type = "password";

  function handleShowPassword() {
    type = type === "password" ? "text" : "password";
  }
</script>

<div class="grid place-items-center w-full h-full">
  <form action="POST" class="grid gap-3 w-[20rem] text-center font-poppins">
    <h1 class="text-[1.25rem]">Login</h1>
    <input type="text" placeholder="Username" class="input {form?.errors?.username ? 'input-bordered input-error' : 'input-bordered'} w-full max-w-xs" value={form?.data?.username ?? ""} />
    {#if form?.errors?.username}
      <span class="label-text-alt text-error">{form?.errors?.username[0]}</span>
    {/if}
    <input type="text" placeholder="E-Mail" class="input {form?.errors?.email ? 'input-bordered input-error' : 'input-bordered'} w-full max-w-xs" value={form?.data?.email ?? ""} />
    {#if form?.errors?.email}
      <span class="label-text-alt text-error">{form?.errors?.email[0]}</span>
    {/if}
    <input {type} placeholder="Password" class="input {form?.errors?.password ? 'input-bordered input-error' : 'input-bordered'} w-full max-w-xs" />
    {#if form?.errors?.password}
      <span class="label-text-alt text-error">{form?.errors?.password[0]}</span>
    {/if}

    <label class="label cursor-pointer">
      <span class="label-text">Show Password</span>
      <input type="checkbox" class="checkbox checkbox-success" on:click={handleShowPassword} />
    </label>
    <button type="submit" class="btn btn-outline btn-success" formaction="">Submit</button>
  </form>
</div>
