<script lang="ts">
  let title = "Presentation of a thing";

  function blurbGenerator(asArray = false, min = 2, max = 5, fillchar = "▇") {
    const paragraphCount = Math.random() * (max - min) + min;
    const paragraphs = [];

    for (let i = 0; i < paragraphCount; i++) {
      const sentenceCount = Math.random() * 5 + 2;
      const sentences = [];

      for (let j = 0; j < sentenceCount; j++) {
        const wordCount = Math.random() * 10 + 4;
        const words = [];

        for (let k = 0; k < wordCount; k++) {
          const wordLen = Math.floor(Math.random() * 5 + 1);
          words.push(new Array(wordLen).fill(fillchar).join(""));
        }

        sentences.push(words.join(" ") + ".");
      }

      paragraphs.push(sentences.join(" "));
    }

    if (asArray) {
      return paragraphs;
    } else {
      return paragraphs.join("\n\n");
    }
  }

  let timeline = {
    title: "Lorem ipsum dolor sit amet",
    created: new Date(),
    nodes: [
      {
        links: [
          {
            url: "http://www.google.com",
            title: "Google Link",
            description: blurbGenerator(false, 1, 1),
          },
          {
            url: "http://www.google.com",
            title: "Google Link 2",
            description: blurbGenerator(false, 1, 1),
          },
        ],
        tags: ["career"],
        blurb: blurbGenerator(true, 0, 5),
      },
      {
        links: [
          {
            url: "http://www.google.com",
            title: "Google Link",
            description: blurbGenerator(false, 1, 1),
          },
        ],
        tags: ["career"],
        blurb: blurbGenerator(true, 0, 5),
      },
      {
        links: [
          {
            url: "http://www.google.com",
            title: "Google Link",
            description: blurbGenerator(false, 1, 1),
          },
        ],
        tags: ["career"],
        blurb: blurbGenerator(true, 0, 5),
      },
    ],
  };
</script>

<svelte:head>
  <title>{timeline.title}</title>
</svelte:head>

<h1>{timeline.title}</h1>
{#each timeline.nodes as node, i}
  <div class="node-container">
    <div class="timeline-graph">
      <div class="marker" />
      {#if i < timeline.nodes.length - 1}
        <div class="line" />
      {/if}
    </div>
    <div class="links">
      {#each node.links as link}
        <a href={link.url} class="link-preview">
          {link.title}
        </a>
      {/each}
    </div>
    <div class="blurb">
      {#each node.blurb as paragraph}
        <p>{paragraph}</p>
      {/each}
    </div>
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
    }

    > .blurb {
      color: var(--color-silver);
    }
  }

  .timeline-graph {
    --marker-size: 24px;
    --marker-color: var(--color-silver);

    > .marker {
      background-color: var(--marker-color);
      width: var(--marker-size);
      height: var(--marker-size);
      margin-right: 12px;
      margin-top: 32px;
      border-radius: 100%;
    }

    > .line {
      position: absolute;
      left: calc(var(--marker-size) / 2 - 1px);
      width: 2px;
      height: 100%;
      background-color: var(--marker-color);
    }
  }

  .link-preview {
    border-radius: 5px;
    margin: 12px;
    padding: 12px;
    min-height: 64px;
    border: 1px solid var(--color-dark-snow);
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
  }
</style>
