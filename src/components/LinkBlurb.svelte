<script lang="ts">
  export let blurb: string | any[];
  export let editing = false;
</script>

<div class="link-blurb" contenteditable={editing}>
  {#each blurb as paragraph}
    <p>{paragraph}</p>
  {/each}
</div>

<style lang="less">
  .link-blurb {
    color: var(--color-silver);
    flex-grow: 1;
  }
</style>
