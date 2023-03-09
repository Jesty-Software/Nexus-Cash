<script>
  import "../app.css";
</script>

<div class="navbar bg-base-100">
  <div class="flex-1">
    <!-- svelte-ignore a11y-missing-attribute -->
    <a class="btn btn-ghost normal-case text-xl">Nexus Cash</a>
  </div>
  <div class="flex-none gap-2">
    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <!-- svelte-ignore a11y-missing-attribute -->
        <!-- svelte-ignore a11y-missing-attribute -->
        <div class="w-10 rounded-full">
          <img src="/Nexus Default Profile Zoom.png" />
        </div>
      </label>
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <ul tabindex="0" class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a href="/user/" class="justify-between">
            Profile
            <span class="badge">New</span>
          </a>
        </li>
        <li><a href="/settings">Settings</a></li>
        <li><a href="/logout">Logout</a></li>
      </ul>
    </div>
  </div>
</div>

<slot />
