<script lang="ts">
  import { stores } from "@sapper/app";
  const { session } = stores();

  export let segment: string;
</script>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? "page" : undefined} href=".">
        timeline
      </a>
    </li>
    <li>
      <a
        aria-current={segment === "timeline" ? "page" : undefined}
        href="successkid"
      >
        success kid
      </a>
    </li>
  </ul>

  {#if $session.isAuthenticated}
    <div class="user">
      <div>
        Signed in as
        <strong>{$session.user.given_name}</strong>
        |
        <a href="/logout">Sign out</a>
      </div>
    </div>
  {:else}
    <a href="/login">Sign In</a>
  {/if}
</nav>

<style lang="less">
  nav {
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
    padding: 0 1em;
    display: flex;
    justify-content: space-between;

    > .user {
      display: flex;
      align-items: center;
    }
  }

  ul {
    margin: 0;
    padding: 0;
  }

  /* clearfix */
  ul::after {
    content: "";
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    content: "";
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    display: block;
    bottom: -1px;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
  }
</style>
