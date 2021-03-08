<script lang="ts">
  import type { Link } from "../models/timeline";

  export let link: Link;
</script>

<a href={link.url} class="link-preview" target="_blank">
  <div class="title">{link.title}</div>
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
  }
</style>
