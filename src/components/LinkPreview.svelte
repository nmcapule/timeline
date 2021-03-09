<script lang="ts">
  import type { Link } from "../models/timeline";

  export let link: Link;
</script>

<a href={link.url} class="link-preview" target="_blank" title={link.url}>
  {#if link.imageUrl}
    <img class="image" src={link.imageUrl} alt="link preview" />
  {/if}
  <div class="title">{link.title}</div>
  {#if link.description}
    <div class="description">{link.description}</div>
  {/if}
  <div class="url">{link.url}</div>
</a>

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

    > .title {
      font-weight: 600;
      color: var(--color-steel);
    }

    > .description {
      font-size: 0.75em;
      color: var(--color-silver);
    }

    > .url {
      font-size: 0.9em;
      color: var(--color-marvel);
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
</style>
