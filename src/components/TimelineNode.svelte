<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import type { Link, Node } from "../models/timeline";
  import { emptyLink } from "../stubs/timeline";
  import LinkBlurb from "./LinkBlurb.svelte";
  import LinkPreview from "./LinkPreview.svelte";

  const dispatch = createEventDispatcher();

  export let node: Node;
  export let editing = false;

  function linkMoveup(targetLink: Link) {
    const index = node.links.findIndex((v) => v.id === targetLink.id);
    const swapIndex = Math.max(index - 1, 0);
    const links = node.links.map((link, idx) => {
      if (idx === index) return node.links[swapIndex];
      if (idx === swapIndex) return node.links[index];
      return link;
    });
    dispatch("edit", { ...node, links });
  }
  function linkMovedown(targetLink: Link) {
    const index = node.links.findIndex((v) => v.id === targetLink.id);
    const swapIndex = Math.min(index + 1, node.links.length - 1);
    const links = node.links.map((link, idx) => {
      if (idx === index) return node.links[swapIndex];
      if (idx === swapIndex) return node.links[index];
      return link;
    });
    dispatch("edit", { ...node, links });
  }
  function linkEdit(targetLink: Link, event: Event) {
    targetLink.url = (event.target as any).value;
    const links = node.links.map((link) =>
      link.id === targetLink.id ? targetLink : link
    );
    dispatch("edit", { ...node, links });
  }
  function linkAdd(targetLink: Link) {
    const links = [...node.links];
    const index = links.findIndex((v) => v.id === targetLink.id);
    links.splice(index + 1, 0, emptyLink());
    dispatch("edit", { ...node, links });
  }
  function linkDelete(targetLink: Link) {
    const links = node.links.filter((link) => link.id !== targetLink.id);
    dispatch("edit", { ...node, links });
  }
  function blurbEdit(blurb: string) {
    dispatch("edit", { ...node, blurb });
  }
</script>

<div class="timeline-node">
  <div class="links">
    {#each node.links as link, i (link.id)}
      <LinkPreview {link} />
      {#if editing}
        <div class="editing">
          <input
            on:change={(event) => linkEdit(link, event)}
            type="text"
            value={link.url}
          />
          <button
            disabled={i === 0}
            on:click={() => linkMoveup(link)}
            title="Move up"
            class="marker"
          >
            ⬆
          </button>
          <button
            disabled={i === node.links.length - 1}
            on:click={() => linkMovedown(link)}
            title="Move down"
            class="marker"
          >
            ⬇
          </button>
          <button
            disabled={node.links.length <= 1}
            on:click={() => linkDelete(link)}
            title="Delete"
            class="marker -small"
          >
            🗑️
          </button>
          <button
            on:click={() => linkAdd(link)}
            title="Add new"
            class="marker -small"
          >
            ➕
          </button>
        </div>
      {/if}
    {/each}
  </div>
  <LinkBlurb
    blurb={node.blurb}
    {editing}
    on:edit={(event) => blurbEdit(event.detail)}
  />
</div>

<style lang="less">
  .timeline-node {
    display: flex;
    flex-grow: 1;

    > .links {
      display: flex;
      flex-direction: column;
      min-width: 320px;
      margin: 12px;

      > :global(.link-preview:not(:first-child)) {
        margin-top: 12px;
      }

      > .editing {
        display: flex;

        > input {
          flex-grow: 1;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .timeline-node {
      flex-direction: column;

      .links {
        margin-left: 32px;
      }

      :global(.link-blurb) {
        margin-left: 32px;
      }
    }
  }
</style>
