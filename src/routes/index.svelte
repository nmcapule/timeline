<script lang="ts">
  import localforage from "localforage";
  import { onMount } from "svelte";

  import TimelineNode from "../components/TimelineNode.svelte";
  import type { Node, Timeline } from "../models/timeline";
  import { emptyNode, timelineStub } from "../stubs/timeline";

  const _DEFAULT_ID = "12345";

  let timeline: Timeline;
  let editing = false;

  onMount(async () => {
    timeline = await localforage.getItem(_DEFAULT_ID);
    if (!timeline) {
      timeline = timelineStub();
    }
  });

  $: if (timeline) {
    localforage.setItem(_DEFAULT_ID, timeline);
  }

  function actionMoveUp(targetNode) {
    const index = timeline.nodes.findIndex((v) => v.id === targetNode.id);
    const swapIndex = Math.max(index - 1, 0);
    const nodes = timeline.nodes.map((link, idx) => {
      if (idx === index) return timeline.nodes[swapIndex];
      if (idx === swapIndex) return timeline.nodes[index];
      return link;
    });
    timeline = { ...timeline, nodes };
    setTimeout(() => {
      document
        .getElementById(targetNode.id)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    }, 0);
  }
  function actionMoveDown(targetNode) {
    const index = timeline.nodes.findIndex((v) => v.id === targetNode.id);
    const swapIndex = Math.min(index + 1, timeline.nodes.length - 1);
    const nodes = timeline.nodes.map((link, idx) => {
      if (idx === index) return timeline.nodes[swapIndex];
      if (idx === swapIndex) return timeline.nodes[index];
      return link;
    });
    timeline = { ...timeline, nodes };
    setTimeout(() => {
      document
        .getElementById(targetNode.id)
        .scrollIntoView({ block: "start", behavior: "smooth" });
    }, 0);
  }
  function actionItemDelete(targetNode) {
    const nodes = timeline.nodes.filter((node) => node.id !== targetNode.id);
    timeline = { ...timeline, nodes };
  }
  function actionItemAdd(targetNode) {
    const nodes = [...timeline.nodes];
    const index = nodes.findIndex((v) => v.id === targetNode.id);
    nodes.splice(index + 1, 0, emptyNode());
    timeline = { ...timeline, nodes };
  }
  function actionNodeEdit(event: CustomEvent<Node>) {
    const nodes = timeline.nodes.map((node) =>
      node.id === event.detail.id ? event.detail : node
    );
    timeline = { ...timeline, nodes };
  }
  function actionTitleEdit(event: KeyboardEvent) {
    const elem = event.target as HTMLElement;
    const title = elem.innerText;
    timeline = { ...timeline, title };
  }
</script>

<svelte:head>
  <title>{timeline?.title}</title>
</svelte:head>

<div class="title-container">
  <h1 contenteditable={editing} on:keyup={actionTitleEdit}>
    {timeline?.title}
  </h1>
  <button on:click={() => (editing = !editing)}>Edit</button>
</div>
{#each timeline?.nodes || [] as node, i (node.id)}
  <div id={node.id} class="node-container">
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
    <TimelineNode {node} {editing} on:edit={actionNodeEdit} />
  </div>
{/each}

<style lang="less">
  .node-container {
    display: flex;
    flex-direction: row;
    position: relative;
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
</style>
