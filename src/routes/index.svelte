<script lang="ts">
  import LinkBlurb from "../components/LinkBlurb.svelte";
  import LinkPreview from "../components/LinkPreview.svelte";
  import { timelineStub } from "../stubs/timeline";

  let timeline = timelineStub;
  let editing = true;

  function actionMoveUp(node) {
    console.log("move up", node);
  }
  function actionMoveDown(node) {
    console.log("move down", node);
  }
  function actionItemDelete(node) {
    console.log("item delete", node);
  }
  function actionItemAdd(node) {
    console.log("item add", node);
  }
  function actionLinkEdit(node, link) {
    console.log("link edit", node, link);
  }
  function actionLinkDelete(node, link) {
    console.log("link delete", node, link);
  }
  function actionLinkAdd(node) {
    console.log("link add", node);
  }
</script>

<svelte:head>
  <title>{timeline.title}</title>
</svelte:head>

<div class="title-container">
  <h1 contenteditable={editing}>{timeline.title}</h1>
  <button on:click={() => (editing = !editing)}>Edit</button>
</div>
{#each timeline.nodes as node, i}
  <div class="node-container">
    <div class="timeline-graph">
      <div class="marker" />
      {#if i < timeline.nodes.length - 1}
        <div class="line" />
      {/if}
      {#if editing}
        <div class="edit-nodes">
          <button
            disabled={i === 0}
            on:click={() => actionMoveUp(node)}
            title="Move up"
            class="marker"
          >
            ⬆
          </button>
          <button
            disabled={i === timeline.nodes.length - 1}
            on:click={() => actionMoveDown(node)}
            title="Move down"
            class="marker"
          >
            ⬇
          </button>
          <button
            disabled={timeline.nodes.length <= 1}
            on:click={() => actionItemDelete(node)}
            title="Delete"
            class="marker -small"
          >
            🗑️
          </button>
          <button
            on:click={() => actionItemAdd(node)}
            title="Add new"
            class="marker -small"
          >
            ➕
          </button>
        </div>
      {/if}
    </div>
    <div class="links">
      {#each node.links as link}
        <LinkPreview
          {link}
          {editing}
          on:edit={() => actionLinkEdit(node, link)}
          on:delete={() => actionLinkDelete(node, link)}
        />
      {/each}
      {#if editing}
        <button on:click={() => actionLinkAdd(node)}>Add sibling link</button>
      {/if}
    </div>
    <LinkBlurb blurb={node.blurb} {editing} />
  </div>
{/each}

<style lang="less">
  .node-container {
    display: flex;
    flex-direction: row;
    position: relative;

    > .links {
      display: flex;
      flex-direction: column;
      min-width: 320px;
      margin: 12px;

      > :global(.link-preview:not(:first-child)) {
        margin-top: 12px;
      }
    }
  }

  .timeline-graph {
    --marker-size: 24px;
    --marker-color: var(--color-silver);

    .marker-mixin() {
      background-color: var(--marker-color);
      width: var(--marker-size);
      height: var(--marker-size);
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    > .marker {
      margin-right: 12px;
      margin-top: 32px;
      .marker-mixin();
    }

    .edit-nodes {
      position: absolute;
      z-index: 100;

      > .marker {
        .marker-mixin();

        background-color: var(--color-white);
        border: 1px dashed var(--marker-color);
        margin-top: 4px;
        cursor: pointer;

        &.-small {
          font-size: 0.75em;
        }
      }
    }

    > .line {
      position: absolute;
      left: calc(var(--marker-size) / 2 - 1px);
      width: 2px;
      height: 100%;
      background-color: var(--marker-color);
    }
  }

  @media (max-width: 768px) {
    .node-container {
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
