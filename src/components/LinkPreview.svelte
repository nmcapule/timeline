<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { Link } from "../models/timeline";

  const dispatch = createEventDispatcher();

  export let link: Link;
  export let editing = false;
</script>

<a href={link.url} class="link-preview" target="_blank">
  <div class="title">{link.title}</div>
</a>
{#if editing}
  <div class="editing">
    <input on:change={() => dispatch("edit")} type="text" value={link.url} />
    <button on:click={() => dispatch("delete")}>Delete</button>
  </div>
{/if}

<style lang="less">
  .link-preview {
    border-radius: 5px;
    min-height: 64px;
    border: 1px solid var(--color-dark-snow);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
    text-decoration: none;
    padding: 12px;

    display: flex;
    flex-direction: column;
  }

  .editing {
    display: flex;

    > input {
      flex-grow: 1;
    }
  }
</style>
